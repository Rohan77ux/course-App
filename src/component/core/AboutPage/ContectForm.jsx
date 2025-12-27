import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { contactusEndpoint } from '../../../services/api';
import countrycode from '../../../data/countrycode.json'
import { apiConnector } from '../../../services/apiconnector';
function ContectForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContectForm = async (data) => {
       // console.log("Logging Data :-", data);
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);

           // console.log("Logging Response :- ", response)
            setLoading(false);
        }
        catch (error) {
           console.log("Error :- ", error.message);
            setLoading(false);
        }
    }
    const changeHandler = () => {

    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);
    return (
        <form onSubmit={handleSubmit(submitContectForm)}>
            <div className='p-[32px] max-sm:w-[350px] max-w-[600px] mx-auto flex flex-col gap-6 sm:gap-16'>
                <div className='sm:h-[268px] flex flex-col gap-[40px]'>
                    {/* info */}
                    <div className='sm:h-[76px] sm:w-[536px]  flex flex-row max-sm:flex-col items-start justify-center gap-2 sm:gap-8'>
                        <div className='flex sm:w-2/5 w-full gap-1 flex-col'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                className='bg-[#161D29] p-[12px] rounded-[8px]'
                                type="text"
                                name='firstName'
                                id="firstName"
                                onChange={changeHandler}
                                placeholder='Enter first name'
                                {...register("firstName", { required: true })}
                            />
                            {
                                errors.firstName && (
                                    <span>
                                        Please enter Your name
                                    </span>
                                )
                            }
                        </div>
                        <div className='flex sm:w-2/5 w-full gap-1 flex-col'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                className='bg-[#161D29] p-[12px] rounded-[8px]'
                                type="text"
                                name='lastName'
                                id="lastName"
                                onChange={changeHandler}
                                placeholder='Enter last name'
                                {...register("lastName")}
                            />

                        </div>
                    </div>

                    <div className='h-[76px] sm:w-[536px] items-center justify-center '>
                        <div className='flex gap-1 sm:mx-10 flex-col'>
                            <label htmlFor='email' className='mx-2'>Email Address</label>
                            <input
                                className='bg-[#161D29] p-[12px] rounded-[8px]'
                                name='email'
                                type="email"
                                placeholder='abcdefghi@gamil.com'
                                id="email"
                                onChange={changeHandler}
                                {...register("email", { required: true })}
                            />
                            {
                                errors.email && (
                                    <span>
                                        Please enter valid email address
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <div className='sm:h-[76px] sm:w-[536px] '>
                        <div className='flex justify-center items-end'>
                            <div className='sm:ml-10 max-sm:w-[30%] w-[12%] flex flex-col sm:mr-5 max-sm:mr-2 mr-4 justify-center  h-full'>
                                <select
                                    name="dropdown"
                                    id="dropdown"
                                    className='bg-[#161D29] py-[14px] px-[5px] rounded-[8px]'
                                    {...register("countrycode", { required: true })}
                                >
                                    {countrycode.map((element, index) => (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className='max-sm:w-2/3 w-full sm:mr-10'>
                                <div className='flex flex-col gap-1 '>
                                    <label htmlFor='phoneNo'>Phone Number</label>


                                    <input
                                        name='phoneNo'
                                        type="phoneNo"
                                        placeholder='12345 67890'
                                        id="phoneNo"
                                        onChange={changeHandler}
                                        className='bg-[#161D29] p-[12px] rounded-[8px]'
                                        {...register("phoneNo",
                                            {
                                                required: { value: true, message: "Please enter Phone Number" },
                                                maxLength: { value: 10, message: "Invalid Phone Number" },
                                                minLength: { value: 8, message: "Invalid Phone Number" }
                                            })}
                                    />



                                </div>

                            </div>
                        </div>

                        <p className='mx-10'>
                            {
                                errors.phoneNo && (
                                    <span>
                                        Please enter Your valid Phone Number
                                    </span>
                                )
                            }
                        </p>

                    </div>

                </div>
                <div className='h-[151px]'>
                    <div className='flex flex-col sm:mx-10 gap-2'>


                        <label htmlFor="message">Message</label>
                        <textarea
                            className='bg-[#161D29] p-[12px] rounded-[8px]'
                            name="message"
                            id="message"
                            cols='30'
                            rows='5'
                            placeholder='Enter Your message hare'
                            {...register("message", { required: true })}
                        />
                        {
                            errors.message && (
                                <span>
                                    Please enter message
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className='h-[48px] mx-10 flex items-center justify-center mt-10'>
                    <button type='submit' className='p-3 rounded-[8px] bg-[#FFD60A] text-[#000814]'>
                        send message
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ContectForm
