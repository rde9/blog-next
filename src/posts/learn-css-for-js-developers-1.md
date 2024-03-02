---
title: 'CSS for JS Developers 学习笔记 (M2 Positioning - 3 Styled-Components)'
createdAt: '2023-12-27T15:55:30.780Z'
photo: 'https://img.ayame.network/learn-css-for-js-developers-1/module2-3.png'
tags: ['CSS']
summary: '模块2-3'
---

# **Module 2 Rendering Logic II**

## Absolute Positioning 绝对定位

### 定位方式

绝对定位的元素在布局时会相对于其最近的**定位**祖先元素进行定位。如果没有已定位的祖先元素，它将相对于初始包含块进行定位。
**定位**：`relative`, `absolute`, `fixed`, `sticky` 均可。只要不是 `static`
绝对定位的元素在定位时**不考虑**父元素的 **`padding`**。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled.png)

```html
<div class="block">
  <div class="relative block">
    <div class="block">
      <div class="block">
        <div class="pink-box"></div>
      </div>
    </div>
  </div>
</div>
```

```css
.block {
  padding: 16px;
  border: 2px solid silver;
}

.relative.block {
  position: relative;
  border-color: black;
}

.pink-box {
  position: absolute;
  top: 0px;
  right: 0px;
  background: deeppink;
  width: 50px;
  height: 50px;
}
```

## Containing Blocks 包含块

### 继承

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%201.png)

```html
<div class="box">
  <div class="big circle"></div>
  <div class="medium circle"></div>
  <div class="small circle"></div>
</div>
```

```css
.box {
  position: relative;
  height: 150px;
  margin: 64px;
  border: 4px solid palevioletred;
}

.circle {
  position: absolute;
  border: inherit;
}
```

## **Stacking Contexts 层叠**上下文

### 层叠元素的渲染规则：渲染两步走，先非定位，后定位

As a general rule, **positioned elements will always render on top of non-positioned ones**.
We can think of it as a two-stage process: **first**, all of the non-positioned elements are rendered (everything using **Flow, Flexbox, Grid**…). **Next**, all of the positioned elements are rendered on top (**relative, absolute, fixed, sticky**).

### z-index：只对定位元素生效，创建层叠上下文（局部）

即使 `.tooltip` 的 `z-index` 为 99999，因为 `<main>` 的 `z-index` 比 `<header>` 低，最终结果还是 `.tooltip` 在下面.

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%202.png)

```html
<header>My Cool Site</header>

<main>
  <div class="tooltip">A tooltip</div>
  <p>Some main content</p>
</main>
```

```css
header {
  position: relative;
  z-index: 2;
}

main {
  position: relative;
  /*
    Toggle this property to
    create/destroy the stacking
    context
  */
  z-index: 1;
}

.tooltip {
  position: absolute;
  z-index: 999999;
}

/* These styles are purely cosmetic */
body, header, main, .tooltip {
  ...
}

```

**注意：不指定 z-index 时，默认为**`z-index: auto;`

此 auto 值默认情况下确实是 0。然而，显式指定 `z-index: 0;` 会创建新的层叠上下文，`auto` 不会。

所以，将上面代码中 `main` 的 z-index 改为 0，没有任何改变。若删去此行，**`.tooltip`** 和 **`<header>`** 会处于同一个层叠上下文中，它们的 **`z-index`** 值直接比较，所以 **`.tooltip`** 就覆盖在 **`<header>`** 上面了。

### 调试层叠上下文：**Stacking Contexts Inspector**

