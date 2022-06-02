import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { showNotification, updateNotification } from '@mantine/notifications'
import { AxiosError } from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import { loginUser } from '../../api'

function LoginPage() {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof loginUser>['0']
  >(loginUser, {
    onSuccess: () => {
      router.push('/')
    },
  })
  return (
    <>
      <Head>
        <title>Login user</title>
      </Head>

      <Container>
        <Title>Login</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="password"
                required
                {...form.getInputProps('password')}
              />
              <Button
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                type="submit"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default LoginPage
