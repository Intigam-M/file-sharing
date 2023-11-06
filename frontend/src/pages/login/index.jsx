import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/store/auth'

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Burada normalde API çağrısı yapılır, ancak örneği basit tutmak için direkt olarak action dispatch ediyoruz.
    // Gerçek projede bu kısımda fetch ya da axios gibi kütüphanelerle API çağrısı yapılmalıdır.
    dispatch(loginSuccess({ username })); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
