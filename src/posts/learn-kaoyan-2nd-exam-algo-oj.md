---
title: '算法设计与分析 综合面试之程序设计'
createdAt: '2025-03-21T14:00:00.000Z'
photo: 'https://img.ayame.network/learn-kaoyan-2nd-exam-algo-oj/title.png'
tags: ['algorithm']
summary: '🐂😈'
---

# 第五章 分治法

## 求最大最小元

遍历：$2(n-1)$
分治：$3n/2-2$

递归方程 $T(n) = 2T(\frac{n}{2})+2$ 处理左右数组+合并结果两次比较

```cpp
#include<iostream>
#include<algorithm>
using namespace std;

int n, x[100010], maxx, minn;

void findMinMax(int l, int r, int &maxx, int &minn) {
  int max1, min1; // 左半边最大最小
  int max2, min2; // 右半边最大最小
  
  if(l == r) { // 只有一个元素
    maxx = x[l], minn = x[r];
  } else if(r == l + 1) { // 只有两个元素
    maxx = max(x[l], x[r]);
    minn = min(x[l], x[r]);
  } else {
    int mid = (l + r) / 2; // 取中点
    findMinMax(l, mid, max1, min1); // 找左半边最大最小
    findMinMax(mid+1, r, max2, min2); // 找右半边最大最小
    maxx = max(max1, max2);
    minn = min(min1, min2);
  }
}

int main() {
  cin >> n;
  for(int i = 1; i <= n; i++)
    cin >> x[i];
  findMinMax(1, n, maxx, minn);
  cout << "max: " << maxx << endl;
  cout << "min: " << minn << endl;
  return 0;
}
```

## 快速排序

判边界，取支点，do-while，分两边

P1177 【模板】排序 https://www.luogu.com.cn/problem/P1177

partition判断时的等号,什么时候取,为什么？https://juejin.cn/post/7050450152867397645

```cpp
#include<cstdio>

int a[100100], n;

void swap(int &a, int &b) {
  int t = a;
  a = b;
  b = t;
}

void quicksort(int l, int r) {
  if(l >= r) return;

  // 基准元素 pivot 任选，这里选择区间第一个元素作为基准
  // 对本题，此代码会超时，可以改为取区间中点 pivot = a[(l + r) >> 1]
  int i = l, j = r, pivot = a[l];

  // 划分，pivot 左边的元素都小于等于 pivot，右边的元素都大于等于 pivot
  do {
    while(a[j] > pivot) j--; // 从右向左找第一个小于等于 pivot 的元素
    while(a[i] < pivot) i++; // 从左向右找第一个大于等于 pivot 的元素
    if(i <= j) { // 交换
      swap(a[i], a[j]);
      i++;
      j--;
    }
  } while(i <= j);

  if(j > l) quicksort(l, j); // 递归处理左半部分
  if(i < r) quicksort(i, r); // 递归处理右半部分
}

int main() {
  scanf("%d", &n);
  for(int i = 1; i <= n; i++)
    scanf("%d", &a[i]);
  
  quicksort(1, n);

  for(int i = 1; i <= n-1; i++)
    printf("%d ", a[i]);
  printf("%d\n", a[n]);
  return 0;
}
```

## 归并排序

```cpp
#include <cstdio>

int n;
int a[100010], tmp[100010];

void mergesort(int l, int r) {
  if (l >= r) return;

  // 先 divide，分成两个子数组
  int mid = (l + r) >> 1;
  mergesort(l, mid);
  mergesort(mid + 1, r);

  // 再 merge，合并两个有序子数组
  int i = l;       // 左半部分起始指针
  int j = mid + 1; // 右半部分起始指针
  int k = l;       // 临时数组指针

  // 取较小的元素放入tmp
  while (i <= mid && j <= r) {
    if (a[i] <= a[j]) {
      tmp[k++] = a[i++];
    } else {
      tmp[k++] = a[j++];
    }
  }
  while (i <= mid) tmp[k++] = a[i++]; // 左半部分剩余元素
  while (j <= r) tmp[k++] = a[j++];  // 右半部分剩余元素

  // 将tmp中的(l,r)这一段元素复制回a
  for (int i = l; i <= r; i++)
    a[i] = tmp[i];
}

int main()
{
  scanf("%d", &n);
  for (int i = 1; i <= n; i++)
    scanf("%d", &a[i]);
  mergesort(1, n);
  for (int i = 1; i <= n-1; i++)
    printf("%d ", a[i]);
  printf("%d\n", a[n]);
  return 0;
}
```

