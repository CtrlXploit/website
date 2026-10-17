"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash, Edit, Plus, Save, X } from "lucide-react";
import { revalidatePage } from "@/app/actions/revalidate";

type Achievement = {
  id: number;
  title: string;
  description: string;
  result?: string;
  rank?: string;
  img_url: string;
};

const getBadgeClasses = (rank?: string) => {
  const base = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 border";
  switch (rank) {
    case "1st": return `${base} bg-amber-400/20 text-amber-400 border-amber-400/30`;
    case "2nd": return `${base} bg-blue-400/20 text-blue-400 border-blue-400/30`;
    case "3rd": return `${base} bg-orange-500/20 text-orange-500 border-orange-500/30`;
    case "Special": default: return `${base} bg-emerald-400/20 text-emerald-400 border-emerald-400/30`;
  }
};

export default function AchievementList({
  initialAchievements,
}: {
  initialAchievements: Achievement[];
}) {
  const supabase = createClient();
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [loading, setLoading] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newResult, setNewResult] = useState("");
  const [newRank, setNewRank] = useState("Special");
  const [newImgUrl, setNewImgUrl] = useState("");

  const addAchievement = async () => {
    if (!newTitle || !newDescription || !newImgUrl) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from("achievements")
      .insert({
        title: newTitle,
        description: newDescription,
        result: newResult,
        rank: newRank,
        img_url: newImgUrl,
      })
      .select()
      .single();

    if (!error && data) {
      setAchievements((prev) => [...prev, data]);
      setNewTitle("");
      setNewDescription("");
      setNewResult("");
      setNewRank("Special");
      setNewImgUrl("");
      await revalidatePage("/achievements");
    }
    setLoading(false);
  };

  const removeAchievement = async (id: number, title: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the achievement "${title}"?`);

    if (isConfirmed) {
      setLoading(true);
      const { error } = await supabase.from("achievements").delete().eq("id", id);
      if (error) {
        console.error("Delete error:", error);
        alert(`Failed to delete: ${error.message}. Please check your Supabase RLS policies.`);
      } else {
        setAchievements((prev) => prev.filter((a) => a.id !== id));
        await revalidatePage("/achievements");
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-8">
      <div className="group relative bg-black/5 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8 transition-all duration-500 hover:bg-black/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="transition-transform duration-300 group-hover:scale-110 text-primary"><Plus className="w-8 h-8" /></div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-primary">Add New Achievement</h2>
            <p className="text-foreground/70">Create a new achievement entry</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Achievement Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
          <input type="url" placeholder="Image URL" value={newImgUrl} onChange={(e) => setNewImgUrl(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Result (Optional, e.g., Regional CTF)" value={newResult} onChange={(e) => setNewResult(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
          <select value={newRank} onChange={(e) => setNewRank(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 [&>option]:bg-zinc-900">
            <option value="Special">Special</option>
            <option value="1st">1st Place</option>
            <option value="2nd">2nd Place</option>
            <option value="3rd">3rd Place</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={3} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none" />
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={addAchievement} className="flex items-center gap-2 bg-primary/90 hover:bg-primary px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !newTitle || !newDescription || !newImgUrl}>
            <Plus className="w-4 h-4" /> Add Achievement
          </button>
        </div>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const AchievementCard = () => {
            const [isEditing, setIsEditing] = useState(false);
            const [editTitle, setEditTitle] = useState(achievement.title);
            const [editDescription, setEditDescription] = useState(achievement.description);
            const [editResult, setEditResult] = useState(achievement.result || "");
            const [editRank, setEditRank] = useState(achievement.rank || "Special");
            const [editImgUrl, setEditImgUrl] = useState(achievement.img_url);

            const saveChanges = async () => {
              setLoading(true);
              const { data, error } = await supabase
                .from("achievements")
                .update({
                  title: editTitle,
                  description: editDescription,
                  result: editResult,
                  rank: editRank,
                  img_url: editImgUrl,
                })
                .eq("id", achievement.id)
                .select()
                .single();

              if (!error && data) {
                setAchievements((prev) => prev.map((a) => (a.id === data.id ? data : a)));
                setIsEditing(false);
                await revalidatePage("/achievements");
              }
              setLoading(false);
            };

            const cancelEdit = () => setIsEditing(false);

            return (
              <div className="group relative bg-black/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-black/10">
                {isEditing ? (
                  <div className="space-y-3">
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Achievement Title"/>
                    <div className="flex gap-2">
                      <input value={editResult} onChange={(e) => setEditResult(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Result (e.g., CTF Event)"/>
                      <select value={editRank} onChange={(e) => setEditRank(e.target.value)} className="w-40 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground [&>option]:bg-zinc-900">
                        <option value="Special">Special</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                      </select>
                    </div>
                    <input value={editImgUrl} onChange={(e) => setEditImgUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Image URL"/>
                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground resize-none" placeholder="Description"/>
                    <div className="flex gap-3 pt-2">
                        <button onClick={saveChanges} disabled={loading} className="flex items-center gap-2 bg-green-600/90 hover:bg-green-600 text-white px-4 py-2 rounded-xl"><Save className="w-4 h-4" />Save</button>
                        <button onClick={cancelEdit} className="flex items-center gap-2 bg-gray-600/90 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"><X className="w-4 h-4" />Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img src={achievement.img_url || "https://via.placeholder.com/400x200?text=No+Image"} alt={achievement.title} className="w-full h-40 object-cover object-center rounded-lg mb-2"/>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <h3 className="text-xl font-bold text-foreground">{achievement.title}</h3>
                      {achievement.result && (
                      <span className={getBadgeClasses(achievement.rank)}>
                        {achievement.result}
                      </span>
                      )}
                    </div>
                    <p className="text-foreground/70 text-sm h-16 overflow-auto">{achievement.description}</p>
                    <div className="absolute top-4 right-4 flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 text-white p-2 rounded-full"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => removeAchievement(achievement.id, achievement.title)} disabled={loading} className="flex items-center gap-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full"><Trash className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          };
          return <AchievementCard key={achievement.id} />;
        })}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground/60 text-lg">No achievements found. Add your first achievement above!</p>
        </div>
      )}
    </div>
  );
}
