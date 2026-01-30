# doroduck.github.io

这是一个基于 **GitHub Pages（Jekyll）** 的静态网站仓库：不需要写代码、也不需要服务器。

如果你想用“现成模板”，先看这里的选型与限制说明：[TEMPLATE_OPTIONS.md](TEMPLATE_OPTIONS.md)

> 你可以把它理解成：
> - `index.md`：首页
> - `_posts/`：文章目录
> - `assets/`：图片/样式/脚本
> - `/archive/`：按月份归档 + 搜索
> - `/ja/`：日文版入口（可用“中｜日”切换）

## 如何上线（一次性设置）

1. 打开仓库的 **Settings → Pages**
2. **Build and deployment** 里选择：
	- Source：`Deploy from a branch`
	- Branch：`main`（或你实际用的分支）
	- Folder：`/ (root)`
3. 保存后等 1-3 分钟，会看到站点地址（通常是 `https://<用户名>.github.io/`）

## 她如何更新内容（完全不需要编程）

最常用的是：改标题简介、换头像、写文章、放图片。

### 通用编辑方法（GitHub 网页端）

1. 打开仓库 → 点开要改的文件
2. 点击右上角铅笔图标 **Edit**
3. 修改后点击 **Commit changes**
4. 等 1-3 分钟刷新网站生效

> 小技巧：如果她担心写坏，可以选择 **Create a new branch for this commit and start a pull request**（更安全，可回滚）。

---

### 1）修改网站标题/一句话简介（推荐先改这个）

文件：`_config.yml`

找到并修改：

- `title:`（网站标题）
- `description:`（首页会显示的一句话）

建议：不要写真实姓名/学校/单位/手机号等。

---

### 2）修改首页内容

文件：`index.md`

首页会显示：头像 + 标题 + 简介 + 最新文章列表。
通常不需要改代码，只需要改 `_config.yml` 里的 `title/description` 就行。

---

### 3）换头像（Profile icon）

默认头像文件：`assets/img/avatar.svg`

替换方式：

- 直接把 `assets/img/avatar.svg` 替换成新的（同名）文件

如果她想用 PNG/JPG：

1. 把图片放到 `assets/img/avatar.png`（或 `.jpg`）
2. 打开 `index.md`，把头像那行改成：
	- `src="/assets/img/avatar.png"`

---

### 4）写一篇新文章（最常用）

文章放在目录：`_posts/`

文件名格式必须是：

`YYYY-MM-DD-文章标题.md`

例如：

`2026-01-30-my-first-post.md`

文章开头需要保留这段“头信息”（不要删 `---`）：

```yaml
---
layout: post
title: "文章标题"
date: 2026-01-30 10:00:00 +0800
categories: [notes]
---
```

#### 日文文章怎么写？（最简单的做法）

1. 在 `_posts/` 里新建一个日文文件（文件名也用日期开头即可）
2. 在头信息里加上：

- `lang: ja`
- `ref: 同一篇文章的标识`（用于中日互相切换；中文/日文翻译要写同一个 ref）
- `permalink: /ja/年/月/日/slug/`（让日文文章 URL 在 `/ja/` 下）

参考仓库里的示例：

- 中文：`_posts/2026-01-30-welcome.md`
- 日文：`_posts/2026-01-30-welcome-ja.md`

下面就可以正常写正文了。

Markdown 常用写法：

- 小标题：`## 标题`
- 列表：`- 一条`
- 加粗：`**加粗**`
- 链接：`[文字](https://example.com)`

---

### 5）放图片/插图

推荐把图片放到：`assets/img/`

然后在文章里引用：

`![](/assets/img/图片文件名.jpg)`

注意：路径以 `/assets/...` 开头，大小写要完全一致。

---

### 6）按月份归档 + 搜索（标题 + 正文）

归档页地址：`/archive/`

功能：

- 按月份下拉筛选
- 搜索框支持“标题 + 正文”搜索
- 搜索结果会按相关性排序（标题命中更靠前）

相关文件（一般不需要改）：

- `archive.md`（页面）
- `search.json`（全文索引，由 Jekyll 构建生成）
- `assets/js/archive.js`（检索逻辑）

---

### 7）（可选）隐私与说明页

文件：`about.md`（页面地址 `/about/`）

这个页面默认不包含任何个人信息，只写隐私原则。
如果她不需要，可以把 `about.md` 删除（或者把内容留空也可以）。

## 常见问题

- 图片放哪？建议放到 `assets/img/`，然后在 Markdown 里用：`![](/assets/img/xxx.jpg)`
- 想绑定自定义域名？把域名写进 `CNAME` 文件（根目录一个纯文本文件）。
- 为什么改了没生效？GitHub Pages 构建有延迟，通常 1-3 分钟；也可能是缓存，强刷一下（Cmd+Shift+R）。
- 想“撤回一次修改”？去仓库的 **Commits** 找到那次提交，回滚或再提交一次修正即可。

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

