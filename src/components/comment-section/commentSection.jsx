"use client";
import CommentCart from "./commentCart";
import CommentText from "./commentText";
function commentSection() {
  return (
    <div className="mb-40  lg:flex lg:flex-row lg:pb-10 lg:justify-between m-auto">
      <CommentText />
      <CommentCart />
    </div>
  );
}

export default commentSection;
