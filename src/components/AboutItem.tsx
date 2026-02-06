// src/components/AboutItem.tsx
import React from 'react';
import CodeBlock from './CodeBlock'; 
import 'katex/dist/katex.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ReactMarkdown from 'react-markdown';
import { BlockMath, InlineMath } from 'react-katex';
import { AboutItemData } from '../types'; // Import interface dari central types

const AboutItem: React.FC<AboutItemData> = ({ text, downloads, codes, formula, image, imageCaption }) => {
    return (
        <div className="mb-8">
            <div className="mb-6 text-sm leading-normal text-slate-400">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>

            {/* Di dalam AboutItem.tsx */}
            {formula && (
                <div className="my-6 p-4 bg-slate-800/30 rounded-xl text-teal-300 overflow-x-auto text-center">
                    {/* BlockMath akan otomatis merender multi-baris dari string aligned tadi */}
                    <BlockMath math={formula} />
                </div>
            )}
            
            {/* Bagian Tombol Download */}
            {downloads && downloads.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                    {downloads.map((file, index) => (
                        <a
                            key={index}
                            href={file.url}
                            download={file.fileName}
                            className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/10 px-3 py-1 text-[11px] font-semibold leading-5 text-teal-300 transition hover:bg-teal-400/20 hover:text-teal-200 focus-visible:outline-teal-300"
                        >
                            <span>{file.label}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.69L6.53 8.72a.75.75 0 00-1.06 1.06l4.25 4.25a.75.75 0 001.06 0l4.25-4.25a.75.75 0 00-1.06-1.06l-2.72 2.72V2.75z" />
                                <path d="M4.5 15.75a.75.75 0 000 1.5h11a.75.75 0 000-1.5h-11z" />
                            </svg>
                        </a>
                    ))}
                </div>
            )}

            {/* Bagian Kotak Kode */}
            {codes && codes.length > 0 && (
                <div className="space-y-4">
                    {codes.map((codeItem, index) => (
                        <CodeBlock 
                            key={index}
                            title={codeItem.title}
                            filePath={codeItem.filePath}
                            language={codeItem.language || 'text'}
                        />
                    ))}
                </div>
            )}

            {/* Visualisasi dengan Fungsi Klik untuk Memperbesar */}
            {image && (
                <div className="my-8 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/20 shadow-xl">
                    <Zoom>
                        <img 
                            src={image} 
                            alt={imageCaption || "Visualisasi Proyek"} 
                            loading="lazy"
                            className="w-full h-auto block cursor-zoom-in grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </Zoom>
                    <div className="p-3 bg-slate-900/50 border-t border-slate-700/50 flex justify-between items-center">
                        <p className="text-[10px] text-slate-200 uppercase tracking-widest font-bold">
                            {imageCaption || "Visualisasi Proyek"}
                        </p>
                        <span className="text-[9px] text-teal-500/50 italic">Klik untuk memperbesar</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutItem;