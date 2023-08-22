import React from 'react';

interface TextRowProps {
  text: string;
  label: string;
  className?: string;
}

const TextRow = ({ text, label, className }: TextRowProps) => (
  <div className={`flex flex-col items-stretch overflow-hidden self-stretch ${className ?? ''}`}>
    <span className="text-slate-300 text-sm uppercase text-left">{label}</span>
    <span className="text-slate-50 md:text-2xl text-xl text-left truncate">{text}</span>
  </div>
);

export default TextRow;