[https://github.com/andreadev-it/stacking-contexts-inspector](https://github.com/andreadev-it/stacking-contexts-inspector)

[CSS Stacking Context inspector](https://chrome.google.com/webstore/detail/css-stacking-context-insp/apjeljpachdcjkgnamgppgfkmddadcki)

## Managing z-index 管理 z-index

### **isolation: 最简单无痛地创建层叠上下文**

当我们想让中间的卡片突出显示时…

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%203.png)

给中间的卡片提升一下 z-index:

```html
<style>
  .card {
    position: relative;
    z-index: 1;
  }
  .primary.card {
    z-index: 2;
  }
</style>
<section class="pricing">
  <article class="card">
    <!-- Stuff omitted -->
  </article>
  <article class="primary card">
    <!-- Stuff omitted -->
  </article>
  <article class="card">
    <!-- Stuff omitted -->
  </article>
</section>
```

不巧的是，header 的 z-index 恰好和中间卡片的相等，又高于两边的卡片，**向上滚动页面时，它将从卡片间的缝隙中穿插过去。**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%204.png)

```css
header {
  position: fixed;
  z-index: 2;
}
```

一种简单的解决方法是给这个 `pricing` wrapper 创建一个层叠上下文：

```css
.pricing {
  position: relative;
  z-index: 1;
}
```

这当然可行，但更合适的解决方法是：

```css
.pricing {
  isolation: isolate;
}
```

The `isolation` property does precisely 1 thing: creates a stacking context.

It has the same effect of flattening all of the child elements, but it does so without requiring that we also set a `z-index` on the parent. It's the lightest-touch way to create a stacking context.

## Portals 门户 (React/Vue/Angular/Svelte)

（回顾这部分建议再看看视频）

Portal 的作用是将子组件渲染到存在于父组件 DOM 层次结构之外的 DOM 节点中， **例如 `<div id="root">` 之外。** 考虑实际问题：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%205.png)

header 的登录按钮：点击后，弹出的 Login Modal 被 Main 挡住了。

Josh 建议使用 [Reach UI](https://reach.tech/) 解决这种问题。

## Fixed Positioning 固定定位

### The transform exception

In general, fixed elements will be positioned relative to the **viewport**, but there is one exception.

If a parent or grandparent uses the `transform` property, it becomes the containing block for the fixed element, essentially transforming it into an absolutely-positioned element.

For now, the thing to remember is that **transformed parents can't have fixed children**.

Also, the `will-change: transform` declaration has the same effect

例如，在下面的 codepen 中， **实心盒子会随着页面滚动而滚动，** 原因是它的祖先元素 `<section>` 被设置了`will-change: transform;`

[Fixed debugging](https://codepen.io/joshwcomeau/full/KKgBmYL)

### 实用 js 脚本：找到 fixed 不生效的罪魁祸首

```jsx
// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = '.the-fixed-child';
function findCulprits(elem) {
  if (!elem) {
    throw new Error('Could not find element with that selector');
  }
  let parent = elem.parentElement;
  while (parent) {
    const { transform, willChange } = getComputedStyle(parent);
    if (transform !== 'none' || willChange === 'transform') {
      console.warn('🚨 Found a culprit! 🚨\n', parent, {
        transform,
        willChange,
      });
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));
```

Once you find the element(s) in question, you can try removing the properties, or finding a non-transform alternative. If this isn't possible, you should consider moving the fixed element into a portal, as we discussed earlier.

## Overflow 溢出

### 默认值

默认值`visible` 如图：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%206.png)

### auto

auto 很智能，当我们预计某个容器里的内容可能发生溢出时，写 `overflow: auto` 可以理想地为其添加 `overflow-y: scroll` 或 `overflow-x: scroll` 或两者。

### hidden

截断溢出的内容。

作用：

1. 用省略号截断溢出的文本。
2. 装饰效果。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%207.png)

### 溢出陷阱：滚动容器

当我们指定either `overflow-x` or `overflow-y` 时，这个元素将成为**滚动容器**。

对于以下例子：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%208.png)

x方向上，如我们所料，右半圆被隐藏了，也没有滚动条；

y方向上，我们明明设置了 `visible` 以让下半圆正常溢出，但实际结果是，它居然像 `scroll` 一样工作。

Here's a neat bit of trivia: 当我们设置 `overflow: hidden` 时，我们实际上做的是**移除滚动条**。本质上，`overflow: hidden` 是一个没有滚动能力的 `overflow: scroll` 容器。

