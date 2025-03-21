---
title: '算法设计与分析（陈慧南）Ch1~5'
createdAt: '2025-03-16T14:00:00.000Z'
photo: 'https://img.ayame.network/learn-kaoyan-2nd-exam-algo-ch1-5/ch1-5.png'
tags: ['algorithm']
summary: '第一～五章 算法基础、时间复杂度、分治法'
---

# 第一～五章 算法基础、时间复杂度、分治法

## 1.x 算法概述

算法五个特征 详见名词解释

## 2.1 迭代法求解时间复杂度

[递归时间复杂度求解-迭代法](https://www.bilibili.com/video/BV1Ua411z7nF/?p=4)

## 2.2 主定理求解时间复杂度*

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

## 2.3 给一段代码，求时间复杂度

类似408选择题第一题，中间过程写的言之有理即可

### 2.3.1 单循环

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
   
### 2.3.2 两重循环

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



