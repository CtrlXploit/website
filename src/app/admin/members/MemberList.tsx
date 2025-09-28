"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash, Edit, Plus, Save, X } from "lucide-react";

type Level = { id: string; name: string };
type Member = {
  id: string;
  username: string;
  level: string;
  levels: Level | null;
  created_at: string;
};

export default function MemberList({
  initialMembers,
}: {
  initialMembers: Member[];
}) {
  const supabase = createClient();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newLevel, setNewLevel] = useState<string>("");

  // Fetch levels for dropdown
  useEffect(() => {
    const fetchLevels = async () => {
      const { data } = await supabase.from("levels").select("id, name");
      if (data) setLevels(data);
      if (data?.length) setNewLevel(data[0].id);
    };
    fetchLevels();
  }, []);

  // Add new member
  const addMember = async () => {
    if (!newUsername || !newLevel) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .insert({ username: newUsername, level: newLevel })
      .select()
      .single();

    if (!error && data) {
      setMembers((prev) => [...prev, data]);
      setNewUsername("");
      setNewLevel(levels[0]?.id || "");
    }
    setLoading(false);
  };

  // Delete member
  const removeMember = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (!error) setMembers((prev) => prev.filter((m) => m.id !== id));
    setLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-8">
      {/* Add Member Section */}
      <div className="group relative bg-black/5 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8 transition-all duration-500 hover:bg-black/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="transition-transform duration-300 group-hover:scale-110 text-primary">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-primary">Add New Member</h2>
            <p className="text-foreground/70">Create a new team member</p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <input
            type="text"
            placeholder="Enter username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
          />
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
          >
            {levels.map((l) => (
              <option
                key={l.id}
                value={l.id}
                className="bg-background text-foreground"
              >
                {l.name}
              </option>
            ))}
          </select>
          <button
            onClick={addMember}
            className="flex items-center gap-2 bg-primary/90 hover:bg-primary px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !newUsername || !newLevel}
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => {
          const MemberCard = () => {
            const [isEditing, setIsEditing] = useState(false);
            const [editUsername, setEditUsername] = useState(member.username);
            const [editLevel, setEditLevel] = useState(member.level);

            const saveChanges = async () => {
              setLoading(true);
              const { data, error } = await supabase
                .from("members")
                .update({ username: editUsername, level: editLevel })
                .eq("id", member.id)
                .select()
                .single();

              if (!error && data) {
                setMembers((prev) =>
                  prev.map((m) => (m.id === data.id ? data : m))
                );
                setIsEditing(false);
              }
              setLoading(false);
            };

            const cancelEdit = () => {
              setEditUsername(member.username);
              setEditLevel(member.level);
              setIsEditing(false);
            };

            return (
              <div
                className="group relative bg-black/5 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-500 hover:bg-black/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        Username
                      </label>
                      <input
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        Level
                      </label>
                      <select
                        value={editLevel}
                        onChange={(e) => setEditLevel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      >
                        {levels.map((l) => (
                          <option
                            key={l.id}
                            value={l.id}
                            className="bg-background text-foreground"
                          >
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={saveChanges}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-600/90 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-2 bg-gray-600/90 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-300">
                          {member.username}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/60 bg-white/5 px-3 py-1 rounded-full text-sm font-medium">
                            {member.levels?.name || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => removeMember(member.id)}
                        disabled={loading}
                        className="flex items-center gap-2 bg-red-600/80 hover:bg-red-600 text-white px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          };

          return <MemberCard key={member.id} />;
        })}
      </div>

      {/* Empty State */}
      {members.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground/60 text-lg">
            No members found. Add your first member above!
          </p>
        </div>
      )}
    </div>
  );
}
