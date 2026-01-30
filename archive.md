---
layout: page
title: 归档
permalink: /archive/
---

<div class="archive-tools">
  <input id="archiveSearch" class="archive-search" type="search" placeholder="搜索文章标题…" autocomplete="off" />
  <select id="archiveMonth" class="archive-month">
    <option value="">按月份筛选（全部）</option>
    {% assign groups = site.posts | group_by_exp: "post", "post.date | date: '%Y-%m'" %}
    {% for g in groups %}
      {% assign parts = g.name | split: '-' %}
      {% capture label %}{{ parts[0] }}年{{ parts[1] }}月{% endcapture %}
      <option value="{{ g.name }}">{{ label }}</option>
    {% endfor %}
  </select>
</div>

<div id="archiveResults" class="archive-results"></div>

{% assign grouped = site.posts | group_by_exp: "post", "post.date | date: '%Y-%m'" %}
{% for group in grouped %}
  {% assign parts = group.name | split: '-' %}
  {% capture month_label %}{{ parts[0] }}年{{ parts[1] }}月{% endcapture %}

  <h2 id="m-{{ group.name }}" class="archive-month-title">{{ month_label }}</h2>
  <ul class="archive-list">
    {% for post in group.items %}
      <li class="archive-item" data-title="{{ post.title | escape }}" data-month="{{ group.name }}" data-date="{{ post.date | date: '%Y-%m-%d' }}" data-content="{{ post.content | strip_html | strip_newlines | escape }}">
        <a class="archive-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span class="archive-date">{{ post.date | date: '%Y-%m-%d' }}</span>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<script src="/assets/js/archive.js"></script>
