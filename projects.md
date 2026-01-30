---
layout: page
title: 作品集
permalink: /projects/
---

这里展示一些精选作品/项目（按 `order` 排序）。

<div class="projects-grid">
{% assign projects = site.projects | sort: "order" %}
{% for p in projects %}
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

---

## 如何新增一个作品

在 `_projects/` 里新建一个 `.md` 文件，参考下面字段：

```yaml
---
layout: page
title: "作品标题"
summary: "一句话简介（会显示在卡片上）"
order: 10
cover: /assets/img/sample.svg
links:
  - label: 作品链接
    url: https://example.com
tags: [设计, 摄影]
---
```

然后写正文（可以放图片、过程、成果等）。
