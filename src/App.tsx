import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import MarkdownFile from './component/MarkdownFile';
import MarkdownRenderer from './component/MarkdownRenderer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <MarkdownFile /> */}
      <MarkdownRenderer />
    </div>
  )
}

export default App