# 第六章 贪心

## 部分背包问题

P2240 【深基12.例1】部分背包问题 https://www.luogu.com.cn/problem/P2240

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;

const int N = 110;

struct Mono {
    double w, v, worth; // worth: 单位价值
} mono[N];

bool cmp(Mono a, Mono b) {
    return a.worth > b.worth;
}

int n;
double m;
double ans = 0;

int main() {
    scanf("%d %lf", &n, &m);
    for(int i = 1; i <= n; i++) {
        scanf("%lf %lf", &mono[i].w, &mono[i].v);
        mono[i].worth = mono[i].v/mono[i].w;
    }

    sort(mono+1, mono+n+1, cmp);

    for(int i = 1; i <= n; i++) {
        if(m > mono[i].w) {
            m -= mono[i].w;
            ans += mono[i].v;
        } else {
            ans += (m / mono[i].w) * mono[i].v;
            break;
        }
    }

    printf("%.2lf\n", ans);
    return 0;
}
```

## 活动安排（线段覆盖）

P1803 凌乱的yyy / 线段覆盖 https://www.luogu.com.cn/problem/P1803

```cpp
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1000100;

struct Comp{
    int s, t;
}comp[N];

bool cmp(Comp a, Comp b){
    return a.t < b.t; // 按照活动的结束时间 t 从早到晚排序
}

int n, ans;

int main(){
    cin >> n;
    if(n==0) {
        cout << 0 << endl;
        return 0;
    }
    for(int i = 1; i <= n; i++) {
        cin >> comp[i].s >> comp[i].t;
    }
    sort(comp+1, comp+n+1, cmp);

    // nxt: 当前选择的最后一个活动的结束时间
    int nxt = comp[1].t; // 选择第一个活动
    for(int i = 2; i <= n; i++) {
        if(nxt <= comp[i].s) { // comp[i] 开始时间比nxt晚，可以选
            ans++; // 选择 comp[i] 这个活动
            nxt = comp[i].t; // 更新nxt
        }
    }
    cout << ans+1 << endl;
    return 0;
}
```

时间复杂度 $O(n\log n)$

## 最小生成树*

P3366【模板】最小生成树 https://www.luogu.com.cn/problem/P3366

### Kruskal

边权从小到大排序，依次加入边，每次加入都需要判环路
判环：并查集，若该边首尾节点属于同一个集合，则舍弃该边
并查集代码讲解：https://www.bilibili.com/video/BV1W34y1L734/
会路径压缩写法就足够了，考试应该达不到启发式合并写法的要求
不对，考试根本考不到这么难的


```cpp
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 5010;
const int M = 200010;

struct Edge {
  int u, v, w;
}edge[M];

bool cmp(Edge a, Edge b) {
  return a.w < b.w;
}

int n,m;
int fa[N];

void init(int n) { // 并查集初始化
  for(int i = 1; i <= n; i++) {
    fa[i] = i;
  }
}

int fnd(int x) { // 并查集查找
  return x == fa[x] ?
  x :
  fa[x] = fnd(fa[x]);
}

int main() {
  int cnt = 0; // 已加入的边
  long long ans = 0; // 边长之和

  cin >> n >> m;
  init(n); // 并查集初始化

  for(int i = 1; i <= m; i++) { // 注意边的数量是m
    cin >> edge[i].u >> edge[i].v >> edge[i].w;
  }

  sort(edge+1, edge+m+1, cmp); // 注意边的数量是m
  
  for(int i = 1; i <= m; i++) { // 注意边的数量是m
    int fax = fnd(edge[i].u), fay = fnd(edge[i].v);
    if(fax == fay) continue; // 这条边首尾节点在同一个集合，不选
    else {
      fa[fay] = fax; // 并查集union操作（父节点间的合并）
      cnt++;
      ans += edge[i].w;
    }
    if(cnt == n-1) break; // 可选优化操作，不写也行
  }

  if(cnt == n-1) {
    cout << ans << endl;
  } else {
    cout << "orz" << endl;
  }
  return 0;
}
```

## 单源最短路径*

P4779 【模板】单源最短路径（标准版） https://www.luogu.com.cn/problem/P4779

### Dijkstra

适用条件：边权非负

# 第七章 动态规划

## 7.3 矩阵连乘

POJ1651 Multiplication Puzzle http://poj.org/problem?id=1651

02.14 我这边看poj暂时上不去，可以去 openjudge 或 vjudge 交题

http://bailian.openjudge.cn/practice/1651
https://vjudge.net/problem/OpenJ_Bailian-1651

注意输入问题，输入n个数表示n-1个矩阵。
例如，假设 $p = \{ 10, 30, 5, 60 \}$，相当于给出了 $A_1(10*30), A_2(30*5), A_3(5*60)$ 三个矩阵。
所以代码中 `matrixChainOrder(int n)` 传入的是 n-1.

### 7.3.1 普通动态规划/区间DP

枚举顺序：三重循环

* 先枚举区间长度len（从2到n）
* 再枚举区间左端点i（右端点j通过计算得出）
* 再枚举分段点k（从i到j）

```cpp
#include <iostream>
#include <climits>
using namespace std;

