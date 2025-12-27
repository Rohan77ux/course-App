

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    };

    return (
        <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
            {loading ? (
                <div className="text-center text-lg font-semibold">Loading...</div>
            ) : !emailSent ? (
                <div className=" px-4 rounded flex flex-col gap-[12px] shadow-md w-full max-w-md">
                    <h1 className="text-2xl text-[#F1F2FF] font-bold">Reset Your Password</h1>
                    <p className="text-[#AFB2BF] font-normal text-[18px] leading-[26px]">
                        Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery.
                    </p>
                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[14px] leading-[22px] text-[#F1F2FF] ">
                                Email Address
                            </label>
                            <input
                                required
                                id="email"
                                type="email"
                                placeholder="myemailaddress@gmail.com"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-[#F1F2FF] border border-pure-greys-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-md font-semibold bg-pure-greys-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Reset Password
                        </button>
                    </form>
                    <div className="mt-4 flex items-center text-blue-600 hover:underline">
                        <FaArrowLeft className="mr-2" />
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>
            ) : (
                <div className=" p-8 rounded shadow-md w-full max-w-md flex flex-col gap-2">
                    <h1 className="text-2xl text-[#F1F2FF] font-bold">Check Your Email</h1>
                    <p className="text-[#AFB2BF] font-normal text-[18px] leading-[26px]">
                        We have sent a reset email to <span className="font-semibold text-[#F1F2FF]">{email}</span>.
                    </p>
                    <button
                        onClick={handleOnSubmit}
                        className="w-full py-2 px-4 mb-4 bg-blue-400 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Resend Email
                    </button>
                    <div className="mt-4 flex items-center text-blue-600 hover:underline">
                        <FaArrowLeft className="mr-2" />
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
