"use client";

import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ChevronLeft,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoMdShuffle } from "react-icons/io";
import { Repeat1 } from "lucide-react";
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { HorizontalVolumeControl } from "@/components/custom/horizontal-volume-control";

interface MusicPlayerProps {
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
}

export default function MusicPlayer({
  title,
  artist,
  albumArt,
  audioSrc,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio = audioRef.current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeatOne, setIsRepeatOne] = useState(false);
  const [isHearted, setIsHearted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(50);

  // This function would typically connect to your audio system
  const handleVolumeChange = (volume: number) => {
    setCurrentVolume(volume);
    // In a real application, you would control your audio here
    if (audio) {
      audio.volume = volume / 100; // Assuming volume is a percentage
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // Cleanup
    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [audioRef]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward10s = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.min(audio.currentTime + 10, audio.duration || 0);
    audio.currentTime = newTime;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setIsPlaying(true);
    setCurrentTime(newTime);
  };

  const handleBackward10s = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime === 0) return; // Prevent going negative
    const newTime = Math.max(audio.currentTime - 10, 0);
    audio.currentTime = newTime;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setIsPlaying(true);
    setCurrentTime(newTime);
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative w-[65%] h-full rounded-lg overflow-hidden shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft size={24} className="text-black dark:text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsHearted(!isHearted)}
        >
          <FaHeart
            size={24}
            className={isHearted ? "text-red-600" : "text-gray-400"}
          />
        </Button>
      </div>

      {/* Album Art */}
      <div className="mt-2">
        <div className="h-[55vh] w-full relative justify-items-center mx-auto min-[1900px]:h-[65vh]">
          <Image
            src={albumArt}
            alt={`${title} by ${artist}`}
            fill
            className="object-cover p-4 rounded-[2em]"
            quality={100}
          />
        </div>

        {/* Song Info */}
        <div className="text-center px-4 py-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-red-200 text-sm">{artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-6 absolute bottom-0 left-0 right-0 rounded-b-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            {isShuffle ? (
              <Button onClick={() => setIsShuffle(false)}>
                <IoMdShuffle size={20} />
              </Button>
            ) : (
              <Button onClick={() => setIsShuffle(true)}>
                <Shuffle size={20} />
              </Button>
            )}
            <div className="flex items-center gap-2 opacity-0">
              <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <VolumeX className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button>
              <GrChapterPrevious />
            </Button>
            <Button onClick={handleBackward10s}>
              <SkipBack size={24} />
            </Button>
            <Button
              className="bg-white rounded-full outline-solid border border-black p-3 text-red-600 hover:bg-gray-100"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            <Button onClick={handleForward10s}>
              <SkipForward size={24} />
            </Button>
            <Button>
              <GrChapterNext />
            </Button>
          </div>

          <div className="flex">
            {isRepeatOne ? (
              <Button onClick={() => setIsRepeatOne(false)}>
                <Repeat1 size={20} />
              </Button>
            ) : (
              <Button onClick={() => setIsRepeatOne(true)}>
                <Repeat size={20} />
              </Button>
            )}
            <HorizontalVolumeControl
              initialVolume={currentVolume}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={audio?.duration} // Đảm bảo max là duration thực tế
            step={0.1}
            onValueChange={handleProgressChange}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs ">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audio?.duration ?? 0)}</span>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} loop={isRepeatOne} />
    </div>
  );
}
