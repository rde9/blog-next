---
title: 'CSS for JS Developers 学习笔记 (M6 Typography and Images)'
createdAt: '2024-01-15T15:55:30.780Z'
photo: 'https://img.ayame.network/learn-css-for-js-developers-3/module6.png'
tags: ['CSS']
summary: '模块6'
---

# Module 6 **Typography and Images**

这一模块包含很多有趣的历史故事和了解即可的内容。本笔记只记录生产实践中能用得上的知识。

## **Text Overflow 文字溢出**

### HTML entity HTML 实体

`&nbsp;` 代表非换行空格.

### **Hyphenation 连字符**

```html
<style>
  p {
    overflow-wrap: break-word; /* 无法容纳当前单词时，在任何字符后中断 */
    hyphens: auto; /* 为被拆分的单词添加连字符 */

    /* Prefix for Safari */
    -webkit-hyphens: auto;
  }
</style>

<div class="wrapper">
  <p>
    This is a narrow column of text, with a very long word:
    antidisestablishmentarianism.
  </p>
  <p>
    The same problem happens with URLs:
    https://www.somewebsite.com/articles/a1b2c3
  </p>
</div>
```

### **Ellipsis 省略号**

```html
<style>
  p {
    overflow: hidden; /* 必须设为 hidden, text-overflow 才会工作 */
    text-overflow: ellipsis;
  }
</style>

<div class="wrapper">
  <p>
    This is a narrow column of text, with a very long word:
    antidisestablishmentarianism.
  </p>
  <p>
    The same problem happens with URLs:
    https://www.somewebsite.com/articles/a1b2c3
  </p>
</div>
```

## **Print-style Layouts 印刷风格的布局**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled.png)

### **Multi-Column Layout** 多列布局

这种布局模式相当小众，但它能做到其他布局模式无法做到的事情：自动将内容分割到多个列中，并允许父容器相应增大和缩小。

```css
.wrapper {
  columns: 2;
  column-gap: 16px;
  padding: 16px;
}

p {
  margin-bottom: 16px;
}
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%201.png)

我们还可以控制某个段落不被分割到多个列中：**`break-inside: avoid;`**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%202.png)

### **Floats 浮动**

Flexbox、CSS Grid 等为侧边栏等问题提供了更优雅的解决方案，且现在已经得到广泛的浏览器支持，浮动通常被认为是来自过去时代的工具。

浮动元素像流水中的一块巨石，其他内容绕着它流过，默认没有 margin. 除了常用的`<img>`，我们可以让任何嵌入元素浮动起来。

### **Indentation 缩进**

段首缩进 `text-indent`

```css
/* Method 1 */
p::first-letter {
  margin-left: 2rem;
}

/* Method 2 */
p {
  text-indent: 2rem;
}
```

### **Justified alignment 两端对齐**

**在印刷品中**，文字通常要"对齐"——这意味着每个单词之间的间距要进行调整，以便每一行都填满可用的水平空间：`text-align: justify`

```css
p {
  text-align: justify;
  padding: 16px;
}
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%203.png)

### Drop cap 首字下沉

可以利用浮动来实现首字下沉。

```css
p:first-of-type:first-letter {
  font-size: 3em;
  float: left;
  line-height: 1em;
  margin-right: 0.2em;
}
```

## 选修：**Masonry Grid 砖石?布局**

题外话：曾经看过一个 typecho 主题 [Snapic](http://snapic.cn/)，对它的照片墙印象深刻，使用的就是此种布局方式。

详见视频演示。

## Text Styling 文本样式

### 单位 ch

`1ch` 等于当前字体大小下 `0` 字符的宽度。

设置宽度 `50ch` **并不** 意味着每行平均有 50 个字符。在不同字体中，`0` 字符可能比平均字符更细或更粗。

### text-align vs. align-items

看似都是对齐，实际上两个属性做的事有很大不同。

```css
.with-text-align {
  text-align: center;
}
.with-flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
p {
  max-width: 50ch;
  padding: 16px;
}
```

- HTML

  ```html
  <!-- Using text-align -->
  <div class="with-text-align">
    <p>
      It is advisable to drain golfing land much more thoroughly and efficiently
      than ordinary farm land, but, on the other hand, by exercising a little
      thought it can be done much more cheaply. For the purpose of golf it is
      not only unnecessary to drain as deeply as is customary for agricultural
      purposes, but it is much cheaper and more satisfactory to adopt a system
      of shallow drains.
    </p>
  </div>

  <hr />

  <!-- Using a Flex column -->
  <div class="with-flexbox">
    <p>
      It is advisable to drain golfing land much more thoroughly and efficiently
      than ordinary farm land, but, on the other hand, by exercising a little
      thought it can be done much more cheaply. For the purpose of golf it is
      not only unnecessary to drain as deeply as is customary for agricultural
      purposes, but it is much cheaper and more satisfactory to adopt a system
      of shallow drains.
    </p>
  </div>
  ```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%204.png)