const int MAX = 110;

int n, p[110];
int dp[MAX][MAX] = {0};

void matrixChainOrder(int n) {
    // 初始化对角线为0，因为单个矩阵不需要乘法
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;
    }

    // 计算 dp[i][j] 对于所有可能的子链长度
    for (int len = 2; len <= n; len++) {  // len 是子链的长度
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;  // 初始化为最大值

            // 尝试所有可能的划分点 k
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j];
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                }
            }
        }
    }

    cout << dp[1][n] << endl;
}

int main() {
    cin >> n;
    for(int i = 0; i < n; i++)
      cin >> p[i];
    matrixChainOrder(n-1);

    return 0;
}
```

### 7.3.2* 备忘录方法（代码不用掌握）

```cpp
#include <iostream>
#include <climits>
using namespace std;

int n, p[110];
const int MAX = 110;
int dp[MAX][MAX];

void init() {
    // 初始化备忘录表为 -1
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
          dp[i][j] = -1;
      }
    }
    // 初始化对角线为 0，因为单个矩阵不需要乘法
    for(int i = 1; i <= n; i++) {
      dp[i][i] = 0;
    }
}

// 备忘录方法递归函数
int Memo(int i, int j) {
    // 子问题已经计算过
    if (dp[i][j] != -1) {
        return dp[i][j];
    }

    // 初始化最小乘法次数为最大值
    dp[i][j] = INT_MAX;

    // 尝试所有可能的划分点 k
    for (int k = i; k < j; k++) {
        int cost = Memo(i, k) + Memo(k + 1, j) + p[i - 1] * p[k] * p[j];
        if (cost < dp[i][j]) {
            dp[i][j] = cost;
        }
    }

    // 返回当前子问题的解
    return dp[i][j];
}

int main() {
    cin >> n;
    for(int i = 0; i < n; i++)
    cin >> p[i];

    init();

    int result = Memo(1, n-1);
    cout << result << endl;

    return 0;
}
```

## 7.4 最长公共子序列LCS

https://www.51nod.com/Html/Challenge/Problem.html#problemId=1006
https://vjudge.net/problem/51Nod-1006
 
> 下面的题目数据范围更大，$O(n^2)$ 做法会超时
  P1439 【模板】最长公共子序列 https://www.luogu.com.cn/problem/P1439

书p139是递归来还原LCS，我感觉用栈更好理解

```cpp
#include<cstdio>
#include<cstring>
#include<stack>
using namespace std;

const int M = 1010;
char s1[M], s2[M];
int len1, len2;
int dp[M][M];
// s[i][j] 记录dp数组对应位置是由哪一个状态转移来的，用于还原LCS
int s[M][M];
// 1: 由 dp[i-1][j-1] 计算 dp[i][j]
// 2: 由 dp[i-1][j] 计算 dp[i][j]
// 3: 由 dp[i][j-1] 计算 dp[i][j]