我们被允许为 `overflow-x` 和 `overflow-y` 设置不同的值，只是为了在需要时能够使**一个轴向隐藏**而**另一个轴向可滚动**，并不能用于实现**一个轴向上的”正常可见”溢出**。

### 水平滚动

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%209.png)

```css
.wrapper {
  overflow: auto;
  border: 3px solid;
  /* The secret ingredient: */
  white-space: nowrap;
}
```

**`white-space`** 属性用于设置如何处理元素内的[空白字符](https://developer.mozilla.org/zh-CN/docs/Glossary/Whitespace)。【初始值：**`normal`**】它可以控制单词**和其他 inline 及 inline-block 元素**的折叠方式（比如上图中的 <img>）

**注：当一些 inline 元素并排挤在 block 元素中时，自动换行是它们的默认行为。**

通过设置 `overflow: auto;` + `white-space: nowrap;`, 我们就可以实现水平滚动的元素。

### 绝对定位和固定定位的元素也有溢出吗？

有，但是相对于它们的包含块。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2010.png)

给 `.wrapper` 添加 `position: relative;` 后，粉色 box 就被限制住了。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2011.png)

如果包含块设置了 `overflow: auto` ，它将允许绝对定位的元素滚动到视野范围内。

不过，当 .box 的 position 为 `fixed` 时，情况会变成这样：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2012.png)

考虑笔记前文中的包含块：`fixed` 元素的包含块始终是 **viewport. wrapper “包不住”它。**

同理，将 wrapper 的 overflow 设为 `hidden` 也是无效的，结果和上图一样。

## **Sticky Positioning 粘性定位**

### 简单理解

在到达边界前，元素是相对定位的（不脱离文档流）；之后，它变成了固定定位。因此需要至少指定一个边界，例如`top: 0;`

由于元素是相对定位，它不会跑出父元素的边界。当父元素随着滚动在视口中消失时，它也会跟着消失。

### 很酷的滚动效果

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2013.png)

```html
<section>
  <h2>Section 1</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum
    scelerisque elit in convallis.
  </p>
</section>
<section>
  <h2>Section 2</h2>
  <p>
    In ut urna in libero venenatis facilisis ut sit amet velit. Nunc tempor arcu
    id orci mollis, eget ornare nisl pellentesque.
  </p>
</section>
<section>
  <h2>Section 3</h2>
  <p>
    Vestibulum ut pellentesque dolor. In volutpat ultrices magna a lacinia. Nunc
    at leo eros. Pellentesque imperdiet, lectus vitae commodo feugiat, neque
    nibh iaculis risus, a eleifend neque dolor a mauris.
  </p>
</section>
```

```css
section h2 {
  position: sticky;
  top: 0;
}

section {
  display: flex;
  align-items: flex-start;
  padding: 8px 0px;
}

section p {
  flex: 1;
  margin-left: 32px;
}

section:last-of-type {
  margin-bottom: 100vh;
}
```

每个 heading 都像知道我们看到哪里了一样，跟随本段文章，在进入下一段文章前消失。

给每个 section 添加一个 border 就能知晓其中端倪。

### overflow 对 sticky 的影响

When we set `overflow` to something like `hidden` or `scroll` or `auto`, we're essentially saying that the sticky element should stick in **_that_** context, not in the broader page context.

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2014.png)

```html
<main>
  <header>Sticky Header</header>
</main>
```

```css
main {
  height: 2000px;
  overflow: auto;
}
header {
  position: sticky;
  top: 0;
  text-align: center;
}
```

如上图，因为 <main> 设置了 `overflow: auto` , sticky header 现在只听 <main> 的话。只有当 <main> 能滚动时 **（而不是 viewport）** ，它才会粘住。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2015.png)

```html
<main>
  <header>Sticky Header</header>
  <p>
    Because the main tag has a max-height, the content inside that element won't
    fit. The 'overflow: auto' means that this container will have its own
    scrollbar, and the header will stick *within this context*.
  </p>
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book.
  </p>
  <p>
    It has survived not only five centuries, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum.
  </p>
</main>
```

