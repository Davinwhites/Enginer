"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [contact, setContact] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        message: ""
    });

    useEffect(() => {
        fetch("/api/admin/contact")
            .then(res => res.json())
            .then(data => setContact(data))
            .catch(err => console.error("Failed to load contact info", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setFormData({ name: "", email: "", projectType: "", message: "" });
            } else {
                setError(data.message || "Failed to send message");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen" translate="no">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div>
                            <h1 className="text-4xl md:text-7xl font-bold mb-8 uppercase tracking-tighter">Get in <br /><span className="text-gray-500">Touch.</span></h1>
                            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                                Have a project in mind or need a professional engineering consultation?
                                Feel free to reach out through any of the channels below.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</p>
                                        <p className="text-xl font-medium">{contact?.email || "engineer@example.com"}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Phone</p>
                                        <p className="text-xl font-medium">{contact?.phone || "+123 456 7890"}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Office</p>
                                        <p className="text-xl font-medium">{contact?.address || "123 Engineering Way"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Send className="w-32 h-32" />
                            </div>

                            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                    <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                                    <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="mt-6 text-blue-500 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white font-medium placeholder:text-gray-400"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white font-medium placeholder:text-gray-400"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        placeholder="Project Type"
                                        className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white font-medium placeholder:text-gray-400"
                                    />
                                    <textarea
                                        rows={5}
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors resize-none text-white font-medium placeholder:text-gray-400"
                                    ></textarea>

                                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Inquiry"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
