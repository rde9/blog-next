---
title: 'CSS for JS Developers 学习笔记 (M4 Flexbox - 5 Responsive)'
createdAt: '2024-01-08T15:55:30.780Z'
photo: 'https://img.ayame.network/learn-css-for-js-developers-2/module4-5.png'
tags: ['CSS']
summary: '模块4-5'
---

# **Module 4 Flexbox**

## **Directions and alignment 方向和对齐**

### 理解基础概念

**primary axis / main axis / 主轴**：沿 flex-direction 设置的方向。
**cross axis / 交叉轴**：与 flex-direction 方向垂直。

**justify-content**: 控制元素在主轴上的位置分配。默认值 `flex-start`

**align-items**: 控制元素在交叉轴上的位置分配。默认值 `stretch`

\*如果不生效，考虑父元素有没有足够的空间
html, body {
height: 100%
}

\*注：其实默认值均为 `normal` ，在 Flexbox 中 `normal` 的实际行为等同于上述两者。

## **Alignment Tricks 对齐技巧**

### **Baseline alignment 基线对齐**

`align-items: baseline`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%201.png)

### **Centered AND baseline?**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%202.png)

- 方法1：`line-height: 盒子高度`，缺点是不能放多行文字
- 方法2：嵌套 flexbox，外层 `flex-direction: column; justify-content: center` 负责 center，内层 `align-items: baseline` 负责 baseline

### align-self 单独指定某个元素的（交叉轴）对齐方式

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%203.png)

```html
<style>
  section {
    display: flex;
    flex-direction: column;
    /* Set all children to be center-aligned */
    align-items: center;
  }

  a:first-of-type {
    /* Override that default alignment */
    align-self: flex-start;
  }
</style>

<section>
  <a href="">← Go back</a>
  <a href="">View account</a>
  <a href="">Make a transfer</a>
  <a href="">Request a loan</a>
</section>
```

**没有 `justify-self`. 后面的章节会介绍其他管理元素在主轴上对齐方式的方法。**

### 练习：iMessage 聊天对话框

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%204.png)

- 展开代码

  ```html
  <style>
    ol {
      display: flex;
      flex-direction: column;
    }

    .message.sent {
      align-self: flex-end;
    }

    .message.received {
      align-self: flex-start;
    }
  </style>

  <ol>
    <li class="message sent">Can you get me a big salad?</li>
    <li class="message received">
      What big salad? I'm going to the coffee shop.
    </li>
    <li class="message sent">They have big salads.</li>
    <li class="message received">I've never seen a big salad.</li>
    <li class="message sent">They have a big salad.</li>
    <li class="message received">Is that what I ask for?</li>
    <li class="message received">The <em>BIG</em> salad?</li>
  </ol>
  ```

  ```css
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ol {
    min-height: 100%;
    list-style-type: none;
  }
  li {
    list-style: none;
  }

  .message {
    display: block;
    width: fit-content;
    padding: 16px;
    margin: 8px;
    max-width: 70%;
    border-radius: 6px;
  }

  .message.sent {
    background-color: blue;
    color: white;
  }

  .message.received {
    background-color: rgb(230, 230, 230);
    color: black;
  }
  ```

## **Growing and Shrinking 增长和收缩**

### 要点：flex-grow/shrink/basis

- 处理 Flexbox 时有两个重要的尺寸：**\*最小内容尺寸**minimum content size\*和**\*假设尺寸**hypothetical size\*。
- **最小内容尺寸**是项目在内容不溢出的情况下可以获得的最小尺寸(`min-content`)。
- 在 Flex 行中设置的 `width` 和 Flex 列 中设置的 `height` 是**_假设尺寸_**。不能保证真实尺寸，而是一个建议数值。
- `flex-basis` 是上面两者的简写，它在 flex 行中和 `width` 等效，在 flex 列中和 `height` 等效。**【会覆盖对应的 width / height 值】**
- `flex-grow` 消耗容器中的任何多余空间，只在**有多余空间时**生效。
- `flex-shrink` 决定在容器空间不足时谁先开始收缩，只在容器**没有多余空间**且**大于所有内容的`min-content`之和时**生效。即，**如果容器里每个子元素都小于它们的`min-content`，`flex-shrink`也不生效。**

