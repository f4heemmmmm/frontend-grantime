"use client";

import { LineChart, LineChartMultple } from "./lineChart";
import { PieChartRestricted } from "./pieChart";

import { mockGrantCompanies } from "../mockGrantData";

// Mock data for charts
const restrictedVsUnrestricted = [
  { name: "Restricted Funds", value: 80000 },
  { name: "Unrestricted Funds", value: 45000 },
];

const COLORS = ["#2563eb", "#f59e0b"];

const financialTrends = [
  { month: "Jan", spent: 12000, earned: 25000, bank: 50000 },
  { month: "Feb", spent: 18000, earned: 22000, bank: 54000 },
  { month: "Mar", spent: 15000, earned: 28000, bank: 67000 },
  { month: "Apr", spent: 20000, earned: 30000, bank: 77000 },
  { month: "May", spent: 22000, earned: 26000, bank: 81000 },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
};

const page = () => {
  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-300">
        <div className="max-w-8xl mx-auto p-5 flex justify-between items-center px-7 pr-10 pl-10 py-6">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Grantime Trackonomics
            </h1>
            <p className="text-gray-600 mt-2 text-xl font-semibold">
              Learn about your fund usage and financial trends
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
      {/* FUND SUMMARY & CHARTS */}
      <div className="pt-12 space-y-10 bg-gray-50">
        {/* Pie Chart */}
        <div className="flex justify-center gap-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Financial Trends (Spent vs Earned vs Bank)
            </h2>
            <LineChartMultple />
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Restricted vs Unrestricted Funds
            </h2>
            <PieChartRestricted />
          </div>
        </div>

        {/* Grant Funds List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 max-w-[1460px] mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            All Grant Funds
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 10 }, () => mockGrantCompanies)
              .flat()
              .map((grant, i) => {
                const usedPercentage = (grant.used / grant.amount) * 100;
                const remaining = grant.amount - grant.used;

                return (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {grant.company}
                        </div>
                        <div className="text-xs text-gray-600">
                          Granted: {formatDate(grant.date)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600 text-sm">
                          {formatCurrency(grant.amount)}
                        </div>
                        <div
                          className={`text-xs my-2 px-5 py-1 rounded-full inline-block ${
                            grant.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {grant.status}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Used: {formatCurrency(grant.used)}</span>
                        <span>Remaining: {formatCurrency(remaining)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
      </div>
    </>
  );
};

export default page;
