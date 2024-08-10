// VideoSkeleton.jsx
import React from "react";

const LoadingSkeleton = () => {
    return (
        <div className="p-4 animate-pulse">
            <div className="bg-gray-700 h-40 w-full rounded-lg mb-4"></div>
            <div className="flex items-center">
                <div className="bg-gray-700 h-10 w-10 rounded-full mr-4"></div>
                <div>
                    <div className="bg-gray-700 h-4 w-32 rounded mb-2"></div>
                    <div className="bg-gray-700 h-3 w-20 rounded"></div>
                </div>
            </div>

           
        </div>

    );
};

export default LoadingSkeleton;

