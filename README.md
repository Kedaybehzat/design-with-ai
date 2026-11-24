# Design with AI

**Team1 Türkiye × GDG on Campus Sakarya · UI/UX ve AI ile Tasarım Atölyesi · 26 Kasım 2026**

Bu atölyede bir **React web uygulaması** tasarlayacağız. Herkesin elinde AI var, herkes tasarımı AI ile yapmaya çalışıyor, ama çok azı iyi sonuç alıyor. Bu repo, aynı tasarımı önce **ham bir prompt** ile, sonra **kendi kararlarınız ve bir skill** ile ürettirip aradaki farkı görmeniz için hazırlandı. Sonunda öğrendiklerinizi skill'e işleyip yanınızda götürüyorsunuz.

> **Ana fikir:** AI ortalamayı üretir. Zevki, kısıtı ve eleştiriyi sen verirsin.

## Başlamadan

1. Bu repoyu **forklayın** (sağ üstte **Fork**). Grupta tek kişinin forklaması yeterli, diğerlerini collaborator olarak ekleyin.
2. Forkunuzu bilgisayara alın:
   ```bash
   git clone https://github.com/<kullanici-adiniz>/design-with-ai.git
   cd design-with-ai
   ```
3. Bağımlılıkları kurup uygulamayı açın (Node.js 20+ gerekir):
   ```bash
   npm install
   npm run dev
   ```
   Tarayıcıda `http://localhost:5173` açılır; her tur `?round=1`, `?round=2`, `?round=3` adresinde.

   Git kurulu değilse forkunuzun sayfasında klavyeden `.` tuşuna basın; tarayıcıda bir editör açılır (github.dev). Dosyaları oradan düzenleyip commit atabilirsiniz.
4. Bir AI aracı seçin. Agent (Claude Code, Gemini CLI, Codex, Cursor, Antigravity) en iyisi; sohbet arayüzü (Gemini, Claude, ChatGPT) da olur.

## Atölye akışı

| Saat | Adım | Ne yapıyorsunuz | Dosya |
| --- | --- | --- | --- |
| 14:25 | Kurulum | Fork, araç seçimi, brief'i okuma | [brief/kampus-etkinlik.md](brief/kampus-etkinlik.md) |
| 14:35 | **Tur 1: Ham prompt** | Tek cümlelik prompt, hiç bağlam yok | [round-1/PROMPT.md](round-1/PROMPT.md) |
| 14:50 | Kararlar | Persona, ton, renk, font: hepsini **siz** seçin | [DESIGN.md](DESIGN.md) |
| 15:05 | **Tur 2: Skill ile** | AI skill'i ve kararlarınızı okuyup tasarlar | [round-2/PROMPT.md](round-2/PROMPT.md) |
| 15:25 | **Tur 3: Eleştir ve öğret** | Puanla, hedefli geri bildirim ver, öğrendiğini skill'e yaz | [critique/CHECKLIST.md](critique/CHECKLIST.md) |
| 15:45 | Galeri hazırlığı | Tur 1 ve Tur 3 ekran görüntülerini yan yana koyun | [RESULTS.md](RESULTS.md) |
| 16:00 | Sunum | Her grup 1 dakika: önce/sonra ve öğrendiği 1 kural | |

## Repo yapısı

```text
design-with-ai/
├── skills/ui-design/
│   ├── SKILL.md                ← AI'ın okuyacağı tasarım talimatı. Tur 3'te siz geliştireceksiniz.
│   ├── theme.css               ← Koyu ve açık tema token'ları (kontrastı kontrol edilmiş)
│   └── patterns.md             ← Bileşen tarifleri: tablo, filtre, kart, buton, form
├── DESIGN.md                   ← Ekibinizin kararları (persona, ton, renk, font)
├── brief/kampus-etkinlik.md    ← Ne tasarlıyoruz
├── round-1/App.jsx             ← Ham prompt çıktısı
├── round-2/App.jsx             ← Skill + DESIGN.md çıktısı
├── round-3/App.jsx             ← Eleştiri sonrası çıktı
├── src/main.jsx                ← Turları açan iskelet (dokunmayın)
├── critique/CHECKLIST.md       ← Puanlama ve geri bildirim
├── RESULTS.md                  ← Grubunuzun özeti
└── AGENTS.md                   ← Agent'lar için yönlendirme
```

## Skill nedir?

Bir **skill**, AI agent'ının bir işi nasıl yapacağını anlatan bir Markdown dosyasıdır. Her seferinde aynı uzun prompt'u yazmak yerine kararlarınızı, kurallarınızı ve kontrol listenizi bir kez yazarsınız; agent her seferinde onu okur.

`skills/ui-design/SKILL.md` şu bölümlerden oluşur:

| Bölüm | Ne işe yarar |
| --- | --- |
| **Steps** | AI'ın sırayla izleyeceği süreç: brief → token'lar → hiyerarşi → üretim → öz eleştiri → düzeltme |
| **Base style** | Temel görsel dil: gri tonlar, tek vurgu, katmanlı yüzeyler, sessiz yazı ve belirgin rakamlar |
| **Principles** | Hiyerarşi, renk, kontrast, tipografi, boşluk, etkileşim kuralları |
| **Anti-patterns** | "AI yaptı" diye bağıran şeyler: gradient, emoji ikon, her şey ortalı… |
| **Verification** | İş bitti demeden önce AI'ın geçmesi gereken kontrol listesi |
| **Team learnings** | **Sizin** kurallarınız. Tur 3'te burayı doldurursunuz. |

Claude Code, Codex, Gemini CLI ve Cursor gibi agent'lar bu repoyu açtığınızda `AGENTS.md` üzerinden skill'i bulur. Sohbet arayüzlerinde dosyayı sohbete eklemeniz yeterli.

## Atölyeden sonra

Bu skill artık sizin. Başka projelerde de kullanın:

- `skills/ui-design/` klasörünü yeni projenize kopyalayın (Claude Code için `.claude/skills/ui-design/`).
- Her projede `DESIGN.md`'yi yeniden doldurun.
- AI her hata yaptığında, düzeltmeyi bir kez söyleyin ve **Team learnings**'e yazın. Skill her projede biraz daha sizin gibi tasarlar.

Okuma önerileri:
- *Refactoring UI*, Adam Wathan & Steve Schoger
- [Laws of UX](https://lawsofux.com)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material Design 3](https://m3.material.io) ve [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

## Team1 Türkiye

Team1, Avalanche'ı büyüten builder, geliştirici, kreatif ve topluluk üyelerinden oluşan küresel bir ağ. 40 ülkede 600'den fazla üyesi var.

[x.com/AvaxTeam1](https://x.com/AvaxTeam1) · [github.com/Team1-Turkiye](https://github.com/Team1-Turkiye)

## Lisans

[MIT](LICENSE)
