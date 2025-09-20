"use client";

import Head from "next/head";
import { DM_Sans } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { mockGrantAgreements } from "./mockGrantAgreements";
import { mockGrantCompanies, mockExportableFiles } from "./mockGrantData";
import { mockResponse } from "./mockResponse";
import PageHeader from "./header";
import ChatBot from "./ChatBot";

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
      decision: "NO",
      confidence: 95,
      reasoning: `Shelter setup and operations are not permitted under Healthcare Foundation's grant restrictions. The Healthcare Foundation grant agreement specifically limits funding to medical supplies and healthcare services only.`,
      fundSource: null,
      citations: [
        {
          text: "Grantee funds shall be used exclusively for educational programming and direct client services as defined in Exhibit A. Emergency facility operations, including but not limited to utilities, maintenance, and crisis response activities, are specifically excluded from allowable expenses under this agreement.",
          source: "Grant Agreement HCF-2024-089",
          section: "Section 3.2 - Allowable Expenses",
          clickable: true,
        },
      ],
      alternatives: [
        {
          donor: "Emergency Relief Grant",
          available: 75000,
          amount: 200000,
          reasoning:
            "This grant specifically covers emergency shelter operations and setup costs.",
          citations: [
            {
              text: "Funds may be utilized for emergency shelter establishment, including temporary housing setup, basic utilities connection, and emergency accommodation services for displaced individuals during crisis periods.",
              source: "Grant Agreement ERG-2023-156",
              section: "Section 2.3 - Emergency Housing Provisions",
              clickable: true,
            },
          ],
        },
        {
          donor: "Community Support Fund",
          available: 28000,
          amount: 75000,
          reasoning:
            "Covers housing and shelter programs with specific provisions for emergency shelter setup.",
          citations: [
            {
              text: "Grant recipients are authorized to establish temporary and emergency shelters, including facility preparation, basic infrastructure setup, and operational costs not exceeding reasonable community standards for emergency housing.",
              source: "Grant Agreement CSF-2024-022",
              section: "Section 4.1 - Housing and Shelter Programs",
              clickable: true,
            },
          ],
        },
      ],
      processingNote:
        "Emergency Relief Grant funds can be accessed immediately upon submission of Form ER-401. Community Support Fund requires 48-hour approval process.",
      allowedUses:
        "Healthcare Foundation funds CAN be used for:\n• Emergency medical supplies\n• Healthcare equipment\n• Medical training programs\n• Patient care services\n• Health education initiatives",
      prohibitedUses:
        "Healthcare Foundation funds CANNOT be used for:\n• Shelter operations\n• Utilities\n• Facility maintenance\n• Construction\n• Administrative salaries\n• Office supplies\n• Any non-medical emergency response activities",
      showChangeAgreementButton: true,
      showSubmitRequestButton: false,
    };
  }

  return {
    decision: "UNKNOWN",
    confidence: 0,
    reasoning:
      "Please ask about using $15000 from Healthcare Foundation to set up shelters to see the demo response.",
    fundSource: null,
    citations: [],
    alternatives: [],
    showChangeAgreementButton: false,
    showSubmitRequestButton: false,
  };
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
};

const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
};

export default function Home() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your Grantime, your AI Compliance Assistant. What do you need help with today?",
            timestamp: new Date("2024-01-01T12:00:00")
        }
    ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        if (endOfMessagesRef.current) {
            const chatContainer = endOfMessagesRef.current.closest(".overflow-y-auto");
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    };

  useEffect(scrollToBottom, [messages]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "CAD"
        }).format(amount);
    };

    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
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
                                                        <div className = "font-semibold text-lg text-gray-900">{grant.company}</div>
                                                        <div className = "text-sm text-gray-600">
                                                            Granted On: {formatDate(grant.date)}
                                                        </div>
                                                    </div>
                                                    <div className = "text-right">
                                                        <div className = "font-light text-2xl text-green-600">
                                                            {formatCurrency(grant.amount)}
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
                                            {citation.clickable && (
                                              <button
                                                className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                                                onClick={() =>
                                                  alert(
                                                    `Opening ${citation.source}...`
                                                  )
                                                }
                                              >
                                                View Agreement
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {(message.content.allowedUses ||
                            message.content.prohibitedUses) && (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <strong className="text-gray-800 text-sm">
                                Fund Usage Summary:
                              </strong>
                              <div className="mt-3 space-y-3">
                                {message.content.allowedUses && (
                                  <div className="bg-green-50 p-3 rounded border border-green-200">
                                    <div className="text-sm text-green-800 font-medium mb-1">
                                      ✓ Allowed Uses:
                                    </div>
                                    <div className="text-sm text-gray-700 whitespace-pre-line">
                                      {message.content.allowedUses}
                                    </div>
                                  </div>
                                )}
                                {message.content.prohibitedUses && (
                                  <div className="bg-red-50 p-3 rounded border border-red-200">
                                    <div className="text-sm text-red-800 font-medium mb-1">
                                      ✗ Prohibited Uses:
                                    </div>
                                    <div className="text-sm text-gray-700 whitespace-pre-line">
                                      {message.content.prohibitedUses}
                                    </div>
                                  </div>
                                )}
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

                        {/* CHATBOT */}
                        <ChatBot 
                            messages = {messages}
                            inputValue = {inputValue}
                            setInputValue = {setInputValue}
                            isLoading = {isLoading}
                            handleSubmit = {handleSubmit}
                            formatTime = {formatTime}
                            formatCurrency = {formatCurrency}
                            getDecisionColor = {getDecisionColor}
                            endOfMessagesRef = {endOfMessagesRef}
                        />
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-3xl">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4  border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">
                          Analyzing compliance...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* INPUT FORM */}
              <div className="border-t border-gray-300 p-4">
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
