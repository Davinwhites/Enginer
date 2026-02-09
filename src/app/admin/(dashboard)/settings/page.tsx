"use client";

import { useState, useEffect } from "react";
import { Save, User, Lock } from "lucide-react";
import BackButton from "@/components/admin/BackButton";

export default function SettingsPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        // Fetch current username (dummy fetch for now or just wait for load)
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => setUsername(data.username))
            .catch(() => setMessage({ text: "Failed to load settings", type: "error" }));
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                setMessage({ text: "Settings saved successfully!", type: "success" });
                setPassword(""); // Clear password field for security
            } else {
                const data = await res.json();
                setMessage({ text: data.message || "Failed to save settings", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "An error occurred", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <BackButton />
            <div>
                <h1 className="text-3xl font-bold">Admin Settings</h1>
                <p className="text-gray-400 mt-2">Update your login credentials.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-300">
                            <User className="w-4 h-4" /> New Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-300">
                            <Lock className="w-4 h-4" /> New Password
                        </label>
                        <input
                            type="password"
                            placeholder="Leave blank to keep current"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">If you change this, you will need to use it for next login.</p>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm ${message.type === "success"
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
