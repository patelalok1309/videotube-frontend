import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider, useDispatch } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, Signup } from './components'
import Home from './pages/Home.jsx'
import VideoPreview from './pages/VideoPreview.jsx'
import PublishVideo from './pages/PublishVideo.jsx'
import SearchResultList from './pages/SearchResultList.jsx'
import ChannelPreview from './pages/ChannelPreview.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import UserProfile from './pages/UserProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/watch/:videoId',
        element: <VideoPreview />
      },
      {
        path: '/publishVideo',
        element: <PublishVideo />
      },
      {
        path: '/results',
        element: <SearchResultList />
      },
      {
        path: '/channel/:channelUsername',
        element : <ChannelPreview />
      },
      {
        path: '/profile',
        element : <UserProfile />
      },
      {
        path: '*',
        element : <PageNotFound />
      }
    ]
  }]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
