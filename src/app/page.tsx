export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle, PenTool, Layout, FileCode } from "lucide-react";

export default async function HomePage() {
  let home = null;
  try {
    home = await prisma.homePage.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.warn("HomePage: Failed to fetch home data", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-950 to-emerald-900/10 z-0" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full animate-pulse delay-700" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              {home?.heroTitle || "Professional Engineer"}
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
              {home?.heroSub || "Precision, Innovation, and Excellence in engineering designs."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/plans"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 shadow-xl shadow-blue-500/10 text-center"
              >
                View Plans
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 border border-gray-800 text-white font-bold rounded-xl hover:border-gray-600 transition-all flex items-center justify-center gap-2"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Short About Section */}
        <section className="py-24 bg-gray-950/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Designing the Future, <br /><span className="text-gray-500">One blueprint at a time.</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {home?.aboutShort || "I specialize in creating detailed engineering plans and innovative designs that stand the test of time."}
                </p>
                <Link href="/about" className="text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  More about my process <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4">
                  <PenTool className="w-10 h-10 text-blue-500" />
                  <h4 className="font-bold">Planning</h4>
                  <p className="text-xs text-gray-500">Detailed structural drawings and technical blueprints.</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 mt-8">
                  <Layout className="w-10 h-10 text-emerald-500" />
                  <h4 className="font-bold">Design</h4>
                  <p className="text-xs text-gray-500">Aesthetic and functional architectural concepts.</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4">
                  <FileCode className="w-10 h-10 text-purple-500" />
                  <h4 className="font-bold">Consultancy</h4>
                  <p className="text-xs text-gray-500">Expert advice on engineering standards and feasibility.</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 mt-8">
                  <CheckCircle className="w-10 h-10 text-amber-500" />
                  <h4 className="font-bold">Execution</h4>
                  <p className="text-xs text-gray-500">Supervision and validation of on-site implementation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
