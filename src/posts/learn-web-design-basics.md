---
title: 'Web UI 设计入门 学习笔记'
createdAt: '2024-01-09T15:55:30.780Z'
updatedAt: '2024-01-24T15:55:30.780Z'
photo: 'https://img.ayame.network/learn-web-design-basics/Untitled%2015.png'
tags: ['design', 'WIP']
summary: '本文多数内容是对教程视频的 transcription. 我认为入门阶段先要多看优秀的案例。写这篇笔记参考的所有资料和视频都在文末，并标注了推荐和不推荐理由。'
---

# 前言

本文多数内容是对教程视频的 transcription. 我认为入门阶段先要多看优秀的案例。写这篇笔记参考的所有资料和视频都在文末，并标注了推荐和不推荐理由。

# UI 设计原则

## Layout 布局

## Visual Hierarchy 视觉层次

- **Size 尺寸：** 大尺寸元素更能吸引视线，用来突出重要内容；小尺寸元素则用来降低不那么重要的内容的重视度。
  ![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled.png)
- **Color 颜色：** 用鲜艳大胆的颜色突出重要元素，用柔和颜色来降低对不太重要元素的关注。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%201.png)

- **Placement 位置：** 位于屏幕或页面顶部的元素通常首先被看到，重要内容应放在顶部。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%202.png)

- **Proximity 相邻：** 基于格式塔心理学法则，靠近彼此的对象或元素通常被视为一组。我们倾向于将靠近的元素视为一个单元或模式。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%203.png)

- **Repetition 重复：** 重复的样式表明元素之间的关联。例如，如果导航栏始终位于每个页面的顶部，并且链接始终具有一致的样式和标签，用户将快速学会依靠这种模式来导航界面。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%204.png)

同样，如果按钮和其他交互元素的样式和位置一致，用户将能够快速识别它们并与之交互。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%205.png)

- **White space 留白** ：也称负空间 Negative Space，是设计元素（文本、图像和其他视觉元素）之间的空白区域。在设计中，留白不仅仅是空白区域，而是有意地留白，给观者的眼睛从页面上其他设计元素中休息的机会。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%206.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%207.png)

## Visual Noise 视觉噪声

视觉噪声指过多或不必要的视觉元素的存在，干扰了用户感知和与界面互动的能力。视觉噪声可以以多种形式出现，例如布局混乱、过度使用颜色或字体、或分散注意力的动画或过渡效果。

- **布局拥挤** ：当设计中包含过多的视觉元素，如文本、图像或图标时，用户可能难以找到他们寻找的信息。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%208.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%209.png)

- **风格不一致** ：界面不同部分使用不一致的风格，如字体、颜色或间距，可能会产生视觉噪声，使设计更难理解。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2010.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2011.png)

- **不必要的动画或过渡** ：不起实际功能作用的动画或过渡效果可能会分散注意力，增加界面的视觉噪声。
- **复杂的背景** ：过于复杂的背景可能会使用户更难阅读或与页面上的内容互动。

## Iconography 图标

图标是一种强有力的设计元素，能够快速有效地传达信息，通常用于界面中替代或补充基于文本的标签。

通常，在 UI 设计中我们使用两种类型的图标：线框图标和实心图标。

- **Outline Icons 线框图标：** 有可见边界或描边的图标，但没有填充颜色。线框图标常用于极简设计中，因为它们在不过分占据视觉空间的情况下传达信息，并可用于指示非活动或禁用状态。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2012.png)

- **Solid Icons 实心图标：** 完全填充颜色的图标，没有可见边界或描边，通常用来指示活动或启用状态。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2013.png)

活动与非活动：

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2014.png)

通常，UI/UX设计师不会自己设计图标，而是使用第三方提供的精心设计的图标库，以节省时间和资源。

## Typography 排版

排版是指排列文字以使书面语言在展示时清晰、易读并具有吸引力的艺术和技术。

### Typeface vs. Font 字体家族和字体

虽然常常被混用，但它们有不同的含义。

- **Typeface 字体家族：** 一组字符的具体设计，通常提供不同大小和风格。例如，**Arial, Times New Roman, Inter 都是字体家族。**

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2015.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2016.png)

- **Font 字体：** 字体家族中特定大小、重量和风格的实例。例如，**[Times New Roman, 12 point, bold]是一个字体。**

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2017.png)

### Type properties 字体属性

重要的字体属性：

- **Baseline 基线：** 字母所在的假想线。
- **x-height x高度：** 小写字母，通常是字母 x 的高度。
- **Cap height 大写高度：** 大写平(flat)字母（如M）的高度，从基线到大写字母的顶部。
- **Ascender 上伸部分：** 字母上伸出X高度的部分，如小写d或h的顶部。
- **Descender 下伸部分：** 字母下伸出基线的部分，如小写g或p的底部。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2018.png)

