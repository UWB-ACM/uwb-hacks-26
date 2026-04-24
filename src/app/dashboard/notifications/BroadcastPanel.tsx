import { useState } from "react";
import Link from "next/link";

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
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="flex flex-col text-center w-full max-w-lg mx-auto bg-white border border-black rounded-2xl shadow-sm p-6 space-y-4">
                <div>
                    <h2 className="text-xl font-semibold text-black">
                        Send Broadcast
                    </h2>
                    <p className="text-sm text-black">
                        Send a message to all Discord users in the event.
                    </p>

                    <p className="text-sm text-red-400">
                        <span className="font-bold">WARNING</span>: This will be
                        sent as a DM to ALL users in the UWB Hacks Discord!
                    </p>
                </div>

                {/* Input */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter announcement..."
                    className="w-full h-28 resize-none rounded-xl border border-black p-3 text-sm bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Button */}
                <button
                    onClick={sendBroadcast}
                    disabled={loading}
                    className={`py-2 px-4 w-full rounded-md bg-green-600 hover:bg-green-500 text-white duration-200 border-black border disabled:opacity-50"
               
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
            <Link
                href="/dashboard"
                className="m-10 py-2 px-4 w-full max-w-lg rounded-md bg-red-500 text-white text-center"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}