### Ratio 增长/收缩的比率

`flex-grow` 初始值为 `0`，`flex-shrink` 初始值为 `1`.

`flex-grow` 和 `flex-shrink` 接受一个数字，它的含义是可用空间的比率。

例如：

```html
<style>
  .row {
    display: flex;
  }
  nav,
  aside {
    flex-grow: 1;
  }
  main {
    flex-grow: 3;
  }
</style>
<div class="row">
  <nav></nav>
  <main></main>
  <aside></aside>
</div>
```

我们让<main>得到三份空间，而<nav>和<aside>各得一份。要得到准确的百分数，将这些数字加起来。

- 另一个例子
  我们给<main>一个指定的宽度，则<nav>和<aside>自动分配两侧的空余空间。
  ![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%205.png)
  ```html
  <style>
    .row {
      display: flex;
    }
    nav {
      flex-grow: 1;
    }
    aside {
      flex-grow: 2;
    }
    main {
      flex-basis: 200px;
    }
  </style>
  <div class="row">
    <nav></nav>
    <main></main>
    <aside></aside>
  </div>
  ```

同理，设置了 `flex-shrink: 3` 的元素在收缩时会比未设置 **`flex-shrink`** 的元素（默认值1）快三倍.

## Flex Shorthand 简写

**`flex: grow shrink basis;`**

### `flex: 1` 到底是什么

看上去它只设置了 `flex-grow: 1` . 但考虑这个例子：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%206.png)

右边区域里有大段的文字，如何让两个区域各占容器宽度的一半？如果给两者同时设置 `flex-grow: 1` ，并没有任何效果。

正确的做法是 **`flex: 1`. 实际上，flex: 1 在设置 grow 为 1 的同时也将 basis 设成了 0.**

回忆前面的内容：**`flex-basis`** 设置的是**假想值，是一个“建议”。若两个区域的宽度均为 0，容器内的全部空间都是多余空间，此时 `flex-grow` 生效，使它们各占一半空间。**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%207.png)

### 图片解释

`flex-basis` 的默认值是 `auto`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%208.png)

我们有三个盒子：**short, long, short 图二中没有颜色标记的部分是它们的真实宽度。容器很宽，超过了它们真实宽度的总和，因此有了一些多余空间。**

- **`flex-basis: auto` 将我们正常理解的“多余空间”，根据 flex-grow 的比例分配给三个盒子。**
- **`flex-basis: 0` 将所有容器空间视为“多余空间”，根据 flex-grow 的比例分配给三个盒子。**

## Constraints 添加限制

在已有比例之外设置硬限制：`min-width`/`max-width` & `min-height`/`max-height`

- Tailwind Play
  [https://play.tailwindcss.com/myBYIycHW3?file=css](https://play.tailwindcss.com/myBYIycHW3?file=css)

### 练习：Facebook 布局（三栏变两栏）

待完成

## **Shorthand Gotchas 简写陷阱**

如前文所说，**`flex: 1`** 同时指定了 `flex-basis` 的值，这会导致再设置对应的 `width` 和 `height` 失效。

```css
.item {
  flex: 1;
  width: 200px; /* 什么都没发生 */
}
```

所以，建议的做法是使用 **`flex`** 简写时，记得使用 **`flex-basis`** 来指定宽度或高度。

## **Wrapping 折行**

### `flex-wrap` 的作用

`flex-wrap: wrap;`

避免出现这样的情况：详见视频演示

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%209.png)

### `align-content` vs. `align-items`

详见视频演示

当我们应用 `flex-wrap` 时，flexbox 内将可能出现多个行，同一列上有多个元素。

- `align-items: center;` `align-content: flex-start;`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2010.png)

- `align-items: center;` `align-content: center;`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2011.png)

## Groups and Gaps 分组和间隔

如何让两个按钮到右边去？如何让两个按钮之间有 8px 的间距？

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2012.png)

```jsx
function Header() {
  return (
    <Wrapper>
      <Logo>My Thing</Logo>
      <AuthButton>Log in</AuthButton>
      <AuthButton>Sign up</AuthButton>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  gap: 8px; /* gap: 在元素间添加间隔，不含首尾 */
`;

