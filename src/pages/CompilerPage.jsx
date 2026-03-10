import React, { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import PromptBox from '../components/PromptBox';
import CodeEditor from '../components/CodeEditor';
import InputConsole from '../components/InputConsole';
import OutputConsole from '../components/OutputConsole';
import { generateCode, compileCode } from '../services/api';

const DEFAULT_CODE = `#include <stdio.h>\n\nint main() {\n    printf("Welcome to AI C Compiler!\\n");\n    return 0;\n}`;

const CompilerPage = () => {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);
    const [lastPrompt, setLastPrompt] = useState('');

    const handleGenerate = async (promptMsg) => {
        setIsGenerating(true);
        setError(null);
        setLastPrompt(promptMsg);

        try {
            const result = await generateCode(promptMsg);
            if (result.success && result.code) {
                setCode(result.code);
            } else {
                setError(result.error || 'Failed to generate code.');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'An error occurred during generation.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRun = async () => {
        setIsCompiling(true);
        setOutput('');
        setError(null);

        try {
            const result = await compileCode(code, input, lastPrompt);
            if (result.success) {
                setOutput(result.output || 'Process exited successfully with no output.');
            } else {
                setError(result.error || 'Unknown compilation error.');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'An error occurred during execution.');
        } finally {
            setIsCompiling(false);
        }
    };

    return (
        <div className="min-h-screen xl:h-screen flex flex-col bg-darker overflow-x-hidden xl:overflow-hidden">
            <HeaderBar />

            <div className="flex-1 flex flex-col p-3 md:p-4 gap-4 xl:h-[calc(100vh-73px)] overflow-y-auto xl:overflow-hidden">
                {/* Top Area: Prompt Box & Run Button */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 shrink-0">
                    <div className="flex-1">
                        <PromptBox onGenerate={handleGenerate} isGenerating={isGenerating} />
                    </div>
                    <div className="pt-0 lg:pt-2">
                        <button
                            onClick={handleRun}
                            disabled={isCompiling || isGenerating}
                            className="w-full lg:w-auto bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-400 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Run Code
                        </button>
                    </div>
                </div>

                {/* Main Workspace Area */}
                <div className="flex-1 flex flex-col xl:flex-row gap-4 min-h-0 pb-4 xl:pb-0">
                    {/* Left Column: Editor */}
                    <div className="flex-1 min-h-[400px] xl:min-h-0 h-full shadow-2xl relative">
                        <CodeEditor code={code} setCode={setCode} />
                    </div>

                    {/* Right Column: Input/Output */}
                    <div className="w-full xl:w-[400px] 2xl:w-[500px] flex flex-col gap-4 h-[600px] xl:h-full shrink-0">
                        <div className="flex-1 rounded-xl overflow-hidden border border-gray-800 shadow-xl bg-panel min-h-[250px] xl:min-h-0">
                            <InputConsole input={input} setInput={setInput} />
                        </div>
                        <div className="flex-1 rounded-xl overflow-hidden border border-gray-800 shadow-xl bg-panel min-h-[250px] xl:min-h-0">
                            <OutputConsole output={output} error={error} isCompiling={isCompiling} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerPage;
