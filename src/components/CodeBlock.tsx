    // src/components/CodeBlock.tsx
import React, { useState, useEffect } from 'react';

interface Props {
    title: string;
    filePath?: string;
    staticCode?: string;
    language?: string;
    }

const CodeBlock: React.FC<Props> = ({ title, filePath, staticCode }) => {
const [code, setCode] = useState(staticCode || 'Loading...');
const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (filePath) {
        fetch(filePath)
            .then((res) => res.text())
            .then((text) => setCode(text))
            .catch(() => setCode('Error loading code.'));
        }
    }, [filePath]);

const copyToClipboard = async () => {
        try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset ikon setelah 2 detik
        } catch (err) {
        console.error('Failed to copy!', err);
        }
    };

    return (
        <div className="my-6 rounded-md bg-slate-800/50 p-4 font-mono text-sm shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
        <div className="mb-2 flex items-center justify-between border-b border-slate-700 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <span>{title}</span>
            
            {/* Tombol Copy */}
            <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 text-teal-500/80 hover:text-teal-300 transition-colors"
            title="Copy code"
            >
            {copied ? (
                <>
                <span className="capitalize">Copied!</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                </>
            ) : (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                </>
            )}
            </button>
        </div>       
        <pre className="overflow-x-auto mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-300">
            <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;