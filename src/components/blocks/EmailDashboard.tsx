"use client";
import { motion } from "framer-motion";

export function EmailDashboard() {
  return (
    <div className="w-full h-full min-h-40 bg-[#0F172A] rounded-lg p-5 flex flex-col justify-between border border-">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Analityka Kampanii</span>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">Iterable System</span>
      </div>
      
      <div className="space-y-5 mt-auto">
        {/* Wykres 1 */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-foreground/80">Średni Open Rate</span>
            <span className="text-primary font-bold">68%</span>
          </div>
          <div className="h-2.5 w-full bg-background rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "68%" }} 
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-primary" 
            />
          </div>
        </div>

        {/* Wykres 2 */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-foreground/80">Dostarczalność (Deliverability)</span>
            <span className="text-primary font-bold">99.8%</span>
          </div>
          <div className="h-2.5 w-full bg-background rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "99.8%" }} 
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-primary" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}