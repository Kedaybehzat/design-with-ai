# Brief: Kampüs Etkinlik Web Uygulaması

Üniversite öğrencilerinin kampüsteki etkinlikleri (topluluk buluşmaları, atölyeler, konserler, kariyer günleri) bulup kayıt olabildiği bir **web uygulaması**. Öğrenciler onu dizüstü bilgisayardan, kütüphanede ya da derste açıyor.

## Ana akış

**Etkinliği bul → Detayı incele → Kayıt ol**

## Ekranlar

### 1. Etkinlikler
- Yaklaşan etkinliklerin listesi: ad, tarih ve saat, yer, düzenleyen topluluk, kontenjan durumu.
- Kategoriye göre filtre (Tümü, Teknoloji, Kariyer, Sanat, Spor) ve her kategoride kaç etkinlik olduğu.
- Üstte bu haftanın kısa özeti (örn. bu hafta kaç etkinlik var, kaç yer kaldı, senin kayıtların).
- Bir etkinliğe tıklayınca detayı açılır.

### 2. Etkinlik Detayı
- Ad, tarih/saat, yer, düzenleyen, açıklama, konuşmacılar, kalan kontenjan.
- Ana aksiyon: **Kayıt Ol**.
- Listeye geri dönüş.

### 3. Kayıt
- Form: ad soyad, okul e-postası, bölüm, sınıf, (opsiyonel) beslenme tercihi.
- KVKK onayı.
- Ana aksiyon: **Kaydı Tamamla**.
- Başarılı kayıttan sonra kısa bir onay durumu.

## Teknik çıktı

- **React.** Tur klasöründe `App.jsx` (varsayılan export `App`) ve gerekiyorsa `styles.css`.
- Dış bağımlılık yok: UI kütüphanesi, CSS framework'ü, ikon paketi kullanılmaz. Google Fonts kullanılabilir.
- Dizüstü ekran için tasarlanır (1440 × 900); 1024 px genişlikte de bozulmamalı. Telefon çerçevesi yok.
- Ekranlar birbirine bağlı, tıklanabilir bir prototip: etkinliğe tıklayınca detay, butona tıklayınca kayıt.
- Tüm içerik Türkçe ve gerçekçi (örnek etkinlikler, Sakarya Üniversitesi'ndeki yerler, gerçekçi tarihler).

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173/?round=1` (veya `2`, `3`).