const Logo = styled.a`
  font-size: 1.5rem;
  margin-right: auto; /* 贪婪的 auto */
`;

const AuthButton = styled.button``;

render(<Header />);
```

替代方案：**`<Spacer>`**

```jsx
function Header() {
  return (
    <Wrapper>
      <Logo>My Thing</Logo>
      <AuthButton>Log in</AuthButton>
      <Spacer size={8} />
      <AuthButton>Sign up</AuthButton>
    </Wrapper>
  );
}

const Spacer = styled.div`
  min-width: ${(p) => p.size}px;
`;
```

### 练习：Photo Viewer

待完成

## Ordering 次序

### 翻转 `flex-direction` 的副作用

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2013.png)

将 `flex-direction` 设为 `reverse` 后，有一个令人惊讶的副作用：事物看起来是右对齐的，而不是左对齐。这是因为我们不仅改变了元素的顺序，我们还改变了**轴**的方向。从右边开始，到左边结束（在**LTR**语言如英语环境中）。

如果我们只想改变子元素的顺序而不改变对齐方式，可以设置 **`justify-content`**:

```css
.row {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```

### 其他方法（不涉及）

- **`order`**
- **`flex-wrap: wrap-reverse`**

In a world **without CSS Grid**, these methods would be worth exploring. Honestly, though, CSS Grid is a better tool for the job when we have complex ordering requirements. For that reason, we won't be looking at **`order`** or **`flex-wrap: wrap-reverse`** in this course.

### 练习：目录 TOC

待完成

## **Flexbox Interactions 与其他元素和排版方式的交互**

### **Positioned flex children 定位的 flex 子元素？**

```html
<style>
  .row {
    display: flex;
  }
  .help-btn {
    flex: 1;
    position: fixed;
    right: 0;
    bottom: 0;
  }
</style>
<section class="row">
  <main>
    <!-- Stuff here -->
  </main>
  <div class="help-btn"></div>
</section>
```

我们把 **help-btn** 放到了 flex 容器里，给它一个 **`flex: 1`**，同时又指定了 **`position: fixed`**，那么它最终出现在哪里？

回想 Module 2 里的”两步走“渲染过程，**定位布局总是胜出（后渲染）**。一般来说，元素不能同时参与多种布局模式。要么使用 Flexbox，要么使用定位布局。这是一件非常好的事情，如果不是这样，CSS 将会变得更加复杂！

> **\*这里有一个例外：相对定位**
>
> 当给某个东西相对定位时，你是在指示它根据其**正常位置**移动。该**正常位置**从**它的布局模式“继承”**。
>
> 如果你给一个 Flex 子元素相对定位，技术上来说，该元素确实会以两种不同的布局模式呈现，但它们是兼容的；元素首先布局在 Flex 容器内，然后通过定位布局使用上/左/右/下进行转置。
>
> 同样，粘性定位也可以在 flexbox 中工作，尽管那里有一些“陷阱”。我们将在下一课中看到它！

### Margin collapse 边距折叠

快速回忆：两个 block 元素相邻或嵌套时，他们的边距会折叠，或者说被”吸收“。

**边距折叠是 flow 布局独有的现象，在 flexbox 中，它不会发生。**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2014.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2015.png)

把 display 改为 block：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2016.png)

### **z-index**

Positioned, Flexbox 和 Grid 都实现了对 z-index 的支持， 而 Flow 布局没有。所以当我们在 Flow 布局里使用 z-index 时需要加 **`position: relative`**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2017.png)

```html
<style>
  .first {
    z-index: 2;
  }
  .second {
    z-index: 1;
  }
  .wrapper {
    display: flex;
  }
</style>
<section class="wrapper">
  <div class="first"></div>
  <div class="second"></div>
</section>
```

### 练习：混合布局

待完成

## 其他技巧

### **Sticky sidebar Flexbox 中的粘性定位**

在 flexbox 中是可以做到粘性定位的。但是有一个陷阱：回顾本模块开头，**`align-items`** 的默认值为 stretch，这意味着默认情况下，sidebar 里的内容会占据其 100% 的高度，此时自然无法做到粘性（可以通过添加 border 观测到）。解决方法是设置 sidebar 的 **`align-items: flex-start`**。当然，影响更小的做法是给里面的内容如 `<nav>` 设置 **`align-self: flex-start`**.

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2018.png)

## Workshop

待完成

# Module 5 **Responsive and Behavioural CSS 响应式 CSS**

## **Media Queries 媒体查询**

### styled-components 中的媒体查询

```jsx
// All Wrapper styles
const Wrapper = styled.div`
  padding: 8px;
  border: 2px solid;
  @media (min-width: 550px) {
    padding: 16px;
    border: 3px solid;
  }
`;
// All Button styles
const Button = styled.button`
  font-size: 1rem;
  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;
// All Title styles
const Title = styled.h2`
  font-size: 2rem;
  @media (min-width: 550px) {
    font-size: 2.5rem;
  }
  @media (min-width: 1100px) {
    font-size: 3rem;
  }
`;
```

对于 styled-components，元素的所有声明都位于同一位置，这种模式可以更轻松地推断哪些样式适用于哪些元素。另外，像 Sass 这样的预处理器也支持嵌套媒体查询。

### **Mobile-first vs desktop-first 移动优先与桌面优先**

```css
.signup-button {
  color: deeppink;
  font-size: 1rem;
}
@media (max-width: 400px) {
  .signup-button {
    font-size: 2rem;
  }
}
```

```css
.signup-button {
  color: deeppink;
  font-size: 2rem;
}
@media (min-width: 401px) {
  .signup-button {
    font-size: 1rem;
  }
}
```

第一种写法称为”桌面优先“，第二种称为”移动优先“。虽然最终结果相同，但两者的考量不同。

> **Which should I use?…**
> Another factor to consider: are you *designing* the project, in addition to implementing it? If so, it can be helpful to think in mobile-first terms, because **it's easier to add than to take away**. If you start from a desktop perspective, you'll need to find a way to shrink everything for mobile, which can be really tricky. Better to start from mobile, and work your way up.
>
> Ultimately, though, the most important thing is to **be consistent with the approach.** If you decide to build mobile-first, you should almost always use `min-width` media queries. It can be very confusing if you mix `min-width` and `max-width` media queries.

> **我该用哪一种？…**
> 另一个需要考虑的因素：除了实施项目之外，您还在 _设计项目吗？_ 如果是这样，从移动优先的角度思考会很有帮助，因为**添加比删除更容易**。如果您从桌面角度开始，则需要找到一种方法来缩小移动设备的所有内容，这可能非常棘手。最好从移动设备开始，然后逐步提升。
>
> 但最终，最重要的是 **与方法保持一致。** 如果您决定构建移动优先，那么您几乎应该始终使用 `min-width` 媒体查询。如果混合使用 `min-width` 和 `max-width` 媒体查询，可能会非常混乱。

### 练习：**Mobile modal & Bonus: Building accessible modals**

第一个做了，第二个可访问性问题有空再看。 \*待完成

## **Breakpoints 断点**

### 概念与分类

断点是一个特定的视口宽度，可让我们将所有设备分割成一小组可能的体验。例如，我们可以在 500px 处设置断点。任何低于 500px 的设备都将放入同一个存储桶中，并且可以单独设置样式。这确保了一致的体验；使用 375 像素宽手机的用户将与使用 414 像素宽手机的用户共享相同的布局。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2019.png)