### 其他字体元素

- **Leading 行距：** 也称 **行高(line height)**，指多行文本 **基线之间** 的间距。行距对文本块的易读性和整体美观有重大影响。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2019.png)

通常对于小字号和行文本块，我们会增加行高。相反，对于较大的字号和短文本块，我们会减少行高。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2020.png)

- **Kerning 字偶距，字偶间距：** 单个元素之间的间距，我们在UI/UX设计中不使用它，因为无法调整单个字符之间的间距。此外，也无法在代码中实现。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2021.png)

- **Tracking 字距，字符间距：** 字符组之间的间距。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2022.png)

UI/UX设计师通常根据字体大小调整字距。我们通常对大字号使用紧凑的字距，对小字号使用较松的字距，以提高可读性。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2023.png)

- **Weight 字重：** 选择字体时，确保该字体至少有3-5种字重。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2024.png)

### Classification 分类

- **Serif 衬线：** 传统、正式，常用于书籍报纸印刷
- **Sans serif 非衬线：** 现代、极简，常用于数字产品（网页，apps…）

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2025.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2026.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2027.png)

- **Display 显示：** 专用于引人注目的大尺寸内容如标题、引文等，在小尺寸下一般很难阅读

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2028.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2029.png)

- **Script 手写体：** 模拟手写，常用于正式邀请函、贺卡。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2030.png)

- **Monospace 等宽：** 字面义，常用于编程。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2031.png)

- **其他：** humanist, transitional, modern, slab-serif, etc.

### 选哪种更好

在UI/UX设计中，**无衬线字体** 通常是优先选择，因为它们在数字界面上易于阅读，并具有现代和简约的外观。你也可以将其与衬线字体搭配，但要确保将衬线字体用于大标题，因为小号的衬线字母难以阅读。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2032.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2033.png)

在搭配字体时，请确保不要使用超过两种不同的字体（家族）。

### Measure / Line Length 行长

根据谷歌的建议，较长正文的推荐行长通常在 40 到 60 个字符之间。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2034.png)

如上图，第一段行长非常短，但适合微文案；第二段对于标准段落文本来说太短；第三段基本正确；第四段太长了。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2035.png)

当然，根据谷歌的文档，”现在，即使是最热心的印刷者也没有人会计算每一行文本中的字符数，尤其是在网络上。“有一些方法可以帮助设计者决定设置媒体查询的时机，了解更多：

[Understanding measure/line length – Fonts Knowledge - Google Fonts](https://fonts.google.com/knowledge/using_type/understanding_measure_line_length)

### Alignment 对齐

- 左对齐：英语
- 右对齐：波斯语、阿拉伯语
- 居中对齐：通常最适合区分布局中的短文本，如引用、顶部标题等，通常不建议用于较长的文本段落。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2036.png)

- 两端对齐：不使用。因为单词间距不一致，用户阅读文本会更加困难。

## Contrast 对比

对比指的是设计中两个或多个元素之间的视觉差异，不仅仅是颜色。

- **Color 颜色：** 不同元素之间的颜色或明暗差异。颜色对比可以帮助创建信息层次，将注意力吸引到重要元素，并提高文本的可读性。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2037.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2038.png)

- **Size 尺寸：** 较大的按钮或文本可以吸引用户的注意力到最重要的元素。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2039.png)

- **Shape 形状**

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2040.png)

- **Texture 纹理：** 创造层次感。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2041.png)

## Spacing 间距

间距是指用户界面中不同元素之间或周围的空间”数量“，它和实际内容同等重要。这是设计的一个关键点，因为它有助于创建清晰、有组织的布局，易于用户导航。

### Padding & Margin 内边距和外边距

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2042.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2043.png)

### 网格系统

UI设计中的网格系统是用于在网页或应用界面上构建和组织内容的框架。有许多不同的网格系统可供选择，如4点 **(pt)** 、8点和10点网格系统。其中最受欢迎的是4点和8点网格系统。

以8点网格系统为例。屏幕上的元素应基于8像素方格网格对齐和调整大小。所以所有值，如内边距、外边距、宽度和高度，都应是8的倍数，如8、16、24、32、40等等。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2044.png)

现在，越来越多的设计师正转向4点网格系统。

当我们使用4点网格系统时，我们应该使用所有四的倍数的值吗？答案是否。随着数字变得越来越大，我们不应该线性地使用这些值，而是跳过一些值来限制我们的选择。如下图：

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2045.png)

我们可以将这个间距尺度分为三个不同的尺寸范围：**Small, Medium, Large.**

- **Small** 可用于非常相关元素之间的间距。如卡片、文本字段或按钮等组件内的内外边距。
- **Medium** 可用于相关元素之间的间距。如大容器的内外边距。
- **Large** 可用于不相关元素之间的间距。如大组件或页面不同部分之间的间距。

