export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

export default async function ContactPage() {
    const contact = await prisma.contactInfo.findUnique({ where: { id: 1 } });

    return (
        <div className="flex flex-col min-h-screen">
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
                            <form className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white font-medium placeholder:text-gray-400"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white font-medium placeholder:text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Project Type"
                                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white font-medium placeholder:text-gray-400"
                                />
                                <textarea
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors resize-none text-white font-medium placeholder:text-gray-400"
                                ></textarea>

                                <button type="button" className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all">
                                    Send Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
