import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${baseURL}/users/register`, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${baseURL}/users/login`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
};


export const logoutUser = async () => {
    try {
        const response = await axios.post(`${baseURL}/users/logout`, {}, {
            withCredentials : true
        });
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}


export const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${baseURL}/users/refresh-token`, {}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const getAllVideos = async (params = null) => {

    try {
        const response = await axios.get(`${baseURL}/videos`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
            params,
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

export const getSingleVideo = async (videoId) => {
    try {
        const response = await axios.get(`${baseURL}/videos/${videoId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
};


export const toggleSubscribe = async (channelId) => {
    try {
        const response = await axios.post(`${baseURL}/subscriptions/c/${channelId}`, null, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const isUserSubscribed = async (channelId) => {
    try {
        const response = await axios.get(`${baseURL}/subscriptions/subscribed/c/${channelId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const publishVideo = async (formData) => {
    try {
        const response = await axios.post(`${baseURL}/videos`, formData, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${baseURL}/users/current-user`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const isUserLikedVideo = async (videoId) => {
    try {
        const response = await axios.get(`${baseURL}/likes/check/v/${videoId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const toggleLike = async (type, id) => {
    try {
        const response = await axios.post(`${baseURL}/likes/toggle/${type}/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const incrementVideoViews = async (videoId) => {
    try {
        const response = await axios.patch(`${baseURL}/videos/increment-view/${videoId}`, {}, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}


export const submitComment = async (videoId, formData) => {
    try {
        const response = await axios.post(`${baseURL}/comments/${videoId}`, { content: formData }, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const getVideoComments = async (videoId) => {
    try {
        const response = await axios.get(`${baseURL}/comments/${videoId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const updateComment = async (commentId, content) => {
    try {
        const response = await axios.patch(`${baseURL}/comments/c/${commentId}`, { content }, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${baseURL}/comments/c/${commentId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
        })
        return response?.data;
        console.log(response.data);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}