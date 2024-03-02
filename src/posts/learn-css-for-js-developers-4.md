---
title: 'CSS for JS Developers 学习笔记 (M7 CSS Grid)'
createdAt: '2024-01-27T15:55:30.780Z'
photo: 'https://img.ayame.network/learn-css-for-js-developers-4/module7.png'
tags: ['CSS', 'WIP']
summary: '模块7'
---

# Module 7 CSS Grid

未完待续

## **Mental Model 心智模型：停车场理论**

**（在 CSS Grid 中）Rows/columns are invisible markers 行和列是不可见的标记。**

**想象停车场地面上画的线。** 驾驶员可以按照这些线来停车，但实际上它们只是地上的符号。驾驶员可以自由决定如何使用它们。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled.png)

- 混乱邪恶的司机横着停车，占用 3 个停车位 → **元素可以选择跨越多个单元格**
- 大型卡车占满了停车位 / 迷你COOPER 停在超宽位置 → **元素可以紧贴在其指定的单元格，或只占其中一小部分**
- 一个有 50 个停车位的停车场只停了 1 辆车 → **单元格可以是空的**
- 三辆摩托车放在一个停车位 → **一个单元格可以包含多个子元素**

CSS Grid 如此强大的原因在于，可以**有选择地忽略**网格结构。

## **Browser Support 浏览器支持（选修）**

直接跳过

## **Grid Flow and Layout Modes 网格流和布局模式**

_implicit grid_ 隐式网格：不指定行和列时，默认为每个元素创建 1 个新行。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%201.png)

### **Grid auto flow**

`grid-auto-flow` 可以改变隐式网格的流向。`row(default)`, `column`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%202.png)

乍一看，它很像 `flex-direction` ，但有一个关键的区别。

Flexbox 真正独特的地方在于它有两个方向。通过将 `flex-direction` 从 `row` 翻转到 `column` ，我们可以更改哪一个轴是主轴，哪一个轴是交叉轴。

**在 CSS 网格中，没有“主轴”或“交叉轴”之类的东西。这个概念不存在。**

**相反，CSS 网格有行和列。** 行始终沿 **“块block”轴** 排列。在英语和其他水平语言中，这是垂直轴。行总是一层一层地堆叠。列始终沿 **“内联inline”轴** （水平）排列。

CSS Grid 在这方面就像 Flow 布局。行沿着“块”轴分布，就像 Flow 中的块级元素一样。

更改 `grid-auto-flow` 并没有从根本上改变网格的方向；一切都保持不变，除了我们的网格将具有多列而不是多行。

### **Layout modes 布局模式**

测试题

```html
<style>
  .wrapper {
    display: grid;
  }
  header {
    display: inline;
  }
  .help-btn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
<body>
  <main class="wrapper">
    <header>Hello World</header>
    <button class="help-btn">Help</button>
  </main>
</body>
```

这三个元素实际使用的布局模式如下：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%203.png)

- `<main>` ：和 `display: flex` 类似，`display: grid` 也是对子元素生效的，父元素保持了原本的 flow 布局。
- `<header>`：`display: inline` 是一个仅在 Flow 上下文中有意义的声明。在当前*这种*情况下，它没有任何作用。我们可以删除它，但什么都不会改变。
- `<button>`：**最容易犯错的情况**，当我们指定 `position: absolute` 后，它已经脱离了文档流(**”out of flow”**)。对父网格来说，这个元素不存在。**当我们说一个元素脱离文档流，真正的意思是该元素没有参与当前布局。**

## **Grid Construction 创建网格**

显式定义网格。

定义列：`grid-template-columns`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%204.png)

上图指定一个 2 列网格，其中第一列占用 25% 的可用空间，第二列占用 75%。

**与 Flexbox 不同，这些值不是“建议”，而是硬性限制。** 对上面的网格，即使没有足够的空间容纳其内容，第一列还是这个宽度！

### **Flexible columns `fr` 单位**

如果出现了溢出，如何解决？

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%205.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%206.png)

`fr` 单位指的是 “fraction”. 这有点像 Flexbox：第一列占用“1个单位”空间，第二列占用“2个单位”空间。但如果内容太宽，这个列会增长以容纳它。

上面的提到的空间指的是可用空间，例如：`200px 2fr 1fr` 会在去掉 200px 后将剩下的宽度分三份。

### **Implicit rows 隐式行**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%207.png)

2列网格，7个孩子。网格隐式创建所需数量的行。行高尽可能小而能包裹住该行最高的元素，如图：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%208.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%209.png)

### **Explicit rows 显式行：grid-template-rows**

使用 `grid-template-rows` 显式指定行高。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2010.png)

### **Gaps 间距**

`gap: 行间距 列间距;`

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2011.png)

### repeat 函数

