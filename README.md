# doroduck.github.io

这是一个基于 **GitHub Pages（Jekyll）** 的静态网站仓库：不需要写代码、也不需要服务器。

## 如何上线（一次性设置）

1. 打开仓库的 **Settings → Pages**
2. **Build and deployment** 里选择：
	- Source：`Deploy from a branch`
	- Branch：`main`（或你实际用的分支）
	- Folder：`/ (root)`
3. 保存后等 1-3 分钟，会看到站点地址（通常是 `https://<用户名>.github.io/`）

## 她如何更新内容（完全不需要编程）

她只需要用 GitHub 网页端编辑 Markdown 文件：

- 修改首页：编辑 `index.md`
- 修改“关于我”：编辑 `about.md`
- 写一篇新文章：在 `_posts/` 里新增文件，命名形如：`YYYY-MM-DD-标题.md`

编辑步骤（GitHub 网页）：
1. 打开文件 → 点铅笔图标 **Edit**
2. 改完点 **Commit changes**
3. 等 1-3 分钟刷新网站就生效

## 常见问题

- 图片放哪？建议放到 `assets/img/`，然后在 Markdown 里用：`![](/assets/img/xxx.jpg)`
- 想绑定自定义域名？把域名写进 `CNAME` 文件（根目录一个纯文本文件）。

## 模板/主题怎么换？

这里的“模板”通常指 **主题（Theme）+ 一点点样式定制**。

### 方案 A（推荐，最稳）：保留博客能力，只改外观

当前使用 `minima` 主题，并且我们加了自定义样式文件：`assets/main.scss`。

你可以通过改 `assets/main.scss` 里的颜色/字体/按钮样式，快速把站点“换模板风格”，而不影响文章系统。

### 方案 B（简单但有代价）：切换 GitHub Pages 内置主题

在 `_config.yml` 里把这一行：

- `theme: minima`

改成例如：

- `theme: jekyll-theme-cayman`

注意：很多“项目页主题”不一定支持博客文章列表/`layout: post`，所以如果你主要写文章，建议用方案 A。

