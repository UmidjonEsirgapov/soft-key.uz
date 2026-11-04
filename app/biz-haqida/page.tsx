import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { buildBreadcrumbJsonLd, buildPageMetadata, getSiteUrl, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Biz haqimizda",
  description:
    "Soft Key — dasturlash, IT karyera, sun'iy intellekt va ta'lim haqida o'zbek tilidagi amaliy blog. Nima haqida yozamiz va maqolalarni qanday tayyorlaymiz.",
  path: "/biz-haqida",
});

const PRINCIPLES = [
  {
    title: "Amaliy foyda",
    text: "Har bir maqola bitta savolga aniq javob berishi kerak: nimani o'rganish, qayerdan boshlash, qanday xatolardan qochish.",
  },
  {
    title: "Sodda til",
    text: "Murakkab atamalarni o'zbek tilida tushuntiramiz, inglizcha nomini esa qavs ichida qoldiramiz — hujjatlarda aynan shu nom uchraydi.",
  },
  {
    title: "Yangilab borish",
    text: "Texnologiya tez o'zgaradi. Eskirgan maqolalarni qayta ko'rib chiqamiz va yangilangan sanani sahifada ko'rsatamiz.",
  },
  {
    title: "Mustaqil fikr",
    text: "Kurs, kitob yoki vositani tavsiya qilsak, buning sababini yozamiz. Reklama maqolalarini oddiy maqola sifatida chiqarmaymiz.",
  },
];

export default function AboutPage() {
  const postCount = getAllPosts().length;

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Bosh sahifa", path: "/" },
            { name: "Biz haqimizda", path: "/biz-haqida" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Biz haqimizda",
            url: `${getSiteUrl()}/biz-haqida`,
            inLanguage: "uz",
            about: { "@type": "Organization", name: SITE_NAME, url: getSiteUrl() },
          },
        ]}
      />
      <PageHeader
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Biz haqimizda" }]}
        eyebrow={`${postCount} ta maqola · ${categories.length} ta mavzu`}
        title="Soft Key nima?"
        description="Dasturlash va IT dunyosiga kirmoqchi bo'lganlar uchun o'zbek tilidagi amaliy blog."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="article">
          <p>
            Soft Key — dasturlashni endi o&apos;rganayotganlar, birinchi ishini qidirayotgan junior
            dasturchilar va IT sohasiga qiziquvchi o&apos;quvchilar uchun yozilgan blog. Maqsadimiz
            oddiy: o&apos;zbek tilida ishonchli, tushunarli va amalda qo&apos;llasa bo&apos;ladigan
            ma&apos;lumot berish.
          </p>
          <h2 id="nima-haqida-yozamiz">Nima haqida yozamiz?</h2>
          <p>
            Dasturlash asoslari va yo&apos;l xaritalari, IT karyera va intervyuga tayyorgarlik,
            sun&apos;iy intellekt, o&apos;quv kurslari, universitetga kirish va xorijda ta&apos;lim.
            Barcha yo&apos;nalishlarni <Link href="/mavzular">mavzular sahifasida</Link>{" "}
            ko&apos;rishingiz
            mumkin.
          </p>
          <h2 id="tamoyillarimiz">Tamoyillarimiz</h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((item) => (
            <div key={item.title} className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="article mt-10">
          <h2 id="qayerdan-boshlash">Qayerdan boshlash kerak?</h2>
          <p>
            Agar dasturlashni noldan boshlayotgan bo&apos;lsangiz,{" "}
            <Link href="/kategoriya/junior">Junior</Link>{" "}bo&apos;limidan boshlang. Sun&apos;iy
            intellekt qiziqtirsa, <Link href="/blog/suniy-intellekt-nima-oddiy-tilda">AI haqidagi
            kirish maqolasini</Link>{" "}o&apos;qing. Yangi maqolalarni kuzatib borish uchun{" "}
            <a href="/feed.xml">RSS lentamizga</a>{" "}obuna bo&apos;ling.
          </p>
        </div>
      </div>
    </>
  );
}
