"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Home,
    User,
    FileText,
    CreditCard,
    Phone,
    Settings,
    LogOut,
    PenTool,
    Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Home, label: "Home Page", href: "/admin/home" },
    { icon: User, label: "About Page", href: "/admin/about" },
    { icon: Boxes, label: "Resources", href: "/admin/resources" },
    { icon: PenTool, label: "New Plans", href: "/admin/plans" },
    { icon: FileText, label: "New Designs", href: "/admin/designs" },
    { icon: Phone, label: "Contact Info", href: "/admin/contact" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface SidebarProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setOpen }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen transition-transform duration-300 transform md:relative md:translate-x-0 outline-none",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Engineer Admin
                    </h1>
                    <button className="md:hidden text-gray-400" onClick={() => setOpen(false)}>
                        <LogOut className="w-5 h-5 rotate-180" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                pathname === item.href
                                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-transform duration-200",
                                pathname === item.href ? "scale-110" : "group-hover:scale-110"
                            )} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}