```css
.calendar {
  grid-template-columns: 250px repeat(5, 1fr);
}
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2012.png)

repeat 最常用于创建多个 fr 单位，但它也可以接受其他任何单位，like `repeat(4, 200px)`.

## **Alignment 对齐**

虽然是一些和 Flexbox 里相同的属性，但它们的工作方式不完全相同。

### **Aligning columns 对齐列：`justify-*`**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2013.png)

CSS 网格中，列的默认行为是拉伸(stretch)以占据所有可用空间。通过设置 `justify-content: center` 可以让列居中。

上图第三个子元素具有最宽的自然宽度，因此整个列收缩到此宽度，并将此宽度用于其他元素。

同样，`justify-content` 可以指定为 `start` 和 `end` ；因为不在 Flexbox 中，不用加 flex- 前缀。另外，`space-between`, `space-around`, and `space-evenly` 也适用。

另外还有一个属性：`justify-items` 如图：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2014.png)

乍一看，这些列似乎有不同的宽度。不过在 Devtools 中它实际是这样：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2015.png)

通常，网格子元素拉伸到其列的整个宽度。一个放置在 100px 宽的列中的元素，自己也是 100px 宽的。而 `justify-items` 改变的就是这一点。

总结：

- `justify-content` 应用于网格结构，改变了网格列。
- `justify-items` 应用于子元素，不影响网格形状。

### **Aligning rows 对齐行：`align-*`**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2016.png)

注意：上面的代码为网格指定了固定高度 `300px` ，否则 `align-content` 没有任何效果。我们需要在网格中留出一些可用空间才能看到效果。

同理，`align-items` 如此工作：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2017.png)

### **Self-alignment 自对齐：`*-self`**

让特定子元素推翻父元素的对齐方式。和 Flexbox 中的使用方式一样。

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  height: 100%;
  border: 2px solid;
}

/*
  The last child should move to the
  bottom-right corner of its cell,
  instead of the center.
*/
.box:last-of-type {
  align-self: end;
  justify-self: end;
}

.box {
  width: 80px;
  height: 80px;
  background: black;
}

html,
body {
  height: 100%;
}
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2018.png)

## **Grid Areas 网格区域 `grid-area`**

CSS 网格的杀手级功能：命名网格区域并为其分配元素。

```html
<style>
  .wrapper {
    display: grid;
    grid-template-areas:
      'sidebar header'
      'sidebar main-content'; /* 给区域起名字 */
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 2fr;
  }

  aside {
    grid-area: sidebar; /* 使用这些名字 */
  }
  header {
    grid-area: header;
  }
  main {
    grid-area: main-content;
  }
</style>

<div class="wrapper">
  <aside>Aside</aside>
  <header>Header</header>
  <main>Main</main>
</div>
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2019.png)

## **Tracks and Lines 轨道和线**

网格由轨道(Tracks)和线(Lines)组成。网格线如下图所示，而两条网格线之间的空间被称为轨道（无论行或列）。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2020.png)

通过指定 `grid-column` 和 `grid-row` 来确定子元素占据网格的位置。斜线不表示除号，只是一种分隔符（`起始 / 结束`）。这种方法是 `grid-area` 的语法糖。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2021.png)

若不写分隔符后面的内容，如 `grid-column: 3` ，则默认占据一条轨道，与 `grid-column: 3 / 4` 等价。

注意 Devtools 标注出的网格的右侧和下侧的负值：这是这些线的另一个编号。负数编号可以用于这种场景：如上图，我想让盒子高度占满整个网格高度，写 `grid-row: 1 / 5` 当然可以完成任务。然而后来情况有变需要更改 `grid-template-rows` 至 6，则要同步更改 grid-row 以重新占满整个高度。如果一开始写作：`grid-row: 1 / -1` 那么无论父网格如何变化，它始终能占满。

## **Fluid Grids 流体网格**

### minmax 钳值

在 Module 5 中提到了使用 min(), max() 和 clamp() 函数来控制一个值在给定的上下限之间。CSS Grid 有一个相似的函数：`minmax()`

```html
<style>
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns:
      minmax(50px, 1fr)
      minmax(250px, 1fr);
  }
</style>

<main class="grid">
  <div class="card"></div>
  <div class="card"></div>
</main>
```

`minmax` 的心智模型：我们想要两个等宽的列（均为 `1fr` ），但第一列不应收缩到 50px 以下，而第二列不应收缩到 250px 以下。本质上，minmax 是一种给网格单元设置 `min-width` 和 `min-height` 的方法。

flexible unit 应该放最后。`minmax(1fr, 250px)` 不合法，因为 `1fr` 不是有效的“最小值”。

### **Generating columns with auto-fill 用 auto-fill 生成列**

除了数字之外，`repeat()` 还接受**特殊关键字**。

假设我们有一些宽度正好为 150px 的 card. 希望用尽可能多的 150px 宽的列填充网格。使用 `auto-fill` 关键字：

```html
<style>
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, 150px);
  }
</style>

<main class="grid">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</main>
```

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2022.png)

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2023.png)

改变尺寸，发现随着可用空间的增加，列数也在增加。不过，当宽度不是 150px 的倍数时，多出来的空白部分都挤在右侧，不好看。解决方法是加一句：`justify-content: space-evenly;` 让多余的空白平均分配到各个单元格之间。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2024.png)

