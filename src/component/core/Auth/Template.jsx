import React from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import frameImage from '../../../assets/Images/frame.png'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const Template = ({ title, desc1, desc2, image, formtype }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth)
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] mt-20 place-items-center">
       <p className='text-richblue-100  shadow-richblack-500 shadow-xl p-3 md:text-2xl'>
              please wait 1 minute before {formtype}.
              if first attempt is failed.
            </p>
      {loading ? (
        <div className="spinner"></div>
      ) : (

        <div className='flex lg:justify-between justify-center w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0'>
          <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4 flex flex-col'>
              <span className='text-richblack-100'>{desc1}</span>
              <span className='text-blue-100 italic'>{desc2}</span>
            </p>

            {formtype === 'signup' ? (<SignupForm />) : (<LoginForm />)}

            <div className='flex w-full items-center my-4 gap-x-2'>
              <div className='bg-richblack-700 w-full h-[1px]'></div>
              <p className='font-medium leading-[1.375rem] text-richblack-300'>OR</p>
              <div className='bg-richblack-700 w-full h-[1px]'></div>
            </div>

            <button className='w-full text-white flex justify-center items-center rounded-[8px] font-medium to-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>

              {formtype === 'signup' ? (<div className='flex'>
                <p>If you already have an account, please click <Link to={"/login"} className='text-yellow-5 underline font-bold text-[8px] '>
                  - Here.
                </Link></p>
                
              </div>) : (<div className='flex font-bold'>
                <p>If you don't have an account, please click <Link to={"/signup"} className='text-yellow-5 underline font-bold text-[8px] '>
                  - Here.
                </Link></p>
                
              </div>)}
            </button>
          </div>
          <div className='relative lg:block hidden w-11/12 max-w-[450px]'>
            <img src={frameImage}
              alt="students"
              width={558}
              height={490}
              loading='lazy' />
            <img src={image}
              alt="Pattern"
              width={558}
              height={504}
              loading='lazy'
              className='absolute -top-4 right-4'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
