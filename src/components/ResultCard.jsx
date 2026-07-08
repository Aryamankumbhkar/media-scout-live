import React, { useState } from "react";
import { Link } from "react-router-dom";

import { handleDownloadingFile } from "../utils/DownloadUtils";

const ResultCard = ({ data }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const onDownloadClick = async () =>{
    setIsDownloading(true);
    await handleDownloadingFile(data.src, data.title);
    setIsDownloading(false);
  }


  return (
    <div className="w-[18vw] h-[22vw] bg-amber-50 text-black rounded-lg flex flex-col items-center justify-between p-3 mb-5 shadow-md">
      {/* 2. Media Container */}
      <Link
        to={`/Media/${data.id}?type=${data.type}`}
        className="w-full h-[15vw] overflow-hidden rounded-lg bg-gray-200 block"
      >
        {data.type === "photo" ? (
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-full object-cover cursor-pointer"
          />
        ) : (
          <video
            src={data.src}
            className="w-full h-full object-cover cursor-pointer"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </Link>

      <h1 className="text-xs sm:text-sm font-bold text-center truncate w-full mt-2 px-1">
        {data.title}
      </h1>

      <button
        className=" bg-green-600 rounded-full  text-white cursor-pointer w-30 p-1"
        onClick={onDownloadClick}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <i className="ri-loader-4-line animate-spin text-sm"></i>
        ) : (
          <i className="ri-download-cloud-line text-sm"></i>
        )}

        {/* 2. Text badalne ka logic */}
        <span>{isDownloading ? "Downloading..." : "Download"}</span>
      </button>
    </div>
  );
};

export default ResultCard;
