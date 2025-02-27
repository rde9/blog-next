---
title: '第三次博客重构记录'
createdAt: '2024-03-02T00:00:00.000Z'
updatedAt: '2025-02-27T00:00:00.000Z'
photo: 'https://img.ayame.network/blog-redesign/banner.jpg'
tags: ['life', 'BlogOps', 'WIP']
summary: '一次处处踩坑的开发经历'
---

# 前言

## Hexo 时代

2018年，受到洛谷平台各路神犇的精美博客的吸引，还沉浸于 OI 世界的我第一次接触到了 Hexo，开始了我的独立博客之旅。作为 OIer 们之间极受欢迎的静态网站生成器，Hexo 很好地满足了我对独立博客的需求——只要简单配置，就可以开始写作，即使我对前端一无所知；如果想折腾，也只是在选定的主题文件上进行一些简单的修改，无需深入考虑网站的整体架构和性能。这个博客陪伴了我的整个高中生活。

![hexo-theme-sakura //「并于我」是我们OI老师的博客的经典笔误](https://img.ayame.network/blog-redesign/2018.png)

## Nobelium 时代

随着时间推移，我意识到 Hexo 并不是部署静态网站的唯一选择，诸如 Hugo, Jekyll 等其他新兴工具凭借各自独特的优势，在静态博客市场也占有不小的份额。另外，Hexo 的功能较为单一，许多定制功能依赖于主题，我逐渐产生了更换博客的想法。

2020年底，我偶然读到一篇文章：

https://sspai.com/post/63028

作者的介绍让我对 Vercel 这家公司产生了浓厚兴趣。自此我的目光不再局限于国内的阿里云、腾讯云等，逐渐开始关注国外的云服务商（现在来看是个正确的选择🙃）。随后，另一篇文章提到的基于 Notion 的博客项目 [Nobelium](https://github.com/craigary/nobelium) 则彻底点燃了我迁移博客的念头，正式开始使用 Vercel:

https://sspai.com/post/66641

以 Notion 作为 CMS 确实是一个非常有趣的想法，它的富文本编辑器也比手写 Markdown 舒服很多。Nobelium 在被访问时自动抓取 Notion 文章的做法也省去了手动 `hexo g && hexo d` 的麻烦。我的 Nobelium 博客 ~~还在运行~~ 已归档，存放着2022年之后的文章。

https://blog-archive.kaai.dev/

## Next.js 时代

2023年后，Nobelium 官方提供的博客模板不见了，开发者似乎已不再积极维护。

https://github.com/craigary/nobelium/issues/275

Notion 也存在一些局限性。比如它虽然支持类 Markdown 语法，但实际导出 md 文件时会出现一些排版问题（这也为我迁移 notion 中的文章到这里埋下了不少暗坑）。因此，我又开始寻求再次翻新我的博客。和过去不一样的是，我决定放弃博客模板，用学到的基础前端知识从零开始打造博客。

由于工程经验不足，博客从构思到上线可谓艰辛。最终我使用 [Next.js](https://nextjs.org/) 完成了任务。这篇文章记录了开发过程中遇到的一些问题和解决方案。这个博客的实现参考了许多优秀的博客网站和开源项目，再次感谢他们的分享和开源精神。

# 解决方案

## 框架选择

实不相瞒，由于我完全不了解 Vue，却又艳羡 Vite 生态中 UnoCSS 的便利，一开始我尝试了一个名为 Vike (原名 vite-plugin-ssr) 的...（它应该归类为什么？）Vike 的文档写得可以说是生动有趣，我第一次如此认真地阅读一个开源项目的文档，但是我对它的理解还是不够深入，再加上此项目仍在快速迭代，最终我放弃了 Vike, 转而使用 Next.js 和 Tailwind CSS 的传统组合。

https://vike.dev/

## 文章格式：Markdown vs MDX

在 Markdown 中插入 React 组件确实非常酷，但是经过考虑，我并不会经常在文章内部插入动态内容，决定还是使用传统的 Markdown.

## 文章存储：Contentlayer

**注意：Contentlayer 已不再维护，对 Next.js 的支持停留在 13 版本(`peer next@"^12 || ^13"`)，在 14 版本中需要额外步骤才能安装，不推荐使用。**

https://github.com/contentlayerdev/contentlayer/issues/429#issuecomment-1731298319

Contentlayer 一大优点是 markdown 也可 HMR, 再也不用开个 markdown preview 窗口了。参考下面的文章进行配置：

https://blog.stin.ink/articles/introduce-contentlayer

## 文章渲染与代码高亮：remark+shiki

[Shiki](https://shiki.style) 是一款美观而强大的语法高亮库，使用与 VS Code 的语法高亮引擎，相比 Highlight.js, Prism 等传统高亮器，Shiki 的代码高亮效果色彩更加丰富、更加美观——等等，你说它必须异步加载？这意味着我没法用 react-markdown 这种简单的 Markdown 渲染组件了！（仅支持同步的 remark 插件）

https://github.com/shikijs/shiki/issues/540

https://github.com/remarkjs/react-markdown/issues/680

接下来是一些 **really awful parts.** 我不得不利用 remark 自己堆叠一个 Markdown 渲染器。这篇文章详细解释了自定义 markdown 渲染器的过程：

https://blog.stin.ink/articles/replace-react-markdown-with-remark

基本思路是，手动处理 remark 产生的 [mdast](https://github.com/syntax-tree/mdast) (不需要进行下一步转换，即不需要使用 rehype 生成 html)：将 mdast 中所有可能的节点类型都映射为自定义的 React 组件，再交给 React 渲染。这样做可以实现高度的定制化，但是也意味着需要自己处理所有的 Markdown 语法，包括标题、列表、表格等等。这个过程非常繁琐，好在本文给了我很大的帮助。我的代码基于这篇文章的代码进行了一些小改进：

> update 2025.02.26

- 正确处理图像节点（不应被包裹在 `p` 标签中）
- 代码块添加 `aria-label` 指示语言
- 处理同一段落内的换行，这里参考了 [作业部落 Cmd Markdown 编辑器](https://zybuluo.com/mdeditor) 的实现，即将换行符 `\n` 替换为 `<br />` 标签

> update 2025.02.27

- RichLinkCard metadata `og:image` fallback(验证图片是否可访问)，并在小尺寸设备上隐藏图片预览

Shiki 的高亮过程是异步的，因此 Markdown 渲染组件应该是一个 Server Component. 关于服务端渲染的问题我还不是特别清楚，所以这里略过。请参考 `src/plugins/remark-shiki.ts` 和 `src/components/Markdown.tsx`.

## 数学公式渲染：KaTeX

> update 2025.02.26

[$$\KaTeX$$](https://katex.org/) 是一个快速的数学公式渲染库，可以在浏览器中高效地渲染复杂数学表达式，相比 MathJax 更加轻量。

有了前文的铺垫，渲染数学公式其实很简单，只需引入 `katex` 和 `remark-math` 这两个库，再按照上一段中的思路配置 remark 插件即可。

## 图床：BackBlaze

在 Hexo 时代，我的博客图片托管在 sm.ms 上，但是彼时的 smms 还没有登录、管理界面，上传的图片也没有分类，一旦丢失图片管理链接就再也找不到那张图片。现在的 smms 功能完善了很多，但中国大陆网络对其托管的图片访问速度约等于零，体验极差。

![2018年的 sm.ms 图床](https://img.ayame.network/blog-redesign/smms2018.png)

几经搜索，[BackBlaze B2](https://www.backblaze.com/) 成为了我眼中的合适选择，它是一个兼容 S3 的对象存储服务，有免费的存储空间和流量，中国大陆访问速度也还不错。配置过程参考了下面的文章：

https://leonis.cc/sui-sui-nian/2023-11-17-deploy-backblaze-image-hosting.html

我使用 PicList 管理图片。

https://github.com/Kuingsmile/PicList

## RSS [WIP]

下面是一些想实现但暂时还没有实现的功能。

## 站内搜索 [WIP]

...

## 评论系统 [WIP]

...

## SEO [WIP]

...

## 访问量统计 [WIP]

...

# 参考与致谢

https://ouuan.moe/

https://blog.skk.moe/

https://next-blog.ichr.me/

https://sooniter.site/

https://2heng.xin/

https://blog.stin.ink/

https://www.techbroprime.com/
