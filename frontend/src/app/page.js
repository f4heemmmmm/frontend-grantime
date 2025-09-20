"use client";


import Head from "next/head";
import { DM_Sans } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { mockGrantAgreements } from "./mockGrantAgreements";
import { mockGrantCompanies, mockExportableFiles } from "./mockGrantData";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

// Mock AI Response Generator
function generateMockResponse(query, amount) {
    const queryLower = query.toLowerCase();
    const requestedAmount = amount || 0;

    // Special case for the demo scenario
    if (queryLower.includes("emergency shelter") && queryLower.includes("donor a") && requestedAmount === 15000) {
        return {
            decision: "NO",
            confidence: 95,
            reasoning: `Emergency shelter utilities are not permitted under Donor A's grant restrictions. According to Grant Agreement HCF-2024-089, Section 3.2, Donor A funds are restricted to "emergency medical supplies only" and explicitly prohibit utility payments and shelter operations.`,
            fundSource: null,
            citations: [
                "Grant Agreement HCF-2024-089, Section 3.2: 'Funds shall be used exclusively for emergency medical supplies and equipment'",
                "Grant Agreement HCF-2024-089, Section 4.1: 'Prohibited uses include but are not limited to: utilities, rent, shelter operations, and administrative costs'",
                "Donor A Compliance Manual, Page 12: 'All expenditures must directly support medical emergency response activities'"
            ],
            alternatives: [
                {
                    donor: "Emergency Relief Grant",
                    available: 75000,
                    amount: 200000,
                    note: "Specifically allows emergency shelter and utilities - Grant Agreement ERG-2023-156, Section 2.3"
                },
                {
                    donor: "Community Support Fund", 
                    available: 28000,
                    amount: 75000,
                    note: "Covers housing and shelter programs with up to 10% for utilities - Agreement CSF-2024-022"
                }
            ],
            processingNote: "Immediate approval available for Emergency Relief Grant funds upon submission of Form ER-401"
        };
    }

    const matchingFunds = mockGrantAgreements.filter(grant => {
        return grant.allowedCategories.some(category => 
        queryLower.includes(category.toLowerCase())
        ) && grant.available >= requestedAmount;
    });

    const prohibitedFunds = mockGrantAgreements.filter(grant => {
        return grant.prohibitedCategories.some(category => 
        queryLower.includes(category.toLowerCase())
        );
    });

    if (matchingFunds.length > 0 && prohibitedFunds.length === 0) {
        const bestMatch = matchingFunds.sort((a, b) => b.available - a.available)[0];
        return {
        decision: "YES",
        confidence: Math.floor(Math.random() * 15) + 85,
        reasoning: `This expense is compliant and can be funded from the ${bestMatch.donor}.`,
        fundSource: bestMatch,
        citations: bestMatch.restrictions,
        alternatives: []
        };
    } else if (matchingFunds.length === 0) {
        const alternatives = mockGrantAgreements.filter(grant => 
        grant.available >= requestedAmount && grant.prohibitedCategories.length === 0
        );
        
        return {
        decision: "NO",
        confidence: Math.floor(Math.random() * 10) + 90,
        reasoning: `No funding sources found that specifically allow this type of expense with sufficient funds.`,
        fundSource: null,
        citations: prohibitedFunds.length > 0 ? prohibitedFunds[0].restrictions : [],
        alternatives: alternatives.slice(0, 2)
        };
    } else {
        return {
        decision: "CONDITIONAL",
        confidence: Math.floor(Math.random() * 20) + 70,
        reasoning: `Some restrictions apply. Manual review recommended.`,
        fundSource: matchingFunds[0],
        citations: prohibitedFunds[0]?.restrictions || [],
        alternatives: matchingFunds.slice(1, 3)
        };
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

export default function Home() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your AI Compliance Assistant. I can help you check if expenses are compliant with your donor restrictions. Try asking something like: 'Can we spend $5000 on emergency medical supplies?' or 'Is $2000 for office rent allowed?'",
            timestamp: new Date()
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
        }, 10000 + Math.random() * 2000);
    };

    const handleLogout = () => {
        // Fake logout function - just show an alert
        alert("Logout functionality would be implemented here!");
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

            <div className={`${dmSans.className} min-h-screen bg-gray-50 flex flex-col`}>
                {/* HEADER */}
                <header className = "bg-white shadow-sm border-b">
                    <div className = "max-w-8xl mx-auto p-5 flex justify-between items-center px-7 pr-10 pl-10 py-6">
                        <div>
                            <h1 className = "text-5xl font-bold text-gray-900">
                                Grantime Compliance Assistant
                            </h1>
                            <p className = "text-gray-600 mt-2 text-xl font-semibold">
                                Ask me about donor restriction compliance for your expenses
                            </p>
                        </div>
                        
                        {/* Profile and Logout Section */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                {/* Profile Circle with Initials */}
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">JC</span>
                                </div>
                                
                                {/* Email */}
                                <div className="text-right">
                                    <div className="text-lg font-medium text-gray-900">
                                        joshua-cheung@healthway.ca
                                    </div>
                                </div>
                            </div>
                            
                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 hover:cursor-pointer rounded-3xl text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD SECTIONS */}
                <div className="max-w-3/4 mx-auto w-full p-10 flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                        {/* Left Column - Grant Info Sections */}
                        <div className="space-y-6">
                            {/* Grant Companies Section */}
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Grant Partners</h2>
                                <div className="space-y-4">
                                    {mockGrantCompanies.map((grant) => (
                                        <div key={grant.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">{grant.company}</div>
                                                <div className="text-sm text-gray-600">
                                                    Granted: {formatDate(grant.date)}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600">
                                                    {formatCurrency(grant.amount)}
                                                </div>
                                                <div className={`text-xs px-2 py-1 rounded-full ${
                                                    grant.status === 'Active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {grant.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Exportable Files Section */}
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Grant Agreements</h2>
                                <div className="space-y-3">
                                    {mockExportableFiles.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                            <div className="flex items-center space-x-3 gap-2">
                                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                                    <span className="text-red-600 text-xs font-bold">PDF</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 text-lg mb-2">{file.title}</div>
                                                    <div className="text-sm text-gray-600">
                                                        <span className = "font-semibold">{file.pages} pages</span>   •   Updated on {formatDate(file.lastModified)}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                Export
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Chatbot Section */}
                        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
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

                                                {message.content.citations.length > 0 && (
                                                <div className = "bg-yellow-50 p-3 rounded">
                                                    <strong>Relevant Restrictions:</strong>
                                                    <ul className = "mt-1 text-sm space-y-1">
                                                    {message.content.citations.map((citation, idx) => (
                                                        <li key = {idx} className = "flex items-start">
                                                        <span className = "text-yellow-600 mr-2">•</span>
                                                        {citation}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                </div>
                                                )}

                                                {message.content.alternatives.length > 0 && (
                                                <div className = "bg-green-50 p-3 rounded">
                                                    <strong> Alternative Funding Sources: </strong>
                                                    <div className = "mt-2 space-y-2">
                                                        {message.content.alternatives.map((alt, idx) => (
                                                            <div key = {idx} className = "text-sm">
                                                                <div className = "font-medium"> {alt.donor} </div>
                                                                <div className = "text-gray-600">
                                                                    Available: {formatCurrency(alt.available)}
                                                                    {alt.note && <div className="text-xs mt-1 italic">{alt.note}</div>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                )}

                                                {message.content.processingNote && (
                                                <div className = "bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                                                    <strong className="text-blue-800">Processing Note:</strong>
                                                    <div className = "text-sm text-blue-700 mt-1">{message.content.processingNote}</div>
                                                </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div> {message.content}</div>
                                        )}
                                        <div className = "text-xs opacity-70 mt-2">
                                            {message.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-3xl">
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                <span className="text-gray-600">Analyzing compliance...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref = {endOfMessagesRef} />
                            </div>

                            {/* INPUT FORM */}
                            <div className="border-t p-4">
                                <form onSubmit={handleSubmit} className="flex space-x-3">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask about your expense compliance..."
                                        className="flex-1 border border-gray-300 text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !inputValue.trim()}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
