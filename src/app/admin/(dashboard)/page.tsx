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
    let plansCount = 0;
    let designsCount = 0;
    let resourcesCount = 0;
    let totalViews = 0;
    let recentLogins: any[] = [];

    try {
        plansCount = await prisma.plan.count();
        designsCount = await prisma.design.count();
        resourcesCount = await prisma.resource.count();
        totalViews = await prisma.pageView.count();
        recentLogins = await prisma.adminLog.findMany({
            orderBy: { timestamp: 'desc' },
            take: 5
        });
    } catch (error) {
        console.warn("DashboardPage: Failed to fetch stats", error);
    }

    const stats = [
        { label: "Drawn Plans", value: plansCount, icon: PenTool, color: "text-blue-400" },
        { label: "New Designs", value: designsCount, icon: FileText, color: "text-emerald-400" },
        { label: "Resources", value: resourcesCount, icon: Boxes, color: "text-amber-400" },
        { label: "Total Views", value: totalViews.toLocaleString(), icon: TrendingUp, color: "text-purple-400" },
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
                    <h3 className="text-xl font-bold mb-4">Recent Admin Activity</h3>
                    <div className="space-y-4">
                        {recentLogins.length > 0 ? (
                            recentLogins.map((log) => (
                                <div key={log.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-800 last:border-0">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-200">{log.action}</span>
                                        <span className="text-[10px] text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${log.status === "Success" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                        }`}>
                                        {log.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">No recent activity recorded.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
