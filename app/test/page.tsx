"use client";
import Image from "next/image";
import React from "react";
import { pinata } from "@/utils/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import SkeletionImages from "@/components/custom/loading";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/blocks/TextAnimations/SplitText/SplitText";
import TrueFocus from "@/components/ui/text-animations/TrueFocus/TrueFocus";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const page = () => {
  const { data: session } = useSession();
  console.log(session, "session");
  return (
    <div >
      <TrueFocus
        sentence="True Focus"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />
    </div>
  );
};

export default page;
