import ReactPrismjs from '@/ai-artifacts/node_modules/@uiw/react-prismjs';
import '@/ai-artifacts/node_modules/prismjs/components/prism-python';
import '@/ai-artifacts/node_modules/prismjs/components/prism-javascript';
import '@/ai-artifacts/node_modules/prismjs/components/prism-typescript';
import '@/ai-artifacts/node_modules/prismjs/components/prism-jsx';
import '@/ai-artifacts/node_modules/prismjs/components/prism-tsx';
import '@/ai-artifacts/node_modules/prismjs/themes/prism.css';
// import "prismjs/plugins/line-numbers/prism-line-numbers.js";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export function CodeView({ code, lang }: { code: string; lang: string }) {
  return (
    <ReactPrismjs
      source={code}
      language={lang}
      // className="line-numbers"
      // @ts-ignore
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        // backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
      }}
    />
  );
}
