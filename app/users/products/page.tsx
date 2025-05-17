"use client";
import Comment from "@/components/profile/product/comment";
import MusicPlayer from "@/components/profile/product/music-player";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Home() {
  return (
    <div className="flex w-full h-full p-4 gap-2">
      <MusicPlayer
        title="What's the Move"
        artist="Young Thug feat. Lil Uzi Vert"
        albumArt="/twice.jfif"
        audioSrc="/What-is-love.mp3"
      />
      <Comment />
    </div>
  );
}
