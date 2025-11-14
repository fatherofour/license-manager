import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/common/input';
import { Button } from '@/components/common/button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 text-white p-4 rounded-xl">
            <Package size={40} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Forgot Password?</h1>
        <p className="text-center text-gray-500 mb-8">Enter your email address and we'll send you a password reset link.</p>
        {success ? (
      <div className="space-y-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600">
            If an account exists with that email, you'll receive password reset instructions shortly.
          </p>
        </div>
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back to login
        </Link>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={20} />}
          placeholder="you@example.com"
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Send Reset Link
        </Button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back to login
        </Link>
      </form>
    )}
  </div>
</div>
  )
}