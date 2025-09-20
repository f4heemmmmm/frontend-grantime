export default function ChatBot({ 
    messages, 
    inputValue, 
    setInputValue, 
    isLoading, 
    handleSubmit, 
    formatTime, 
    formatCurrency, 
    getDecisionColor, 
    endOfMessagesRef 
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm border h-[900px] flex flex-col">
            {/* Header with system status - Heuristic 1: Visibility of system status */}
            <div className="bg-gray-50 border-b px-6 py-3 rounded-t-lg">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Grantime</h3>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">Online</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`max-w-3xl ${
                        message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        } rounded-lg px-4 py-3`}
                    >
                        {message.role === "assistant" && typeof message.content === "object" ? (
                            <div className="space-y-4">
                                {/* Improved decision display with icons - Heuristic 2: Match between system and real world */}
                                <div className={`text-lg font-bold ${getDecisionColor(message.content.decision)} flex items-center space-x-2`}>
                                    {message.content.decision === "YES" && <span className="text-green-600">✓</span>}
                                    {message.content.decision === "NO" && <span className="text-red-600">✗</span>}
                                    {message.content.decision === "CONDITIONAL" && <span className="text-yellow-600">⚠</span>}
                                    <span>Decision: {message.content.decision}</span>
                                </div>
                                
                                {/* Enhanced confidence display - Heuristic 1: Visibility of system status */}

                                <div className="text-gray-800">
                                    <strong>Reasoning:</strong> {message.content.reasoning}
                                </div>

                                {message.content.fundSource && (
                                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                        <strong className="text-blue-800">Recommended Fund Source:</strong>
                                        <div className="mt-1">
                                            <div className="font-medium">{message.content.fundSource.donor}</div>
                                            <div className="text-sm text-gray-600">
                                                Available: {formatCurrency(message.content.fundSource.available)} 
                                                of {formatCurrency(message.content.fundSource.amount)}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {message.content.citations && message.content.citations.length > 0 && (
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <strong className="text-red-800 text-sm flex items-center space-x-2">
                                            <span>⚠</span>
                                            <span>Citation:</span>
                                        </strong>
                                        <div className="mt-3 space-y-3">
                                            {message.content.citations.map((citation, idx) => (
                                                <div key={idx} className="bg-white p-3 rounded border border-red-100">
                                                    <div className="text-sm text-gray-800 mb-2 leading-relaxed">
                                                        &quot;{citation.text || citation}&quot;
                                                    </div>
                                                    {citation.source && (
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-xs text-gray-600">
                                                                <strong>{citation.source}</strong> - {citation.section}
                                                            </div>
                                                            {citation.clickable && (
                                                                <button 
                                                                    className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    onClick={() => alert(`Opening ${citation.source}...`)}
                                                                    aria-label={`View agreement for ${citation.source}`}
                                                                >
                                                                    📄 View Agreement
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Improved allowed/prohibited uses section - Heuristic 8: Aesthetic and minimalist design */}
                                {(message.content.allowedUses || message.content.prohibitedUses) && (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <strong className="text-gray-800 text-sm flex items-center space-x-2">
                                            <span>📋</span>
                                            <span>Fund Usage Summary:</span>
                                        </strong>
                                        <div className="mt-3 space-y-3">
                                            {message.content.allowedUses && (
                                                <div className="bg-green-50 p-3 rounded border border-green-200">
                                                    <div className="text-md text-green-800 font-medium mb-1 flex items-center space-x-2">
                                                        <span>✓</span>
                                                        <span>Allowed Uses:</span>
                                                    </div>
                                                    <div className="text-sm text-gray-700 whitespace-pre-line">{message.content.allowedUses}</div>
                                                </div>
                                            )}
                                            {message.content.prohibitedUses && (
                                                <div className="bg-red-50 p-3 rounded border border-red-200">
                                                    <div className="text-md text-red-800 font-medium mb-1 flex items-center space-x-2">
                                                        <span>✗</span>
                                                        <span>Prohibited Uses:</span>
                                                    </div>
                                                    <div className="text-sm text-gray-700 whitespace-pre-line">{message.content.prohibitedUses}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Enhanced alternatives section - Heuristic 10: Help and documentation */}
                                {message.content.alternatives && message.content.alternatives.length > 0 && (
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <strong className="text-green-800 text-xl font-semibold flex items-center space-x-2">
                                            <span>💡</span>
                                            <span>Alternative Funding Sources:</span>
                                        </strong>
                                        <div className="mt-3 space-y-4">
                                            {message.content.alternatives.map((alt, idx) => (
                                                <div key={idx} className="bg-white p-4 rounded-lg border border-green-100 hover:shadow-sm transition-shadow">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900 text-lg">{alt.donor}</div>
                                                            <div className="text-sm text-gray-600 mt-1">
                                                                Available: <span className="font-semibold text-green-600">{formatCurrency(alt.available)}</span> of {formatCurrency(alt.amount)}
                                                            </div>
                                                        </div>
                                                        {/* Compatibility score - Heuristic 1: Visibility of system status */}
                                                        <div className="text-right">
                                                            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                                Compatible ✓
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {alt.reasoning && (
                                                        <div className="text-sm text-gray-700 mb-3 bg-blue-50 p-2 rounded">
                                                            <strong>Why this works:</strong> {alt.reasoning}
                                                        </div>
                                                    )}

                                                    {alt.citations && alt.citations.length > 0 && (
                                                        <div className="space-y-2">
                                                            <div className="text-xs font-medium text-green-700 flex items-center space-x-1">
                                                                <span>📄</span>
                                                                <span>Supporting Grant Agreement:</span>
                                                            </div>
                                                            {alt.citations.map((citation, citIdx) => (
                                                                <div key={citIdx} className="bg-green-25 p-3 rounded border border-green-150">
                                                                    <div className="text-sm text-gray-800 italic mb-2">
                                                                        &quot;{citation.text}&quot;
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="text-xs text-gray-600">
                                                                            <strong>{citation.source}</strong> - {citation.section}
                                                                        </div>
                                                                        {citation.clickable && (
                                                                            <button 
                                                                                className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                                                                                onClick={() => alert(`Opening ${citation.source}...`)}
                                                                                aria-label={`View agreement for ${citation.source}`}
                                                                            >
                                                                                📄 View Agreement
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {alt.note && !alt.citations && (
                                                        <div className="text-xs text-gray-600 mt-2 italic bg-gray-50 p-2 rounded">{alt.note}</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Enhanced processing note - Heuristic 9: Help users recognize, diagnose, and recover from errors */}
                                {message.content.processingNote && (
                                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                                        <strong className="text-blue-800 flex items-center space-x-2">
                                            <span>ℹ️</span>
                                            <span>Processing Note:</span>
                                        </strong>
                                        <div className="text-sm text-blue-700 mt-1">{message.content.processingNote}</div>
                                    </div>
                                )}

                                {/* Enhanced action buttons - Heuristic 3: User control and freedom */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    {message.content.showChangeAgreementButton && (
                                        <button 
                                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                                            onClick={() => {
                                                if (confirm("Are you sure you want to submit an appeal request? This will be sent to the compliance team for review.")) {
                                                    alert("Appeal request submitted successfully! You will receive a confirmation email shortly.");
                                                }
                                            }}
                                        >
                                            <span>📝</span>
                                            <span>Submit Appeal Request</span>
                                        </button>
                                    )}

                                    {message.content.showSubmitRequestButton && (
                                        <button 
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                                            onClick={() => {
                                                if (confirm("Are you sure you want to submit this funding request? This action cannot be undone.")) {
                                                    alert("Request submitted successfully! Reference ID: REQ-2024-001");
                                                }
                                            }}
                                        >
                                            <span>✅</span>
                                            <span>Submit Request</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>{message.content}</div>
                        )}
                        <div className="text-xs opacity-70 mt-2">
                            {formatTime(message.timestamp)}
                        </div>
                    </div>
                </div>
                ))}

                {/* Enhanced loading state - Heuristic 1: Visibility of system status */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-3xl">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                <span className="text-gray-600">Analyzing compliance rules...</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                This usually takes 2-5 seconds
                            </div>
                        </div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>

            {/* Enhanced input form - Heuristic 4: Consistency and standards */}
            <div className="border-t p-4 bg-gray-50">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about your expense compliance..."
                            className="flex-1 border border-gray-300 text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoading}
                            maxLength={500}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                            <span>Send</span>
                            <span>📤</span>
                        </button>
                    </div>
                    {/* Character count and help text - Heuristic 5: Error prevention */}
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Try asking specific questions about fund usage and amounts</span>
                        <span>{inputValue.length}/500</span>
                    </div>
                </form>
            </div>
        </div>
    );
};