- text-align: center 将所有单个字符移动到每行的中间。
- align-items 更多地是一种布局上的对齐,它将**\*段落视作一个块**进行定位，\*不会影响该块内的单个字符。

加上边框后更能清晰看出发生了什么，如上图。

## **Font Stacks 字体堆栈 (font-family)**

font-family：推荐字体列表，最后一项应指定为 like `serif`, `sans-serif`, `monospace`, or `cursive`. 这样保证了浏览器一定能选择此字体的 fallback.

```css
.title {
  font-family: 'Lato', Futura, Helvetica, Arial, sans-serif;
}
```

### **System font stack 系统字体堆栈**

近年来的一个上升趋势是使用“系统字体堆栈”。这是一组字体，默认为每个平台最好的默认选项。

```css
p {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    avenir next,
    avenir,
    segoe ui,
    helvetica neue,
    helvetica,
    Ubuntu,
    roboto,
    noto,
    arial,
    sans-serif;
}
```

结合 CSS 变量：

```css
html {
  --font-sans-serif: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe
      ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  --font-serif: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid
      Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe
      UI Symbol;
  /* Set a global default */
  font-family: var(--font-sans-serif);
}
/* Apply different fonts as needed */
p {
  font-family: var(--font-serif);
}
```

## **Web Fonts 网络字体**

### Google Fonts

### 现代工具

