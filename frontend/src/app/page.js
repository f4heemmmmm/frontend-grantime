"use client";

import Head from "next/head";
import { DM_Sans } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { mockGrantAgreements } from "./mockGrantAgreements";
import { mockGrantCompanies, mockExportableFiles } from "./mockGrantData";
import { mockResponse } from "./mockResponse";
import PageHeader from "./header";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

// Mock AI Response Generator
function generateMockResponse(query, amount) {
    const queryLower = query.toLowerCase();
    const requestedAmount = amount || 0;

    if (queryLower.includes("can i use $15000 from healthcare foundation to set up shelters") || 
        (queryLower.includes("healthcare foundation") && queryLower.includes("shelter") && requestedAmount === 15000)) {
        return mockResponse;
    }

    return {
        decision: "UNKNOWN",
        confidence: 0,
        reasoning: "Please ask about using $15000 from Healthcare Foundation to set up shelters to see the demo response.",
        fundSource: null,
        citations: [],
        alternatives: [],
        showChangeAgreementButton: false,
        showSubmitRequestButton: false
    };
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

export default function Home() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your Grantime, your AI Compliance Assistant. What do you need help with today?",
            timestamp: new Date('2024-01-01T12:00:00')
        }
    ]);

    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            return;
        }

        const userMessage = {
            role: "user",
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        const amountMatch = inputValue.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
        const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : 0;

        // Simulate AI processing time
        setTimeout(() => {
            const mockResponse = generateMockResponse(inputValue, amount);
            
            const assistantMessage = {
                role: "assistant",
                content: mockResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1000 + Math.random() * 2000);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "CAD"
        }).format(amount);
    };

    const getDecisionColor = (decision) => {
        switch (decision) {
            case "YES":
                return "text-green-600";
            case "NO":
                return "text-red-600";
            case "CONDITIONAL":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <>
            <Head>
                <title>Grantime Compliance Assistant</title>
                <meta
                name="description"
                content="AI-powered compliance checking for non-profit organizations"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className = {`${dmSans.className} min-h-screen bg-gray-50 flex flex-col`}>
                <PageHeader />
                

                {/* DASHBOARD SECTIONS */}
                <div className = "max-w-3/4 mx-auto w-full p-10 flex-1 overflow-hidden">
                    <div className = "grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                        <div className = "space-y-6">
                            <div className = "bg-white rounded-lg shadow-sm border p-6">
                                <h2 className = "text-xl font-bold text-gray-900 mb-4">Grant Partners</h2>
                                <div className = "space-y-4">
                                    {mockGrantCompanies.map((grant) => {
                                        const usedPercentage = (grant.used / grant.amount) * 100;
                                        const remaining = grant.amount - grant.used;
                                        
                                        return (
                                            <div key = {grant.id} className = "p-4 bg-gray-50 rounded-lg">
                                                <div className = "flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className = "font-medium text-gray-900">{grant.company}</div>
                                                        <div className = "text-sm text-gray-600">
                                                            Granted: {formatDate(grant.date)}
                                                        </div>
                                                    </div>
                                                    <div className = "text-right">
                                                        <div className = "font-bold text-green-600">
                                                            {formatCurrency(grant.amount)}
                                                        </div>
                                                        <div className = {`text-xs px-2 py-1 rounded-full ${
                                                            grant.status === 'Active' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {grant.status}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className = "space-y-2">
                                                    <div className = "flex justify-between text-sm">
                                                        <span className = "text-gray-600">
                                                            Used: {formatCurrency(grant.used)} of {formatCurrency(grant.amount)}
                                                        </span>
                                                        <span className = "text-gray-600">
                                                            Remaining: {formatCurrency(remaining)}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className = "w-full bg-gray-200 rounded-full h-3">
                                                        <div 
                                                            className = "bg-blue-600 h-3 rounded-full transition-all duration-300"
                                                            style={{ width: `${usedPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                    
                                                    <div className = "text-xs text-gray-500 text-center">
                                                        {usedPercentage.toFixed(1)}% used
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* GRANT AGREEMENTS */}
                            <div className = "bg-white rounded-lg shadow-sm border p-6">
                                <h2 className = "text-xl font-bold text-gray-900 mb-4">Grant Agreements</h2>
                                <div className = "space-y-3">
                                    {mockExportableFiles.map((file) => (
                                        <div key = {file.id} className = "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                            <div className = "flex items-center space-x-3 gap-2">
                                                <div className = "w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                                    <span className = "text-red-600 text-xs font-bold">PDF</span>
                                                </div>
                                                <div>
                                                    <div className = "font-medium text-gray-900 text-lg mb-2">{file.title}</div>
                                                    <div className = "text-sm text-gray-600">
                                                        <span className = "font-semibold">{file.pages} pages</span>   •   Updated on {formatDate(file.lastModified)}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className = "text-blue-600 hover:text-blue-800 text-sm font-medium hover:cursor-pointer">
                                                View Agreement
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CHATBOT */}
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
                                <form onSubmit={handleSubmit} className = "flex space-x-3">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask about your expense compliance..."
                                        className = "flex-1 border border-gray-300 text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !inputValue.trim()}
                                        className = "bg-blue-600 text-white px-6 py-2 rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
