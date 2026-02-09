export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { PenTool, Maximize2 } from "lucide-react";

export default async function PlansPage() {
    const plans = await prisma.plan.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">New Drawn Plans</h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Exploration of structural blueprints and technical drawings for modern infrastructure projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {plans.length > 0 ? (
                            plans.map((plan: any) => (
                                <div key={plan.id} className="group bg-gray-900 border border-gray-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all">
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-800">
                                        <img
                                            src={plan.imageUrl}
                                            alt={plan.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gray-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white">
                                                <Maximize2 className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-gray-950/80 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                            <PenTool className="w-3 h-3 text-blue-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Blueprint</span>
                                        </div>
                                    </div>
                                    <div className="p-10">
                                        <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            {plan.description}
                                        </p>
                                        <button className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-gray-900/50 rounded-3xl border border-dashed border-gray-800">
                                <p className="text-gray-500">No drawn plans currently on showcase.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
