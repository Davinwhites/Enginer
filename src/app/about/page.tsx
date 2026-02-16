export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { User, Target, Briefcase, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AboutPage() {
    let about = null;
    try {
        about = await prisma.aboutPage.findUnique({ where: { id: 1 } });
    } catch (error) {
        console.warn("AboutPage: Failed to fetch about data", error);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header Section */}
                    <div className="mb-20">
                        <h1 className="text-4xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
                            Architecting <br />
                            <span className="text-gray-500">Innovation.</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-gray-400 leading-relaxed">
                            A focused look into my professional journey, mission, and the expertise I bring to every engineering challenge.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        {/* Bio Section */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-500">Biography</h2>
                                </div>
                                <div className="bg-gray-900/50 border border-gray-800 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <Award className="w-32 h-32" />
                                    </div>
                                    <p className="text-lg md:text-xl text-gray-300 leading-loose relative z-10 whitespace-pre-wrap">
                                        {about?.bio || "I am a dedicated engineer with years of experience in structural and civil engineering, specializing in innovative design solutions that are built to last."}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-500">Experience</h2>
                                </div>
                                <div className="bg-gray-900/50 border border-gray-800 rounded-[2rem] p-8 md:p-12">
                                    <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {about?.experience || "Over 10 years of professional experience in the engineering industry, covering structural analysis, architectural design, and project management."}
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Mission Section */}
                        <div className="space-y-8">
                            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Target className="w-48 h-48" />
                                </div>
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <Target className="w-8 h-8" />
                                    <h2 className="text-xl font-bold uppercase tracking-widest opacity-80">Our Mission</h2>
                                </div>
                                <p className="text-xl font-medium leading-relaxed relative z-10">
                                    {about?.mission || "To provide high-quality engineering designs that combine aesthetic beauty with structural integrity."}
                                </p>
                            </section>

                            <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-10 space-y-6">
                                <h3 className="text-xl font-bold">Ready to start?</h3>
                                <p className="text-gray-400">
                                    Let's discuss how we can bring your engineering vision to life.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 text-blue-400 font-bold hover:gap-5 transition-all"
                                >
                                    Get in touch <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
