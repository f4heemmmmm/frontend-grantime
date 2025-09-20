import React from "react";
import Head from "next/head";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const page = () => {
  return (
    <>
      <Head>
        <title>Grantime Trackonomics</title>
        <meta
          name="description"
          content="AI-powered compliance checking for non-profit organizations"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${dmSans.className} min-h-screen bg-gray-50 flex flex-col`}
      >
        {/* HEADER */}
        <header className="bg-white shadow-sm border-b border-gray-300">
          <div className="max-w-8xl mx-auto p-5 flex justify-between items-center px-7 pr-10 pl-10 py-6">
            <div>
              <h1 className="text-5xl font-bold text-gray-900">
                Grantime Trackonomics
              </h1>
              <p className="text-gray-600 mt-2 text-xl font-semibold">
                View detailed view of your grant budgets
              </p>
            </div>

            {/* Profile and Logout Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* Profile Circle with Initials */}
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JC</span>
                </div>

                {/* Email */}
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    joshua-cheung@healthway.ca
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 hover:cursor-pointer rounded-3xl text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Grant Partners
                </h2>
              </div>

              {/* Exportable Files Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Grant Agreements
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