```css
main {
  overflow: auto;
  max-height: 200px;
  border: 2px solid;
}
header {
  position: sticky;
  top: 0;
  text-align: center;
  background: white;
  padding: 8px;
}
```

现在，<main> 有了 max-height，而main中的内容又超过了这个高度。由于 `overflow: auto` 的作用，**<main> 自己**将出现滚动条。

### 实用 js 脚本：找到 sticky 不生效的罪魁祸首

```jsx
// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = '.the-fixed-child';
function findCulprits(elem) {
  if (!elem) {
    throw new Error('Could not find element with that selector');
  }
  let parent = elem.parentElement;
  while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
      console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));
```

### 紧靠视口边缘的小数像素舍入

If you intend for an element to sit right against the edge of the viewport, you might discover a thin 1px gap between the element and the edge in Chrome.

This is a rounding issue with fractional pixels. I've solved this issue by insetting the sticky element by a single pixel:

```css
header {
  position: sticky;
  top: -1px; /* -1px instead of 0px */
}
```

## Hidden Content 隐藏内容

### display:none

从 DOM 中移除，不占位，无法被点击或聚焦。

### visibility: hidden

占位，即使看不见，也能控制父元素的layout.

在三种方法中，仅此方法可实现：父元素隐藏，子元素不隐藏

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2016.png)

显示第二个按钮，第一和第三个按钮被隐藏。

### opacity: 0

占位，按钮能点击，文字能选中，表单能聚焦。

## Workshop: Character Creator

### negative margin: 清除父元素的 padding, 补上自己的 padding

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2017.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2018.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2019.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2020.png)

# Module 3 **Modern Component Architecture**

## **styled-components 101**

### `&` 选中自己

```jsx
const Button = styled.button`
  display: flex;
  &:hover {
    color: red;
  }
`;
```

output:

```css
.abc123 {
  /* Vendor prefixes for legacy browsers: */
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
/* Plucks out the `hover` pseudo-class:  */
.abc123:hover {
  color: red;
}
```

### 另一种写法：CSS prop

```jsx
const Title = ({ id, children }) => {
  return (
    <h1
      id={id}
      css={`
        font-size: 2rem;
        font-weight: bold;
      `}
    >
      {children}
    </h1>
  );
};
```

## **Installation and Setup 安装和设置**

### Babel 插件

为开发环境添加语义化类名 `Filename_componentName_hash`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2021.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2022.png)

```bash
npm install --save-dev babel-plugin-styled-components
```

如果可以直接访问打包工具(Webpack, etc.)的配置，这样安装就可以了。

如果使用 Create React App，则需要 eject，或者：

In your React application, change all imports to match the following:

```jsx
// From this:
import styled from 'styled-components';
// ...to this:
import styled from 'styled-components/macro';
```

By importing from the macro, you get the benefits of the Babel plugin without needing to eject, or fuss with the build configuration.

在我实际使用中发现，此方法似乎已经失效。这是 ChatGPT 给出的解决方法：

### Server-side Rendering

styled-components has **server-side rendering support**, which means the initial HTML/CSS is generated beforehand.

相关链接见课程

## **Global Styles 全局样式**