更好的方法是结合 minmax 函数，效果一样：

```css
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
```

### **auto-fill vs. auto-fit**

大概用不上，先放一个（待补充）。

### **Responsive tweaks 响应式调整**

到目前为止，我们一直在使用最小宽度非常小的卡片(150px)。如果将上面 minmax() 中的 150px 改为 400px，这会导致较小屏幕上该卡片宽度一定会溢出。解决方法有两种：

- **responsive** 响应式：结合媒体查询

```css
.grid {
  display: grid;
  padding: 16px;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 450px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}
```

当视口较小时，我们选择只使用更简单的单列网格布局。

> **请注意，媒体查询有一个 50px 的缓冲区。** 尽管我们的最小卡片宽度是 400 像素，但我还是将开关切换到 450 像素。这会增加足够的空间用于填充（总共 32 像素，每边 16 像素）和滚动条（10-15 像素，具体取决于操作系统）。

- **fluid** 流体

```css
.grid {
  display: grid;
  padding: 16px;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
}
```

`min(400px, 100%)` ：`100%` 指的是 `.grid` 元素的宽度。在大显示器上 `.grid` 宽度可能为 800px，此时 `100%` 解析为 `800px` .
`min()` 选择两个值中较小的一个，因此在大显示器上，此表达式返回 `400px` 。
在较小的屏幕上，`100%`可能只有 250px. 此时返回值为 `100%` 。

也就是说：

```css
/* On large screens: */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
/* On small screens: */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
}
```

> 那么这两种方法哪一种更好呢？
>
> 不受欢迎但真实的答案是，这取决于情况！
>
> 当我从事独立项目时，我倾向于采用流畅的方法，因为我已经使用这些技术有一段时间了，并且我对它们感到满意。
>
> 不过，当与许多其他开发人员一起工作时，我可能会采用响应式方法。大多数 JS 开发人员不太熟悉这些高级 CSS 技术（这也是我创建这门课程的部分原因！），而且我不想编写对我的同事来说难以理解的代码。
>
> 它类似于高级 JS 技术，例如递归。递归是一个强大的工具，但在某些情况下，使用更直接的迭代方法可能更明智，以便初级队友可以理解代码并为代码做出贡献。

## Subgrid 子网格

截至作者编写教程的时间，只有 Firefox 支持此属性。

截至目前（2024.1.17）主流浏览器均已支持。

[https://caniuse.com/css-subgrid](https://caniuse.com/css-subgrid)

待补充

## Grid Dividers 网格分割线

怎么做到每个格子外面套一层装饰分割线？

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2025.png)

这是一个棘手的问题，因为没有任何方法可以使网格线可见 - 即使我们可以，它也不会正是我们想要的，因为有些格子跨越多个行/列。

一个使用 `background-color` 的聪明解决办法：[https://play.tailwindcss.com/3jvA7sGfce](https://play.tailwindcss.com/3jvA7sGfce)

## 实战演练

### 两行代码实现居中

将一个元素在其父元素中水平和垂直居中：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2026.png)

Flexbox 出现前，这是一个众所周知的棘手挑战。下面是 Flexbox 的三行解决方法：

```css
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

在 CSS Grid 中，我们同样可以这样写。此外，当我们将 `justify-content` and `align-content` 设置为同一个值时，还有一个简写：`place-content`

```html
<style>
  .wrapper {
    display: grid;
    place-content: center;
  }
</style>

<section class="wrapper">
  <div class="box"></div>
</section>
```

Modern CSS is pretty friggin cool.

### **Sticky Grids 粘性网格**

待补充

### **Full Bleed Layouts 全出血布局**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2027.png)

待补充

## **Managing Overflow 管理溢出**

如何实现以下效果，在较小的屏幕上给右边的图片一个水平滚动条：

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2028.png)

可以看到，给 `.image-list` 设置的 `overflow: auto` 似乎并没有起作用。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2029.png)

下面的例子看起来更直观：假设这个box里放着动物图片。由于 `fr` 单位根据其内容自动调整宽度，第二列变得和 box 一样宽。

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2030.png)

```html
<style>
  .grid {
    display: grid;
    grid-template-columns: 175px 1fr;
    gap: 16px;
  }

  .box {
    width: 1000px;
    height: 200px;
    background-color: peachpuff;
  }
</style>

<div class="grid">
  <div class="intro">
    <h2>My Photos</h2>
    <p>Here are some animals I saw on holiday:</p>
  </div>
  <div class="box-container">
    <div class="box"></div>
  </div>
</div>
```

有两种解决方法：

- 将 `overflow` 移动到 Grid 的直接子级。理论如下：如果网格子级具有 `overflow: auto` ，它会授予列缩小到该元素的自然宽度以下的权限。但这不能递归地工作：**它必须位于直接网格子级上，而不是后代上。**

![Untitled](https://img.ayame.network/learn-css-for-js-developers-4/Untitled%2031.png)

- 设置最小宽度 `min-width` ：将 `1fr` 改为 `minmax(0, 1fr)`
