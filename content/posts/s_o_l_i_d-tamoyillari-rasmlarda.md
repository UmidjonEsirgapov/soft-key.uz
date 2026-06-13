---
title: "S.O.L.I.D tamoyillarini vizual tarzda tushunish"
slug: "s_o_l_i_d-tamoyillari-rasmlarda"
description: "S.O.L.I.D tamoyillari dasturlashda kod sifatini oshirish uchun juda muhim. Ushbu maqolada Robert Martinning ushbu besh tamoyilini vizual misollar bilan o'rganamiz."
date: "2026-06-13"
updatedAt: "2026-06-13"
image: "https://www.texnoman.uz/uploads/blogs/69e603dc40964474fa93b2cd11dd560c.png"
categories: ["dasturlash", "backend"]
tags: ["solid", "oop", "dasturlash", "kod-sifati", "architektura"]
sourceUrl: "https://www.texnoman.uz/post/s_o_l_i_d-tamoyillari-rasmlarda.html"
wordCount: 244
---

## Dasturlashda S.O.L.I.D tamoyillari

Ob'ektga yo'naltirilgan dasturlash (OOP) bilan shug'ullanadigan har bir dasturchi Robert C. Martin tomonidan ishlab chiqilgan S.O.L.I.D tamoyillari haqida eshitgan bo'lishi kerak. Ushbu ko'rsatmalar kodni oson kengaytiriladigan va barqaror qilishga yordam beradi. Vizual o'rganishni afzal ko'radiganlar uchun ushbu tamoyillarni sodda tushuntirishga harakat qilamiz.

### S – Single Responsibility (Yagona mas'uliyat)
Klass faqat bitta vazifaga ega bo'lishi kerak. Agar bir klass bir nechta funksiyani bajarsa, kodda xatolik yuzaga kelish ehtimoli ortadi. Masalan, kodning bir qismini o'zgartirish boshqa qismiga ta'sir qilmasligi lozim.

### O – Open-Closed (Ochiq-yopiqlik)
Klasslar kengaytirish uchun ochiq, ammo o'zgartirish uchun yopiq bo'lishi kerak. Bu degani, tizimga yangi xususiyat qo'shish uchun mavjud kodni buzmasdan, yangi kodlar yozish afzalroqdir.

### L – Liskov Substitution (Liskov o'rnini bosish)
Ota klass o'zining vorisi bo'lgan bola klass bilan hech qanday muammosiz almashinishi kerak. Bola klass ota klassning barcha funksiyalarini to'g'ri bajara olishi shart. [Shamsiddin Komilov](https://www.texnoman.uz/medium.com) ta'kidlaganidek, vorislik munosabatlarida izchillik juda muhim.

### I – Interface Segregation (Interfeyslar ajratish)
Interfeyslar kichik bo'lishi kerak. Mijoz foydalanmaydigan metodlarga majburan bog'liq bo'lmasligi kerak. Klasslar faqat o'zlari bajaradigan funksiyalarni o'z ichiga olishi shart.

### D – Dependency Inversion (Bog'liqlikni inversiya qilish)
Yuqori darajali modullar quyi darajali modullarga to'g'ridan-to'g'ri bog'lanmasligi kerak. Ikkala qatlam ham umumiy abstraksiyaga (interfeysga) tayanib ishlashi lozim.

## Xulosa
S.O.L.I.D tamoyillarini o'zlashtirish dasturchiga murakkab loyihalarni boshqarishda katta yordam beradi. Kodni qismlarga ajratish, uni kengaytiriladigan qilish va bog'liqliklarni kamaytirish orqali siz professional dasturiy ta'minot yaratish imkoniga ega bo'lasiz. Ushbu qoidalarni amaliyotda qo'llash dasturning kelajakda xizmat ko'rsatilishini ancha osonlashtiradi.
