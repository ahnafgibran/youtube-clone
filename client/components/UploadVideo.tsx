import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { useForm } from '@mantine/hooks'
import { AxiosError } from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useMutation } from 'react-query'
import { ArrowBigUpLine } from 'tabler-icons-react'
import { updateVideo, uploadVideo } from '../api'
import { useVideo } from '../context/videos'
import { Video } from '../types'

function EditVideoForm({
  videoId,
  setOpened,
  resetState,
}: {
  videoId: string
  setOpened: Dispatch<SetStateAction<boolean>>
  resetState: () => void
}) {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      published: false,
    },
  })
  const {refetch} = useVideo()

  console.log('form', form)

  const mutation = useMutation<
    Video,
    AxiosError,
    Parameters<typeof updateVideo>['0']
  >(updateVideo, {
    onSuccess: () => {
      resetState()
      setOpened(false)
      refetch()
    }

  })

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}
    >
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="My awesome video"
          {...form.getInputProps('title')}
        />
        <TextInput
          label="Desription"
          required
          {...form.getInputProps('description')}
        />
        <Switch label="Published" {...form.getInputProps('published')} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  )
}

function UploadVideo() {
  const [opened, setOpened] = useState(false)
  const [progress, setProgress] = useState(0)

  const mutation = useMutation(uploadVideo)

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )

      setProgress(percent)
    },
  }

  function upload(files: File[]) {
    const formData = new FormData()
    formData.append('video', files[0])

    mutation.mutate({ formData, config })
  }

  const resetState = () => {
    setProgress(0)
    mutation.reset()
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload video"
        size="xl"
      >
        {progress > 0 ? (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        ) : (
          <Dropzone
            onDrop={(files) => {
              upload(files)
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {(status) => (
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: '50vh',
                  justifyContent: 'center',
                }}
                direction="column"
              >
                <ArrowBigUpLine />
                <Text>Drag video here or click to find</Text>
              </Group>
            )}
          </Dropzone>
        )}
        {mutation.data && (
          <EditVideoForm
            setOpened={setOpened}
            videoId={mutation.data.videoId}
            resetState={resetState}
          />
        )}
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload video</Button>
    </>
  )
}

export default UploadVideo
