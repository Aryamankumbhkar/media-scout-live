import React, { useEffect } from 'react'

import { fetchPhotos, fetchVideos } from "../api/MediaApi";
import {setActiveTabs, setError, setLoading, setResults} from "../redux/features/SearchSlice";
import { useDispatch, useSelector} from 'react-redux';
import { data } from 'react-router-dom';
import ResultCard from './ResultCard';





const ResultGrid = () => {

  const dispatch = useDispatch()
  const { Query,ActiveTabs, Loading, Error, Results } = useSelector((store) => store.search);


 useEffect(() =>{
 
   
  const getData = async ()=>{
    try {
      dispatch(setLoading())
      let data;

      const searchQuery = Query || "trending";

      if (ActiveTabs == "Photos") {
        let response = await fetchPhotos(searchQuery);
        data = response.results.map((item) => ({
          id: item.id,
          type: "photo",
          title: item.alt_description,
          thumbnail: item.urls.small,
          src: item.urls.full,
        }));
      }
      if (ActiveTabs == "Videos") {
        let response = await fetchVideos(searchQuery);
        data = response.videos.map((item) => ({
          id: item.id,
          type: "video",
          title: item.user?.name || "Video",
          thumbnail: item.video,
          src: item.video_files ? item.video_files[0].link : item.video,
        }));
      }
      console.log(data);
      
      dispatch(setResults(data));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message))
      
    }
  }
  getData()
 },[Query, ActiveTabs, dispatch])

 if(Error) return <h1>Something Went Wrong</h1>
 if(Loading) return <h1>Loading...</h1>
  return (
    <div className=' w-full flex gap-5 flex-wrap justify-center mt-5 pb-10 '>
      {Results.map((item,idx) =>{
        return (
          <div key={idx}>
            <ResultCard data={item} />
          </div>
        );
      })} 
    </div>
  )
}

export default ResultGrid