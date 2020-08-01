import { createWidget } from "discourse/widgets/widget";
import { replaceEmoji } from "discourse/widgets/emoji";
import { h } from "virtual-dom";

export default createWidget("dc-topic-title", {
  tagName: "div.dc-topic-title",

  buildCategory(attrs) {
    const categoryName = attrs.category.name;
    const categorySlug = attrs.category.slug;
    const categoryColor = attrs.category.color;

    return h('a.dc-topic-category', {
      attributes: {
        href: `/c/${categorySlug}`
      }
    }, [
      h('span', {
        style: {
          background: `#${categoryColor}`
        }
      }),
      categoryName
    ]);
  },

  buildTopicTags(attrs) {
    const tags = attrs.tags;

    if (tags) {
      return tags.map(tag => h('a.dc-topic-tag', {
        attributes: {
          href: `/tag/${tag}`
        }
      }, tag));
    }
  },

  buildTopicInfo(attrs) {
    return [this.buildCategory(attrs), this.buildTopicTags(attrs)].filter(Boolean);
  },

  html(attrs, state) {
    return [
      h("h1.fancy-title", replaceEmoji(attrs.title)),
      h("div.dc-topic-info", this.buildTopicInfo(attrs)),
    ]
  }
});
