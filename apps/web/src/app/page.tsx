import ShaderBackground from "@/components/effects/ShaderBackground";
import FloatingHearts from "@/components/effects/FloatingHearts";
import CursorTrail from "@/components/effects/CursorTrail";
import Meteors from "@/components/effects/Meteors";

import Loader from "@/components/ui/Loader";
import Controls from "@/components/ui/Controls";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SideNav from "@/components/ui/SideNav";
import LoveFab from "@/components/ui/LoveFab";
import Footer from "@/components/ui/Footer";

import Hero from "@/components/sections/Hero";
import NoteOfDay from "@/components/sections/NoteOfDay";
import Letter from "@/components/sections/Letter";
import Countdown from "@/components/sections/Countdown";
import Memories from "@/components/sections/Memories";
import Words from "@/components/sections/Words";
import Song from "@/components/sections/Song";
import Guestbook from "@/components/sections/Guestbook";
import Game from "@/components/sections/Game";

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <FloatingHearts />
      <CursorTrail />

      <Loader />
      <ScrollProgress />
      <Controls />
      <SideNav />
      <LoveFab />

      <main className="relative z-10">
        <div className="relative">
          <Meteors />
          <Hero />
        </div>

        <div className="flex flex-col gap-2 pb-10">
          <NoteOfDay />
          <Letter />
          <Countdown />
          <Memories />
          <Words />
          <Song />
          <Guestbook />
          <Game />
        </div>
      </main>

      <Footer />
    </>
  );
}
