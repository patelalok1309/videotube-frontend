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

  useEffect(() => {
    if (videosOnStore.length === 0) {
      getAllVideos()
        .then((response) => {
          setVideos(response)
          dispatch(pushVideos(response))
        })
    } else {
      setVideos(videosOnStore[0])
    }
  }, [videosOnStore])

  return (
    <PageWrapper>
      <VideoLayout videos={videos} />
    </PageWrapper>
  )
}

export default Home