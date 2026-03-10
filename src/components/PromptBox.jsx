import React, { useState } from 'react';

const PromptBox = ({ onGenerate, isGenerating }) => {
    const [prompt, setPrompt] = useState('');

    const handleGenerate = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="bg-panel rounded-xl border border-gray-800 p-4 shadow-lg mb-4">
            <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Code Generator
            </h2>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Write a C program to reverse an array..."
                    className="flex-1 bg-dark text-gray-200 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    disabled={isGenerating}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-primary hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-400 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
                    {isGenerating ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Generating...
                        </>
                    ) : (
                        <>
                            Generate Code
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PromptBox;
