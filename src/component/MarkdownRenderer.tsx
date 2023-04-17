import React, { ReactNode, useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
// ここでテーマ変更 https://k8shiro.github.io/ReactCompareCodeHighlighter/

import styles from './markdown-styles.module.scss';
import CodeBlock from './CodeBlock';


const MarkdownRenderer = () => {
  const [markdownText, setMarkdownText] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch('./src/markdown/sample.md');
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
    <Markdown options={options}>{markdownText}</Markdown>
  );
};

export default MarkdownRenderer;
