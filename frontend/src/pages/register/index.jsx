import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/store/auth'
import iaxios from '~/utils/axios';
import toast from "react-hot-toast"; 
import{setTokenToAxios} from '~/utils/axios'
import { Link } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        iaxios.post('/auth/register/', { first_name: firstName, last_name: lastName, email, password, username })
            .then((res) => {
                dispatch(loginSuccess(res.data));
                setTokenToAxios(res.data.token);
            })
            .catch(() => {
                toast.error('An error occured')
            });


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-200">
            <div className="bg-white p-10 rounded shadow-md w-4/12 flex flex-col gap-2">
            <form onSubmit={handleRegister} >
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
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
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Register
                </button>
            </form>
            <div className='flex gap-2'>
                <p className='text-slate-400'>Already have an account? </p>
                <Link to="/login" className='text-blue-500 font-medium'>Sign in</Link>
            </div>
            </div>

        </div>
    );
};

export default Register;
