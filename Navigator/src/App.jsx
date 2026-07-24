import { useState, useMemo, useEffect } from 'react';
import './App.css';

// ─── Sample file tree data ────────────────────────────────────────────────

const sampleFiles = {
  name: 'my-project',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'index.js', type: 'file' },
        { name: 'App.jsx', type: 'file' },
        { name: 'App.css', type: 'file' },
        { name: 'utils.js', type: 'file' },
        { name: 'components', type: 'folder', children: [
          { name: 'Header.jsx', type: 'file' },
          { name: 'Sidebar.jsx', type: 'file' },
          { name: 'Footer.jsx', type: 'file' },
        ]},
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file' },
      ],
    },
    {
      name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' },
    { name: '.gitignore', type: 'file' },
  ],
};

// ─── File contents lookup ─────────────────────────────────────────────────

const fileContents = {
  'src/index.js': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  'src/App.jsx': `import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <h1>Hello, Code Navigator!</h1>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(c => c + 1)}>
            Click me
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;`,
  'src/App.css': `.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f5f5f5;
}

.content h1 {
  font-size: 28px;
  margin-bottom: 16px;
  color: #333;
}

.content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.content button {
  padding: 10px 20px;
  font-size: 16px;
  background: #0078d4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.content button:hover {
  background: #106ebe;
}`,
  'src/utils.js': `// Utility functions

/**
 * Format a date to a readable string
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Debounce a function call
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Generate a unique ID
 * @returns {string}
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}`,
  'src/components/Header.jsx': `function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">⚡</span>
        <h1>My App</h1>
      </div>
      <nav className="header-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;`,
  'src/components/Sidebar.jsx': `function Sidebar() {
  const menuItems = [
    { label: 'Dashboard', icon: '📊' },
    { label: 'Projects', icon: '📁' },
    { label: 'Settings', icon: '⚙️' },
    { label: 'Users', icon: '👥' },
  ];

  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li key={item.label}>
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;`,
  'src/components/Footer.jsx': `function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {year} My App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;`,
  'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.js"></script>
</body>
</html>`,
  'package.json': `{
  "name": "my-project",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.3",
    "vite": "^8.1.1"
  }
}`,
  'README.md': `# My Project

## Getting Started

To get started with this project, follow these steps:

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Project Structure

- \`src/\` - Source code
  - \`index.js\` - Entry point
  - \`App.jsx\` - Main application component
  - \`App.css\` - Application styles
  - \`utils.js\` - Utility functions
  - \`components/\` - Reusable components
- \`public/\` - Static assets
- \`package.json\` - Project metadata and dependencies`,
  '.gitignore': `node_modules
dist
.vite
*.local
.DS_Store`,
};

// ─── Helper functions ─────────────────────────────────────────────────────

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  const iconMap = {
    js: '\u{1F7E8}', jsx: '\u{1F7E8}', jsx: '\u{269B}',
    css: '\u{1F3A8}', html: '\u{1F310}',
    json: '\u{1F4CB}', md: '\u{1F4DD}',
    gitignore: '\u{1F6AB}',
  };
  return iconMap[ext] || '\u{1F4C4}';
}

function getFolderIcon() {
  return '\u{1F4C1}';
}

function getFolderOpenIcon() {
  return '\u{1F4C2}';
}

function syntaxHighlight(line) {
  let escaped = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>');

  // Strings (double and single quotes)
  escaped = escaped.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    '<span class="syn-string">$1</span>'
  );

  // Comments (// and /* */)
  escaped = escaped.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/g,
    '<span class="syn-comment">$1</span>'
  );

  // Numbers
  escaped = escaped.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="syn-number">$1</span>'
  );

  // Keywords
  const keywords = /\b(import|export|from|function|const|let|var|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|default|async|await|try|catch|finally|throw|yield|typeof|instanceof|in|of|true|false|null|undefined)\b/g;
  escaped = escaped.replace(keywords, '<span class="syn-keyword">$1</span>');

  // JSX tags
  escaped = escaped.replace(
    /(<\/?)(\w+)/g,
    '$1<span class="syn-tag">$2</span>'
  );
  escaped = escaped.replace(
    /(\w+)(=)/g,
    '<span class="syn-attr">$1</span>$2'
  );

  return escaped;
}

// ─── FileTreeItem Component ──────────────────────────────────────────────

