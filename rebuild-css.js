const fs = require('fs');

let html = fs.readFileSync('tapri-co/referencefile.html', 'utf8');
let cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!cssMatch) {
  console.log("No style tag found!");
  process.exit(1);
}
let css = cssMatch[1];

// Fix padding(48px, 7vh, 90px) -> padding: clamp(48px, 7vh, 90px)
css = css.replace(/^\s*([a-zA-Z-]+)\(([\d\w\.%\s]+,\s*[\d\w\.%\s]+,\s*[\d\w\.%\s]+)\)/gm, (match, p1, p2) => {
    if (['var', 'clamp', 'rgba', 'rgb', 'url', 'calc', 'radial-gradient', 'linear-gradient', 'repeating-linear-gradient', 'translateY', 'scale', 'rotate', 'cubic-bezier', 'blur', 'brightness', 'rect', 'background', 'color', 'transform'].includes(p1)) return match;
    return match.replace(p1 + '(', p1 + ': clamp(');
});

// generic property(value) -> property: value
css = css.replace(/^\s*([a-zA-Z-]+)\(([^)]+)\)(?!\s*\{)/gm, (match, p1, p2) => {
    if (['var', 'clamp', 'rgba', 'rgb', 'url', 'calc', 'radial-gradient', 'linear-gradient', 'repeating-linear-gradient', 'translateY', 'scale', 'rotate', 'cubic-bezier', 'blur', 'brightness', 'rect', 'background'].includes(p1)) return match;
    
    // If it's something like .brew-card(1), skip it
    if (match.startsWith('.')) return match;
    
    // Check if it's transform(...)
    if (p1 === 'transform') {
        if (!p2.includes('(')) return 'transform: ' + p2;
    }
    
    // Check if it's filter(...)
    if (p1 === 'filter') {
        if (!p2.includes('(')) return 'filter: blur(' + p2 + ')';
    }
    
    // colors: color(244, 232, 210, .78) -> color: rgba(...)
    if ((p1 === 'color' || p1 === 'background' || p1 === 'border-color') && p2.includes(',')) {
        return p1 + ': rgba(' + p2 + ')';
    }
    
    return match.replace(p1 + '(' + p2 + ')', p1 + ': ' + p2);
});

// Fix property values missing `var()` for custom variables
css = css.replace(/([a-zA-Z-]+):\s*--([a-zA-Z0-9-]+)/g, '$1: var(--$2)');
css = css.replace(/(?<!var|clamp|rgba|rgb|url|calc|radial-gradient|linear-gradient|repeating-linear-gradient|translateY|scale|rotate|cubic-bezier|blur|brightness|rect|background)\(--([a-zA-Z0-9-]+)\)/g, 'var(--$1)');
css = css.replace(/([a-zA-Z-]+)\(--([a-zA-Z0-9-]+)\)/g, (match, p1, p2) => {
    if (p1 === 'var') return match;
    return p1 + ': var(--' + p2 + ')';
});
css = css.replace(/([a-zA-Z-]+)\(--([a-zA-Z0-9-]+),\s*(.+?)\)/g, (match, p1, p2, p3) => {
    if (p1 === 'var') return match;
    return p1 + ': var(--' + p2 + ', ' + p3 + ')';
});

// Fix specific missing colons / values (mixins)
css = css.replace(/display\s*;/g, 'display: flex;');
css = css.replace(/display\s*\n/g, 'display: none;\n');
css = css.replace(/align-items\s*;/g, 'align-items: center;');
css = css.replace(/align-items\s*\n/g, 'align-items: center;\n');
css = css.replace(/justify-content\s*;/g, 'justify-content: space-between;');
css = css.replace(/justify-content\s*\n/g, 'justify-content: space-between;\n');
css = css.replace(/flex-wrap\s*;/g, 'flex-wrap: wrap;');
css = css.replace(/flex-wrap\s*\n/g, 'flex-wrap: wrap;\n');
css = css.replace(/flex-direction\s*;/g, 'flex-direction: column;');
css = css.replace(/flex-direction\s*\n/g, 'flex-direction: column;\n');
css = css.replace(/position\s*;/g, 'position: relative;');
css = css.replace(/position\s*\n/g, 'position: relative;\n');
css = css.replace(/overflow\s*;/g, 'overflow: hidden;');
css = css.replace(/overflow\s*\n/g, 'overflow: hidden;\n');
css = css.replace(/overflow-x\s*;/g, 'overflow-x: auto;');
css = css.replace(/overflow-y\s*;/g, 'overflow-y: auto;');
css = css.replace(/text-transform\s*;/g, 'text-transform: uppercase;');
css = css.replace(/text-transform\s*\n/g, 'text-transform: uppercase;\n');
css = css.replace(/font-style\s*;/g, 'font-style: italic;');
css = css.replace(/font-style\s*\n/g, 'font-style: italic;\n');
css = css.replace(/object-fit\s*;/g, 'object-fit: cover;');
css = css.replace(/object-fit\s*\n/g, 'object-fit: cover;\n');
css = css.replace(/white-space\s*;/g, 'white-space: nowrap;');
css = css.replace(/white-space\s*\n/g, 'white-space: nowrap;\n');
css = css.replace(/pointer-events\s*;/g, 'pointer-events: none;');
css = css.replace(/pointer-events\s*\n/g, 'pointer-events: none;\n');
css = css.replace(/cursor\s*;/g, 'cursor: pointer;');
css = css.replace(/cursor\s*\n/g, 'cursor: pointer;\n');
css = css.replace(/user-select\s*;/g, 'user-select: none;');
css = css.replace(/user-select\s*\n/g, 'user-select: none;\n');
css = css.replace(/text-align\s*;/g, 'text-align: center;');
css = css.replace(/text-align\s*\n/g, 'text-align: center;\n');
css = css.replace(/text-decoration\s*;/g, 'text-decoration: underline;');
css = css.replace(/text-decoration\s*\n/g, 'text-decoration: underline;\n');
css = css.replace(/list-style\s*;/g, 'list-style: none;');
css = css.replace(/list-style\s*\n/g, 'list-style: none;\n');
css = css.replace(/border-style\s*;/g, 'border-style: solid;');
css = css.replace(/border-style\s*\n/g, 'border-style: solid;\n');

// Fix missing semicolons
css = css.replace(/transition\s+([.\ds]+[a-z]*)\s*,/g, 'transition: $1,');
css = css.replace(/;\s*30px/g, ' 30px;');

fs.writeFileSync('tapri-co/app/globals.css', css);
console.log('globals.css refined');
