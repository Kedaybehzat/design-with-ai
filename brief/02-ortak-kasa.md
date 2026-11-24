# Brief 2: Ortak Kasa

**Sorun:** Aynı evde kalan 4 öğrenci kira, faturalar, market ve internet masraflarını paylaşıyor. Kim neyi ödedi, kim kime ne kadar borçlu, ay sonunda kimse bilmiyor ve WhatsApp'ta tartışma çıkıyor.

**Kullanıcı:** Evin "hesapları tutan" öğrencisi; her harcamadan sonra ve ay sonunda açıyor.

## Tek sayfada olması gerekenler

- **Bakiye özeti:** her ev arkadaşının net durumu (alacaklı / borçlu, tutar) ve evin bu ayki toplam gideri.
- **Kim kime ödemeli:** en az sayıda transferle hesaplaşma önerisi (örn. "Can → Ece: 340 ₺").
- **Hesap defteri:** tarih, açıklama, kategori (kira, fatura, market, internet, diğer), ödeyen, tutar, kimler arasında bölündüğü. En az 20 kayıt.
- **Kategoriye göre aylık dağılım** (küçük bir grafik).
- Bir kayda tıklayınca **sağ panelde detay**: bölüşüm, not, fiş var mı.
- **Harcama ekle** (modal): tutar, açıklama, kategori, ödeyen, eşit ya da özel bölüşüm.
- **Ödendi olarak işaretle:** bir hesaplaşma transferini kapatmak.

## Ana aksiyon

Yeni harcama eklemek.

## Ham prompt (Tur 1)

```text
Ev arkadaşı öğrencilerin ortak giderlerini ve kimin kime borçlu olduğunu takip ettiği bir web uygulaması tasarla. React ile, stilleri de içinde olan tek bir App.jsx dosyası olarak ver. Dosyayı round-1/App.jsx olarak kaydet.
```
