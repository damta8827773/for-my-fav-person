"use client";

import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";

export default function Song() {
  const { t } = useApp();
  return (
    <Section id="song" title={t.song_title} subtitle={t.song_sub}>
      <div className="mt-8 overflow-hidden rounded-2xl">
        <iframe
          title="Spotify playlist"
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/6oo0wNg4htWN2bWPcTXXSZ?utm_source=generator"
          width="100%"
          height="380"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </Section>
  );
}