int main() {
  scanf("%s", s1+1);
  scanf("%s", s2+1);
  len1 = strlen(s1+1);
  len2 = strlen(s2+1);
  
  for(int i = 1; i <= len1; i++) {
    for(int j = 1; j <= len2; j++) {
      if(s1[i] == s2[j]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        s[i][j] = 1;
      }
      else if(dp[i-1][j] >= dp[i][j-1]) {
        dp[i][j] = dp[i-1][j];
        s[i][j] = 2;
      }
      else {
        dp[i][j] = dp[i][j-1];
        s[i][j] = 3;
      }
    }
  }

  // 本题不需要输出LCS长度
  // printf("%d\n", dp[len1][len2]);

  // 倒推还原LCS，需要用到栈
  int i = len1, j = len2;
  stack<char> st;
  while(i > 0 && j > 0) {
    if(s[i][j] == 1) {
      st.push(s1[i]);
      i--;
      j--;
    }
    else if(s[i][j] == 2) {
      i--;
    }
    else {
      j--;
    }
  }

  // 输出LCS
  while(!st.empty()) {
    printf("%c", st.top());
    st.pop();
  }
  printf("\n");
  
  return 0;
}
```

递归做法 by deepseek：

```cpp
void printLCS(int i, int j) {
    if (i == 0 || j == 0) // 递归终止条件
        return;
    if (s[i][j] == 1) {
        // 当前字符属于LCS，先递归处理前驱再输出
        printLCS(i - 1, j - 1);
        printf("%c", s1[i]); // s1[i]或s2[j]均可，因二者相等
    } else if (s[i][j] == 2) {
        // 从上方转移，递归处理(i-1,j)
        printLCS(i - 1, j);
    } else {
        // 从左方转移，递归处理(i,j-1)
        printLCS(i, j - 1);
    }
}

main()...
    printLCS(len1, len2); // 递归输出LCS
    printf("\n");

```

## 7.6 01背包

U225269 01背包问题 https://www.luogu.com.cn/problem/U225269

由于书上没涉及滚动数组优化等，只给出朴素代码。

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;

const int M = 1010;

// n表示物品的数量，m表示背包的容量
int n, m;

// 注意这和题目对w和v的定义是相反的，但是这样写更符合常规
int w[M], v[M]; // w[i]表示第i个物品的重量，v[i]表示第i个物品的价值
int dp[M][M];


int main() {
  scanf("%d %d", &m, &n);
  for(int i = 1; i <= n; i++) {
    scanf("%d %d", &w[i], &v[i]);
  }

  for(int i = 1; i <= n; i++) { // 枚举物品
    for(int j = 1; j <= m; j++) { // 枚举背包容量
      if(j < w[i]) {
        dp[i][j] = dp[i-1][j];
      } else {
        dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i]);
      }
    }
  }

  printf("%d\n", dp[n][m]);
  
  return 0;
}
```

回溯找到被选中的物品：

```cpp
#include<stack>
using namespace std;

stack<int> s;

main()...
    dp...
    // 回溯找到被选中的物品
    int j = m;
    for(int i = n; i >= 1; i--) { // 从第n个物品往前找
        if(dp[i][j] != dp[i-1][j]) { // 如果dp[i][j] > dp[i-1][j]，说明第i个物品被选中
            s.push(i);
            j -= w[i];
        }
    }
    // 输出被选中的物品编号
    printf("选择的物品编号(从小到大): ");
    while(!s.empty()) {
        printf("%d ", s.top());
        s.pop();
    }
    printf("\n");
```

# 第八章 回溯法

## 8.2⭐️⭐️⭐️ 八皇后

P1219 [USACO1.5] 八皇后 Checker Challenge https://www.luogu.com.cn/problem/P1219

一行一行放皇后。判断是否能放：列、主对角线、副对角线都没有冲突

### 方法1（书上的方法）约600ms

当两个皇后在同一对角线时（无论是 主对角线/左上到右下 还是 副对角线/右上到左下），它们的 **行号之差** 一定等于 **列号之差**（绝对值）。

例如，
主对角线：(1,2), (2,1) 行号之差为1，列号之差也为1
副对角线：(1,2), (2,3) 行号之差为1，列号之差也为1

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;

int n;
int ans = 0;

// 从第一行开始放皇后，每一行只能放一个皇后
int hang[20]; // 存储每一行皇后所在的列号

// 判断在第u行第i列放置皇后是否与前面的皇后冲突
bool isSafe(int u, int i) {
  for(int j = 1; j < u; j++) {
    if(hang[j] == i || abs(u - j) == abs(i - hang[j])) {
      return false;
    }
  }
  return true;
}

// 打印找到的解
void print(){
  for(int i=1;i<=n;i++){
      printf("%d ",hang[i]); // 打印每一行皇后所在的列号
  }
  printf("\n");
}

