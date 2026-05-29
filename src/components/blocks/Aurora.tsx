/**
 * Tło "Aurora" — miękkie, rozmyte świetliste plamy w kolorach brandu,
 * powoli dryfujące. Zastępuje siatkę. Animacja wyłącza się przy
 * `prefers-reduced-motion` (wariant motion-reduce).
 */
export function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] -top-[15%] h-[60vh] w-[60vh] rounded-full bg-primary/25 blur-[130px] animate-[aurora-a_22s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute -right-[5%] top-[8%] h-[55vh] w-[55vh] rounded-full bg-[#f43f5e]/20 blur-[140px] animate-[aurora-b_28s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute left-[25%] top-[45%] h-[50vh] w-[50vh] rounded-full bg-primary/15 blur-[150px] animate-[aurora-c_32s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute -bottom-[10%] right-[15%] h-[45vh] w-[45vh] rounded-full bg-[#fb923c]/15 blur-[140px] animate-[aurora-a_26s_ease-in-out_infinite] motion-reduce:animate-none" />
    </div>
  );
}
