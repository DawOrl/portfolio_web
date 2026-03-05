import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        Tryb ciemny działa, Dawid!
      </h1>
      <p className="text-muted-foreground text-lg">
        System kolorów i komponenty UI są gotowe na siatkę Bento.
      </p>
      <Button size="lg" className="font-semibold text-md">
        Pobierz CV
      </Button>
    </main>
  );
}