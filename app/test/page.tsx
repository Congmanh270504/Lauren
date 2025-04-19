"use client";

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { fetchInitialImages } from "../state/images/images";
import { Progress } from "@/components/ui/progress";
export default function DemoPage() {
  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    setTimeout(() => setProgress(100), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Progress value={progress} className="w-[60%]" />
      {progress}%
    </>
  );
}
