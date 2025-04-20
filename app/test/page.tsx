"use client";

// import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { fetchInitialImages } from "../state/images/images";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/utils/prisma";
import { Button } from "@/components/ui/button";
import { getProductImages } from "@/app/action/products";
import { pinata } from "@/utils/config";
import Image from "next/image";

export default function DemoPage() {

  return (
    <>
      <div>
      </div>
    </>
  );
}
