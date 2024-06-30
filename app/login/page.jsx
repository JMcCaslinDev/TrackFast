'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendMagicLink } from './sendMagicLink'; // Correct import path for the server function

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
        setSuccess('Magic link sent! Please check your email.');
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
    <div className="flex items-center justify-center min-h-screen bg-base-200">
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
  );
};

export default Login;
