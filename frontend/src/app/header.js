export default function PageHeader() {

    const handleLogout = () => {
        alert("You have been logged out!");
    };

    return (
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
                <div className = "flex items-center space-x-4">
                    <div className = "flex items-center space-x-3">
                        <div className = "w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className = "text-white font-semibold text-sm">JC</span>
                        </div>
                        <div className = "text-right">
                            <div className = "text-lg font-medium text-gray-900">
                                joshua-cheung@healthway.ca
                            </div>
                        </div>
                    </div>
                    <button
                        onClick = {handleLogout}
                        className = "bg-red-600 hover:bg-red-700 text-white px-4 py-2 hover:cursor-pointer rounded-3xl text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};