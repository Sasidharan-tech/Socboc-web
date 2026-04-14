import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalUIProps {
  className?: string;
  lines: string[];
  interval?: number;
}

export const TerminalUI: React.FC<TerminalUIProps> = ({ className, lines, interval = 2000 }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines([]);
        setCurrentLineIndex(0);
        setDisplayText("");
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const currentLine = lines[currentLineIndex];
    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentLine[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, currentLine]);
        setDisplayText("");
        setCharIndex(0);
        setCurrentLineIndex(prev => prev + 1);
      }, interval);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, charIndex, lines, interval]);

  return (
    <div className={cn("w-full max-w-2xl mx-auto overflow-hidden rounded-lg border border-white/10 bg-black/90 shadow-2xl", className)}>
      <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-xs text-white/40 font-mono ml-4">socbox-scanner --v1.0.4</div>
      </div>
      <div className="p-4 font-mono text-sm min-h-[300px] overflow-y-auto">
        {visibleLines.map((line, i) => (
          <div key={i} className={cn(
            "mb-1",
            line.includes("[!]") ? "text-destructive" : 
            line.includes("[✓]") ? "text-primary" : "text-white/80"
          )}>
            {line}
          </div>
        ))}
        {currentLineIndex < lines.length && (
          <div className={cn(
            "inline-block",
            lines[currentLineIndex].includes("[!]") ? "text-destructive" : 
            lines[currentLineIndex].includes("[✓]") ? "text-primary" : "text-white/80"
          )}>
            {displayText}
            <span className="w-2 h-4 bg-primary ml-1 inline-block animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
