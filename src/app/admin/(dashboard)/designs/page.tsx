"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FileText, Layout } from "lucide-react";
import BackButton from "@/components/admin/BackButton";

interface Design {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string;
}

export default function DesignsManager() {
    const [designs, setDesigns] = useState<Design[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        const res = await fetch("/api/admin/designs");
        const data = await res.json();
        setDesigns(data);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            if (res.ok) {
                setFormData({ ...formData, imageUrl: result.url });
                setMessage({ text: "Preview updated!", type: "success" });
            } else {
                setMessage({ text: result.message || "Upload failed", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "Error uploading image", type: "error" });
        } finally {
            setUploading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            setMessage({ text: "Please upload an image first", type: "error" });
            return;
        }
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await fetch("/api/admin/designs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ title: "", description: "", imageUrl: "" });
                fetchDesigns();
                setMessage({ text: "Design published successfully!", type: "success" });
            } else {
                setMessage({ text: "Failed to add design", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "Error occurred", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        const res = await fetch(`/api/admin/designs?id=${id}`, { method: "DELETE" });
        if (res.ok) fetchDesigns();
    };

    return (
        <div className="space-y-8">
            <BackButton />
            <div>
                <h1 className="text-3xl font-bold">New Designs Showcase</h1>
                <p className="text-gray-400 mt-2">Share your architectural and structural concepts with high-quality visual renders.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
                    <Plus className="w-5 h-5" /> Add New Design
                </h2>
                <form onSubmit={handleAdd} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Waterfront Modern Residence"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Concept Description</label>
                                <textarea
                                    placeholder="Describe the aesthetic and functional goals..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 h-32 resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Project Render / Cover Image</label>
                            <div className="relative group aspect-video bg-gray-950 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all hover:border-emerald-500/50">
                                {formData.imageUrl ? (
                                    <>
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                                                Change Image
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 bg-gray-900 rounded-2xl text-gray-500 mb-3 group-hover:scale-110 transition-transform">
                                            {uploading ? (
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
                                            ) : (
                                                <Layout className="w-8 h-8" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {uploading ? "Uploading..." : "Click to select from device"}
                                        </p>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Publishing..." : (
                            <>
                                <Plus className="w-5 h-5" /> Publish Design
                            </>
                        )}
                    </button>
                </form>
                {message.text && (
                    <p className={`mt-4 text-sm font-medium ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                        {message.text}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                    <div key={design.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group">
                        <div className="aspect-video bg-gray-800 relative overflow-hidden">
                            <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <button
                                    onClick={() => handleDelete(design.id)}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-xl"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2 text-emerald-400">
                                <Layout className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Concept Design</span>
                            </div>
                            <h3 className="font-bold text-gray-100">{design.title}</h3>
                            <p className="text-xs text-gray-400 mt-2 line-clamp-2">{design.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