void dfs(int u) {
  if(u > n) { // 找到一个解
    ans++;
    if(ans <= 3) print();
    return;
  }

  for(int i = 1; i <= n; i++) { // 尝试在第u行的每一列放置皇后
    if(isSafe(u, i)) {
      hang[u] = i; // 在第u行第i列放皇后
      dfs(u+1);
      hang[u] = 0; // 回溯，取消标记
    }
  }
}

int main() {
  scanf("%d", &n);
  dfs(1);
  printf("%d\n", ans);
  return 0;
}
```

### 方法2* 约260ms

- 各条主对角线（左上到右下）的特点是：行号u和列号i满足u - i为常数。
例如，
(1,1), (2,2), (3,3), (4,4)的u-i都是1
(1,2), (2,3), (3,4)的u-i都是-1
(1,3), (2,4)的u-i都是-2

- 各条副对角线（右上到左下）的特点是：行号u和列号i满足u + i为常数。
例如，
(1,4), (2,3), (3,2), (4,1)的u+i都是5
(1,3), (2,2), (3,1)的u+i都是4
(1,2), (2,1)的u+i都是3

```cpp
#include<cstdio>

int n;
int ans = 0;

// 从第一行开始放皇后，每一行只能放一个皇后
int hang[20]; // 存储每一行皇后所在的列号
bool lie[10], xie1[1000], xie2[1000]; // 标记列、主对角线和副对角线是否被占用

// 打印找到的解
void print(){
  for(int i=1;i<=n;i++){
      printf("%d ",hang[i]); // 打印每一行皇后所在的列号
  }
  printf("\n");
}

void dfs(int u) {
  if(u > n) { // 找到一个解
    ans++;
    if(ans <= 3) print();
    return;
  }

  for(int i = 1; i <= n; i++) { // 尝试在第u行的每一列放置皇后
    if(!lie[i] && !xie1[u+i] && !xie2[u-i+n]) { // 检查是否被占用，注意下标不能为负数，所以xie2的下标整体加n
      hang[u] = i;
      lie[i] = xie1[u+i] = xie2[u-i+n] = true; // 标记该列及两个对角线被占用
      dfs(u+1); // 递归处理下一行
      lie[i] = xie1[u+i] = xie2[u-i+n] = false; // 回溯，取消标记
    }
  }
}

int main() {
  scanf("%d", &n);
  dfs(1);
  printf("%d\n", ans);
  return 0;
}
```

## 8.4⭐⭐⭐ 图的着色

P2819 图的 m 着色问题 https://www.luogu.com.cn/problem/P2819

和八皇后问题很类似

```cpp
#include<iostream>

using namespace std;

const int MAXN = 101;
int n, k, m;
int graph[MAXN][MAXN];
int color[MAXN];
int ans = 0;

bool isValid(int u, int c) {
    for (int v = 1; v <= n; v++) { // 寻找与u相连的节点
        if (graph[u][v] && color[v] == c) {
            return false;
        }
    }
    return true;
}

void dfs(int u) {
    if (u > n) {
        ans++;
        return;
    }
    for (int i = 1; i <= m; i++) {
        if (isValid(u, i)) {
            color[u] = i;
            dfs(u + 1);
            color[u] = 0; // 回溯
        }
    }
}

int main() {
    cin >> n >> k >> m;
    
    for (int i = 0; i < k; i++) {
        int u, v;
        cin >> u >> v;
        graph[u][v] = 1;
        graph[v][u] = 1;
    }
    
    dfs(1);
    
    cout << ans << endl;
    return 0;
}
```

## EX1: 全排列

```cpp
#include <iostream>
using namespace std;

int n;
int x[100];
int total = 0;

void Swap(int &a, int &b) {
    int t = a;
    a = b;
    b = t;
}

void Backtrack(int i) {
    if (i > n) { // 终止条件：当前排列完成
        for (int j = 1; j <= n; j++) {
            cout << x[j] << " ";
        }
        cout << endl;
        total++;
    } else {
        for (int j = i; j <= n; j++) { // 遍历 i 到 n 之间的所有可能选项
            Swap(x[i], x[j]); // 交换 x[i] 和 x[j]，尝试新排列
            Backtrack(i + 1); // 递归进入下一层，继续排列
            Swap(x[i], x[j]); // 交换回去，恢复原状（回溯）
        }
    }
}

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        x[i] = i;
    }
    Backtrack(1);
    cout << "total = " << total << endl;
    return 0;
}
```

# 第九章 分支限界法

这怎么出题？