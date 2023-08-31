'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, getSession, signOut } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'

export default function ProfilePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [data, setData] = useState('nothing')
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logged out successfully.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      toast.info('Redirecting to Dashbaord page', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setTimeout(() => router.push('/'), 4000)
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-lg md:text-3xl p-4 text-center text-teal-500 capitalize">
        Profile page
      </p>
      <hr />
      <div className="w-full p-4 gap-4 justify-center items-center flex flex-wrap flex-row">
        <h2 className="py-2 px-4 rounded bg-green-500">
          {data === 'nothing' ? (
            'Nothing to Link'
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <hr />
        <a
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          href="/"
        >
          Dashboard
        </a>
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>

        <button
          onClick={() => signOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Google Logout
        </button>

        <button
          onClick={getUserDetails}
          className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          GetUser Details
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
