// CodeBlock.tsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'; // テーマのインポートを変更
import { irBlack as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { FaPython, FaSass } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import './CodeBlock.scss';
import "./prism-theme.css";

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
    }, 5000);
  };

  const renderIconByLanguage = () => {
    if (displayLanguage === "python") {
      return <FaPython />;
    } else if (displayLanguage === "sass") {
      return <FaSass />;
    } else if (displayLanguage === "javascript") {
      return <SiJavascript />;
    } else {
      return null; // 他の言語の場合、アイコンを表示しないか、デフォルトのアイコンを表示
    }
  };

  const displayLanguage = language ? language.replace("lang-", "") : ""; // lang- をカット

  return (
    <div className="code-block">
        <div className="code-heading">
            <div className="language-name">
              {renderIconByLanguage()} {/* アイコンを表示 */}
              {displayLanguage}</div> {/* displayLanguage を使用 */}
            <div className="copy-button">
                <CopyToClipboard text={codeString} onCopy={handleCopy}>
                <button className={isCopied ? 'is-copied' : ''}>
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

export default CodeBlock;
