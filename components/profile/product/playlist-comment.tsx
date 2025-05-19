import React from "react";
import PlayList from "@/components/profile/product/playlist";
import { CommentSection } from "./comment-section";

const PlaylistComment = () => {
  return (
    <div className="w-[35%] flex flex-col gap-2 ">
      <div className="h-2/5 overflow-y-auto  shadow-lg border border-gray-100 rounded-lg">
        <PlayList />
      </div>
      <div className="h-9/10 overflow-hidden shadow-lg border border-gray-100 rounded-lg">
        <div className="w-full h-full relative bg-white rounded-lg shadow">
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default PlaylistComment;
