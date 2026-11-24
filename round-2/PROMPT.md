# Tur 2: Skill + DESIGN.md ile

Önce [DESIGN.md](../DESIGN.md)'de **Persona** ve **Ton** bölümlerini doldurun, tema ve vurgu rengini seçin. Bu adımı AI'a yaptırmayın; kararlar sizin.

## Agent kullanıyorsanız (Claude Code, Gemini CLI, Codex, Cursor, Antigravity…)

Repo klasöründe agent'ı açın ve şunu yazın:

```text
skills/ui-design/SKILL.md dosyasını oku ve adımlarını sırayla uygula.
Kararlar için DESIGN.md'yi, içerik için brief/kampus-etkinlik.md'yi kullan.
Çıktıyı round-2/App.jsx ve round-2/styles.css olarak yaz. Bitince SKILL.md'deki Verification listesine göre rapor ver.
```

## Sohbet arayüzü kullanıyorsanız (Gemini, Claude, ChatGPT…)

Şu dosyaları sohbete ekleyin (dosya olarak yükleyin ya da içeriğini yapıştırın):

1. `skills/ui-design/SKILL.md`
2. `skills/ui-design/theme.css`
3. `skills/ui-design/patterns.md`
4. `DESIGN.md`
5. `brief/kampus-etkinlik.md`

Sonra şunu yazın:

```text
Ekteki SKILL.md bir tasarım talimatı; theme.css ve patterns.md onun parçaları. Adımlarını sırayla uygula.
Kararlar için DESIGN.md'yi, içerik için brief'i kullan.
App.jsx ve styles.css olarak iki dosya ver. Bitince SKILL.md'deki Verification listesine göre rapor ver.
```

Gelen dosyaları `round-2/App.jsx` ve `round-2/styles.css` olarak kaydedin.

## Sonra

1. Tarayıcıda `http://localhost:5173/?round=2` adresini açın; temayı değiştirip ikisine de bakın.
2. Ekran görüntüsünü `round-2/screenshot.png` olarak alın.
3. Commit atın: `git add -A && git commit -m "Tur 2: skill ile"`.
4. [critique/CHECKLIST.md](../critique/CHECKLIST.md)'de **Tur 2** sütununu doldurun.
