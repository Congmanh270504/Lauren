import React from "react";

const Comment = () => {
  return (
    <div className="w-[35%] flex flex-col gap-2 ">
      <div className="h-1/2 overflow-hidden shadow-lg border border-gray-100 rounded-lg">
        play list
      </div>
      <div className="h-1/2 overflow-hidden shadow-lg border border-gray-100 rounded-lg">
        comment area
      </div>
    </div>
  );
};

export default Comment;
