import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { Alert, AlertDescription } from './ui/Alert';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUser = localStorage.getItem(`user-${username}`);

        if (!storedUser) {
            setError('User not found. Please sign up.');
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            setShowSuccess(true);
            setError('');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } else {
            setError('Incorrect password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        Please log in to your account
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                            {error}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <button
                        onClick={handleLogin}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                        Log In
                    </button>

                    <div className="flex items-center justify-between w-full text-sm">
                        <a href="#" className="text-indigo-600 hover:text-indigo-800">
                            Forgot password?
                        </a>
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>

            {showSuccess && (
                <Alert className="fixed bottom-4 right-4 bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                        Login successful! Redirecting...
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default Login;
