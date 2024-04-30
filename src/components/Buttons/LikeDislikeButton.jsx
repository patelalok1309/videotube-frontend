import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";

const LikeDislikeButton = ({ liked, handleLike }) => {
    return (
        <div className="flex items-center justify-center">
            <div className='flex items-center justify-center rounded-full px-6 py-3  text-xl bg-gray-300 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white  transition-colors duration-300 hover:bg-opacity-50'>
                <button
                    onClick={handleLike}
                    className={"focus:outline-none font-bold"}>
                    {liked ?
                        <FaThumbsUp /> :
                        <FaRegThumbsUp className='outline-black' width="30px" />
                    }
                </button>

                <p className='pl-2'>{liked ? "Unlike" : "Like"}</p>

            </div>
        </div>
    );
};

export default LikeDislikeButton;
