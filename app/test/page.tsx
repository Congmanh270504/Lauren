"use server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { fetchInitialImages } from "../state/images/images";
import { pinata } from "@/utils/config";

export default async function DemoPage() {
  // const deleteChecked = useSelector((state: RootState) => state.deleteChecked);
  // // console.log("deleteChecked", deleteChecked);
  // const allFiles = await pinata.files.private.list(); // files{files: [{}]} type files
  // console.log("allFiles", allFiles);
  // const selectImages = [
  //   [
  //     "bafkreihomp6bq4iuxxuzhhkw6ejtrdmzhp33g6mshxt3yz73mnchuvapbq",
  //     "bafkreibp2dccibo7ttqhff3nxjaarktioom32dhcgujqnlwlv5narysz7m",
  //   ],
  //   ["aaaa", "ffff"],
  // ];
  // // const imageUrls = allFiles.files.find(
  // //   (file) =>
  // //     // selectImages.filter((row) => row.includes(file.cid))
  // //     file.cid === selectImages[0][0]
  // // );
  // // // .map((file) => file.cid);
  const files = await pinata.files.private
    .list()
    .cid("bafkreihomp6bq4iuxxuzhhkw6ejtrdmzhp33g6mshxt3yz73mnchuvapbq");
  console.log("files", files.files[0].id);
  return <div className="container mx-auto py-auto">aaa</div>;
}
