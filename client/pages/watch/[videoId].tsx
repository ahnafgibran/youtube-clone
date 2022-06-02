import { useRouter } from 'next/router'

function WatchVideoPage() {
  const { query } = useRouter()

  return (
    <div>
      <video
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/videos/${query.videoId}`}
        width='800px'
        height='auto'
        controls
        autoPlay
        id='video-player'
      ></video>
    </div>
  )
}

export default WatchVideoPage
