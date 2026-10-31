---
title: "Prompt yozish: AI'dan aniq javob olishning 10 usuli"
slug: "prompt-yozish-boyicha-qollanma"
description: "ChatGPT, Claude va boshqa AI yordamchilardan sifatli javob olish uchun prompt yozish usullari: kontekst, rol, misollar, format va natijani tekshirish."
date: "2026-11-01"
updatedAt: "2026-11-01"
categories: ["suniy-intellekt", "shaxsiy-rivojlanish"]
tags: ["ai", "prompt", "chatgpt", "unumdorlik", "sun'iy intellekt"]
wordCount: 539
---

Bir xil AI yordamchidan ikki kishi foydalanadi: biri foydali javob oladi, ikkinchisi "AI hech narsa bilmaydi" degan xulosaga keladi. Ko'pincha farq vositada emas, savolning qanday berilishida. AI'ga beriladigan topshiriq matni **prompt** deb ataladi. Quyida har qanday sohada ishlaydigan 10 ta amaliy usulni ko'rib chiqamiz.

## 1. Kontekst bering

AI sizning vaziyatingizni bilmaydi. Kim ekaningiz, nima ustida ishlayotganingiz va natija kimga mo'ljallanganini yozing.

*   Yomon: "Rezyume yoz."
*   Yaxshi: "Men 1 yillik tajribaga ega frontend dasturchiman, React va TypeScript bilan ishlaganman. Toshkentdagi mahsulot kompaniyasiga junior/middle lavozimiga topshiryapman. Rezyumemning 'Tajriba' bo'limini qayta yozib ber."

## 2. Aniq vazifa qo'ying

"Yordam ber" o'rniga nima qilish kerakligini fe'l bilan ayting: "qisqartir", "xatolarini top", "3 ta variant taklif qil", "jadval ko'rinishida solishtir".

## 3. Natija formatini belgilang

Javob qanday ko'rinishda kerakligini oldindan ayting: ro'yxat, jadval, JSON, 5 jumladan oshmaydigan matn, kod va izohsiz. Bu keyin qayta ishlashni ancha osonlashtiradi.

## 4. Misol ko'rsating

Agar sizga ma'lum uslub kerak bo'lsa, bitta-ikkita namuna bering. Masalan, mahsulot tavsiflarini yozdirmoqchi bo'lsangiz, avval o'zingiz yozgan bitta yaxshi tavsifni ko'rsating va "shu uslubda yana 5 tasini yoz" deng. Bu usul ingliz tilida *few-shot prompting* deb ataladi.

## 5. Cheklovlarni yozing

Nima kerak emasligini aytish ham muhim:

*   "Inglizcha atamalarni tarjima qilma."
*   "Tashqi kutubxona ishlatma."
*   "Taxmin qilma, bilmasang 'bilmayman' de."

Oxirgi cheklov ayniqsa foydali. U AI'ning faktlarni to'qib chiqarishini kamaytiradi.

## 6. Murakkab vazifani bo'laklarga ajrating

Bitta katta so'rov o'rniga bir necha kichik qadam qiling. Masalan, maqola yozishda:

1. Avval reja (sarlavhalar) so'rang.
2. Rejani o'zingiz tuzating.
3. Keyin har bir bo'limni alohida yozdiring.

Har qadamda natijani nazorat qilasiz va xato keyingi bosqichga o'tib ketmaydi.

## 7. "Avval o'ylab ko'r" deb so'rang

Mantiqiy yoki hisob-kitob talab qiladigan masalalarda AI'dan javobdan oldin yechim yo'lini bosqichma-bosqich yozishni so'rang. Shunda xatoni qayerda qilganini ko'rish osonroq bo'ladi.

## 8. Manba materialni prompt ichiga qo'ying

AI'ning "xotirasi"ga emas, siz bergan matnga tayanishi uchun hujjat, maqola yoki kodni to'g'ridan-to'g'ri qo'shing va "faqat shu matn asosida javob ber" deb yozing. Qonun, narx yoki sana kabi aniq ma'lumot kerak bo'lsa, bu usul ayniqsa muhim.

## 9. Javobni tanqid qildiring

Birinchi javobni olgach, so'rang: "Bu javobdagi zaif joylarni ko'rsat" yoki "Tajribali muharrir sifatida buni baholab, yaxshilash bo'yicha 3 ta taklif ber." Ko'pincha ikkinchi variant birinchisidan sezilarli darajada yaxshiroq bo'ladi.

## 10. Muloqotni davom ettiring

Prompt bir martalik buyruq emas. Javob yoqmasa, nima yoqmaganini aniq ayting: "juda rasmiy chiqdi, do'stona ohangda yoz", "3-banddagi misol noto'g'ri, uni almashtir". Aniq izoh umumiy "yana urinib ko'r"dan ancha samarali.

## Tayyor shablon

Ko'p holatlarda quyidagi tuzilma yaxshi ishlaydi:

```
Rol: Sen [soha] bo'yicha tajribali mutaxassissan.
Kontekst: [vaziyat, auditoriya, maqsad]
Vazifa: [aniq fe'l bilan nima qilish kerak]
Material: [matn, kod yoki ma'lumot]
Cheklovlar: [nima qilmaslik kerak]
Format: [natija qanday ko'rinishda bo'lsin]
```

## Har doim tekshiring

Eng yaxshi prompt ham AI xato qilmasligini kafolatlamaydi. Raqamlar, sanalar, nomlar, iqtiboslar va kodni har doim tekshiring. Ayniqsa o'zbek tilidagi matnlarda imlo va atamalarga e'tibor bering: model ba'zan rus yoki turk tilidagi shakllarni aralashtirib yuboradi.

Dasturchi bo'lsangiz, AI bilan kod yozish bo'yicha alohida tavsiyalarni [AI yordamchilar bilan kod yozish](/blog/dasturchilar-uchun-ai-yordamchilar) maqolamizda topasiz.

## Xulosa

Yaxshi prompt — bu yaxshi topshiriq. Yangi xodimga ish berayotgandek yozing: kontekst, aniq vazifa, namuna, cheklovlar va kutilgan format. Shunda AI'dan oladigan natijangiz bir necha baravar yaxshilanadi, siz esa vaqtingizni tuzatishga emas, haqiqiy ishga sarflaysiz.
