import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../api';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pushVideos } from '../store/layoutSlice';
import { humanReadableDateTime } from '../utils/dateConverter';
import { PageWrapper, VideoLayout } from '../components';


function Home() {

  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const videosOnStore = useSelector(state => state.layoutSlice.videos)
  const [videosFetched, setVideosFetched] = useState(false);

  useEffect(() => {
    if (!videosFetched) { // Check if videos have been fetched
      getAllVideos()
        .then((response) => {
          if (response && response.length > 0) { // Check for null or empty array
            setVideos(response);
            dispatch(pushVideos(response));
            setVideosFetched(true); // Set flag to true
          }
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
        });
    } else {
      // Optionally, you can set videos from the store here
      if (videosOnStore.length === 0) {
        setVideos(videosOnStore[0]);
      }
    }
  }, [])

  return (
    <PageWrapper>
      <VideoLayout videos={videos} />
    </PageWrapper>
  )
}

export default Home