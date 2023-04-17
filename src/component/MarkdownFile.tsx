import React from 'react';
import Markdown from 'markdown-to-jsx';
import { markdownText } from '../markdown';

const MarkdownFile: React.FC = () => {
  return (
    <Markdown>{markdownText}</Markdown>
  );
};

export default MarkdownFile;
