import { SimpleGrid } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import VideoTeaser from '../components/VideoTeaser'
import { useVideo } from '../context/videos'
import HomePageLayout from '../layout/Home'

const Home = () => {
  const { videos } = useVideo()

  return (
    <div className="">
      <SimpleGrid cols={3}>
        {(videos || []).map((video) => {
          return <VideoTeaser key={video.videoId} video={video}></VideoTeaser>
        })}
      </SimpleGrid>
    </div>
  )
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>
}

export default Home
