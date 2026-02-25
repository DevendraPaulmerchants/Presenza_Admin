import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'User@123' && password === 'Admin@123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <form
        onSubmit={handleLogin}
        className="bg-white px-8 pt-4 pb-8 rounded shadow-md w-80 h-80 rounded-[15px]"
      >
        <div className="text-center">
          <h2 className="font-bold text-[20px] text-[#044b4b] tracking-wide text-shadow-lg">
            Presenza
          </h2>
          <h3 className=" font-bold text-[16px] text-[#3a8686]">Admin Login</h3>
        </div>
        <div className="justify-self-center py-8">
          <div className="w-full mb-4">
            <input
              className="border border-gray-500 w-full rounded-md p-2 outline-none"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full mb-4">
            <input
              className="border border-gray-500 w-full rounded-md p-2 outline-none"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center bg-gray-600 w-full py-2 rounded-md">
            <button type="submit" className="text-white cursor-pointer w-full">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
