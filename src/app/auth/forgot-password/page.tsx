'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    try {
      // TODO: Implement password reset logic
      setStatus('success');
      setMessage('Password reset instructions have been sent to your email.');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send reset instructions. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex min-h-screen">
        {/* Left side - Brand section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-pink-500 tracking-wider">
              LINGERIE
            </h1>
            <p className="mt-4 text-xl text-pink-200 font-light">
              Elegance in Every Detail
            </p>
          </div>
        </div>

        {/* Right side - Forgot Password form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="mt-6 text-center text-4xl font-extrabold text-white lg:hidden">
                LINGERIE
              </h1>
              <h2 className="mt-4 text-center text-xl font-light text-pink-200">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded text-sm">
                  {message}
                </div>
              )}

              {status === 'success' && (
                <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded text-sm">
                  {message}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 border border-pink-500/30 placeholder-gray-400 text-white bg-gray-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Send reset instructions
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Remember your password?{' '}
                  <Link
                    href="/auth/login"
                    className="font-medium text-pink-400 hover:text-pink-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 

