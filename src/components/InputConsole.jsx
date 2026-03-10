import React from 'react';

const InputConsole = ({ input, setInput }) => {
    return (
        <div className="h-full flex flex-col bg-panel border-r border-gray-800">
            <div className="bg-dark px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Standard Input</span>
            </div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter program input here..."
                className="flex-1 w-full bg-panel text-gray-300 p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                spellCheck="false"
            />
        </div>
    );
};

export default InputConsole;
