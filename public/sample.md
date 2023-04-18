# 見出し1

## 見出し2

### 見出し3

#### 見出し4

markdownサンプル文章です。ここは地の文です。

markdownでは、箇条書きは*や-などの記号を文頭に置くことで記述します。箇条書きの階層は行頭スペース4つを足します。

- これはひとつめの箇条書き
- ふたつめの箇条書き
  - 一つ階層が深い箇条書き
- みっつめの箇条書き

### コード

3つのバッククォート記号でくくることで、コード例を示します

```javascript
[ozuma@vpscon ~]$ cp a
cp: missing destination file operand after `a'
Try `cp --help' for more information.
```

```scss
@import '../src/style/config';


  @keyframes slideIn {
    0% {
      transform: translateY(10px);
      opacity: 0.1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .article-box.new-article {
    animation-name: slideIn;
    animation-duration: 0.2s; // アニメーションの長さを増やします
    animation-timing-function: ease-out; // アニメーションのタイミング関数を変更します
    animation-fill-mode: both;
    opacity: 0;
    will-change: transform, opacity; // 追加
  }
  
  .article-box.new-article.slide-in {
    opacity: 1;
  }
```

markdown形式については、Wikipediaなども参照ください

- <http://ja.wikipedia.org/wiki/Markdown>
