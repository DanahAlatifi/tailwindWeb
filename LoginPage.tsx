import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate(); // لاستخدام التنقل بين الصفحات

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = () => {
    const user = users.find((u) => u.username === username);
    if (user && password === 'password') { // تحقق من اسم المستخدم وكلمة المرور
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // تخزين بيانات المستخدم في localStorage
      navigate('/notes'); // التنقل إلى صفحة الملاحظات
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
      <input
        className="w-4/5 p-3 border rounded-lg mb-4 text-lg"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-4/5 p-3 border rounded-lg mb-4 text-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-400"
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {username && password && !error && (
        <Link to="/notes" className="text-blue-500 mt-4">Go to Notes</Link>
      )}
    </div>
  );
};

export default LoginPage;
