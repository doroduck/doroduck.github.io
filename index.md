---
layout: page
title: 首页
permalink: /
lang: zh
ref: home
---

<div class="hero">
	<div class="hero-head">
		<img class="avatar" src="/assets/img/avatar.svg" alt="Profile icon" />
		<div class="hero-text">
			<h1>{{ site.title }}</h1>
			<p>{{ site.description }}</p>
		</div>
	</div>
</div>

## 最新文章

<ul class="post-list">
{% assign posts = site.posts | where: "lang", "zh" %}
{% for post in posts %}
	<li>
		<span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
		<h3>
			<a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
		</h3>
		{% if site.show_excerpts %}
			<div class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</div>
		{% endif %}
	</li>
{% endfor %}
</ul>

<p class="privacy-note">提示：本站不公开真实姓名/联系方式；如需联系，可通过你选择的平台私信。</p>
