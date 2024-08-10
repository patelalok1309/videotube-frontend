import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Signup } from "./components";
import Home from "./pages/Home.jsx";
import VideoPreview from "./pages/VideoPreview.jsx";
import PublishVideo from "./pages/PublishVideo.jsx";
import SearchResultList from "./pages/SearchResultList.jsx";
import ChannelPreview from "./pages/ChannelPreview.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute component={<Home />} />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/watch/:videoId",
                element: <ProtectedRoute component={<VideoPreview />} />,
            },
            {
                path: "/publishVideo",
                element: <ProtectedRoute component={<PublishVideo />} />,
            },
            {
                path: "/results",
                element: <ProtectedRoute component={<SearchResultList />} />,
            },
            {
                path: "/channel/:channelUsername",
                element: <ProtectedRoute component={<ChannelPreview />} />,
            },
            {
                path: "/profile",
                element: <ProtectedRoute component={<UserProfile />} />,
            },
            {
                path: "/feed/history",
                element: <ProtectedRoute component={<WatchHistory />} />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
