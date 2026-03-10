import React from 'react';

const OutputConsole = ({ output, error, isCompiling }) => {
    return (
        <div className="h-full flex flex-col bg-panel">
            <div className="bg-dark px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Compilation Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-auto w-full relative">
                {isCompiling && (
                    <div className="absolute inset-0 bg-panel/80 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-gray-400 text-sm font-medium animate-pulse">Compiling & Executing...</span>
                        </div>
                    </div>
                )}

                {!isCompiling && !output && !error && (
                    <div className="text-gray-600 flex items-center justify-center h-full">
                        Ready for execution.
                    </div>
                )}

                {error && (
                    <pre className="text-red-400 whitespace-pre-wrap font-mono leading-relaxed">{error}</pre>
                )}

                {output && !error && (
                    <pre className="text-green-400 whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
                )}
            </div>
        </div>
    );
};

export default OutputConsole;
