---
title: '算法设计与分析（陈慧南）Ch1~5'
createdAt: '2025-03-16T14:00:00.000Z'
updatedAt: '2025-03-25T14:00:00.000Z'
photo: 'https://img.ayame.network/learn-kaoyan-2nd-exam-algo-ch1-5/ch1-5.png'
tags: ['algorithm']
summary: '第一～五章 算法基础、时间复杂度、分治法'
---

# 第一～五章 算法基础、时间复杂度、分治法

## 1.x 算法概述

算法五个特征 详见[名词解释](https://blog.kaai.dev/post/learn-kaoyan-2nd-exam-algo-definitions)

## 2.1 渐进表示法

### 大O记号

> $n \to \infty$ 时，$f(n)$ 不会快于 $g(n)$

如果存在正数$c$和$n_0$，使得当$n \geq n_0$时，有$f(n) \leq cg(n)$，则称$f(n)$是$O(g(n))$的。
$c$和$n_0$怎么找？**系数加一**。
简单地说，如果$f(n)$最高项为一次项（例如$3n+2$），那么就**把常数项放掉**，看$n$等于几时$f(n)$的值开始小于$4n$。
如果$f(n)$既有一次项又有二次项（例如$3n^2+2n+1$），那么**首先把常数项放掉**，看$n$等于几时$f(n)$的值开始小于$3n^2+3n$；**再把一次项放掉**，看$n$等于几时$f(n)$的值开始小于$4n^2$。

**p19 例2-2** 证明$f(n) = 10n^2 + 4n + 2 = O(n^2)$
解：
$n\geq 2$时，有$10n^2 + 4n + 2 \leq 10n^2 + 5n $
$n\geq 5$时，有$5n \leq n^2$
取$n_0 = 5$，$c = 11$，则当$n\geq n_0$时，有$f(n) \leq 11n^2$，所以$f(n) = O(n^2)$.

### 大Omega记号

> $n \to \infty$ 时，$f(n)$ 不会慢于 $g(n)$

如果存在正数$c$和$n_0$，使得当$n \geq n_0$时，有$f(n) \geq cg(n)$，则称$f(n)$是$\Omega(g(n))$的。
$c$和$n_0$怎么找？**最高次系数不动，小的全放掉**。

**p20 例2-6** 证明$f(n) = 10n^2 + 4n + 2 = \Omega(n^2)$
解：
对所有$n$，有$10n^2 + 4n + 2 \geq 10n^2$
取$n_0 = 1$，$c = 10$，则当$n\geq n_0$时，有$f(n) \geq 10n^2$，所以$f(n) = \Omega(n^2)$.

### 综合比较两个函数的时间复杂度

**基本思路：** 如果$f(n)$是$\Omega(\text{某个函数})$的，同时$g(n)$又是$O(\text{某个函数})$的，那么$f(n)$就是$\Omega(g(n))$的。

**p29 习题2-11(2)** $f(n)=n^2/\log n$，$g(n)=n\log^2 n$
解：
(1) 取$n_0 = 2, c=\frac{1}{2}$，对于所有$n\geq n_0$时，有$\log n \geq 1$
因此 $f(n) \geq \frac{1}{2}n^2$，所以$f(n) = \Omega(n^2)$.
(2) 取$n_0 = 1, c = 1$，对于所有$n\geq n_0$时，有$\log^2 n \leq n$
因此 $g(n) \leq n*n = n^2$，所以$g(n) = O(n^2)$.
(3) 由(1)和(2)可得$f(n) = \Omega(g(n))$。

## 2.2 迭代法求解时间复杂度

[递归时间复杂度求解-迭代法](https://www.bilibili.com/video/BV1Ua411z7nF/?p=4)

## 2.3 主定理求解时间复杂度*

若：

$T(n) = \left \{ 
\begin{array}{ll}
c & n = 1 \\
aT(\frac{n}{b}) + c*n^k & n > 1
\end{array}
\right.$

则：

$T(n) = \left \{ 
\begin{array}{ll}
\Theta(n^{\log_b a}) & \log_b a > k \\
\Theta(n^k \log n) & \log_b a = k \\
\Theta(n^k) & \log_b a < k
\end{array}
\right.$

即，谁大要谁（n的指数部分），相等时再乘一个logn

## 2.4 给一段代码，求时间复杂度

类似408选择题第一题，中间过程写的言之有理即可
[25考研？那408第一题你已经拿下了。408时间复杂度的几个经典考法](https://www.bilibili.com/video/BV1jC411Y72k)

### 2.4.1 单循环

```c++
int i=0;
while (i*i*i <= n)
    i++;
```

$T = O(\sqrt[3]{n})$

```c++
int i=1;
while (i<=n)
    i = i * 2;
```

$ T = O(\log n)$

```c++
x=0;
while (n >= (x+1)*(x+1))
    x++;
```
$ T = O(\sqrt{n})$

```c++
i = n*n;
while (i != 1)
    i = i / 2;
```
$T = O(\log n)$
   
### 2.4.2 两重循环

```c++
int m=0, i, j;
for (i=1; i<=n; i++)
    for (j=1; j<=2*i; j++)
        m++;
```
$T = O(n^2)$

```c++
for (i=0; i<n; i++)
    for (j=0; j<m; j++)
        A[i][j] = 0;
```
$T = O(mn)$

```c++
count = 0;
for (k=1; k<=n; k*=2)
    for (j=1; j<=n; j++)
        count++;
```
$T = O(n \log n)$

```c++
for (i=n-1; i>=1; i--)
    for (j=1; j<i; j++)
        if (A[i] > A[j+1])
            swap(A[i], A[j]);
```
$T = O(n^2)$

## 5.1 基本思想

什么是分治法 详见名词解释

## 5.2 ~ 5.4 分治法实例

会按照2.1的方式分析时间复杂度，能解释什么是二分搜索、快速排序、合并排序即可。



