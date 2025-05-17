"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  initialVolume?: number;
  onVolumeChange?: (volume: number) => void;
  className?: string;
}

export function VolumeControl({
  initialVolume = 50,
  onVolumeChange,
  className = "",
}: VolumeControlProps) {
  const [volume, setVolume] = useState(initialVolume);
  const [previousVolume, setPreviousVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Call the onVolumeChange callback when volume changes
    if (onVolumeChange) {
      onVolumeChange(isMuted ? 0 : volume);
    }
  }, [volume, isMuted, onVolumeChange]);

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="h-5 w-5" />;
    } else if (volume < 33) {
      return <Volume className="h-5 w-5" />;
    } else if (volume < 66) {
      return <Volume1 className="h-5 w-5" />;
    } else {
      return <Volume2 className="h-5 w-5" />;
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="text-muted-foreground hover:text-foreground"
      >
        {getVolumeIcon()}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        min={0}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
        className="w-32 sm:w-48 md:w-64"
        aria-label="Volume Control"
      />
      <span className="min-w-[40px] text-sm text-muted-foreground">
        {isMuted ? "Muted" : `${volume}%`}
      </span>
    </div>
  );
}
