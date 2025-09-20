export default function ChatBot() {
    return (
        <div className = "bg-white rounded-lg shadow-sm border h-[900px] flex flex-col">
            <div className = "flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                <div
                    key = {index}
                    className = {`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className = {`max-w-3xl ${
                        message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        } rounded-lg px-4 py-3`}
                    >
                        {message.role === "assistant" && typeof message.content === "object" ? (
                            <div className = "space-y-4">
                                <div className = {`text-lg font-bold ${getDecisionColor(message.content.decision)}`}>
                                    Decision: {message.content.decision}
                                </div>
                                
                                <div className = "text-sm text-gray-600">
                                    Confidence: {message.content.confidence}%
                                </div>

                                <div className = "text-gray-800">
                                    <strong>Reasoning:</strong> {message.content.reasoning}
                                </div>

                                {message.content.fundSource && (
                                    <div className = "bg-blue-50 p-3 rounded">
                                        <strong>Recommended Fund Source:</strong>
                                            <div className = "mt-1">
                                            <div className = "font-medium"> {message.content.fundSource.donor}</div>
                                            <div className = "text-sm text-gray-600">
                                                Available: {formatCurrency(message.content.fundSource.available)} 
                                                of {formatCurrency(message.content.fundSource.amount)}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {message.content.citations && message.content.citations.length > 0 && (
                                    <div className = "bg-red-50 p-4 rounded-lg border border-red-200">
                                        <strong className = "text-red-800 text-sm">Relevant Grant Agreement Restrictions:</strong>
                                        <div className = "mt-3 space-y-3">
                                            {message.content.citations.map((citation, idx) => (
                                                <div key = {idx} className = "bg-white p-3 rounded border border-red-100">
                                                    <div className = "text-sm text-gray-800 mb-2 leading-relaxed">
                                                        &quot;{citation.text || citation}&quot;
                                                    </div>
                                                    {citation.source && (
                                                        <div className = "flex items-center justify-between">
                                                            <div className = "text-xs text-gray-600">
                                                                <strong>{citation.source}</strong> - {citation.section}
                                                            </div>
                                                            {citation.clickable && (
                                                                <button 
                                                                    className = "text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                                                                    onClick={() => alert(`Opening ${citation.source}...`)}
                                                                >
                                                                    View Agreement
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(message.content.allowedUses || message.content.prohibitedUses) && (
                                    <div className = "bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <strong className = "text-gray-800 text-sm">Fund Usage Summary:</strong>
                                        <div className = "mt-3 space-y-3">
                                            {message.content.allowedUses && (
                                                <div className = "bg-green-50 p-3 rounded border border-green-200">
                                                    <div className = "text-sm text-green-800 font-medium mb-1">✓ Allowed Uses:</div>
                                                    <div className = "text-sm text-gray-700 whitespace-pre-line">{message.content.allowedUses}</div>
                                                </div>
                                            )}
                                            {message.content.prohibitedUses && (
                                                <div className = "bg-red-50 p-3 rounded border border-red-200">
                                                    <div className = "text-sm text-red-800 font-medium mb-1">✗ Prohibited Uses:</div>
                                                    <div className = "text-sm text-gray-700 whitespace-pre-line">{message.content.prohibitedUses}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {message.content.alternatives && message.content.alternatives.length > 0 && (
                                    <div className = "bg-green-50 p-4 rounded-lg border border-green-200">
                                        <strong className = "text-green-800 text-sm">Alternative Funding Sources:</strong>
                                        <div className = "mt-3 space-y-4">
                                            {message.content.alternatives.map((alt, idx) => (
                                                <div key = {idx} className = "bg-white p-4 rounded-lg border border-green-100">
                                                    <div className = "flex justify-between items-start mb-3">
                                                        <div>
                                                            <div className = "font-medium text-gray-900 text-lg">{alt.donor}</div>
                                                            <div className = "text-sm text-gray-600 mt-1">
                                                                Available: <span className = "font-semibold text-green-600">{formatCurrency(alt.available)}</span> of {formatCurrency(alt.amount)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {alt.reasoning && (
                                                        <div className = "text-sm text-gray-700 mb-3">
                                                            <strong>Why this works:</strong> {alt.reasoning}
                                                        </div>
                                                    )}

                                                    {alt.citations && alt.citations.length > 0 && (
                                                        <div className = "space-y-2">
                                                            <div className = "text-xs font-medium text-green-700">Supporting Grant Agreement:</div>
                                                            {alt.citations.map((citation, citIdx) => (
                                                                <div key = {citIdx} className = "bg-green-25 p-3 rounded border border-green-150">
                                                                    <div className = "text-sm text-gray-800 italic mb-2">
                                                                        &quot;{citation.text}&quot;
                                                                    </div>
                                                                    <div className = "flex items-center justify-between">
                                                                        <div className = "text-xs text-gray-600">
                                                                            <strong>{citation.source}</strong> - {citation.section}
                                                                        </div>
                                                                        {citation.clickable && (
                                                                            <button 
                                                                                className = "text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors"
                                                                                onClick={() => alert(`Opening ${citation.source}...`)}
                                                                            >
                                                                                View Agreement
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {alt.note && !alt.citations && (
                                                        <div className = "text-xs text-gray-600 mt-2 italic">{alt.note}</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {message.content.processingNote && (
                                    <div className = "bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                                        <strong className = "text-blue-800">Processing Note:</strong>
                                        <div className = "text-sm text-blue-700 mt-1">{message.content.processingNote}</div>
                                    </div>
                                )}

                                {message.content.showChangeAgreementButton && (
                                    <div className = "mt-4">
                                        <button 
                                            className = "bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                            onClick={() => alert("Request to change agreement submitted!")}
                                        >
                                            Submit Request to Change Agreement
                                        </button>
                                    </div>
                                )}

                                {message.content.showSubmitRequestButton && (
                                    <div className = "mt-4">
                                        <button 
                                            className = "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            onClick={() => alert("Request submitted!")}
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div> {message.content}</div>
                        )}
                        <div className = "text-xs opacity-70 mt-2">
                            {formatTime(message.timestamp)}
                        </div>
                    </div>
                </div>
                ))}

                {isLoading && (
                    <div className = "flex justify-start">
                        <div className = "bg-gray-100 rounded-lg px-4 py-3 max-w-3xl">
                            <div className = "flex items-center space-x-2">
                                <div className = "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                <span className = "text-gray-600">Analyzing compliance...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref = {endOfMessagesRef} />
            </div>

            {/* INPUT FORM */}
            <div className = "border-t p-4">
                <form onsubmit = {handleSubmit} className = "flex space-x-3">
                    <input
                        type = "text"
                        value = {inputValue}
                        onChange = {(e) => setInputValue(e.target.value)}
                        placeholder = "Ask about your expense compliance..."
                        className = "flex-1 border border-gray-300 text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled = {isLoading}
                    />
                    <button
                        type = "submit"
                        disabled = {isLoading || !inputValue.trim()}
                        className = "bg-blue-600 text-white px-6 py-2 rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};