// src/pages/MediaDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ResultCard from "../components/ResultCard";

const MediaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL se type nikalna (photo ya video)
  const mediaType = searchParams.get("type") || "photo";

  const [mediaItem, setMediaItem] = useState(null);
  const [relatedMedia, setRelatedMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hamare keys jo .env file mein hain
  const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
  const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        if (mediaType === "photo") {
          // 1. Unsplash se Single Photo mangwayi uski ID se
          const photoRes = await axios.get(
            `https://api.unsplash.com/photos/${id}`,
            {
              headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
            },
          );

          const photoData = photoRes.data;
          setMediaItem({
            id: photoData.id,
            type: "photo",
            title: photoData.alt_description || "Beautiful Photo",
            src: photoData.urls.regular,
          });

          // 2. Usi photo ke keywords se related 8 photos fetch ki
          const query =
            photoData.related_collections?.results[0]?.title ||
            photoData.alt_description ||
            "nature";
          const relatedRes = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
              params: { query, per_page: 8 },
              headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
            },
          );

          setRelatedMedia(
            relatedRes.data.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description,
              thumbnail: item.urls.small,
              src: item.urls.full,
            })),
          );
        } else {
          // 3. Pexels se Single Video mangwayi uski ID se
          const videoRes = await axios.get(
            `https://api.pexels.com/videos/videos/${id}`,
            {
              headers: { Authorization: PEXELS_KEY },
            },
          );

          const videoData = videoRes.data;
          setMediaItem({
            id: videoData.id,
            type: "video",
            title: videoData.user?.name || "Premium Video",
            src: videoData.video_files[0]?.link,
          });

          // 4. Related videos ke liye Pexels par search kiya
          const relatedRes = await axios.get(
            "https://api.pexels.com/v1/videos/search",
            {
              params: { query: "trending", per_page: 8 },
              headers: { Authorization: PEXELS_KEY },
            },
          );

          setRelatedMedia(
            relatedRes.data.videos.map((item) => ({
              id: item.id,
              type: "video",
              title: item.user?.name || "Video",
              thumbnail: item.video_picture || item.image,
              src: item.video_files[0]?.link,
            })),
          );
        }
      } catch (err) {
        console.error("Data laane mein dikkat hui:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
  }, [id, mediaType]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-emerald-800 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <i className="ri-loader-4-line animate-spin text-4xl"></i>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-emerald-800 text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-white text-emerald-900 px-4 py-1.5 rounded-full font-semibold text-xs cursor-pointer hover:bg-gray-200 transition-all flex items-center gap-1 shadow-md"
      >
        <i className="ri-arrow-left-line"></i> Back to Home
      </button>

      {/* Main Container */}
      {mediaItem && (
        <div className="flex flex-col items-center max-w-4xl mx-auto bg-emerald-900 p-6 rounded-xl shadow-2xl border border-emerald-700">
          <h1 className="text-xl font-bold mb-4 text-center capitalize">
            {mediaItem.title}
          </h1>

          <div className="w-full max-h-[60vh] overflow-hidden rounded-lg mb-6 flex justify-center bg-black shadow-lg">
            {mediaItem.type === "photo" ? (
              <img
                src={mediaItem.src}
                alt={mediaItem.title}
                className="max-w-full max-h-[60vh] object-contain"
              />
            ) : (
              <video
                src={mediaItem.src}
                controls
                autoPlay
                loop
                className="max-w-full max-h-[60vh] object-contain"
              />
            )}
          </div>
        </div>
      )}

      {/* Related Content Grid */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-lg font-bold mb-6 border-b border-emerald-700 pb-2">
          More Content Like This ({" "}
          {mediaType === "photo" ? "Photos" : "Videos"})
        </h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {relatedMedia.map((item, idx) => (
            <ResultCard key={item.id || idx} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaDetailPage;
