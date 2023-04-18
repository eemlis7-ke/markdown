import React, { ReactNode, useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { irBlack as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// ここでテーマ変更 https://k8shiro.github.io/ReactCompareCodeHighlighter/

import styles from './markdown-styles.module.scss';
import "./prism-theme.css";
import CodeBlock from './CodeBlock';


const MarkdownRenderer = () => {
  const [markdownText, setMarkdownText] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch('./sample.md');
      const text = await response.text();
      setMarkdownText(text);
    };

    fetchMarkdown();
  }, []);

  const options = {
    overrides: {
      h1: ({ children, ...props }: { children: ReactNode }) => (
        <h1 className={styles.h1} {...props}>{children}</h1>
      ),
      p: ({ children, ...props }: { children: ReactNode }) => (
        <p className={styles.p} {...props}>{children}</p>
      ),
      ul: ({ children, ...props }: { children: ReactNode }) => (
        <ul className={styles.ul} {...props}>{children}</ul>
      ),
      ol: ({ children, ...props }: { children: ReactNode }) => (
        <ol className={styles.ol} {...props}>{children}</ol>
      ),
      li: ({ children, ...props }: { children: ReactNode }) => (
        <li className={styles.li} {...props}>{children}</li>
      ),
      pre: ({ children, ...props }: { children: ReactNode }) => (
        <pre className={styles.pre} {...props}>{children}</pre>
      ),
      code: ({ children, className }: { children: ReactNode | ReactNode[], className: string }) => {
        const language = className ? className.replace(/language-/, '') : undefined;
        const codeString = Array.isArray(children) ? children.join('').trim() : (children as string).trim();
        return (
          <CodeBlock language={language} codeString={codeString} />
        );
      },
      
    },
  };

  return (
    <div>
      <Markdown options={options}>{markdownText}</Markdown>
      <CodeBlock language="sass" codeString={`@import '../src/style/config';

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
}`} />
      <CodeBlock language="javascript" codeString={`import { anOldHope as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import './CodeBlock.scss';

interface CodeBlockProps {
  language: string | undefined;
  codeString: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, codeString }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const displayLanguage = language ? language.replace("lang-", "") : ""; // lang- をカット

  return (
    <div className="code-block">
        <div className="code-heading">
            <div className="language-name">{displayLanguage}</div> {/* *************************************************************************************displayLanguage を使用 */}
            <div className="copy-button">
                <CopyToClipboard text={codeString} onCopy={handleCopy}>
                <button>
                    {isCopied ? <FiCheck /> : <FiClipboard />}
                    {isCopied ? 'コピーしました' : 'コードをコピー'}
                </button>
                </CopyToClipboard>
            </div>
        </div>
      <SyntaxHighlighter language={language} style={theme}>
        {codeString}
      </SyntaxHighlighter>
      
    </div>
  );
};

export default CodeBlock;`} />
<CodeBlock language="python" codeString={`# In[1]

def geometric_sum_approximation(a, r, n):
    """
    等比級数 a + ar + ar^2 + ar^3 + ... の近似値を計算する関数
    
    Parameters
    ----------
    a : float
        等比級数の初項
    r : float
        等比級数の公比
    n : int
        級数を打ち切る項数
    
    Returns
    -------
    approx_sum : float
        等比級数の近似値
    """
    approx_sum = 0
    for i in range(n):
        approx_sum += a * (r ** i)
    return approx_sum`} />
<CodeBlock language="mermaid" codeString={`sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?`} />
    </div>
  );
};

export default MarkdownRenderer;
