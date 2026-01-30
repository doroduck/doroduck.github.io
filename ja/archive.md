---
layout: page
title: アーカイブ
permalink: /ja/archive/
lang: ja
ref: archive
---

<div class="archive-tools">
  <input id="archiveSearch" class="archive-search" type="search" placeholder="タイトル／本文を検索…" autocomplete="off" />
  <select id="archiveMonth" class="archive-month">
    <option value="">月別（すべて）</option>
    {% assign posts = site.posts | where: "lang", "ja" %}
    {% assign groups = posts | group_by_exp: "post", "post.date | date: '%Y-%m'" %}
    {% for g in groups %}
      {% assign parts = g.name | split: '-' %}
      {% capture label %}{{ parts[0] }}年{{ parts[1] }}月{% endcapture %}
      <option value="{{ g.name }}">{{ label }}</option>
    {% endfor %}
  </select>
</div>

<div id="archiveResults" class="archive-results"></div>

{% assign posts = site.posts | where: "lang", "ja" %}
{% assign grouped = posts | group_by_exp: "post", "post.date | date: '%Y-%m'" %}
{% for group in grouped %}
  {% assign parts = group.name | split: '-' %}
  {% capture month_label %}{{ parts[0] }}年{{ parts[1] }}月{% endcapture %}

  <h2 id="m-{{ group.name }}" class="archive-month-title">{{ month_label }}</h2>
  <ul class="archive-list">
    {% for post in group.items %}
      <li class="archive-item" data-title="{{ post.title | escape }}" data-url="{{ post.url | relative_url }}" data-month="{{ group.name }}" data-date="{{ post.date | date: '%Y-%m-%d' }}">
        <a class="archive-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span class="archive-date">{{ post.date | date: '%Y-%m-%d' }}</span>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<script>
  window.__SEARCH_INDEX_URL__ = "{{ '/search-ja.json' | relative_url }}";
</script>
<script src="/assets/js/archive.js"></script>
