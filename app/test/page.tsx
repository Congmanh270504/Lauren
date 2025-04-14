"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { fetchInitialImages } from "../state/images/images";

export default function DemoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const images = useSelector((state: RootState) => state.images);

  useEffect(() => {
    dispatch(fetchInitialImages()); // Dispatch the thunk to fetch images
  }, [dispatch]);
  console.log("images", images);

  return <div className="container mx-auto py-auto">aaa</div>;
}
