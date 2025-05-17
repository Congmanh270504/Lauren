"use client";
import MusicPlayer from "./music-player";
import Image from "next/image";
import React, { useEffect } from "react";
import Comment from "./comment";

export default function Home() {
  return (
    <div className="flex h-full p-4 bg-red-700 gap-2">
      <MusicPlayer
        title="What's the Move"
        artist="Young Thug feat. Lil Uzi Vert"
        albumArt="/twice.jfif"
        audioSrc="/1.mp3"
      />
      <Comment />
    </div>
  );
}
