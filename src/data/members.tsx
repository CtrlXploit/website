import { Users, Trophy, Crown, Zap } from "lucide-react";
import React from "react"; // make sure this import is present

export const levels = {
  root: [
    "TheAlpha",
    "begula03",
    "SRPG",
    "Al13n",
    "hidden_truth",
    "Masrt",
    "naughtyb0y.",
    "v1per",
  ],
  moderator: [
    "4darsh",
    "e4stw1nd",
    "s4ych33se",
    "kannaya",
    "izmelucifer17",
    "Pr0meth3u5",
    "n0tsane",
    "cyb3rpunk_b4ddi3",
    "Drago",
  ],
  "sys-admin": [
    "bond@james",
    "SPYD3R",
    "_a.p.d_",
    "Cypher",
    "Ace_",
    "ethereum",
    "von",
    "H3lios",
    "samarth471",
    "extreme_substance",
    "_zafeiri",
    "Rajat",
    "V3n0m",
    "penguin",
  ],
  club: [
    "iamgreedy",
    "armoredvortex",
    "AMRyan",
    "MiracleInvoker",
    "bhanu_praharsha",
    "cool_enough",
    "este",
    "Krißhn@",
    "Prisha",
    "parallax_79",
    "the_tenth_spear",
    "venomesh",
  ],
};

export const levelDetails: Record<
  string,
  {
    name: string;
    icon: React.ReactNode; // ✅ instead of JSX.Element
    color: string;
    borderColor: string;
  }
> = {
  root: {
    name: "Root",
    icon: <Crown className="w-6 h-6" />,
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30 hover:border-emerald-400/60",
  },
  moderator: {
    name: "Moderator",
    icon: <Trophy className="w-6 h-6" />,
    color: "text-purple-400",
    borderColor: "border-purple-400/30 hover:border-purple-400/60",
  },
  "sys-admin": {
    name: "Sys-Admin",
    icon: <Zap className="w-6 h-6" />,
    color: "text-rose-400",
    borderColor: "border-rose-400/30 hover:border-rose-400/60",
  },
  club: {
    name: "Club",
    icon: <Users className="w-6 h-6" />,
    color: "text-amber-400",
    borderColor: "border-amber-400/30 hover:border-amber-400/60",
  },
};

export const levelOrder = ["root", "moderator", "sys-admin", "club"];
