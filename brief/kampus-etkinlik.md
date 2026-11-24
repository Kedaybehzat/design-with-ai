# Brief: Kampüs Etkinlik Uygulaması

Üniversite öğrencilerinin kampüsteki etkinlikleri (topluluk buluşmaları, atölyeler, konserler, kariyer günleri) bulup kayıt olabildiği bir mobil uygulama.

## Ana akış

**Etkinliği bul → Detayı incele → Kayıt ol**

## Ekranlar

### 1. Etkinlik Listesi
- Yaklaşan etkinlikler kart olarak listelenir.
- Her kartta: etkinlik adı, tarih ve saat, yer, düzenleyen topluluk, kontenjan durumu.
- Kategoriye göre filtreleme (örn. Teknoloji, Kariyer, Sanat, Spor).
- Bir karta dokununca **Etkinlik Detayı** açılır.

### 2. Etkinlik Detayı
- Etkinlik adı, görsel alanı, tarih/saat, yer, düzenleyen, açıklama, konuşmacılar, kalan kontenjan.
- Ana aksiyon: **Kayıt Ol** butonu.
- Geri dönüş.

### 3. Kayıt Ekranı
- Form: ad soyad, okul e-postası, bölüm, sınıf, (opsiyonel) beslenme tercihi.
- KVKK onayı.
- Ana aksiyon: **Kaydı Tamamla**.
- Başarılı kayıttan sonra kısa bir onay durumu.

## Teknik çıktı

- Tek bir dosya: `index.html` (HTML + CSS, gerekirse az JS). Dış bağımlılık olarak sadece Google Fonts kullanılabilir.
- 3 ekran, yan yana 390 × 844 px telefon çerçeveleri içinde.
- Ekranlar birbirine bağlı olsun (karta dokununca detaya, butona dokununca kayda geçsin), yani tıklanabilir bir prototip.
- Tüm içerik Türkçe ve gerçekçi olsun (örnek etkinlikler, Sakarya Üniversitesi'ndeki yerler, gerçekçi tarihler).
