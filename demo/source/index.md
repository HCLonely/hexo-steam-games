---
title: hexo-steam-games Vercel Demo
layout: false
---
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>hexo-steam-games Vercel Demo</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f8fb;
      --panel: #ffffff;
      --text: #172033;
      --muted: #59657a;
      --line: #d9dfeb;
      --accent: #0f766e;
      --accent-strong: #0b5f59;
      --code: #eef2f7;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      background: var(--bg);
      font-family: Inter, "Segoe UI", Arial, sans-serif;
      line-height: 1.6;
    }

    main {
      width: min(960px, calc(100% - 32px));
      margin: 0 auto;
      padding: 56px 0;
    }

    .hero {
      display: grid;
      gap: 28px;
      align-items: start;
      grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
    }

    h1 {
      margin: 0 0 16px;
      font-size: clamp(2rem, 4vw, 3.75rem);
      line-height: 1.05;
      letter-spacing: 0;
    }

    p {
      margin: 0;
      color: var(--muted);
      font-size: 1rem;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }

    a.button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 0 18px;
      border: 1px solid var(--accent);
      border-radius: 6px;
      color: #ffffff;
      background: var(--accent);
      font-weight: 700;
      text-decoration: none;
    }

    a.button.secondary {
      color: var(--accent-strong);
      background: transparent;
    }

    .panel {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      padding: 24px;
    }

    .checks {
      display: grid;
      gap: 12px;
      margin: 24px 0 0;
      padding: 0;
      list-style: none;
    }

    .checks li {
      padding: 12px 14px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fbfcfe;
    }

    code {
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--code);
      color: var(--text);
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.92em;
    }

    @media (max-width: 760px) {
      main {
        padding: 36px 0;
      }

      .hero {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
      }

      a.button {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <main>
    <section class="hero" aria-labelledby="page-title">
      <div>
        <h1 id="page-title">hexo-steam-games Demo</h1>
        <div class="actions" aria-label="Demo links">
          <a class="button" href="/steam/">查看 Steam 游戏库页面</a>
          <a class="button secondary" href="/2026/06/04/hexo-steam-games/">查看插件说明文章</a>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
