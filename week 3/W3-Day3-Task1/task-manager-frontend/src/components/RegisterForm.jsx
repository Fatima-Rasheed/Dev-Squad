import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input 
        className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-gray-500 transition-all outline-none" 
        type="text" 
        placeholder="Full Name" 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-gray-500 transition-all outline-none" 
        type="email" 
        placeholder="Email Address" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-gray-500 transition-all outline-none" 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button 
        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-blue-200" 
        type="submit"
      >
        Register
      </button>

      {/* ✅ Added sign in redirect */}
      <p className="text-center text-slate-500 text-sm">
        Already have an account?{" "}
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