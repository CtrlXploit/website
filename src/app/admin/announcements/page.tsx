// app/admin/announcements/page.tsx
"use client";

import { useState, useEffect } from "react";
import GlitchText from "@/components/GlitchText";
import { createClient } from "@/utils/supabase/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState<Date | null>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getUsername = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();
        setUsername(profile?.username || null);
      }
    };
    getUsername();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage({ type: "error", text: "Title and description are required" });
      return;
    }

    if (!scheduledAt) {
      setMessage({ type: "error", text: "A scheduled date and time is required" });
      return;
    }

    if (!username) {
      setMessage({ type: "error", text: "User authentication error" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("announcements").insert([
        {
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim() || null,
          created_by: username,
          scheduled_at: scheduledAt.toISOString(),
        },
      ]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Announcement posted successfully!",
      });
      setTitle("");
      setDescription("");
      setImageUrl("");
      setScheduledAt(new Date());
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to post announcement",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center min-h-screen">
      <GlitchText
        speed={1}
        enableShadows
        enableOnHover
        className="whitespace-nowrap mb-8 text-3xl md:text-5xl"
      >
        Announcements
      </GlitchText>
      <p className="text-foreground/70 text-lg mb-12 text-center max-w-2xl">
        Post announcements and schedule events for the club.
      </p>

      <div className="w-full max-w-2xl bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Create New Announcement</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              required
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter announcement description"
              required
              rows={6}
              className="w-full px-3 py-2 border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="scheduledAt"
              className="block text-sm font-medium mb-2"
            >
              Schedule Date & Time *
            </label>
            <DatePicker
              id="scheduledAt"
              selected={scheduledAt}
              onChange={(date) => setScheduledAt(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              wrapperClassName="w-full"
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium mb-2"
            >
              Image URL (Optional)
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {message && (
            <div
              className={`p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Announcement"}
          </button>
        </form>
      </div>

      <style jsx global>{`
        :root {
          --dp-bg-color: #0d1117;
          --dp-border-color: #30363d;
          --dp-text-color: #c9d1d9;
          --dp-accent-color: #ef4444; 
          --dp-hover-bg-color: #161b22;
        }

        .react-datepicker-popper {
          z-index: 10;
        }

        .react-datepicker {
          font-family: inherit;
          background-color: var(--dp-bg-color);
          border: 1px solid var(--dp-border-color);
          border-radius: 0.5rem;
        }

        .react-datepicker__triangle::before,
        .react-datepicker__triangle::after {
          border-bottom-color: var(--dp-bg-color) !important;
        }
        
        .react-datepicker__header, 
        .react-datepicker__time-container, 
        .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
          background-color: var(--dp-bg-color);
          border-color: var(--dp-border-color);
        }

        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker-day-name,
        .react-datepicker__day,
        .react-datepicker__time-list-item {
          color: var(--dp-text-color);
        }

        .react-datepicker__navigation-icon::before {
            border-color: var(--dp-text-color);
        }

        .react-datepicker__day, 
        .react-datepicker__time-list-item {
          transition: background-color 0.2s ease-in-out;
        }

        .react-datepicker__day:hover, 
        .react-datepicker__time-list-item:hover {
          background-color: var(--dp-hover-bg-color) !important;
        }
        
        .react-datepicker__day--disabled {
            opacity: 0.4;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__time-list-item--selected {
          background-color: var(--dp-accent-color) !important;
          color: white !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}