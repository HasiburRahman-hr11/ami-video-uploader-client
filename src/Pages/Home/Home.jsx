import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'
import VideosWrapper from '../../Components/Home/VideosWrapper';
import Banner from '../../Components/Home/Banner';

const Home = () => {
  return (
    <main>
      <Navigation />
      <Banner />
      <VideosWrapper />
    </main>
  )
}

export default Home
