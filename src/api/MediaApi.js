import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY


export async function fetchPhotos(query,page=1,per_pageImg=20){
    const resp = await axios.get("https://api.unsplash.com/search/photos", {
      params:{ query, page, per_page: per_pageImg },
      headers:{ Authorization: `Client-ID ${UNSPLASH_KEY}` },
    });

    return resp.data 
    
}

export async function fetchVideos (query, page=1, per_pages=20){
    const resp = await axios.get("https://api.pexels.com/v1/videos/search",{
        params:{query, page, Per_page: per_pages},
        headers:{Authorization:PEXELS_KEY}
    })
    return resp.data
}