[Fontsource](https://fontsource.org/)

### 手动引入

在 React 中处理静态文件：

- [create-react-app](https://create-react-app.dev/docs/using-the-public-folder/)
- [Next.js](https://nextjs.org/docs/basic-features/static-file-serving)
- [Gatsby](https://www.gatsbyjs.com/docs/how-to/images-and-media/static-folder/)

## **Font Loading UX 字体加载用户体验**

讲解 HTML 加载网络字体经历的三个阶段，有空再看，待补充。

## **Font Optimization 字体优化**

包括使用谷歌为我们提供的文件大小优化的字体。直接参考教程内容，不深究。待补充。

## Variable Fonts 可变字体

待补充。

## Icons & SVG 图标

SVG 的优点：

- SVG 往往看起来更加清晰锐利。
- 更容易定位和使用。
- 更具有可访问性。
- 能设置多种颜色。
- 可以调整和创建动画。

在 React 中引入图标包，例如 `feather` ：

```jsx
import React from 'react';
import { HelpCircle } from 'react-feather';
function Something() {
  return (
    <div>
      <HelpCircle />
    </div>
  );
}
```

### **Spacing issues 间距问题**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%205.png)

```jsx
import { Home } from 'react-feather';

function Header() {
  return (
    <Button>
      <Home />
    </Button>
  );
}

const Button = styled.button`
  padding: 0;
`;

render(<Header />);
```

我们的按钮没有 padding，但图标底部间距明显不对称。

原因是，SVG 默认具有 `display: inline` 属性，inline 元素有“魔法空间”。一种解决方法：

```jsx
import { Home } from 'react-feather';

function Header() {
  return (
    <Button>
      <Home />
    </Button>
  );
}

const Button = styled.button`
  padding: 0;

  & > svg {
    display: block;
  }
`;

render(<Header />);
```

## **Images 图片**

`background-image` 属性旨在用于背景！对**具有语义意义**的图像使用 `img` 标签非常重要，因为背景图像没有替代文本(`alt`)。

开发人员经常犯的一个错误是在语义相关的图像上使用`background-image`，只因为他们需要利用相关的 CSS 属性，例如 `background-size` 和 `background-position` .

## **Fit and Position 适应和定位**

`img` 被称为“替换元素”。与其他 DOM 节点不同，浏览器用外部实体替换 `<img>` 标签：图像本身。图像与其他 DOM 节点不同，它们并不总是遵循规则：例如，`<img>` 是内联元素，内联元素通常没有 `height`，但是 `img` 可以被指定 `height`；`img` 按比例放缩，如果只给定宽或高，它会按图像原尺寸比例缩放；如果我们同时指定宽高——图像会被拉伸。

一般来说，当这么设置时，我们更希望图像被裁剪，而不是拉伸。现代 CSS 中提供了解决这种方法更好的工具：`object-fit`.

### object-fit

当一张图片被放到与其尺寸不相同的盒子里时，它只能在以下选项中三选二：

- 保持宽高比
- 保留完整的图像数据
- 填满盒子空间

**`object-fit`** 默认值： `fill`

- `fill`：保留完整的图像数据，填满盒子空间
- `contain`：保持宽高比，保留完整的图像数据
- `cover`：保持宽高比，填满盒子空间 | 我们会看到图像的正中间

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%206.png)

- `none`：图像按原始尺寸呈现

### object-position

当我们设置 `object-fit: cover` 后，浏览器将裁剪图像，以便我们看到图像的正中心，并修剪掉边缘。但在某些情况下，我们会想要使用不同的锚点。 `object-position` 用于指定如何在可用空间内平移或裁剪图像，和 **`background-position`** 用法类似。

它接受1-4个值，描述水平偏移量和垂直偏移量。默认值 `50% 50%`.

```css
/* 关键字值 */
object-position: top;
object-position: bottom;
object-position: left;
object-position: right;
object-position: center;

/* <percentage> 值 */
object-position: 25% 75%;

/* <length> 值 */
object-position: 0 0;
object-position: 1cm 2cm;
object-position: 10ch 8em;

/* 边缘偏移值 */
object-position: bottom 10px right 20px;
object-position: right 3em bottom 10px;
object-position: top 0 right 10px;
```

## **Images 在 Flexbox 中的表现**

图像标签本质上很奇怪，所以当它与某些布局模式交互时，它并不总是按我们期望的方式工作。对于 Flexbox 来说尤其如此。

如下 flexbox 里有两个图像，设置了 `flex: 1` 和 `flex: 2` . 拖动改变窗口大小，发现问题：①图片被拉伸 ②缩小到一定尺寸后，再改变窗口大小图像也不再收缩

- Tailwind play
  [https://play.tailwindcss.com/uHnpJl4kqp?file=css](https://play.tailwindcss.com/uHnpJl4kqp?file=css)

## Aspect ratio 宽高比 (aspect-ratio)

这里有更详细的解释，为什么要引入 `aspect-ratio` 这个新属性，以及保持宽高比的传统方法：

[Chromium、Safari Technology Preview 和 Firefox Nightly 支持新的宽高比 CSS 属性  |  Articles  |  web.dev](https://web.dev/articles/aspect-ratio?hl=zh-cn)

## **Responsive Images 响应式图片**

现代屏幕有各种配置和密度。新 iPhone 的硬件和软件像素之间的比例为 3 比 1。它们被称为“高 DPI”显示器。如果我们以其原始尺寸渲染图像，它在高 DPI 显示器上将会变得模糊。为了保持清晰，我们需要根据屏幕的像素比提供不同的图像。

Gatsby 或 Next 这样的元框架提供了大量开箱即用的简洁功能：[next/image](https://nextjs.org/docs/api-reference/next/image) [gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/)

- 创建高分辨率变体并自动应用它们
- 自动生成并使用下一代图像格式，例如 `.webp` 和 `.avif`，在不受支持的浏览器上优雅地回退到 jpg/png。
- 实现延迟加载，其中一些甚至支持特殊效果，例如在图像加载时将 SVG outline 嵌入到页面中。

不幸的是，为了实现这些目标，框架需要与您的构建系统集成，这就是为什么您不会发现这些功能直接构建到 React 或 Vue 中。

### srcset 和 <picture>

现代图像格式 AVIF

## **Background Images 背景图片**

`<img>` 不能做一件事：平铺图像。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%207.png)

默认情况下，背景图像将以其原始大小呈现，然后平铺在元素上。

但这有一个问题。正如我们所讨论的，大多数显示器都是“高 DPI”。如果我们以其自然尺寸渲染图像，它会看起来模糊不清，因为单个软件像素被拉伸到多个硬件像素上。

使用 `min-resolution` 媒体查询做到为不同的设备提供不同的图像，并根据像素比进行缩放。

（暂时不太关心，待补充）

### **Fit and positioning 适应和定位**

`background-size` 默认值 `auto auto` , 对标 `object-fit`

`background-position` 对标 `object-position`

```css
/* 关键字 */
background-size: cover
background-size: contain

/* 一个值：这个值指定图片的宽度，图片的高度隐式的为 auto */
background-size: 50%
background-size: 3em
background-size: 12px
background-size: auto

/* 两个值 */
/* 第一个值指定图片的宽度，第二个值指定图片的高度 */
background-size: 50% auto
background-size: 3em 25%
background-size: auto 6px
background-size: auto auto

/* 逗号分隔的多个值：设置多重背景 */
background-size: auto, auto     /* 不同于 background-size: auto auto */
background-size: 50%, 25%, 25%
background-size: 6px, auto, contain

/* 全局属性 */
background-size: inherit;
background-size: initial;
background-size: unset;
```

### background-repeat

默认情况下，背景图像将从上到下、并排平铺。在大多数情况下，这很好，但底部和右侧会因此被截断。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%208.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%209.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-3/Untitled%2010.png)

- `round` 将放大或缩小图像，以避免图像在底部或右侧被切断。保留宽高比。
- `space` 不会调整图像的大小。相反，它会在图像之间留下间隙。

### **Generative backgrounds 渐变背景**

`background-image` 除了接受图像 URL，也接受 gradient.

网站推荐：纯 CSS 背景图案，使用非常聪明的渐变生成。

[CSS Background Patterns by MagicPattern](https://www.magicpattern.design/tools/css-backgrounds)

## **Workshop: Unsprinkle**

待完成
