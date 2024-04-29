import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${baseURL}/users/register`, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error occurred:", error);
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

export const getAllVideos = async () => {
    try {
        const response = await axios.get(`${baseURL}/videos`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        });
        console.log(response);
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