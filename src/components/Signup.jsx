import React, { useState } from 'react';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { Alert, AlertDescription } from './ui/Alert';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSignup = () => {
        const user = { username, email, password };
        localStorage.setItem(`user-${username}`, JSON.stringify(user));
        setShowSuccess(true);
        setUsername('');
        setPassword('');
        setEmail('');

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center text-gray-900">
                        Create an Account
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        Sign up to get started with our service
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="relative">
                        <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <button
                        onClick={handleSignup}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                        Sign Up
                    </button>

                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            {showSuccess && (
                <Alert className="fixed bottom-4 right-4 bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                        Signup successful! You can now log in.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default Signup;