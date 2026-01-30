# 现成模板怎么用（GitHub Pages）

你说的“现成模板”在 GitHub Pages 里通常有两种实现方式：

## 路线 1：直接用 GitHub Pages 内置主题（最省事、零额外配置）

前提：仓库 Settings → Pages 现在是 **Deploy from a branch**（你已经设置好了）。

优点：
- 不用 GitHub Actions
- 不用安装依赖
- 最不容易构建失败

缺点：
- 模板选择少、风格偏“项目主页”

可选主题（官方白名单，最常用）：
- `jekyll-theme-cayman`（清爽、适合项目/简历页）
- `jekyll-theme-minimal`（极简）
- `jekyll-theme-slate`（深色）
- `jekyll-theme-modernist`（复古一点）
- `jekyll-theme-hacker`（黑客风）

用法：只需要改 `_config.yml` 里的这一行：

- `theme: jekyll-theme-cayman`

然后 push，等 1-3 分钟生效。

> 注意：这类主题对“博客文章列表/文章布局”的支持不一定像 `minima` 那么完整。

---

## 路线 2：用更漂亮的社区模板（选择多，但需要 GitHub Actions）

如果你想要更像“成品博客模板”的效果（例如：更丰富的首页组件、标签页、搜索、暗黑模式等），很多 Jekyll 社区主题需要额外插件；GitHub Pages 的 **Deploy from a branch**（安全模式）通常会限制这些插件，导致构建失败。

解决方案：改用 **Pages Source = GitHub Actions**，由 Actions 来构建再发布。

优点：
- 模板选择非常多（比如 Minimal Mistakes、Chirpy 等）

缺点：
- 需要仓库 Owner/管理员在 Settings → Pages 把 Source 切到 GitHub Actions
- 需要维护一个 workflow（不过基本是一次配置）

如果你想走路线 2：
- 你告诉我想用的模板名/链接（或你想要的风格：博客/学术主页/简历），我可以把 workflow + 配置一次性加好。

---

## 你现在最推荐怎么选？

- 如果她主要是“写文章 + 简单页面”，继续用 `minima` 最稳（我们已经加了自定义样式、头像区块与归档检索页）。
- 如果她更在意“视觉模板很漂亮”，再考虑路线 2（Actions）。
