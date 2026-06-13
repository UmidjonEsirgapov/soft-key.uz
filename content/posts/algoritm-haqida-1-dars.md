---
title: "Algoritm nima? Dasturlashda algoritmlarni tushunish"
slug: "algoritm-haqida-1-dars"
description: "Algoritm nima va u qanday ishlaydi? Misollar orqali algoritmlash asoslari, o'zgaruvchilar, sikllar va samaradorlikni o'rganing. Dasturlashdagi ilk qadamlaringiz."
date: "2026-06-13"
updatedAt: "2026-06-13"
image: "https://www.texnoman.uz/uploads/blogs/3af5d15166dda9ec44a4fde0ab2d48b6.png"
categories: ["dasturlash", "karyera"]
tags: ["algoritm", "dasturlash-asoslari", "mantiqiy-fikrlash", "kodlash", "optimizatsiya"]
sourceUrl: "https://www.texnoman.uz/post/algoritm-haqida-1-dars.html"
wordCount: 269
---

## Algoritm asoslari: Dasturlashga kirish

Dasturlash olamida eng asosiy tushunchalardan biri bu — algoritm. Ko'pchilik uni murakkab matematik atama deb o'ylaydi, aslida esa algoritm bu shunchaki muayyan maqsadga erishish uchun bajariladigan ketma-ket qadamlar majmuidir. Oddiy tilda aytganda, bu ma'lum bir vazifani hal etish uchun tuzilgan aniq ko'rsatmalar ketma-ketligi.

### Algoritm hayotimizda va kompyuterda

Biz kundalik hayotimizda ham algoritmlardan doimiy foydalanamiz. Masalan, choy damlash jarayoni: suvni qaynating, choynakka soling, damlang. Bu ketma-ketlikni buzsangiz, natija ham o'zgaradi. Xuddi shunday, dasturchi yozgan har bir kod qatori ham kompyuter uchun aniq qadamlardan iborat. [nodirbek](https://nodirbek.uz/) platformasida ta'kidlanganidek, algoritmlar dasturiy ta'minotning yuragidir.

### Amaliy misol: Odamlar sonini hisoblash

Keling, xonadagi odamlar sonini aniqlash masalasini algoritm yordamida ko'rib chiqamiz. 

1. **Oddiy yondashuv**: 
   - `N` (hisoblagich) o'zgaruvchisini 0 ga tenglaymiz. 
   - Har bir inson uchun `N` qiymatini 1 ga oshiramiz (`N = N + 1`). 
   - Bu jarayon xona bo'shaguncha takrorlanadi (loop).

Bu algoritm to'g'ri ishlaydi, lekin 100 kishi bo'lsa, uni birma-bir sanash sekinlik qiladi. 

2. **Optimallashtirilgan yondashuv**:
   Samaradorlikni oshirish uchun biz birdaniga 2 kishidan sanashni taklif qildik (`N = N + 2`). Biroq, bu yondashuvda xatolik yuzaga kelishi mumkin: agar odamlar soni toq bo'lsa (masalan, 3 kishi), oxirgi odam hisobga olinmay qoladi. 

3. **Yakuniy yechim**:
   Dasturlashda muammolarni mukammal hal qilish uchun barcha ehtimollarni hisobga olish kerak:
   - 2 kishi ko'rinsa: `N = N + 2`
   - 1 kishi qolsa: `N = N + 1`

### Xulosa

Algoritm nafaqat kod yozish, balki mantiqiy fikrlash san'atidir. Dastlabki yechimingiz har doim ham mukammal bo'lmasligi mumkin, ammo algoritmni sinash va qayta ishlash (refactoring) orqali uni optimallashtirishingiz mumkin. Kichik qadamlar bilan boshlab, murakkab masalalarni yechishga o'rganish — professional dasturchi bo'lishning yo'lidir.
