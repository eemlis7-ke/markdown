// CodeBlock.tsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'; // テーマのインポートを変更
import { anOldHope as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
            <div className="language-name">{displayLanguage}</div> {/* displayLanguage を使用 */}
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

export default CodeBlock;
