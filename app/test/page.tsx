"use server";
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
import RowPageFilter from "@/components/custom/row-page-filter";
import { getData } from "../action/category";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const page = async () => {
  // const { data: session } = useSession();
  // console.log(session, "session");
  const numberItems = [5, 10, 15, 20, 30];
  const data = await getData();
  return <RowPageFilter data={data} numberItems={numberItems} />;
};

export default page;
