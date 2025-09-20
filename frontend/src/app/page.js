"use client";

import Head from "next/head";
import { DM_Sans } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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

  if (
    queryLower.includes(
      "can i use $15000 from healthcare foundation to set up shelters"
    ) ||
    (queryLower.includes("healthcare foundation") &&
      queryLower.includes("shelter") &&
      requestedAmount === 15000)
  ) {
    return mockResponse;
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
    day: "2-digit",
  });
};

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your Grantime, your AI Compliance Assistant. What do you need help with today?",
      timestamp: new Date("2024-01-01T12:00:00"),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    if (endOfMessagesRef.current) {
      const chatContainer =
        endOfMessagesRef.current.closest(".overflow-y-auto");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
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
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const amountMatch = inputValue.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    const amount = amountMatch
      ? parseFloat(amountMatch[1].replace(/,/g, ""))
      : 0;

    // Simulate AI processing time
    setTimeout(() => {
      const mockResponse = generateMockResponse(inputValue, amount);

      const assistantMessage = {
        role: "assistant",
        content: mockResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
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

      <div
        className={`${dmSans.className} min-h-screen bg-gray-50 flex flex-col`}
      >
        <PageHeader />

        {/* DASHBOARD SECTIONS */}
        <div className="max-w-3/4 mx-auto w-full p-10 flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Grant Partners
                  </h2>
                  <Link 
                    href="/trackonomics#grants-section"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View All Grants
                  </Link>
                </div>
                <div className="space-y-4">
                  {mockGrantCompanies.map((grant) => {
                    const usedPercentage = (grant.used / grant.amount) * 100;
                    const remaining = grant.amount - grant.used;

                    return (
                      <div key={grant.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-semibold text-lg text-gray-900">
                              {grant.company}
                            </div>
                            <div className="text-sm text-gray-600">
                              Granted On: {formatDate(grant.date)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-light text-2xl text-green-600">
                              {formatCurrency(grant.amount)}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Used: {formatCurrency(grant.used)} of{" "}
                              {formatCurrency(grant.amount)}
                            </span>
                            <span className="text-gray-600">
                              Remaining: {formatCurrency(remaining)}
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${usedPercentage}%` }}
                            ></div>
                          </div>

                          <div className="text-xs text-gray-500 text-center">
                            {usedPercentage.toFixed(1)}% used
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* GRANT AGREEMENTS */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Grant Agreements
                </h2>
                <div className="space-y-3">
                  {mockExportableFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 gap-2">
                        <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                          <span className="text-red-600 text-xs font-bold">
                            PDF
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-lg mb-2">
                            {file.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">
                              {file.pages} pages
                            </span>{" "}
                            • Updated on {formatDate(file.lastModified)}
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:cursor-pointer">
                        View Agreement
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CHATBOT */}
            <ChatBot
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              formatTime={formatTime}
              formatCurrency={formatCurrency}
              getDecisionColor={getDecisionColor}
              endOfMessagesRef={endOfMessagesRef}
            />
          </div>
        </div>
      </div>
    </>
  );
}