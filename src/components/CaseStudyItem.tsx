// src/components/CaseStudyItem.tsx
import React from 'react';
import AboutItem from './AboutItem';

interface Props {
    id?: string;
    title?: string; // Tambahkan ini agar title bisa diterima
    text?: string;
    downloads?: any[];
    codes?: any[];
    formula?: string;
    image?: string;
    imageCaption?: string;
}

const CaseStudyItem: React.FC<Props> = ({ id, title, text, downloads, codes, formula, image, imageCaption }) => {
    return (
        <div id={id} className="mb-8 scroll-mt-16">
            {/* Render judul hanya jika data title ada */}
            {title && (
                <h3 className="mb-4 text-base font-bold tracking-tight text-slate-200 sm:text-lg">
                    {title}
                </h3>
            )}
            
            <AboutItem 
                text={text} 
                downloads={downloads} 
                codes={codes}
                formula={formula}
                image={image} 
                imageCaption={imageCaption}
            />
        </div>
    );
};

export default CaseStudyItem;