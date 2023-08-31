'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  })

  // ts-ignore
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  }

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    const asyncRouterPush = (path: any) => {
      return new Promise((resolve, reject) => {
        resolve(setTimeout(() => router.push(path), 500))
      })
    }
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup success', response.data)
      toast.success('User created successfully.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      toast.info('Redirecting to login page', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      // toast.promise(asyncRouterPush('/login'), {
      //   loading: 'Redirecting to login page',
      //   success: 'Successfully redirected',
      //   error: 'sSomething went wrong',
      // })
      setTimeout(() => router.push('/login'), 4000)
    } catch (error: any) {
      console.log('Signup failed', error.message)
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <>
      <main className="flex h-screen grid grid-col-2 grid-row-1 grid-flow-col text-black">
        <div className="bg-[#000] hidden md:flex items-center justify-center">
          <h2 className="text-center text-6xl text-[#fff] text-bold-700">
            Board.
          </h2>
        </div>
        <div className="bg-[#F5F5F5] col-span-2 flex flex-col flex-auto p-4 justify-center items-center gap-2">
          <div className="flex flex-col flex-auto p-4 justify-center items-center md:items-start  gap-2">
            <h2 className="text-4xl text-bold-700">Signup</h2>
            <p className="text-bold-400 mb-4">Sign up for your account</p>
            {/* <div className="flex gap-4 mb-2 flex-wrap w-full justify-between text-sm text-[#858585] ">
              <button className="p-1 px-4 bg-[#fff] rounded-md flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_0_347)">
                    <path
                      d="M13.9926 7.13096C13.9926 6.55738 13.9449 6.13883 13.8419 5.70477H7.1394V8.2936H11.0736C10.9943 8.93695 10.566 9.90584 9.61414 10.5569L9.6008 10.6436L11.72 12.2478L11.8668 12.2622C13.2152 11.0452 13.9926 9.25473 13.9926 7.13096Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M7.13948 13.9519C9.06691 13.9519 10.685 13.3318 11.8669 12.2622L9.61422 10.5569C9.0114 10.9677 8.20233 11.2545 7.13948 11.2545C5.2517 11.2545 3.64946 10.0376 3.07831 8.35565L2.99459 8.3626L0.791024 10.0291L0.762207 10.1074C1.93612 12.3862 4.34742 13.9519 7.13948 13.9519Z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.07816 8.35566C2.92746 7.92161 2.84024 7.45651 2.84024 6.97597C2.84024 6.49537 2.92746 6.03033 3.07023 5.59627L3.06624 5.50383L0.835056 3.81058L0.762055 3.84451C0.27823 4.79015 0.000610352 5.85207 0.000610352 6.97597C0.000610352 8.09987 0.27823 9.16173 0.762055 10.1074L3.07816 8.35566Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M7.13948 2.69735C8.47995 2.69735 9.38417 3.26317 9.89976 3.73602L11.9145 1.81375C10.6771 0.689847 9.0669 0 7.13948 0C4.34742 0 1.93612 1.5657 0.762207 3.8445L3.07038 5.59626C3.64946 3.91428 5.2517 2.69735 7.13948 2.69735Z"
                      fill="#EB4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_347">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Sign up with Google
              </button>
              <button className="p-1 px-4 bg-[#fff] rounded-md flex items-center gap-2">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_0_355)">
                    <path
                      d="M6.34516 1.21952C7.27201 0.00716167 8.56055 0.00125122 8.56055 0.00125122C8.56055 0.00125122 8.75222 1.14107 7.83144 2.23908C6.84828 3.41151 5.73078 3.21966 5.73078 3.21966C5.73078 3.21966 5.52094 2.29759 6.34516 1.21952ZM5.84866 4.0181C6.32548 4.0181 7.21043 3.36763 8.36232 3.36763C10.3451 3.36763 11.1251 4.76781 11.1251 4.76781C11.1251 4.76781 9.59954 5.54189 9.59954 7.42017C9.59954 9.53904 11.5 10.2693 11.5 10.2693C11.5 10.2693 10.1715 13.9801 8.37708 13.9801C7.55292 13.9801 6.91217 13.4289 6.04378 13.4289C5.15883 13.4289 4.28065 14.0007 3.70868 14.0007C2.0701 14.0007 0 10.4806 0 7.65098C0 4.86704 1.7522 3.40664 3.39569 3.40664C4.46411 3.40664 5.29321 4.0181 5.84866 4.0181Z"
                      fill="#999999"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_355">
                      <rect width="11.5" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Sign up with apple
              </button>
            </div> */}

            <div className="bg-[#fff] p-4 rounded-md text-base self-center w-full h-auto md:w-96">
              <div className="flex flex-col flex-flow-col gap-4  p-4 items-start">
                <div>
                  <label className="text-left mb-2" htmlFor="#username">
                    Username
                  </label>
                  <input
                    className="w-full bg-gray-200 p-3 rounded-md"
                    type="text"
                    id="username"
                    placeholder="johndoe"
                    name="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-left mb-2" htmlFor="#email">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-gray-200 p-3 rounded-md"
                    type="email"
                    id="email"
                    placeholder="johndoe@gmail.com"
                    name="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-left" htmlFor="#password">
                    Password
                  </label>
                  <input
                    className="w-full bg-gray-200 p-3 rounded-md"
                    type="password"
                    id="password"
                    placeholder="********"
                    name="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>

                <button className="text-[#346BD4]">Forgot Password?</button>
                <button
                  disabled={loading}
                  onClick={onSignup}
                  className="p-2 bg-[#000] w-full text-[#fff] rounded-md text-bold-700"
                >
                  {!loading ? 'Sign up' : 'Loading...'}
                </button>
              </div>
            </div>
            <p className="text-center w-full">
              Already have an account?{' '}
              <Link className="text-[#346BD4]" href="/login">
                Login here
              </Link>
              .
            </p>
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
      </main>
    </>
  )
}
