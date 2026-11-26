# Eleştiri Listesi

Her maddeyi **0, 1 veya 2** ile puanlayın: 0 = yok/kötü, 1 = kısmen, 2 = iyi. En yüksek puan 20'dir.

AI'ın kendi raporuna güvenmeyin; ekranlara **siz** bakın.

| # | Madde | Tur 1 | Tur 2 | Tur 3 |
| --- | --- | --- | --- | --- |
| 1 | **Hiyerarşi:** Her ekranda gözün ilk gittiği tek bir şey var. | 0 | 1 | 2 |
| 2 | **Ana aksiyon:** Her ekranda ne yapmam gerektiği 2 saniyede belli. | 1 | 1 | 1 |
| 3 | **Kontrast:** Metinler **iki temada da** rahat okunuyor (4.5:1, [kontrol et](https://webaim.org/resources/contrastchecker/)). | 0 | 2 | 2 |
| 4 | **Renk:** Gri tonlar taşıyor; vurgu rengi sadece seçili / güncel olanda. | 0 | 2 | 2 |
| 5 | **Tipografi:** Tek aile, en fazla 5 boyut, rakamlar sütunda hizalı. | 1 | 1 | 1 |
| 6 | **Boşluk:** Ait olan şeyler yakın, gruplar arası nefes alıyor. | 1 | 1 | 2 |
| 7 | **Tıklama ve durumlar:** Butonlar rahat tıklanır (ana buton ≥ 44px); hover, odak ve boş/hata durumları var. | 1 | 2 | 2 |
| 8 | **Form:** Alanların görünür etiketi var, hata durumu düşünülmüş. | 1 | 2 | 2 |
| 9 | **Özgünlük:** "AI yaptı" belli değil (gradient, emoji ikon, her şey ortalı vb. yok). | 0 | 2 | 2 |
| 10 | **Persona:** Bu tasarım DESIGN.md'deki kişiye gerçekten uygun. | 0 | 2 | 2 |
| | **Toplam (20)** | **5** | **16** | **18** |

## Tur 3: Hedefli geri bildirim

Tur 2'de en düşük puan alan 3 madde için AI'a **somut** geri bildirim verin.

| ❌ Belirsiz | ✅ Hedefli |
| --- | --- |
| "Daha güzel yap." | "Listede tarih kaybolmuş; tarihi ilk sütuna al, değeri 15px medium, gün adını soluk yaz." |
| "Daha modern olsun." | "Gölgeleri kaldır; derinliği panel → inset katmanı ve 1px çizgiyle ver." |
| "Buton kötü." | "Kayıt butonu açık temada vurgu renginde ve 3.1:1; --btn rengine al, 44px yap, formun sağ altına koy." |

Yazdığınız geri bildirimler:

1. **Renk:** Vurgu amber yerine bir tık koyu hardal `#E1AD01` olsun. Açık temada beyaz zeminde 2.0:1 kaldığı için yazı olarak değil dolgu olarak kullan, üstüne koyu yazı koy (seçili saat, "Senin" masası, "Vize haftası" etiketi); ince işaretler ve başlık vurgusu aynı tonun koyusuyla.
2. **Boşluk / hiyerarşi:** "Kat", "Saat", "İstek" etiketlerini kaldır; kat düğmeleri ve istekleri tek satıra al, saatler altında kalsın. Kontroller kendini zaten anlatıyor, etiket sütunu sadece kalabalık yapıyor.
3. **Hiyerarşi:** Üç büyük stat kutucuğunu başlığın altında tek bir özet satırına indir ve dolu masalardaki insan ikonunu kaldır (dolu = dolgulu kare). Kat planı ilk bakışta, kaydırmadan görünsün.

**Puanlama notları (Tur 3'te kalan eksikler):**
- *Ana aksiyon (1):* Plandan masa seçince sağ panel kendiliğinden açılmıyor; "Rezerve et" düğmesi kapalı sekmenin arkasında kalıyor. Masa seçilince panel "Masa seç" sekmesinde açılmalı.
- *Tipografi (1):* Ekip kararıyla iki aile var (serif + grotesk); checklist tek aile istiyor.

## Tur 3: Skill'e işleyin

Bu turda öğrendiğiniz en az **2 kuralı** `skills/ui-design/SKILL.md` dosyasının en altındaki **Team learnings** bölümüne yazın (Kural / Neden / Örnek). Sonra AI'a skill'i yeniden okutup `round-3/index.html`'i üretin.

Böylece bir dahaki sefere aynı hatayı düzeltmenize gerek kalmaz: skill artık sizin zevkinizi biliyor.
