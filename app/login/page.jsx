'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendMagicLink } from './api/sendMagicLink'; // Import the server function
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendMagicLink(email);

      if (data.success) {
        setSuccess(data.message);
        setError('');
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error sending magic link:', error);
      setError('Failed to send magic link.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <nav className="bg-white shadow-sm w-full fixed top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div>
                <Image src="/logo.svg" alt="TrackFast Dashboard" width={32} height={32} className="rounded-xl w-12 border bg-base-200 object-contain object-center" />
              </div>
              <span className="ml-2 text-xl font-semibold text-stone-800">TrackFast</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen pt-16 px-8">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            {error && <div className="alert alert-error shadow-lg">{error}</div>}
            {success && <div className="alert alert-success shadow-lg">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Send Magic Link</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
