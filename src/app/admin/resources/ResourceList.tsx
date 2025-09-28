"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash, Edit, Plus, Save, X, ExternalLink } from "lucide-react";

type Resource = {
  id: string;
  heading: string;
  description: string;
  category: string;
  link: string;
  created_at: string;
};

const categories = ["CTF", "Wargame", "Guide", "Other"];

export default function ResourceList({
  initialResources,
}: {
  initialResources: Resource[];
}) {
  const supabase = createClient();
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [loading, setLoading] = useState(false);

  const [newHeading, setNewHeading] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [newLink, setNewLink] = useState("");

  // Add new resource
  const addResource = async () => {
    if (!newHeading || !newDescription || !newCategory || !newLink) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("resources")
      .insert({
        heading: newHeading,
        description: newDescription,
        category: newCategory,
        link: newLink,
      })
      .select()
      .single();

    if (!error && data) {
      setResources((prev) => [...prev, data]);
      setNewHeading("");
      setNewDescription("");
      setNewCategory(categories[0]);
      setNewLink("");
    }
    setLoading(false);
  };

  // Delete resource
  const removeResource = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (!error) setResources((prev) => prev.filter((r) => r.id !== id));
    setLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-8">
      {/* Add Resource Section */}
      <div className="group relative bg-black/5 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8 transition-all duration-500 hover:bg-black/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="transition-transform duration-300 group-hover:scale-110 text-primary">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-primary">
              Add New Resource
            </h2>
            <p className="text-foreground/70">Create a new learning resource</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter resource heading"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-background text-foreground"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="url"
            placeholder="Enter resource URL"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
          />
          <textarea
            placeholder="Enter resource description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={3}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
          />
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={addResource}
            className="flex items-center gap-2 bg-primary/90 hover:bg-primary px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              loading ||
              !newHeading ||
              !newDescription ||
              !newCategory ||
              !newLink
            }
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => {
          const ResourceCard = () => {
            const [isEditing, setIsEditing] = useState(false);
            const [editHeading, setEditHeading] = useState(resource.heading);
            const [editDescription, setEditDescription] = useState(
              resource.description
            );
            const [editCategory, setEditCategory] = useState(resource.category);
            const [editLink, setEditLink] = useState(resource.link);

            const saveChanges = async () => {
              setLoading(true);
              const { data, error } = await supabase
                .from("resources")
                .update({
                  heading: editHeading,
                  description: editDescription,
                  category: editCategory,
                  link: editLink,
                })
                .eq("id", resource.id)
                .select()
                .single();

              if (!error && data) {
                setResources((prev) =>
                  prev.map((r) => (r.id === data.id ? data : r))
                );
                setIsEditing(false);
              }
              setLoading(false);
            };

            const cancelEdit = () => {
              setEditHeading(resource.heading);
              setEditDescription(resource.description);
              setEditCategory(resource.category);
              setEditLink(resource.link);
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
                        Heading
                      </label>
                      <input
                        value={editHeading}
                        onChange={(e) => setEditHeading(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        Category
                      </label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      >
                        {categories.map((category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-background text-foreground"
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        URL
                      </label>
                      <input
                        type="url"
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                      />
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
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-300">
                          {resource.heading}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/60 bg-white/5 px-3 py-1 rounded-full text-sm font-medium">
                            {resource.category}
                          </span>
                        </div>
                        <p className="text-foreground/70 text-sm line-clamp-3">
                          {resource.description}
                        </p>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Resource
                        </a>
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
                        onClick={() => removeResource(resource.id)}
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

          return <ResourceCard key={resource.id} />;
        })}
      </div>

      {/* Empty State */}
      {resources.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground/60 text-lg">
            No resources found. Add your first resource above!
          </p>
        </div>
      )}
    </div>
  );
}
