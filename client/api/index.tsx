import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_URL

const userBase = `${base}/api/users`
const authBase = `${base}/api/auth`
const videosBase = `${base}/api/videos`

export async function registerUser(payload: {
  username: string
  password: string
  email: string
  confirmPassword: string
}) {
  return axios.post(userBase, payload).then((res) => res.data)
}

export async function loginUser(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, {
      withCredentials: true,
    })
    .then((res) => res.data)
}

export async function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      return null
    })
}

export async function uploadVideo({
    formData, config
}: {
    formData: FormData,
    config: {onUploadProgress: (progressEvent: any) => void}
}){
    return axios.post(videosBase, formData, {
        withCredentials: true,
        ...config,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)
}

export async function updateVideo({videoId, ...payload}: {
    videoId: string,
    title: string,
    description: string,
    published: boolean
}){
    return axios.patch(`${videosBase}/${videoId}`, payload, {
        withCredentials: true
    }).then(res => res.data)
}

export async function getVideos(){
  return axios.get(videosBase)
    .then(res => res.data)
}