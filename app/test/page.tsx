import Image from "next/image";
import React from "react";
import { pinata } from "@/utils/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import SkeletionImages from "@/components/custom/skeletion-images";
const page = async () => {
  return (
    <div>
      <SkeletionImages />
    </div>
  );
};

export default page;
