---
layout: page
title: ホーム
permalink: /ja/
lang: ja
ref: home
---

<div class="hero">
  <div class="hero-head">
    <img class="avatar" src="/assets/img/avatar.svg" alt="Profile icon" />
    <div class="hero-text">
      <h1>{{ site.title }}</h1>
      <p>記録</p>
    </div>
  </div>
</div>

## 最新記事

<ul class="post-list">
{% assign posts = site.posts | where: "lang", "ja" %}
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

<p class="privacy-note">注意：本サイトでは実名などの個人情報を掲載しません。</p>