### 示例

这个 card 的所有边距都是 40px. 考虑如何解决问题。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2046.png)

靠近彼此的元素会被感知为一个组。我们将图像归为一组；标题和正文非常相关，把它们归为另一组；按钮单独一组。根据刚才讨论的概念对它们进行标记。我们总是从组内元素开始。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2047.png)

现在考虑考虑组间的距离：

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2048.png)

它们比较相关，但又不非常相关。我们将外边距设为 20px. 最后是容器的内边距，我们设为 24px. 结果如下：

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2049.png)

## Grid 网格

网格是一组列或行，可帮助设计人员对齐和组织布局中的元素。

### 分类

- **Column Grid 列网格**

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2050.png)

- **Modular Grid 模块网格：** 在页面上列出许多重复的项目

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2051.png)

- **Hierarchical Grid 层次网格：** 使用大小和位置来创建信息的视觉层次结构。在这种类型的网格中，内容片段根据重要性级别组织，因此最重要的元素占据了网格的最大部分。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2052.png)

- **Baseline Grid 基线网格：** 将文本和其他元素对齐到一致的基线上，营造节奏感和和谐感。我们通常使用 4pt 基线网格进行文本对齐。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2053.png)

### Gutter & Margin 沟槽（间距）和边距

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2054.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2055.png)

## Consistency 一致性

UI 设计的一致性是指在整个应用程序或网站中使用一致的样式、语言和行为。以社交媒体平台 App 设计为例：

一致性将涉及在整个应用程序中保持统一的视觉和交互设计。这可以通过对导航栏的位置、按钮的大小和样式以及图标和符号的使用等元素使用一致的设计模式来实现。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2056.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2057.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2058.png)

通过始终如一地使用这些模式，用户可以快速学习如何使用应用程序，并提高交互效率。

如果网站或应用程序在其消息传递中使用友好和随意的语气，则应在整个用户体验中保持这种语气，包括错误消息、通知和提示。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2059.png)

通过保持布局、颜色、排版和语言等设计元素的一致性，您可以创建一个用户喜欢使用的直观且引人入胜的用户界面。

# Figma 入门

这部分内容跟随视频学习最好。下面的内容仅用于记录一些名词术语和使用习惯。

## Shapes 形状工具

### Ellipses 椭圆工具

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2060.png)

- **Arc** - “弧度”：这个参数用于设置椭圆形状的弧形部分，确定弧形的角度大小。
- **Start** - “起始”：这个参数定义了弧形开始的位置，通常以角度来表示。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2061.png)

- **Sweep** - “扫掠”：这个参数用于定义弧形的扫掠角度，即弧形从起始点到结束点的角度跨度。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2062.png)

- **Ratio** - “比例”：这个参数通常用于将圆形变为环。

### 编辑模式

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2063.png)

双击或选中元素后按 Enter.

## Measurements 测量工具

Alt.

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2064.png)

### Deep select 深度选择（快速选中组内的内容）

按住 Ctrl.

### 尺子 - 默认隐藏

Shift+R.

## Auto Layout 自动布局

给设计师的 flexbox.

Shift+A

# 色彩理论

## The Color Wheel 色轮

- **三原色** **Three Primary Colors (Ps)**: Red, Yellow, Blue
- **三间色（二次色）Three Secondary Colors (S’)**: Orange, Green, Violet
- **三次色** **Six Tertiary Colors (Ts)**: Red-Orange, Yellow-Orange, Yellow-Green, Blue-Green, Blue-Violet, Red-Violet, which are formed by mixing a primary with a secondary

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2065.png)

## HSB(HSV) 色相、饱和度、Brightness(Value)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2066.png)

- **色相 Hue**: 颜色在色轮上的位置，是区分不同颜色的主要方式。
- **饱和度 Saturation:** 颜色中灰色的量，或者说颜色与其最鲜艳状态的距离。饱和度高的颜色看起来更纯、更鲜艳，而饱和度低的颜色则显得更暗淡、更接近灰色。
- **Brightness:** 颜色近似于白色或黑色的程度。Brightness 高的颜色更接近白色，Brightness 低的颜色更接近黑色。

参考资料：

[The HSB Color System: A Practitioner's Primer](https://www.learnui.design/blog/the-hsb-color-system-practicioners-primer.html)

https://stackoverflow.com/questions/15668623/hsb-vs-hsl-vs-hsv

## Tints, Shades and Tones

- **Tint**: Hue + WHITE
- **Shade**: Hue + BLACK
- **Tone**: Hue + GRAY

**参考上图，右上角是 Hue，向左平移叫 Tint，向下平移叫 Shade，向左下任意方向平移叫 Tone。**

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2067.png)

## Color Temratures 色温

