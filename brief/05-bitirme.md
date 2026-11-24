# Brief 5: Bitirme

**Sorun:** 4 kişilik bitirme projesi grubunda görevler WhatsApp'ta dağılıyor, kim neyi yapıyor belli değil, danışman toplantısından önce herkes panikliyor ve teslim tarihleri kayıyor.

**Kullanıcı:** Grubun koordinasyonunu üstlenen öğrenci; her gün ve danışman toplantısından önce açıyor.

## Tek sayfada olması gerekenler

- **Zaman çizelgesi (Gantt benzeri):** dönem boyunca kilometre taşları (öneri raporu, ara rapor, demo, final teslimi) ve bunlara bağlı görevler; bugün çizgisi.
- **Ekip yükü:** her üyenin açık görev sayısı ve bu haftaki tahmini saati; aşırı yüklenen üye görünür.
- **Bu hafta** listesi: görev, sorumlu, son tarih, durum (yapılacak / sürüyor / incelemede / bitti), gecikenler.
- **Sonraki danışman toplantısı:** tarih, gündem maddeleri, hazır olmayan maddeler.
- Bir göreve tıklayınca **sağ panelde detay**: açıklama, sorumlu, bağımlı olduğu görevler, yorumlar.
- **Görev ekle** (modal): başlık, sorumlu, kilometre taşı, son tarih, tahmini saat.

## Ana aksiyon

Bir görevin durumunu güncellemek.

## Ham prompt (Tur 1)

```text
Bitirme projesi yapan 4 kişilik bir öğrenci grubunun görevlerini ve teslim tarihlerini takip ettiği bir web uygulaması tasarla. React ile, stilleri de içinde olan tek bir App.jsx dosyası olarak ver. Dosyayı round-1/App.jsx olarak kaydet.
```
