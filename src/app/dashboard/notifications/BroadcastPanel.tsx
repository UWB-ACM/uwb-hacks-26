"use client";

import { useState } from "react";

export default function BroadcastPanel() {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string | null>(null);

    const sendBroadcast = async () => {
        if (!message.trim()) {
            setStatus("Message cannot be empty.");
            return;
        }

        try {
            setLoading(true);
            setStatus(null);

            const res = await fetch("/api/notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            setMessage("");
            setStatus("Broadcast sent successfully.");
        } catch (err) {
            setStatus("Failed to send broadcast.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Send Broadcast
                </h2>
                <p className="text-sm text-gray-500">
                    Send a message to all Discord users in the event.
                </p>
            </div>

            {/* Input */}
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter announcement message..."
                className="w-full h-28 resize-none rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Button */}
            <button
                onClick={sendBroadcast}
                disabled={loading}
                className={`w-full rounded-xl py-2.5 text-sm font-medium transition
          ${
              loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
            >
                {loading ? "Sending..." : "Send Broadcast"}
            </button>

            {/* Status */}
            {status && (
                <div
                    className={`text-sm px-3 py-2 rounded-lg ${
                        status.includes("success")
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {status}
                </div>
            )}
        </div>
    );
}
