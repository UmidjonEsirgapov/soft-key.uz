# Soft Key — Texnologiya va Ta'lim Blogi

O'zbek tilidagi PBN blog sayti. Maqolalar Texnoman Ta'lim bo'limidan olinadi, Gemini bilan qayta yoziladi va `.md` formatda saqlanadi.

## O'rnatish

```bash
npm install
cp .env.example .env.local
# .env.local ga GEMINI_API_KEY qo'shing
```

## Kontent pipeline

```bash
# 1. Texnomandan maqolalarni yuklab olish
npm run scrape

# 2. Gemini bilan qayta yozish va .md generatsiya
npm run rewrite

# Yoki ikkalasini ketma-ket
npm run pipeline

# Bitta maqolani qayta ishlash
npm run rewrite -- --slug=data-science-yol-xaritasi --force
```

**Eslatma:** `GEMINI_API_KEY` bo'lmasa, fallback lokal rewrite ishlatiladi. Haqiqiy SEO qayta yozish uchun API kalitini `.env.local` ga qo'ying va `npm run rewrite -- --force` bajaring.

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Struktura

- `content/posts/` — markdown maqolalar
- `content/categories.json` — 10 ta kategoriya
- `scripts/` — scraping va Gemini pipeline
- `lib/` — post o'qish, SEO, o'xshash maqolalar
