import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/users/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      const errorsArray = err.response?.data?.errors;
      if (errorsArray && errorsArray.length > 0) {
        setError(errorsArray.map(e => e.msg || e).join(', '));
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-gray-500 transition-all outline-none"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-gray-500 transition-all outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-gray-500 transition-all outline-none"
      />

      <button
        type="submit"
        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-blue-200"
      >
        Register
      </button>

      <p className="text-center text-slate-500 text-sm">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-600 font-semibold cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;