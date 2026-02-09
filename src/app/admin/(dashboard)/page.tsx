export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
    FileText,
    PenTool,
    Boxes,
    TrendingUp,
    ArrowRight
} from "lucide-react";

export default async function DashboardPage() {
    const plansCount = await prisma.plan.count();
    const designsCount = await prisma.design.count();
    const resourcesCount = await prisma.resource.count();

    const stats = [
        { label: "Drawn Plans", value: plansCount, icon: PenTool, color: "text-blue-400" },
        { label: "New Designs", value: designsCount, icon: FileText, color: "text-emerald-400" },
        { label: "Resources", value: resourcesCount, icon: Boxes, color: "text-amber-400" },
        { label: "Total Views", value: "1,234", icon: TrendingUp, color: "text-purple-400" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome Back, Engineer</h1>
                <p className="text-gray-400 mt-2">Manage your website content and track your project showcase.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-sm hover:border-gray-700 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <h2 className="text-3xl font-bold mt-1">{stat.value}</h2>
                            </div>
                            <div className={`p-3 bg-gray-800 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link href="/admin/home" className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all group">
                            <span>Update Home Page Hero</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                        <Link href="/admin/plans" className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all group">
                            <span>Upload New Plan</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                        <Link href="/admin/designs" className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all group">
                            <span>Add New Design</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Database Connection</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Stable
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Environment</span>
                            <span className="text-gray-200">Production Mode</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Last Content Update</span>
                            <span className="text-gray-200">Never</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
