# Tur 1: Ham prompt

**Kural:** Seçtiğiniz brief'in en altındaki **Ham prompt (Tur 1)** bölümündeki prompt'u **olduğu gibi** AI'a verin. Hiçbir şey eklemeyin, hiçbir dosya göstermeyin, ikinci bir mesajla düzeltme istemeyin. Amacımız "hiç bağlam vermezsek AI ne üretiyor?" sorusunu görmek.

Örnek (Brief 2, Ortak Kasa):

```text
Ev arkadaşı öğrencilerin ortak giderlerini ve kimin kime borçlu olduğunu takip ettiği bir web uygulaması tasarla. React ile, stilleri de içinde olan tek bir App.jsx dosyası olarak ver. Dosyayı round-1/App.jsx olarak kaydet.
```

Agent kullanıyorsanız Tur 1'i repo klasörünün **dışında**, boş bir klasörde çalıştırın ve çıkan `App.jsx`'i `round-1/` içine kopyalayın. Repo içinde çalışan agent `AGENTS.md`'yi okuyup skill'e bakabilir; o zaman Tur 1 "ham" olmaz.

Sohbet arayüzü kullanıyorsanız gelen kodu kendiniz `round-1/App.jsx` dosyasına yapıştırın.

## Sonra

1. `npm run dev` çalışıyorsa tarayıcıda `http://localhost:5173/?round=1` adresini açın.
2. Ekran görüntüsünü `round-1/screenshot.png` olarak kaydedin.
3. Commit atın: `git add -A && git commit -m "Tur 1: ham prompt"`.
4. [critique/CHECKLIST.md](../critique/CHECKLIST.md) ile puanlayın ve **Tur 1** sütununu doldurun.
