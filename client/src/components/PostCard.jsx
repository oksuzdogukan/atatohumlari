import React from "react";

function PostCard({ title, category, image, createdAt }) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className="bg-white max-w-[300px] shadow rounded-lg overflow-hidden mt-4 h-[400px]">
      <img src={image} className="object-cover h-52 w-full" alt="" />
      <div className="p-6">
        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
          <a>{title}</a>
        </h3>
        <div className="text-sm mt-3">
          <h3>{category}</h3>
          <span className="block text-slate-400 font-semibold text-sm">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
