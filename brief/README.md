# Brief'ler

Grubunuzla **bir** brief seçin. Hepsi üniversite öğrencilerinin gerçek bir sorununu çözen, **tek sayfalık** bir web uygulaması.

| # | Uygulama | Sorun | Ana etkileşim |
| --- | --- | --- | --- |
| 1 | [Dönem](01-donem.md) | Ders, sınav ve ödev teslimleri birbirine giriyor. | Haftalık takvim |
| 2 | [Ortak Kasa](02-ortak-kasa.md) | Ev arkadaşları arasında kim kime ne kadar borçlu belli değil. | Hesap defteri |
| 3 | [Masa Bul](03-masa-bul.md) | Sınav haftası kütüphanede boş masa bulunmuyor. | Kat planı ve saat seçimi |
| 4 | [Staj Radarı](04-staj-radari.md) | Onlarca staj başvurusunun hangi aşamada olduğu unutuluyor. | Aşama panosu |
| 5 | [Bitirme](05-bitirme.md) | Grup projesinde kim neyi ne zaman yapacak, belirsiz. | Zaman çizelgesi |

## Hepsinde ortak

- **Tek sayfa, gerçek bir platform gibi:** sol menü (diğer bölümler görünür, tıklanması gerekmez), üst bar (arama, bildirim, kullanıcı), ana alan pencereyi doldurur.
- **Sayfadan çıkmadan çalışır:** detaylar sağdan açılan bir panelde veya modalda; ekleme ve düzenleme de öyle.
- **Gerçekçi veri:** Türkçe isimler, Sakarya Üniversitesi'ndeki yerler, gerçekçi tarih ve tutarlar. En az 15–20 kayıt.
- **React:** tur klasöründe `App.jsx` (varsayılan export `App`) ve gerekiyorsa `styles.css`. UI kütüphanesi, CSS framework'ü, ikon paketi yok; Google Fonts olur.
- **Ekran:** 1440 × 900 dizüstü; 1024 px'te de bozulmaz. Telefon çerçevesi yok.

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173/?round=1` (veya `2`, `3`).
