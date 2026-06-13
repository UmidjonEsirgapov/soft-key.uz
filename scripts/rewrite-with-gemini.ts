import fs from "fs";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import categoriesData from "../content/categories.json";
import { saveMarkdown } from "./generate-markdown";
import { generateFallbackRewrite } from "./lib/fallback-rewrite";
import {
  RAW_DIR,
  REWRITE_ERRORS,
  ScrapedArticle,
  RewriteResult,
  ensureDir,
  loadEnvFile,
  parseArgs,
  sleep,
} from "./lib/utils";

const MODEL = "gemini-3.1-flash-lite";
const CATEGORY_SLUGS = categoriesData.map((c) => c.slug);

function buildPrompt(article: ScrapedArticle): string {
  const linksList = article.links
    .slice(0, 30)
    .map((l) => `- [${l.text}](${l.href})`)
    .join("\n");

  return `Siz SEO mutaxassisisiz. Quyidagi maqolani O'zbek tilida qayta yozing.

TALABLAR:
1. Taxminan 400-500 so'z (kerak bo'lsa kamroq, lekin 250 so'zdan kam bo'lmasin)
2. Asl ma'noni saqlang, lekin matnni TO'LIQ qayta yozing (dublikat kontent bo'lmasin)
3. Markdown formatida yozing: ## va ### sarlavhalar, qisqa kirish va xulosa
4. Asl matndagi BARCHA foydali linklarni saqlang — markdown link formatida [matn](url)
5. Aynan 2 ta kategoriya tanlang — FAQAT quyidagi ro'yxatdan: ${CATEGORY_SLUGS.join(", ")}
6. Maksimal 5 ta teg yarating (lotin, kichik harf, tire bilan)
7. description — 150-160 belgili SEO meta tavsif
8. title — qisqa, jozibali sarlavha

MAVJUD LINKLAR (kerak bo'lsa ishlating):
${linksList || "Linklar yo'q"}

ASL MAQOLA SARLAVHASI: ${article.title}

ASL MAQOLA MATNI:
${article.plainText.slice(0, 12000)}`;
}

async function rewriteArticle(
  ai: GoogleGenAI,
  article: ScrapedArticle
): Promise<RewriteResult> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(article),
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          content: { type: Type.STRING },
          categories: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["title", "description", "content", "categories", "tags"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Empty Gemini response");

  const parsed = JSON.parse(text) as RewriteResult;

  parsed.categories = parsed.categories
    .filter((c) => CATEGORY_SLUGS.includes(c))
    .slice(0, 2);

  if (parsed.categories.length < 2) {
    const fallback = CATEGORY_SLUGS.filter(
      (c) => !parsed.categories.includes(c)
    );
    while (parsed.categories.length < 2 && fallback.length > 0) {
      parsed.categories.push(fallback.shift()!);
    }
  }

  parsed.tags = parsed.tags
    .map((t) => t.toLowerCase().replace(/\s+/g, "-"))
    .slice(0, 5);

  return parsed;
}

async function main() {
  loadEnvFile();
  const flags = parseArgs();

  const apiKey = process.env.GEMINI_API_KEY;
  const useFallback =
    !apiKey ||
    apiKey === "your_gemini_api_key_here" ||
    flags.fallback === true;

  if (useFallback) {
    console.warn(
      "GEMINI_API_KEY not set — using local fallback rewrite. Set API key and run with --force for Gemini output."
    );
  }

  const force = flags.force === true;
  const slugFilter = typeof flags.slug === "string" ? flags.slug : null;

  if (!fs.existsSync(RAW_DIR)) {
    console.error("No raw data found. Run: npm run scrape");
    process.exit(1);
  }

  const ai = useFallback ? null : new GoogleGenAI({ apiKey: apiKey! });
  const files = fs
    .readdirSync(RAW_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !slugFilter || f === `${slugFilter}.json`);

  ensureDir(path.dirname(REWRITE_ERRORS));
  const errors: { slug: string; error: string }[] = [];
  let success = 0;

  for (const file of files) {
    const raw: ScrapedArticle = JSON.parse(
      fs.readFileSync(path.join(RAW_DIR, file), "utf8")
    );

    const mdPath = path.join(process.cwd(), "content", "posts", `${raw.slug}.md`);
    if (!force && fs.existsSync(mdPath)) {
      console.log(`Skip (exists): ${raw.slug}`);
      continue;
    }

    try {
      console.log(`Rewriting: ${raw.slug}`);
      const result = useFallback
        ? generateFallbackRewrite(raw)
        : await rewriteArticle(ai!, raw);
      const saved = saveMarkdown(raw, result);
      console.log(`Saved: ${saved}`);
      success++;
      if (!useFallback) await sleep(2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${raw.slug} — ${message}`);
      errors.push({ slug: raw.slug, error: message });
    }
  }

  if (errors.length > 0) {
    fs.writeFileSync(REWRITE_ERRORS, JSON.stringify(errors, null, 2), "utf8");
  }

  console.log(`\nRewrite complete. ${success} articles saved.`);
  if (errors.length > 0) {
    console.log(`${errors.length} errors saved to data/rewrite-errors.json`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
