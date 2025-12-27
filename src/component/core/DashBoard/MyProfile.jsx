import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../comman/IconBtn';

function MyProfile() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <div className='flex justify-center items-center h-full w-full'>
            <div className="text-white xl:w-10/12 lg:w-10/12  p-6  rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">My Profile</h1>

                {/* section-1 */}
                <div className="flex justify-between bg-richblack-800 py-6 px-10 rounded items-center mb-4 max-550:flex-col max-550:gap-4">
                    <div className='flex items-center max-550:flex-col max-550:gap-4'>
                    <img
                        src={`${user?.image}`}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square rounded-full w-[78px] object-cover mr-4"
                    />
                    <div className="flex flex-col min-550:w-96 max-550:w-full">
                        <p className="text-xl font-semibold">{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-pure-greys-400">{user?.email}</p>
                    </div>
                    </div>
                    
                    <IconBtn text="Edit" active='true' onClick={() => navigate("/dashboard/settings")} />
                </div>

                {/* section-2 */}
                <div className="bg-richblack-800 py-6 px-10 rounded mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <IconBtn text="Edit" active='true' onClick={() => navigate("/dashboard/settings")} />
                    </div>
                    <p className="text-pure-greys-400 w-10/12">
                        {user?.additionalDetails?.about ?? "Write something about yourself"}
                    </p>
                </div>

                {/* section-3 */}

                <div className="bg-richblack-800 py-6 px-10 rounded mb-4 text-white">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Personal Details</h2>
                        <IconBtn text="Edit" active='true' onClick={() => navigate("/dashboard/settings")} />
                    </div>
                    <div className={`sm:grid grid-cols-2 flex flex-col gap-6`}>
                        <div>
                            <p className="text-yellow-5 text-sm">First Name</p>
                            <p className="text-lg font-semibold">{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="text-yellow-5 text-sm">Last Name</p>
                            <p className="text-lg font-semibold">{user?.lastName}</p>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <p className="text-yellow-5 grid text-sm">Email</p>
                            <p className="text-lg font-semibold">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-yellow-5 text-sm">Phone Number</p>
                            <p className="text-lg font-semibold">
                                {user?.additionalDetails?.contectNumber ?? "Add your phone number"}
                            </p>
                        </div>
                        <div>
                            <p className="text-yellow-5 text-sm">Gender</p>
                            <p className="text-lg font-semibold">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                        <div>
                            <p className="text-yellow-5 text-sm">Date of Birth</p>
                            <p className="text-lg font-semibold">
                                {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
                            </p>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    );
}

export default MyProfile;