### **Managing breakpoints 管理断点**

CSS 没有任何内置的方法来管理断点。不过好消息是，几乎每个 CSS 预处理器和框架都有针对此问题的解决方案。

以下是 styled-components 的管理方法：

```jsx
// constants.js
// For this example, I'm going mobile-first.
const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};
const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin}px)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin}px)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin}px)`,
};

// how to use
import { QUERIES } from '../../constants';
const Wrapper = styled.div`
  padding: 16px;
  @media ${QUERIES.tabletAndUp} {
    padding: 32px;
  }
`;
```

### **ⓘ 特定于 styled-component 的断点管理方法【原文照搬】**

styled-components 有一个“主题系统 theming system”。这使我们能够访问主题变量，例如颜色和断点，而无需导入常量。

我们没有关注其内置主题系统有几个原因：

- 它对于样式组件来说太具体了。
- 要理解它是如何工作的，您需要熟悉 React context，这是一个高级 API。
- 好处相对较小。

如果您是 React 开发人员并计划使用样式化组件，那么本文将为您提供更多信息。不过，否则我建议跳过本节，并如上所示插入查询。

首先，在 App 外嵌套 **`<ThemeProvider>`**

```jsx
// App.jsx
import { ThemeProvider } from 'styled-components';
import { QUERIES } from '../../constants';
function App() {
  return (
    <ThemeProvider theme={{ queries: QUERIES }}>
      {/* Your entire app here! */}
    </ThemeProvider>
  );
}
```

这会让 **`QUERIES`** 对象能被 app 内所有的 styled-components 所用。使用如下方法：

```jsx
const Wrapper = styled.div`
  padding: 16px;
  @media ${(props) => props.theme.queries.tabletAndUp} {
    padding: 32px;
  }
`;
```

这种方法的好处是您不再需要对每个使用媒体查询的文件引入 **`QUERIES`** 对象。正如我所说，这是一个相对较小的好处，所以如果您不适应这种方法，请不要觉得*必须采用这种方法。*

### 使用 rems 作为断点单位

可选。

```jsx
// constants.js
const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};
const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
};
```

## CSS Variables CSS 变量

### **Custom properties 自定义属性**

CSS 变量以 **`--`** 开头，可以像 **`color`** or **`font-size`** 一样继承，通过 **`var()`** 访问。

### **Not global 并非全局**

一个常见的误解是 CSS 变量是“全局的”。当我们将 CSS 变量附加到元素时，它仅能被该元素及其子元素访问。当然，我们通常将 CSS 变量挂在 **`:root`** 下，这是 **`html`** 的别名，所以变量可以在全局范围访问。

```css
:root {
  --color-primary: red;
  --color-secondary: green;
  --color-tertiary: blue;
}
```

### **Default values 默认值**

var() 接受两个变量，第二个是默认值或称 fallback.

```css
.btn {
  padding: var(--inner-spacing, 16px);
}
```

## **Viewport Units 视口单位 (vw, vh)**

### Mobile height issue

移动端的浏览器：有一个很高的地址栏且可点击，底部排列着一系列按钮。然而一旦开始滚动，这两部分就会消失，为内容腾出更多空间。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2020.png)

> When Apple first introduced this "slide-away" UI feature, the `vh` unit was dynamic: it would grow to match the viewport height when the UI slid away. This led to some really bad experiences, though: having elements shift and resize when you start scrolling is unexpected, and led to some very janky experiences.

所以现在，the `vh` unit **always refers to the largest possible height**. 对于上图，100vh 永远等于 750px，即使页面初次加载时实际视口只有 635px 高。

### D**esktop scrollbar issue**

在移动端，滚动条实际”浮在“网页内容之上，不占据任何宽度。但在桌面端，滚动条确实在视口中占据自己的位置，且在不同系统和浏览器中有不同的样式。

问题是，`vw` refers to the viewport width **_not counting the scrollbar_.**

This means that if we set an element to stretch to `100vw`, and our scrollbar is 15px wide, we'll wind up with 15px of horizontal overflow:

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2021.png)

### **ⓘ 在 MacOS 上显示滚动条**

在使用带水平滚动的设备如妙控板和妙控鼠标时，MacOS 默认将滚动条处理为和移动端一样。修改方法：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2022.png)

### **Tracking the scrollbar width 追踪滚动条宽度**

```jsx
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth; // 视口宽度 - 真实宽度
```

将它写为 CSS 变量：

```css
document.documentElement.style.setProperty(
  '--scrollbar-width',
  scrollbarWidth + 'px'
); /* documentElement 指向的也是 html */
```

在 React 中，我们可以这样：

```jsx
function App() {
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px',
    );
  }, []);

  return (
    <>
      <Wrapper>Hello World</Wrapper>
      <GlobalStyles />
    </>
  );
}

