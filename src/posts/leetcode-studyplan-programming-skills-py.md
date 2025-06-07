---
title: 'LeetCode 题库：编程基础 0 到 1（Python3实现）'
createdAt: '2025-06-06T14:00:00.000Z'
updatedAt: '2025-06-07T14:00:00.000Z'
photo: 'https://img.ayame.network/leetcode-studyplan-programming-skills-py/programming-skills.png'
tags: ['algorithm']
summary: 'Python 从 0 到 0.1：GPT 带练版'
---

初学 Python，用简单题熟悉一下基础语法。题目来源：[LeetCode 学习计划：编程基础 0 到 1](https://leetcode.cn/studyplan/programming-skills/)

每道题先自己写一遍，然后让 ChatGPT 给出更简洁、更 Pythonic 的优化建议。

# 基础实现

## 1768. 交替合并字符串

### \#1

```py
class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        len1 = len(word1)
        len2 = len(word2)
        res = ""
        i = 0
        j = 0
        c = True # True: word1, False: word2
        while i < len1 and j < len2:
            if c:
                res += word1[i]
                i += 1
            else:
                res += word2[j]
                j += 1
            c = not c
        if i == len1:
            res += word2[j:]
        else:
            res += word1[i:]
        return res
```

### \#GPT

```py
class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        res = []
        for a, b in zip(word1, word2):
            res.append(a)
            res.append(b)
        res.append(word1[len(word2):])
        res.append(word2[len(word1):])
        return ''.join(res)
```

### 学习要点（zip函数）

- `zip()` “配对”多个可迭代对象（如 `str`、`list`、`tuple`），返回一个元组迭代器。如果各对象长度不同，zip 只取到**最短那个的长度**，多出来的会被忽略。

```py
a = [1, 2, 3]
b = ['a', 'b', 'c']
for x, y in zip(a, b):
    print(x, y)

"""
1 a
2 b
3 c
"""
```


- 拓展：`itertools.zip_longest(*iterables, fillvalue=None)` 用 `fillvalue` 填充不够长的对象的空缺部分。

```py
from itertools import zip_longest

a = [1, 2, 3]
b = ['a', 'b']
for x, y in zip_longest(a, b, fillvalue='-'):
    print(x, y)

"""
1 a
2 b
3 -
"""
```

## 389. 找不同

### \#1

```py
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        bucket_s = {}
        bucket_t = {}
        for i in s:
                bucket_s[i] = bucket_s.get(i, 0) + 1
        for j in t:
                bucket_t[j] = bucket_t.get(j, 0) + 1
        for k in bucket_t.keys():
            if bucket_s.get(k,0) != bucket_t[k]:
                  return k
```
思路：用两个字典分别统计每个字符出现次数，再比对找出多出来的那个。

### \#GPT

```py
from collections import Counter

class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        count_s = Counter(s)
        count_t = Counter(t)
        for ch in count_t:
            if count_t[ch] != count_s.get(ch, 0):
                return ch
```

### 学习要点（dict.get；Counter类）

- `dict.get(key, default=None)` ：如果键不存在，返回默认值，默认为 `None`
  最常用的可以避免 `KeyError` 的计数统计写法：`d[i] = d.get(i, 0) + 1`，“如果key存在则+1，不存在则初始化为1”。
- `Counter` ：**字典的子类**，用于统计可迭代对象中每个元素的出现次数。**value 默认是 0，key 不存在时不会报错。**

```py
from collections import Counter

# 字符串
c1 = Counter("aabbbc")
print(c1)  # Counter({'b': 3, 'a': 2, 'c': 1})

# 列表
c2 = Counter([1,2,2,3,3,3])
print(c2)  # Counter({3: 3, 2: 2, 1: 1})

# 字典
c3 = Counter({'apple':2, 'banana':4})
print(c3)  # Counter({'banana': 4, 'apple': 2})

# 关键字
c4 = Counter(a=3, b=1)
print(c4)  # Counter({'a': 3, 'b': 1})

# 出现次数最多的元素
c = Counter("abracadabra")
print(c.most_common(2))  # [('a', 5), ('b', 2)]

# 加减运算（dict 不支持）
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print(c1 + c2)  # Counter({'a': 4, 'b': 3})
print(c1 - c2)  # Counter({'a': 2})
```

## 28. 找出字符串中第一个匹配项的下标

### \#1（暴力法）

```py
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        for pos in range(len(haystack)):
            if haystack[pos:pos + len(needle)] == needle:
                return pos
        return -1
```

### 学习要点（range的范围；str.find）

- `range(start, stop, step)` **左闭右开**，`start` 默认是 0，`step` 默认是 1。
- 循环可以缩短至 `len(haystack) - len(needle) + 1`。
- `str.find(sub[, start[, end]])` ：返回字串在原串中第一个匹配项的下标，找不到则返回 -1。



## 242. 有效的字母异位词

### \#1

```py
from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)
```

## 459. 重复的子字符串

### \#1

```py
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        for times in range(1, len(s)):
            if len(s) % times == 0:
                sliced = [s[i:i+times] for i in range(0, len(s), times)]
                sliced_set = set(sliced)
                if len(sliced_set) == 1:
                    return True
        return False
```

- 枚举重复子串的所有可能长度
- 用 `set` 判断切出来的部分是不是都一样

### \#GPT 优化

```py
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        n = len(s)
        for times in range(1, n // 2 + 1):
            if n % times == 0:
                if s[:times] * (n // times) == s:
                    return True
        return False
```

- 无需枚举到 `len(s)`，因为重复子串长度一定 `<= len(s) // 2`
- 无需切片、建 `set`，只需将 `s[:times]` 重复 `(n // times)` 次，若和原串相等，说明有重复子串

### \#GPT 另解

```py
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        return s in (s + s)[1:-1]
```

- 如果原串 `s` 由重复的子串 `t` 构成，那么 `t` 至少重复2次，假设就是2次：
- `s + s` 将包含4个 `t`
- 删去 `s + s` 头尾各一个字符后，仍然会留下连续的2个 `t`，即原串 `s`
- 若 `t` 重复了更多次，进行上述操作后留下的串， `s` 也会相应出现更多次
- 综上，如果 `s` 是 `(s + s)[1:-1]` 的子串，说明有重复子串

### 学习要点（切片）

- 切片：`s[start:end]` 返回从 `start` 到 `end-1` 的子串
- `end` 可以为负数，此时表示从后往前数

## 283. 移动零

### \#1

```py
from typing import List

class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        cnt = nums.count(0)
        for _ in range(cnt):
            nums.remove(0)
            nums.append(0)
```

### \#GPT 另解1（双指针法）

```py
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        n = len(nums)
        i = 0
        j = 0
        for i in range(n):
            if nums[i] != 0:
                nums[j] = nums[i]
                j += 1
        while j < n:
            nums[j] = 0
            j += 1
```

### \#GPT 另解2（排序法）

```py
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        nums.sort(key=lambda x: x == 0)
```

- 由于有排序，时间复杂度为 `O(n log n)`，时间不是最优的

### 学习要点（sort）

- `list.sort(*, key=None, reverse=False)`
  - `key` ：一个函数，从每个列表元素中提取**比较键**(`comparison key`)，用于决定元素在排序时的相对顺序
  - **Q：什么是比较键？**
    任何可比较的类型，比如 `int`、`str`、`tuple`
    对布尔型变量，`True` 被视为 `1`，`False` 被视为 `0`
- 本题中，`key=lambda x: x == 0` 表示将 `0` 视为 `True`，其他值视为 `False`，从而实现：
  - 为 `0` 的元素最大，被移到末尾
  - 其他元素一样大，次序不变

### 拓展（序列类型；更多排序示例）

- **序列类型（Sequence Types）**：能按顺序存储多个元素的类型
  **可变序列类型（Mutable Sequence Types）**：可以随意修改其中的元素
    `list`, `bytearray`, `array.array`...
  **不可变序列类型（Immutable Sequence Types）**：创建后就不能修改
    `str`, `tuple`, `bytes`, `range`...
  像 `remove()`、`append()` 这样的方法，只有**可变序列类型**才能使用

- 其他排序示例

```py
# 按字符串小写排序（忽略大小写）
words = ["Apple", "bat", "Cherry", "DATE"]
words.sort(key=str.lower)
print(words)  # ['Apple', 'bat', 'Cherry', 'DATE']

# 按绝对值排序
numbers = [-5, 2, -10, 8, -1]
numbers.sort(key=abs)
print(numbers)  # [-1, 2, -5, 8, -10]

# 按元组的第二个元素排序
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
pairs.sort(key=lambda x: x[1])
print(pairs)  # [(1, 'one'), (3, 'three'), (2, 'two')]
```

## 66. 加一

### \#1

```py
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        d = 0
        n = len(digits)
        for i in reversed(digits):
            if i != 9:
                break
            d += 1
        for i in range(n - 1, n - d - 1, -1):
            digits[i] = 0
        if n - d - 1 < 0:
            digits.insert(0, 1)
        else:
            digits[n - d - 1] += 1
        return digits
```

- 找出末尾连续的9，统一置零
- 对第一个不是9的数加一
- 如果所有数都是9，说明需要向前进一位

### \#GPT 优化

```py
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        n = len(digits)
        for i in range(n - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits
```

- 从后往前遍历，遇到不是9的数就加1并返回，否则设为0
- 如果所有数都是9，说明需要向前进一位

### 学习要点（列表相加）

- 列表头插入元素，可以当作列表之间的相加：`[1] + digits`

## 1822. 数组元素积的符号

### \#1

```py
class Solution:
    def arraySign(self, nums: List[int]) -> int:
        res = True
        for i in nums:
            if i == 0:
                return 0
            if i < 0:
                res = not res
        return 1 if res else -1
```

- 布尔变量模拟符号翻转

## 1502. 判断能否形成等差数列

### \#1

```py
class Solution:
    def canMakeArithmeticProgression(self, arr: List[int]) -> bool:
        arr.sort()
        d = arr[1] - arr[0]
        num = arr[0]
        for i in range(1, len(arr)):
            if num + d != arr[i]:
                return False
            num += d
        return True
```

- 排序后，检查相邻元素的差是否相等

## 896. 单调数列

### \#1

```py
class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        n = len(nums)
        asc = 0
        dsc = 0
        for i in range(1, n):
            if nums[i] < nums[i - 1]:
                dsc += 1
            elif nums[i] > nums[i - 1]:
                asc += 1
        return False if (asc and dsc) else True
```

- 分别统计“升序”和“降序”的次数，若两者都存在，则不是单调数列

## 13. 罗马数字转整数

### \#1

```py
class Solution:
    def romanToInt(self, s: str) -> int:
        n = len(s)
        res = 0
        pos = 0
        while pos < n:
            # print("now: ", res)
            match s[pos]:
                case 'M':
                    res += 1000
                case 'D':
                    res += 500
                case 'C':
                    if pos + 1 < n and s[pos + 1] == 'M':
                        res += 900
                        pos += 1
                    elif pos + 1 < n and s[pos + 1] == 'D':
                        res += 400
                        pos += 1
                    else:
                        res += 100
                case 'L':
                    res += 50
                case 'X':
                    if pos + 1 < n and s[pos + 1] == 'C':
                        res += 90
                        pos += 1
                    elif pos + 1 < n and s[pos + 1] == 'L':
                        res += 40
                        pos += 1
                    else:
                        res += 10
                case 'V':
                    res += 5
                case 'I':
                    if pos + 1 < n and s[pos + 1] == 'X':
                        res += 9
                        pos += 1
                    elif pos + 1 < n and s[pos + 1] == 'V':
                        res += 4
                        pos += 1
                    else:
                        res += 1
            pos += 1
        return res
```

### 学习要点（match-case）

- `match-case` ：Python 3.10 引入，类似 C 语言 `switch-case`
  - 每个 `case` 自动 `break`，不穿透
  - `case _:` = `default:`

# 内置函数

## 58. 最后一个单词的长度

### \#1

```py
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        words = s.split()
        return len(words[-1])
        # 可以直接简写成一行 return len(s.split()[-1])
```

### 学习要点

- `str.split(sep=None, maxsplit=-1)` ：将字符串按 `sep` 分割，返回一个列表
  - `sep` ：分隔符
  - 未指定 `sep` ：将任意长度的连续空格视为单个分隔符
  - 指定 `sep` ：将字符串按 `sep` 分割，且连续的分隔符会被视为空字符串，例如：`'1,,2'.split(',')` 返回 `['1', '', '2']`
  - `maxsplit` ：最大分割次数，默认为 `-1`，即不限制

## 709. 转换成小写字母

### \#1

```py
class Solution:
    def toLowerCase(self, s: str) -> str:
        return s.lower()
```

### 拓展（字符串方法）

- `lower()` `upper()` `capitalize()` 字面意思

# 模拟

## 682. 棒球比赛

### \#1

```py
class Solution:
    def calPoints(self, operations: List[str]) -> int:
        res = []
        for op in operations:
            match op:
                case '+':
                    res.append(res[-1] + res[-2])
                case 'D':
                    res.append(res[-1] * 2)
                case 'C':
                    res.pop()
                case _:
                    res.append(int(op))
        return sum(res)
```

## 657. 机器人能否返回原点

### \#1

```py
class Solution:
    def judgeCircle(self, moves: str) -> bool:
        coord = [0, 0]
        for op in moves:
            if op == 'R':
                coord[0] += 1
            elif op == 'L':
                coord[0] -= 1
            elif op == 'U':
                coord[1] += 1
            elif op == 'D':
                coord[1] -= 1
        if coord[0] == 0 and coord[1] == 0:
            return True
        return False
```

- 坐标模拟

### \#GPT 另解

```py
class Solution:
    def judgeCircle(self, moves: str) -> bool:
        return moves.count('U') == moves.count('D') and moves.count('L') == moves.count('R')
```

- 字面意思

## 1275. 找出井字棋的获胜者

### \#1 (WA)

```py
class Solution:
    def judgeWin(self, moves: int) -> bool:
        print(moves)
        wins = [111000000, 111000, 111, 100100100, 10010010, 1001001, 100010001, 1010100]
        for win in wins:
            if moves & win == win:
                return True
        return False
    
    def tictactoe(self, moves: List[List[int]]) -> str:
        steps = {
            "[0, 0]": 100000000,
            "[0, 1]": 10000000,
            "[0, 2]": 1000000,
            "[1, 0]": 100000,
            "[1, 1]": 10000,
            "[1, 2]": 1000,
            "[2, 0]": 100,
            "[2, 1]": 10,
            "[2, 2]": 1
        }
        movesA = 0
        movesB = 0
        for i in range(len(moves)):
            if i % 2 == 0:
                movesA += steps[str(moves[i])]
            else:
                movesB += steps[str(moves[i])]
        if self.judgeWin(movesA):
            return 'A'
        elif self.judgeWin(movesB):
            return 'B'
        elif len(moves) == 9:
            return "Draw"
        else:
            return "Pending"
```

- Wrong Answer：三脚猫二进制，甚至不是二进制

### \#2 (AC)

```py
from typing import List

class Solution:
    def judgeWin(self, moves: int) -> bool:
        print(moves)
        wins = [0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100]
        for win in wins:
            if moves & win == win:
                return True
        return False
    
    def tictactoe(self, moves: List[List[int]]) -> str:
        A, B = 0, 0
        for i, (r, c) in enumerate(moves):
            pos = r * 3 + c
            if i % 2 == 0:
                A |= (1 << pos)
            else:
                B |= (1 << pos)
        if self.judgeWin(A):
            return 'A'
        elif self.judgeWin(B):
            return 'B'
        elif len(moves) == 9:
            return "Draw"
        else:
            return "Pending"
```

- 正确的位运算
- 棋盘编码：
  ```plain
  0 | 1 | 2
  ---------
  3 | 4 | 5
  ---------
  6 | 7 | 8
  ```
  - [row, col] 这个位置的编号 = `row * 3 + col`

### 学习要点（位运算；enumerate）

- 位运算：`&` `|` `^` `~` `<<` `>>`
- 用移位 `(1 << pos)` 表示棋子所占位置
- `enumerate(iterable, start=0)`：同时获得“索引”与“内容”
  - `start` ：起始下标，默认为 `0`
  - 本题中的用法：
  ```py
  for i, (r, c) in enumerate(moves):
  ```
    等价于：
  ```py
  i = 0
  for move in moves:
      r, c = move
      # do something
      i += 1
  ```

## 1041. 困于环中的机器人

### \#1 (WA)

```py
class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        # 0 - N, 1 - E, 2 - S, 3 - W
        direc = 0
        coord = [0, 0]
        inc = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        for op in instructions:
            if op == 'G':
                coord += inc[direc]
            elif op == 'L':
                direc = (direc - 1) % 4
            elif op == 'R':
                direc = (direc + 1) % 4
        if coord == [0, 0] or direc:
            return True
        return False
```

### \#2 (AC)

略

- 思路：
  - 模拟机器人移动
  - 若回到原点：无论此时机器人面朝哪个方向，都会不断重复相同的路径形成环。
  - 否则，若机器人朝向改变：多次执行指令后，位移相互抵消，路径形成环。（最终面向南：重复两次；最终面向东或西：重复四次）
  - 只有这两种情况，机器人会形成环。

- \#1 思路没有错，但**坐标相加写法有误**
  - `coord` 是列表（如 `[0, 0]`），`inc[direc]` 也是列表（如 `[0, 1]`）
  - `coord += inc[direc]` 实际效果是列表扩展（等价于 `coord.extend(inc[direc])`，得到 `[0, 0, 0, 1]`），而不是向量加法。
  - 正确写法是分开相加：`coord[0] += inc[direc][0]` `coord[1] += inc[direc][1]`

### 拓展（向量加法）

- 不仅列表的相加不是向量加法，元组的相加**也不是**向量加法
  - 区别在于，列表相加是原地扩展，元组相加是创建了一个新的元组
- **Q：什么情况下加号是向量加法？**
  - `numpy` 库的 `array`
```py
import numpy as np
a = np.array([0, 0])
b = np.array([1, 1])
print(a + b)  # [1 1]
```

# 矩阵

## 1672. 最富有客户的资产总量

### \#1

```py
class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        return max(map(sum, accounts))
        # 或 列表推导式：return max([sum(account) for account in accounts])
```

### 学习要点（map函数；迭代器）

- `map(function, iterable, *iterables)`
  - 如果只有一个 `iterable`
    1. 取出 `iterable` 中的每个元素。
    2. 将元素传入 `function`，得到结果。
    3. 将所有结果收集到一个 `map` 对象中（需要显式转换为 `list` 等才能看到）。
  - 如果有多个 `iterables`
    1. 每次从每个可迭代对象中取一个元素，组成一组参数。
    2. 将这组参数传入 `function`，得到结果。
    3. 继续处理，直到最短的可迭代对象耗尽。
- 在本题中，与列表推导式相比，`map` 更简洁，且惰性求值更高效
- **Q: 什么是迭代器 `iterator`？**
  - 迭代器是实现了 `__iter__` 和 `__next__` 方法的对象。
  - 可以用 `iter` 函数来创建，例如`it = iter([1, 2, 3])`。
  - 可以用 `for` 或 `next` 逐一访问其元素。
  - 可以被 `list`, `tuple`, `set`, `dict` 等函数转换为其他数据类型。
  - **一次性**：迭代器只能遍历一次，一旦被遍历完 **（耗尽：exhaust）**，就不能再重新开始。

## 1572. 矩阵对角线元素的和

### \#1

```py
class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        res = 0
        n = len(mat)
        for i in range(n):
            for j in range(n):
                if i == j: # 主对角线
                    res += mat[i][j]
                elif i + j == n - 1: # 副对角线
                    res += mat[i][j]
        return res
```

- 时间复杂度：$O(n^2)$

### \#GPT 优化

```py
class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        n = len(mat)
        res = 0
        for i in range(n):
            res += mat[i][i]              # 主对角线
            res += mat[i][n - 1 - i]      # 副对角线
        # 如果 n 是奇数，中间的元素会被加两次，要减去一次
        if n % 2 == 1:
            res -= mat[n // 2][n // 2]
        return res
```

- 主副对角线同时处理。时间复杂度：$O(n)$

## 54. 螺旋矩阵

### \#1 转向逻辑较复杂

```py
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        m, n = len(matrix), len(matrix[0])
        vis = [[False for _ in range(n)] for _ in range(m)]
        # 0 - U, 1 - R, 2 - D, 3 - L
        direc = 1
        pos = [0, 0]
        inc = [[-1, 0], [0, 1], [1, 0], [0, -1]]
        res = []
        while not vis[pos[0]][pos[1]]: # 如果当前位置未访问过，则继续
            res.append(matrix[pos[0]][pos[1]])
            vis[pos[0]][pos[1]] = True # 标记为已访问
            tries = 4 # 进行4次转向尝试
            no_more_try = False
            while tries > 0:
                # 尝试走一步
                nx = pos[0] + inc[direc][0]
                ny = pos[1] + inc[direc][1]
                if nx == m or nx < 0 or ny == n or ny < 0 or vis[nx][ny]: # 走到了边界或已经访问过，则转向
                    direc = (direc + 1) % 4
                    tries -= 1
                    if tries < 0: # 如果4次尝试都失败，标记无法继续
                        no_more_try = True
                else:
                    pos[0] = nx
                    pos[1] = ny
                    break
            if no_more_try: # 退出循环
                break
        return res
```

### \#GPT 另解1 边界收缩法

```py
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix or not matrix[0]:
            return []
        res = []
        m, n = len(matrix), len(matrix[0])
        top, bottom, left, right = 0, m - 1, 0, n - 1
        while top <= bottom and left <= right:
            # 从左到右
            for col in range(left, right + 1):
                res.append(matrix[top][col])
            top += 1
            # 从上到下
            for row in range(top, bottom + 1):
                res.append(matrix[row][right])
            right -= 1
            # 从右到左
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    res.append(matrix[bottom][col])
                bottom -= 1
            # 从下到上
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    res.append(matrix[row][left])
                left += 1
        return res
```

- 维护上下左右四个边界，每次沿着一条边走到头，然后收缩边界
- 保证边界满足 `top <= bottom` 和 `left <= right`，否则退出

### 拓展 矩阵转置法（参数解包，反转列表）

```py
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        while matrix:
            res.extend(matrix.pop(0)) # 取出矩阵的第一行，加到结果中
            matrix = list(zip(*matrix))[::-1] # 旋转剩余的矩阵
        return res
```

- `*` [参数解包](https://docs.python.org/zh-cn/3/tutorial/controlflow.html#unpacking-argument-lists)
  ```py
  matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  print(*matrix) # [1, 2, 3], [4, 5, 6], [7, 8, 9]
  ```
- `zip(*matrix)` 将拆分的列表对应位置组合在一起，正好就是转置后的矩阵，**注意返回的是元组迭代器，需要`list()`显式转换为列表**
- `[::-1]` 反转列表
- 图解：

```plain
[1, 2, 3]         [4, 5, 6]         (4, 7)         [4, 7]         [6, 9]
[4, 5, 6]   -->   [7, 8, 9]   -->   (5, 8)   -->   [5, 8]   -->   [5, 8]
[7, 8, 9]                           (6, 9)         [6, 9]         [4, 7]
```

## 73. 矩阵置零

### \#1 O(m + n)

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        m, n = len(matrix), len(matrix[0])
        mod_row = [False for _ in range(m)]
        mod_col = [False for _ in range(n)]
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    mod_row[i] = True
                    mod_col[j] = True
        for i in range(m):
            if mod_row[i]:
                for k in range(n):
                    matrix[i][k] = 0
        for j in range(n):
            if mod_col[j]:
                for k in range(m):
                    matrix[k][j] = 0
```

# 数学

## 1523. 在区间范围内统计奇数数目

### \#1

```py
class Solution:
    def countOdds(self, low: int, high: int) -> int:
        if low % 2 == 0:
            low += 1
        if high % 2 == 0:
            high -= 1
        return (high - low) // 2 + 1
```

- 全部转化为首尾都是奇数的情况，然后计算奇数个数

### \#GPT

```py
class Solution:
    def countOdds(self, low: int, high: int) -> int:
        return (high + 1) // 2 - low // 2
```

### 学习要点（数奇数偶数）

- 在 1 到 n 的所有数中，奇数的个数是 `n // 2`（n为偶）或 `(n // 2) + 1`（n为奇）
- 用一个式子概括：`(n + 1) // 2`
- 所以，`[low, high]` 区间内的奇数个数 = `1~high` 的奇数个数 - `1~(low-1)` 的奇数个数

## 1491. 去掉最低工资和最高工资后的工资平均值

### \#1

```py
class Solution:
    def average(self, salary: List[int]) -> float:
        minn, maxx = 0x3f3f3f3f, -1
        for s in salary:
            minn = min(minn, s)
            maxx = max(maxx, s)
        return (sum(salary) - maxx - minn) / (len(salary) - 2)
```

### \#GPT
```py
class Solution:
    def average(self, salary: List[int]) -> float:
        return (sum(salary) - min(salary) - max(salary)) / (len(salary) - 2)
```

### 学习要点（min, max）

- `min()` 和 `max()` 可以直接用在列表上，同样是 $O(n)$ 时间复杂度


## 860. 柠檬水找零

### \#1

```py
class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        held_5 = 0
        held_10 = 0
        for bill in bills:
            if bill == 5:
                held_5 += 1
            elif bill == 10:
                held_5 -= 1
                held_10 += 1
            elif bill == 20:
                if held_10 > 0:
                    held_10 -= 1
                    held_5 -= 1
                else:
                    held_5 -= 3
            if held_5 < 0 or held_10 < 0:
                return False
        return True
```

- 贪心法，优先用 10 元钞票找零

## 976. 三角形的最大周长

### \#1

```py
class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        res = 0
        n = len(nums)
        nums.sort()
        for i in range(n-1, 1, -1):
            if nums[i-2] + nums[i-1] > nums[i]:
                res = nums[i-2] + nums[i-1] + nums[i]
                break # 第一个满足条件的就是最优解
        return res
```

- 贪心法，从大到小排序，找到第一个满足三角形不等式的三元组

## 1232. 缀点成线

### \#1 (RE，除零错)

```py
class Solution:
    def checkStraightLine(self, coordinates: List[List[int]]) -> bool:
        p0 = [coordinates[0][0], coordinates[0][1]]
        p1 = [coordinates[1][0], coordinates[1][1]]
        v = [p1[0] - p0[0], p1[1] - p0[1]]
        for coord in coordinates[2:]:
            vec = [coord[0] - p0[0], coord[1] - p0[1]]
            if float(vec[0]) / v[0] != float(vec[1]) / v[1]:
                return False
        return True
```

- 这个方法可能用了向量，但用了向量有点不太可能

### \#GPT

```py
class Solution:
    def checkStraightLine(self, coordinates: List[List[int]]) -> bool:
        x0, y0 = coordinates[0]
        x1, y1 = coordinates[1]
        dx, dy = x1 - x0, y1 - y0
        for x, y in coordinates[2:]:
            # (x - x0, y - y0) 与 (dx, dy) 共线，叉积等于0
            if (x - x0) * dy != (y - y0) * dx:
                return False
        return True
```

- 正宗的向量叉积

### 学习要点（叉积）

- `x0, y0 = coordinates[0]` 要比 `p0 = [coordinates[0][0], coordinates[0][1]]` 更简洁
- 向量叉积：`(x1, y1) × (x2, y2) = x1 * y2 - x2 * y1`
  - 叉积为 0，两个向量共线

## 67. 二进制求和

### \#1

```py
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        m, n = len(a), len(b)
        x, y = 0, 0
        for i, s in enumerate(a[::-1]):
            x += (int(s) << i)
        for i, s in enumerate(b[::-1]):
            y += (int(s) << i)
        return str(bin(x + y))[2:]
```

- 手动转整数相加再转回字符串

### \#GPT

```py
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return bin(int(a, 2) + int(b, 2))[2:]
```

### 学习要点（进制转换；format）

- `class int(string, /, base=10)` 自带进制转换功能，用 `base` 参数指定进制
- `bin(x)` 返回 `0b` 开头的二进制字符串
- 除了用 `[2:]` 截取，还可以用 `format(value, format_spec='')` 指定输出格式
  - `format(10, 'b')` 返回 `1010`
  - `format(10, '#b')` 返回 `0b1010`

## 43. 字符串相乘（暂时跳过）

跳过

## 50. Pow(x, n)

### \#1

```py
class Solution:
    def myPow(self, x: float, n: int) -> float:
        res = 1
        if n < 0:
            x = 1 / x
            n = -n
        while n:
            if n & 1: # 最低位为1
                res *= x
            x *= x
            n >>= 1
        return res
```

### 学习要点（快速幂）

- [50. Pow(x, n) 快速幂 清晰图解](https://leetcode.cn/problems/powx-n/solutions/241471/50-powx-n-kuai-su-mi-qing-xi-tu-jie-by-jyd/)

# 链表

## 21. 合并两个有序链表

### \#GPT

```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        while list1 and list2:
            if list1.val < list2.val:
                cur.next = list1 # 加入一个节点
                list1 = list1.next
            else:
                cur.next = list2 # 加入一个节点
                list2 = list2.next
            cur = cur.next # 把 cur 指向新加的节点
        cur.next = list1 if list1 else list2 # 拼接剩余部分
        return dummy.next
```

### 学习要点（Optional；虚拟头节点）

- `typing.Optional`
  - `Optional[X]` 等价于 `X | None`
- `dummy` 虚拟头节点，简化边界情况处理


## 206. 反转链表

### \#GPT 头插法

```py
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        while head:
            next_node = head.next     # 先保存原链表的下一个节点
            head.next = dummy.next    # 头插法：新节点指向当前反转链表头
            dummy.next = head         # dummy头指向新节点
            head = next_node          # 继续处理下一个节点
        return dummy.next
```

### \#GPT 双指针法

```py
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, curr = None, head
        while curr:
            nxt = curr.next # 暂存下一个节点
            curr.next = prev # 反转：当前节点指向前一个节点
            prev = curr # 更新前一个节点
            curr = nxt # 继续处理下一个节点
        return prev
```

## 2. 两数相加

### \#1 （AC但繁琐）

```py
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        carry = False
        while l1 and l2: # 两个链表都非空
            d = l1.val + l2.val + carry
            carry = d > 9
            d %= 10
            l1 = l1.next
            l2 = l2.next
            cur.next = ListNode(d)
            cur = cur.next
        l3 = l1 if l1 else l2 # 剩余部分
        while carry and l3:
            d = l3.val + carry
            carry = d > 9
            d %= 10
            l3 = l3.next
            cur.next = ListNode(d)
            cur = cur.next
        if l3: # 还有剩余
            cur.next = l3
        if carry: # 还有进位
            cur.next = ListNode(1)
        return dummy.next
```

### \#GPT

```py
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        carry = 0
        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            total = v1 + v2 + carry
            carry = total // 10
            cur.next = ListNode(total % 10)
            cur = cur.next
            if l1: l1 = l1.next
            if l2: l2 = l2.next
        return dummy.next
```

- 用 `v1 = l1.val if l1 else 0`，可以一次 while 走到底

## 445. 两数相加 II

### \#1

```py
class Solution:
    def revList(self, l: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = l
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        r1 = self.revList(l1)
        r2 = self.revList(l2)
        dummy = ListNode()
        cur = dummy
        carry = 0
        while r1 or r2 or carry:
            v1 = r1.val if r1 else 0
            v2 = r2.val if r2 else 0
            d = v1 + v2 + carry
            carry = d // 10
            cur.next = ListNode(d % 10)
            cur = cur.next
            if r1: r1 = r1.next
            if r2: r2 = r2.next
        return self.revList(dummy.next)
```

- 综合 反转链表 和 两数相加 的思路，先反转链表，再相加，最后再反转回来