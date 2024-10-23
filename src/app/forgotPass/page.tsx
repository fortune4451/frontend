'use client'

import Link from 'next/link'
import React, { useState } from 'react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/recover-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Recovery email has been sent!')
      } else {
        setError(data.message || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center h-[100vh] overflow-hidden'>
      <div className='bg-white p-6 sm:p-8 rounded-xl w-[90vw] sm:w-[60vw] lg:w-[50vw] flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-semibold text-lg'>Account Recovery</h1>
          <p className='text-xs'>
            To recover your account, please provide your email or username to find your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Username */}
          <div>
            <label htmlFor='username' className='block text-sm text-gray-700'>
              E-mail or Username
            </label>
            <input
              type='text'
              id='username'
              className='p-1 px-2 rounded-sm text-black outline-none border border-grey text-sm w-full'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Error and Success Messages */}
          {error && <p className='text-red-500 text-xs text-center'>{error}</p>}
          {success && <p className='text-green-500 text-xs text-center'>{success}</p>}

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-blue-600 text-white p-1 rounded-md cursor-pointer text-sm w-full'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
