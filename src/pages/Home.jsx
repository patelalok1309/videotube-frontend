import React, { useEffect, useState } from "react";
import { getAllVideos } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { pushVideos } from "../store/layoutSlice";
import { LoadingSkeleton, PageWrapper, VideoLayout } from "../components";

function Home() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.layout.videos);

    useEffect(() => {
        if (videos.length === 0) {
            setLoading(true);
            getAllVideos()
                .then((response) => {
                    if (response?.length > 0) {
                        dispatch(pushVideos(response));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching videos:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [videos.length, dispatch]);

    return loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
                <LoadingSkeleton key={index} />
            ))}
        </div>
    ) : (
        <PageWrapper>
            <VideoLayout videos={videos[0]} />
        </PageWrapper>
    );
}

export default Home;
