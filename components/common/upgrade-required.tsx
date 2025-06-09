import { ArrowUp } from "lucide-react";

export default function UpgradeRequired() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <ArrowUp className="text-blue-600 w-8 h-8" />
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Unlock More Power!</h1>
                <p className="text-gray-700 mb-6">
                    This feature is available on our premium plans.<br />
                    Upgrade now to supercharge your experience and access all the benefits.
                </p>
                <a
                    href="/pricing"
                    className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
                >
                    Upgrade Now
                </a>
                
            </div>
        </div>
    );
}