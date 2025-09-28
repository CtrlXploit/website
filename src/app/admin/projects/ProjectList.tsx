"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash, Edit, Plus, Save, X, ExternalLink } from "lucide-react";

type Project = {
  id: number;
  name: string;
  short_detail: string;
  image_url: string;
  github_url: string;
  live_demo: string | null;
  technologies: string[];
};

export default function ProjectList({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [newShortDetail, setNewShortDetail] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newGithubUrl, setNewGithubUrl] = useState("");
  const [newLiveDemo, setNewLiveDemo] = useState("");
  const [newTechnologies, setNewTechnologies] = useState("");

  const technologiesToArray = (techString: string) => {
    return techString.split(',').map(tech => tech.trim()).filter(tech => tech);
  }

  const addProject = async () => {
    if (!newName || !newShortDetail || !newImageUrl || !newGithubUrl || !newTechnologies) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: newName,
        short_detail: newShortDetail,
        image_url: newImageUrl,
        github_url: newGithubUrl,
        live_demo: newLiveDemo || null,
        technologies: technologiesToArray(newTechnologies),
      })
      .select()
      .single();

    if (!error && data) {
      setProjects((prev) => [...prev, data]);
      setNewName("");
      setNewShortDetail("");
      setNewImageUrl("");
      setNewGithubUrl("");
      setNewLiveDemo("");
      setNewTechnologies("");
    }
    setLoading(false);
  };

  const removeProject = async (id: number, name: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the project "${name}"?`);

    if (isConfirmed) {
      setLoading(true);
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (!error) {
          setProjects((prev) => prev.filter((p) => p.id !== id));
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
            <h2 className="text-2xl font-bold text-primary">Add New Project</h2>
            <p className="text-foreground/70">Create a new project entry</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Project Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
          <input type="url" placeholder="Image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
          <input type="url" placeholder="GitHub URL" value={newGithubUrl} onChange={(e) => setNewGithubUrl(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
          <input type="url" placeholder="Live Demo URL (Optional)" value={newLiveDemo} onChange={(e) => setNewLiveDemo(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input type="text" placeholder="Technologies (e.g., React, Next.js)" value={newTechnologies} onChange={(e) => setNewTechnologies(e.target.value)} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
          <textarea placeholder="Short Detail / Description" value={newShortDetail} onChange={(e) => setNewShortDetail(e.target.value)} rows={3} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none" />
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={addProject} className="flex items-center gap-2 bg-primary/90 hover:bg-primary px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !newName || !newShortDetail || !newImageUrl || !newGithubUrl || !newTechnologies}>
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const ProjectCard = () => {
            const [isEditing, setIsEditing] = useState(false);
            const [editName, setEditName] = useState(project.name);
            const [editShortDetail, setEditShortDetail] = useState(project.short_detail);
            const [editImageUrl, setEditImageUrl] = useState(project.image_url);
            const [editGithubUrl, setEditGithubUrl] = useState(project.github_url);
            const [editLiveDemo, setEditLiveDemo] = useState(project.live_demo || "");
            const [editTechnologies, setEditTechnologies] = useState(project.technologies.join(", "));

            const saveChanges = async () => {
              setLoading(true);
              const { data, error } = await supabase
                .from("projects")
                .update({
                  name: editName,
                  short_detail: editShortDetail,
                  image_url: editImageUrl,
                  github_url: editGithubUrl,
                  live_demo: editLiveDemo || null,
                  technologies: technologiesToArray(editTechnologies),
                })
                .eq("id", project.id)
                .select()
                .single();

              if (!error && data) {
                setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
                setIsEditing(false);
              }
              setLoading(false);
            };

            const cancelEdit = () => setIsEditing(false);

            return (
              <div className="group relative bg-black/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-black/10">
                {isEditing ? (
                  <div className="space-y-3">
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Project Name"/>
                    <input value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Image URL"/>
                    <input value={editGithubUrl} onChange={(e) => setEditGithubUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="GitHub URL"/>
                    <input value={editLiveDemo} onChange={(e) => setEditLiveDemo(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Live Demo URL"/>
                    <input value={editTechnologies} onChange={(e) => setEditTechnologies(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground" placeholder="Technologies"/>
                    <textarea value={editShortDetail} onChange={(e) => setEditShortDetail(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground resize-none" placeholder="Short Detail"/>
                    <div className="flex gap-3 pt-2">
                        <button onClick={saveChanges} disabled={loading} className="flex items-center gap-2 bg-green-600/90 hover:bg-green-600 text-white px-4 py-2 rounded-xl"><Save className="w-4 h-4" />Save</button>
                        <button onClick={cancelEdit} className="flex items-center gap-2 bg-gray-600/90 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"><X className="w-4 h-4" />Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img src={project.image_url} alt={project.name} className="w-full h-40 object-cover rounded-lg mb-2"/>
                    <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => <span key={tech} className="bg-white/5 text-foreground/60 px-3 py-1 rounded-full text-xs font-medium">{tech}</span>)}
                    </div>
                    <p className="text-foreground/70 text-sm h-16 overflow-auto">{project.short_detail}</p>
                    <div className="flex flex-wrap gap-2">
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm"><ExternalLink className="w-4 h-4" />GitHub</a>
                        {project.live_demo && <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm"><ExternalLink className="w-4 h-4" />Live Demo</a>}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 text-white p-2 rounded-full"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => removeProject(project.id, project.name)} disabled={loading} className="flex items-center gap-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full"><Trash className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          };
          return <ProjectCard key={project.id} />;
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground/60 text-lg">No projects found. Add your first project above!</p>
        </div>
      )}
    </div>
  );
}