function FileTreeItem({ item, depth, selectedPath, onSelect, expandedFolders, onToggle }) {
  const isFolder = item.type === 'folder';
  const path = item.path;
  const isExpanded = expandedFolders[path];
  const isSelected = selectedPath === path;

  const handleClick = () => {
    if (isFolder) {
      onToggle(path);
    } else {
      onSelect(path);
    }
  };

  return (
    <>
      <div
        className={`tree-item${isSelected ? ' active' : ''}`}
        style={{ '--depth': depth }}
        onClick={handleClick}
      >
        {isFolder ? (
          <>
            <span className={`chevron${isExpanded ? ' expanded' : ''}`}>
              &#9654;
            </span>
            <span className="icon folder">
              {isExpanded ? getFolderOpenIcon() : getFolderIcon()}
            </span>
          </>
        ) : (
          <>
            <span className="chevron" style={{ visibility: 'hidden' }}>&#9654;</span>
            <span className={`icon ${getFileIconClass(item.name)}`}>
              {getFileIcon(item.name)}
            </span>
          </>
        )}
        <span className="name">{item.name}</span>
      </div>
      {isFolder && isExpanded && item.children?.map((child) => {
        const childPath = path + '/' + child.name;
        return (
          <FileTreeItem
            key={childPath}
            item={{ ...child, path: childPath }}
            depth={depth + 1}
            selectedPath={selectedPath}
            onSelect={onSelect}
            expandedFolders={expandedFolders}
            onToggle={onToggle}
          />
        );
      })}
    </>
  );
}

function getFileIconClass(name) {
  const ext = name.split('.').pop().toLowerCase();
  const extMap = {
    js: 'file-js',
    jsx: 'file-js',
    mjs: 'file-js',
    css: 'file-css',
    html: 'file-html',
    json: 'file-json',
    md: 'file-md',
  };
  return extMap[ext] || 'file-default';
}

// ─── FileTree Component ──────────────────────────────────────────────────

function FileTree({ tree, selectedPath, onSelect, expandedFolders, onToggle }) {
  return (
    <div className="file-tree">
      <FileTreeItem
        item={{ ...tree, path: tree.name }}
        depth={0}
        selectedPath={selectedPath}
        onSelect={onSelect}
        expandedFolders={expandedFolders}
        onToggle={onToggle}
      />
    </div>
  );
}

// ─── CodeViewer Component ────────────────────────────────────────────────

function CodeViewer({ content }) {
  const lines = content.split('\n');

  return (
    <pre className="code-viewer">
      {lines.map((line, i) => (
        <div key={i} className="code-line">
          <span className="line-number">{i + 1}</span>
          <span
            className="line-content"
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) || ' ' }}
          />
        </div>
      ))}
    </pre>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPath, setSelectedPath] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});

  // Build paths recursively
  const treeWithPaths = useMemo(() => {
    function assignPaths(node, parentPath = '') {
      const path = parentPath ? `${parentPath}/${node.name}` : node.name;
      if (node.type === 'folder' && node.children) {
        return {
          ...node,
          path,
          children: node.children.map((child) => assignPaths(child, path)),
        };
      }
      return { ...node, path };
    }
    return assignPaths(sampleFiles);
  }, []);

  // Expand root folder by default
  useState(() => {
    setExpandedFolders({ [treeWithPaths.path]: true });
  }, []);

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const selectedFile = selectedPath && fileContents[selectedPath];

  // Get just the file name from the path
  const selectedFileName = selectedPath ? selectedPath.split('/').pop() : null;

  const handleCloseTab = () => {
    setSelectedPath(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app-header">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle sidebar"
        >
          {sidebarOpen ? '\u{2630}' : '\u{2630}'}
        </button>
        <span className="title">Code Navigator</span>
      </div>

      {/* Body */}
      <div className="app-body">
        {/* Sidebar */}
        <div className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>
          <div className="sidebar-header">
            <span>EXPLORER</span>
            <div className="actions">
              <button
                onClick={() => {
                  const allExpanded = {};
                  function expandAll(node) {
                    if (node.type === 'folder') {
                      allExpanded[node.path] = true;
                      node.children?.forEach(expandAll);
                    }
                  }
                  expandAll(treeWithPaths);
                  setExpandedFolders(allExpanded);
                }}
                title="Expand All"
              >
                &#8862;
              </button>
              <button
                onClick={() => setExpandedFolders({ [treeWithPaths.path]: true })}
                title="Collapse All"
              >
                &#8863;
              </button>
            </div>
          </div>
          <FileTree
            tree={treeWithPaths}
            selectedPath={selectedPath}
            onSelect={setSelectedPath}
            expandedFolders={expandedFolders}
            onToggle={toggleFolder}
          />
        </div>

        {/* Editor */}
        <div className="editor">
          {selectedPath && selectedFile ? (
            <>
              <div className="editor-tabs">
                <div className="editor-tab active">
                  <span className="tab-icon">{getFileIcon(selectedFileName)}</span>
                  <span>{selectedFileName}</span>
                  <button className="close-btn" onClick={handleCloseTab}>
                    &#x2715;
                  </button>
                </div>
              </div>
              <div className="editor-content">
                <CodeViewer content={selectedFile} />
              </div>
            </>
          ) : (
            <div className="welcome">
              <div className="welcome-icon">&#x1F4C1;</div>
              <h2>Code Navigator</h2>
              <p>Select a file from the explorer panel to view its contents with syntax highlighting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