const Wrapper = styled.div`
  width: var(--full-width);

  /* Using a tall height to ensure a scrollbar */
  height: calc(100vh + 10px);

  /* Decorative styles */
  border: 10px solid deeppink;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const GlobalStyles = createGlobalStyle`
  html {
    --full-width: calc(100vw - var(--scrollbar-width));
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

render(<App />);
```

最后一个问题，如果页面部分内容是动态加载的，纵向滚动条并没有第一时间加载出来，上面的做法就失效了。

我们可以“提前设置”一个 scrollbar：

```css
body {
  overflow-y: scroll;
}
```

在 **Module 9 Little Big Details - Scroll Optimization** 中会有对这个问题更详细的讨论。

## **Clamping Values 钳值**

**`clamp()`** 函数接受三个值：最小值，理想值（元素将尝试达到的值），最大值

如下两种写法是等价的：

```css
/* Method 1 */
.column {
  min-width: 500px;
  width: 65%;
  max-width: 800px;
}
/* Method 2 */
.column {
  width: clamp(500px, 65%, 800px);
  max-width: 100%;
}
```

- Tailwind Play
  [https://play.tailwindcss.com/aPKWFkS7OW](https://play.tailwindcss.com/aPKWFkS7OW)

### 练习：Max-height Hero

**This is a surprisingly tricky problem.** 待完成

## **Scrollburglars 意外的横向滚动条**

待补充

## **Responsive Typography 响应式排版**

在移动设备上查看网页时，（与桌面显示器相比）文本应该放大还是缩小？对于不同的文字有不同的答案。

### Body text 正文

> When it comes to body text, the answer to the question above is surprisingly simple: **it should stay the same size across all devices.**
>
> Why? Because device manufacturers have already done the hard work of making sure that font sizes are consistent!
>
> ![对比：《华盛顿邮报》在桌面端和移动端的文字大小](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2023.png)
>
> 对比：《华盛顿邮报》在桌面端和移动端的文字大小
>
> Critically, *this text is the same font-size on both screens.* The Washington Post isn't doing any trickery to achieve this effect. Font sizes are more-or-less perceptually uniform across devices.
>
> **We generally want our body text to be [at least 16px](https://www.smashingmagazine.com/2011/10/16-pixels-body-copy-anything-less-costly-mistake/). Anything less and users will need to hold the phone uncomfortably close to their face, or do a bunch of pinch-and-zooming.**

### Smaller text 更小的文本

除了正文，我们还有注释annotation，标签label，图片说明caption等等更小的文字。

在移动端，对这些文字的处理要看具体情况。如果是 footer 里的 copyright 等不太重要的内容，保持原样无妨。如果内容确实很重要，我们可以放大：

```css
@media (max-width: 550px) {
  figcaption {
    font-size: 1rem;
  }
}
```

### **Headings 标题**

移动设备很窄，每行无法容纳那么多字符，大标题看起来很难受。一种方法是使用媒体查询，另一种方法是在下一节讨论的流体值。

```css
h1 {
  font-size: 2.5rem;
}
@media (max-width: 550px) {
  h1 {
    font-size: 1.75rem;
  }
}
```

## **Fluid Typography 流体排版**

流体排版的想法是，我们的排版不是在特定的断点处创建离散的字体大小，而是随着视口平滑地缩放。

### vw + clamp 动态字体大小

```css
h1 {
  font-size: clamp(1.5rem, 6vw, 3rem);
  margin-bottom: 0.5em;
}
```

```html
<h1>
  This is a fluid headline!
</h1>
<p>
  The heading will grow and shrink with the viewport.
</p>
</main>
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-2/Untitled%2024.png)

这种方法有一个小问题：浏览器的文字缩放对它无效了。解决方法是，掺入相对单位：

```css
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
  margin-bottom: 0.5em;
}
```

### **Use responsibly 注意事项**

流体排版适用于标题和其他大文本元素，在正文等较小文本上不建议使用此策略。

## **Fluid Calculator 流体计算器**

大概是如何控制以 vw 作为单位的文字的大小变化率。 待补充

## **Workshop**

待完成
