---
layout: home
title: 首页
---

<div class="hero">
	<h1>你好，我是（她的名字）</h1>
	<p>一句话简介（不需要透露真实信息）：例如「插画 / 摄影 / 设计 / 作品记录」。</p>
	<div class="hero-links">
		<a class="btn btn-primary" href="/projects/">作品集</a>
		<a class="btn btn-ghost" href="/">文章</a>
	</div>
</div>

## 精选作品

<div class="projects-grid">
{% assign projects = site.projects | sort: "order" %}
{% for p in projects limit: 4 %}
	<a class="project-card" href="{{ p.url | relative_url }}">
		<div class="project-card__title">{{ p.title }}</div>
		{% if p.summary %}
			<div class="project-card__summary">{{ p.summary }}</div>
		{% endif %}
		<div class="project-card__meta">
			{% if p.tags %}
				{% for t in p.tags %}<span class="project-tag">{{ t }}</span>{% endfor %}
			{% endif %}
		</div>
	</a>
{% endfor %}
</div>

<p class="section-more"><a href="/projects/">查看全部作品 →</a></p>

## 最新文章

下面会自动显示 `_posts/` 里的文章列表。

<p class="privacy-note">提示：本站不公开真实姓名/联系方式；如需联系，可通过你选择的平台私信。</p>