颜色具有冷暖。温暖的颜色唤起从激情、健康、力量到危险和愤怒的情绪。相比之下，凉爽的颜色创造平静的放松和平静感，但也可以唤起忧郁和悲伤。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2068.png)

## Color palette 调色板

调色板是设计界面时使用的颜色组合。它构成品牌的视觉基础，保持一致性，让用户界面美观易用。

调色板可以分为四种类型：**complementary, analogous, monochromatic 和 triadic**.

### Complementary 互补色

互补色配色方案使用色轮上彼此相对的颜色，这种方案色彩对比强烈，能产生强烈的视觉冲击力。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2069.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2070.png)

### Analogous 相似色

相似色配色方案使用色轮上彼此相邻的三种颜色。使用彼此接近的颜色可以创造出充满活力、大胆和自然的构图。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2071.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2072.png)

### Monochromatic 单色

单色配色方案基于单一颜色搭配不同的色调和明度。这种搭配赏心悦目，产生有趣、吸引人且和谐的设计。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2073.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2074.png)

### Triadic **三色组**

三角型配色方案由色轮上均匀分布的三种颜色组成，形成一个三角形，如红色、黄色和蓝色。通常一种颜色会作为主色，另两种作为辅助色。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2075.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2076.png)

![红黄蓝运用得很均等，没有哪个颜色抢风头](https://img.ayame.network/learn-web-design-basics/Untitled%2077.png)

红黄蓝运用得很均等，没有哪个颜色抢风头

## Tips: 正确使用对比

对每个网站的可读性，对比都非常重要。前景色和背景色对比度过低，会导致可读性问题。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2078.png)

工具：

- **WebAIM Contrast Checker**
- **A11y Contrast Check (Figma Plugin)**

达到 AA 以上评分可视为理想情况。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2079.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2080.png)

## 色彩与心理

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2081.png)

- **Red: Love, danger, anger, rage, passion 爱、危险、愤怒、激情**
- **Orange: Energy, vitality, warmth 活力、生命力、温暖**
- **Green: Nature, money, luck, growth 自然、金钱、运气、成长**
- **Yellow: Fun, creativity, youth, wealth, optimism 乐趣、创意、年轻、富有、乐观**
- **Purple: Royalty, luxury, creativity, spirituality, nobility 庄严、奢华、创意、灵性、高贵**
- **Blue: Wisdom, calmness, reliability, trust, corporate 智慧、冷静、可靠、信任**
- **Black: Elegance, power, strength 优雅、权力、力量**
- **White: Purity,elegance, calmness 纯净、优雅、冷静**

## Tips: 寻找色彩灵感

- **Coolors** - 传统的调色板生成器

[Coolors - The super fast color palettes generator!](https://coolors.co/)

- **Huemint** - AI 调色板生成器

> 网络上有很多颜色生成工具，但大多数都生成 5 种颜色的平面调色板。这是一个很好的起点，但正确应用这些颜色仍然需要经验和直觉。
> Huemint 是一个机器学习系统，用于根据上下文生成颜色，可供最终设计使用。它知道哪些颜色是背景，哪些是前景，哪些是强调色。首先，选择一个设计模板，然后单击页面右上角的（生成）按钮。
> …

阅读更多：

[Huemint - About Huemint - Machine learning for graphic design colorization](https://huemint.com/about/)

## 创造自己的调色板

- 选主色
- 决定颜色数量，三种颜色是初学者最佳选择，遵循 60-30-10 原则
- 在需要时使用 secondary colors, 增加整体视觉效果，遵循上面的四种配色方案
- 制作 tonal palettes - 为选择的颜色挑选 tones, shades and tints, 让设计更具灵活性，并让灰色和黑色与你的颜色中更协调。

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2082.png)

## 应用调色板

新手起步：choose three colors for your palette: **a primary, secondary, and tertiary
(accent) color.**

### 60-30-10 原则

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2083.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2084.png)

![Untitled](https://img.ayame.network/learn-web-design-basics/Untitled%2085.png)

[One Page Love - One Page Website Inspiration and Templates](https://onepagelove.com/)

# 参考资料

- **DesignWithArash - UI Design & Figma Mastery** 推荐，老师讲得很好，很有条理（每次列举都是 number 1, number 2...）。视频演示简洁明了，不会让人感到枯燥。keyword:_tutflix_

  https://www.thedesignmastery.com/

- **Web Design for Beginners | FREE COURSE** 一般般，作为免费资源也还行...

  https://www.youtube.com/watch?v=B-ytMSuwbf8

- **DesignCourse.com** 网站宣传的 Interactive UI Tests 就是浪费时间。视频内容也很平淡，不够深入，我不太喜欢。老师你讲 Figma 使用时能不能放大一下窗口，求求你了???

  https://designcourse.com/ui-ux
