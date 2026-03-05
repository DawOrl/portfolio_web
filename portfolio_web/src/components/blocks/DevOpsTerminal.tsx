"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function DevOpsTerminal() {
  const [text, setText] = useState("");
  // Symulacja komendy i odpowiedzi z serwera pokazująca Twoje certyfikaty
  const fullText = "> kubectl get nodes\nNAME           STATUS ROLES\nlinux-server   Ready  RH124\nk8s-cluster    Ready  DO180\njs-frontend    Ready  React";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40); // Szybkość "pisania"
    return () => clearInterval(timer);
  },[]);

  return (
    <div className="w-full h-full min-h-40 bg-black rounded-lg p-4 font-mono text-xs md:text-sm shadow-inner border border-[#1F2937] overflow-hidden flex flex-col">
      {/* Pasek narzędziowy okna Mac/Linux */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      {/* Ekran terminala z migającym kursorem */}
      <div className="text-green-400 whitespace-pre">
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          _
        </motion.span>
      </div>
    </div>
  );
}