import Image from "next/image";
import Current from "./pages/current";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className=" h-screen bg-gradient-to-bl from-slate-600 to-slate-100 ">
      <Current />
    </main>
  );
}