```jsx
// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 1.125rem;
  }
  body {
    background-color: hsl(0deg 0% 95%);
  }
`;
export default GlobalStyles;
```

`GlobalStyles` 模块被渲染时，会将内部的 CSS 注入到 `<head>` 中。

该模块存放位置并不重要，推荐在 `App.js` 中引入并放在最后。

Josh 有一套基于 Eric 版扩充的全局样式，详见视频

## **Dynamic Styles 动态样式**

### Inline styles

```jsx
const Button = ({ color, onClick, children }) => {
  return (
    <Wrapper onClick={onClick} style={{ color }}>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.button`
  color: black;
  padding: 16px 24px;
`;
```

**问题：**

- 让组件的 CSS 变得割裂
- 与媒体查询、伪类等不兼容

### **Camel-case properties**

```jsx
<a
  style={{
    // Instead of `border-radius`:
    borderRadius: '8px',
    // Instead of `text-decoration`:
    textDecoration: 'none',
    // Instead of '-webkit-font-smoothing':
    WebkitFontSmoothing: 'antialiased',
  }}
>
  Hello
</a>
```

### **Interpolation functions 插值函数（推荐）**

```jsx
const Button = ({ color, onClick, children }) => {
  return (
    <Wrapper onClick={onClick} color={color}>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.button`
  color: ${(props) => props.color}; // 'green'
  padding: 16px 24px;
`;

render(<Button color='green'>Hello World</Button>);
```

### CSS Variables CSS变量

```jsx
const Button = ({ color, onClick, children }) => {
  return (
    <Wrapper onClick={onClick} style={{ '--color': color }}>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.button`
  color: var(--color);
  padding: 16px 24px;
`;
```

### 附：简单的媒体查询例子

```jsx
const Wrapper = styled.button`
  color: black;
  @media (min-width: 1200px) {
    color: red;
  }
`;
```

## Component Libraries 组件库

> **这个模块适合您！**
>
> 你们中的一些人可能会想：“我不想构建一个庞大的开源组件库！我只是想改进我的 CSS 来构建小型 web apps. 这个模块能帮助我实现这个目标吗？”
>
> 答案是肯定的！大公司用来构建组件库的方法可以让每一个 React/Angular/Vue/Svelte app 受益。通过思考我们用这些术语编写的组件，我们可以生成更好的应用程序。
>
> 这并不意味着您需要启动一个完全独立的项目或开源任何东西。即使您的“组件库”是位于您的 side project 中的六个组件，本模块中的课程也适用。

### Design systems and design tokens

附一篇知乎文章解释

[大厂都在用! 一文带你读懂并应用 Design Token](https://zhuanlan.zhihu.com/p/499465845?utm_id=0)

### 对现成组件库的看法及本节目标

- 完全依赖现成的组件库很可能会发生这种情况：某个想实现效果在组件库里没有，并不是所有组件库都可以很方便地覆盖样式，动这些东西有时候会比使用自己手写的组件更加复杂耗时，等等。
- 话又说回来，现成的组件库在原型、MVP **(Minimum Viable Product)**、黑客松中很有帮助。尤其是你正在专注于功能的实现，而不是外观时，组件库可以大大减少工作量。
- 对于长期的企业项目、个人兴趣项目，Josh 都推荐编写自己的组件库。
- 我们并不要从零开始，[Reach UI](https://reach.tech/) 是一块绝佳的空白画布，它帮我们解决了复杂的可访问性问题，又保持了接近零的最基础样式，可以在此基础上进行开发。

## BreadCrumbs 面包屑导航

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2023.png)

### 关键字：revert

撤销对样式所做的更改。

```jsx
const CrumbLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: revert;
  }
`; // 当光标移到 CrumbLink 上时，撤销 'none'
```

### 伪类 :not 和 :first-of-type

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2024.png)

```jsx
const CrumbWrapper = styled.li`
  display: inline;
  --spacing: 12px;
  &:not(:first-of-type) {
    margin-left: var(--spacing);
	...
`; // 为除第一个<li>以外的所有<li>添加var(--spacing)的边距
```

### 伪元素 ::before (:before)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2025.png)

```jsx
const CrumbWrapper = styled.li`
  display: inline;
  --spacing: 12px;
  &:not(:first-of-type) {
    margin-left: var(--spacing);
    &::before {
      content: '/';
      opacity: 0.25;
      margin-right: var(--spacing);
    }
  }
`;
```

这里使用了层叠(nesting).

### 完整代码

- Expand
  ```jsx
  const Breadcrumbs = ({ children }) => {
    return (
      <nav aria-label='Breadcrumb'>
        <BreadcrumbList>{children}</BreadcrumbList>
      </nav>
    );
  };
  const Crumb = ({ href, isCurrentPage, children }) => {
    return (
      <CrumbWrapper>
        <CrumbLink
          href={href}
          aria-current={isCurrentPage ? 'page' : undefined}
        >
          {children}
        </CrumbLink>
      </CrumbWrapper>
    );
  };
  const BreadcrumbList = styled.ol`
    padding: 0;
    margin: 0;
    list-style-type: none;
  `;
  const CrumbWrapper = styled.li`
    display: inline;
    --spacing: 12px;
    &:not(:first-of-type) {
      margin-left: var(--spacing);
      &::before {
        content: '/';
        opacity: 0.25;
        margin-right: var(--spacing);
        /* Note: The ideal version of this solution
         * would instead use a transformed border,
         * to avoid using a real character.
         *
         * For example, something like this:
         *
         *    content: '';
         *    display: inline-block;
         *    transform: rotate(15deg);
         *    border-right: 1px solid;
         *    margin-right: var(--spacing);
         *    height: 0.8em;
         */
      }
    }
  `;
  const CrumbLink = styled.a`
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: revert;
    }
  `;
  render(
    <Breadcrumbs>
      <Crumb href='/'>Home</Crumb>
      <Crumb href='/living'>Living Room</Crumb>
      <Crumb href='/living/couch'>Couches</Crumb>
      <Crumb href='/living/couch/sectional' isCurrentPage={true}>
        Sectionals
      </Crumb>
    </Breadcrumbs>,
  );
  ```

## Button 按钮 with Variants 变体 & States 状态

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2026.png)

### **Composition** 样式组合 **| 使用 styled() 扩展已有组件的样式**

使用 `styled.button``` 方式创建的组件，可以通过 `styled()` 构造函数作为**新组件的 base**

例如：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2027.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2028.png)

通过 `styled(Base)` ，`PrimaryButton` 获得了 `Base` 的所有样式，可以在其上进行修改。

### 使用 CSS 变量实现不同状态

```jsx
const SIZES = {
  small: {
    // 注意，作为 js 变量时，React 会帮我们将整数2理解为2px
    // 但作为 CSS 变量时，需要手动在后面补足单位（字符串）
    '--borderRadius': 2 + 'px',
    '--fontSize': 18 / 16 + 'rem',
    '--padding': '8px 16px',
  },
  medium: {
    '--borderRadius': 2 + 'px',
    '--fontSize': 18 / 16 + 'rem',
    '--padding': '16px 24px',
  },
  large: {
    '--borderRadius': 4 + 'px',
    '--fontSize': 21 / 16 + 'rem',
    '--padding': '20px 36px',
  },
};

const Button = ({ variant, size, children }) => {
  const styles = SIZES[size];
  return <ButtonElem style={styles}>{children}</ButtonElem>;
};

const ButtonElem = styled.button`
  font-size: var(--fontSize);
  font-family: 'Roboto', sans-serif;
  padding: var(--padding);
  border-radius: var(--borderRadius);
  border: none;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
`;
```

### 使用样式组合实现不同变体

将上面的 `ButtonElem` 抽象为 `ButtonBase` ，在此基础上覆盖样式，根据传入的 `variant` 渲染指定组件。

`styled(ButtonBase)`

```jsx
const Button = ({ variant, size, children }) => {
  const styles = SIZES[size];
  let Component;
  if (variant === 'fill') {
    Component = FillButton;
  } else if (variant === 'outline') {
    Component = OutlineButton;
  } else {
    Component = GhostButton;
  }
  return <Component style={styles}>{children}</Component>;
};

const ButtonBase = styled.button`
  font-size: var(--fontSize);
  font-family: 'Roboto', sans-serif;
  padding: var(--padding);
  border-radius: var(--borderRadius);
  border: 2px solid transparent;

  &:focus {
    outline-color: ${COLORS.primary};
    outline-offset: 4px;
  }
`;

const FillButton = styled(ButtonBase)`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};

  &:hover {
    background-color: ${COLORS.primaryLight};
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: ${COLORS.white};
  border: 2px solid ${COLORS.primary};
  color: ${COLORS.primary};

  &:hover {
    background-color: ${COLORS.offwhite};
  }
`;

const GhostButton = styled(ButtonBase)`
  background-color: transparent;
  color: ${COLORS.gray};

  &:focus {
    outline-color: ${COLORS.transparentGray75};
    outline-offset: 4px;
  }
  &:hover {
    color: ${COLORS.black};
    background-color: ${COLORS.transparentGray15};
  }
`;
```

### 完整代码

[The starter files on CodeSandbox](https://codesandbox.io/s/jwc-button-exercise-eqm7e?file=/src/Button.js)

[The design file on Figma](https://www.figma.com/file/rDeVdaes4jtX8V11Yt5aun/Component-Library?node-id=0%3A1)

[交作业](https://codesandbox.io/p/devbox/jwc-button-exercise-forked-zhwh48)

## Dynamic Tags / Link Button 按钮链接

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2029.png)

### as 多态

根据是否有 `href` 决定渲染成什么 HTML 元素

```jsx
function Button({ href, children }) {
  return (
    <Wrapper href={href} as={href ? 'a' : 'button'}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  /* styles */
`;

render(<Button href='/'>Hello</Button>);
```

一个使用自定义组件 `Link` 的例子：

```jsx
import { Link } from 'react-router-dom';
function Button({ href, children }) {
  return (
    <Wrapper to={href} as={href ? Link : 'button'}>
      {children}
    </Wrapper>
  );
}
const Wrapper = styled.button`
  /* styles */
`;
render(<Button href='/'>Hello</Button>);
```

## **Escape Hatches 逃生舱**

### **styled() 扩展任意组件的样式**

事实上，不仅 styled-component，对于任意的第三方组件，`styled()` 也可以扩展其样式。要使其生效，组件需要能够传递 `className`. 以下是官方文档中的示例：

```jsx
// This could be react-router-dom's Link for example
// 注：react-router-dom 的 Link 本身就接受 className 属性
const Link = ({ className, children }) => (
  <a className={className}>{children}</a>
);

const StyledLink = styled(Link)`
  color: #bf4f74;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>,
);
```

为了将 **`styled()`** 生成的样式类名应用到实际的元素上，我们需要一种方式来传递这个类名。这就是 **`className`** 属性的作用。

### 对逃生舱的看法

Essentially what we've done, by forwarding `className`, is we've given ourselves an escape hatch. The React team *intentionally adds friction* because they want it to be clear that this is an escape hatch to be used in exceptional circumstances, not something you should reach for every day.

## **Single Source of Styles 单源样式**

### 样式的反向嵌套

![Untitled](https://img.ayame.network/learn-css-for-js-developers-1/Untitled%2030.png)

如图，`QuoteContent` 和 `p` 里使用了同一个 `TextLink` 组件，效果是让链接文字变成蓝色。假如我想让 quote 里的链接换一种颜色（或者应用一些别的样式），而 `TextLink` 的实现又很复杂我不想写第二遍，有没有什么好方法？

最简单的想法是给 `QuoteContent` 添加样式：

```jsx
const QuoteContent = styled.blockquote`
  ... a {
    color: black;
    text-decoration: revert;
  }
`;
```

这样确实能解决问题，但我们可以实现得更精确，从 `TextLink` 入手：

```jsx
const TextLink = styled.a`
  color: blue;
  text-decoration: none;
  ${QuoteContent} & {
    color: black;
    text-decoration: revert;
  }
`;
```

后面这部分内容只有 `TextLink` 在 `QuoteContent` 中才会生效。这样做避免了第一种方法的样式泄漏（比如，我们无法确定 `QuoteContent` 里是不是还有别的组件渲染出了 `a` 标签）

附：官方文档的一个例子，父元素在 hover 状态时变色

```jsx
const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  ${Link}:hover & {
    fill: rebeccapurple;
  }
`;
```
