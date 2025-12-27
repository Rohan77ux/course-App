import React from 'react'
import logo from '../../assets/Logo/Logo.svg'
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import MappedFunction from "../core/HomePage/mappedFunction"
import FooterLink2 from "../../data/footer-links"
import MappedFunction1 from '../core/HomePage/MappedFunction1';
const resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];

const Plans = [
    "Paid memberships",
    "For students",
    "Business solutions",
]
const Community = [
    "Forums",
    "Chapters",
    "Events",
]
const BottomFooter = [
    "Privacy Policy",
    "Cookie Policy",
    "Terms",
]

const footer = () => {
    return (
        <div className='w-full py-[52px] footer gap-[32px] border-[#424854] border-t-[1px] flex flex-col justify-center items-center bg-[#161D29]'>
            <div className='xl:h-[570px]  w-11/12  gap-[8px] xl:gap-[52px] flex flex-col xl:flex-row justify-center items-center'>
                <div className='xl:w-[49%] flex max-550:justify-center gap-[12px] xl:justify-end sm:gap-[40px] md:gap-[56px] max-550:flex-wrap xl:gap-[12px] h-full'>
                    <div className='w-[185px] h-[75%] flex flex-col gap-[12px]'>
                        <img src={logo} width="160px" alt="" />
                        <p className='text-[16px] leading-[24px] cursor-pointer font-semibold text-[#AFB2BF]'>Company</p>
                        <div className='flex flex-col gap-2'>
                            {
                                ["About", "Careers", "Affiliates"].map((ic, idxc) => {
                                    return (<div key={idxc} className='text-[14px] leading-[22px] cursor-pointer font-normal hover:text-[#AFB2BF] text-[#6E727F]'>
                                        <Link to={ic.toLowerCase()}>{ic}</Link>
                                    </div>)
                                })
                            }
                        </div>
                        <div className='flex pt-2 gap-5'>
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />
                        </div>

                    </div>
                    <div className='min-430:w-[150px] h-[63%]  flex flex-col gap-[24px]'>
                        <div>
                            <p>Resources</p>
                            <div>
                                <MappedFunction1 resources={resources} />
                            </div>
                        </div>

                        <div>
                            <p>Support</p>
                            <Link to="/help-center" className='text-[14px] leading-[22px] cursor-pointer font-normal hover:text-[#AFB2BF] text-[#6E727F]'>Help Center</Link>
                        </div>


                    </div>

                    <div className='min-430:pl-[20px]  max-430:w-[300px] min-430:w-[360px] min-550:w-[150px] min-550:h-[75%] flex flex-col max-550:flex-row max-550:gap-[76px] gap-[24px]'>
                        <div>
                            <p>Plans</p>
                            <div>
                                <MappedFunction1 resources={Plans} />
                            </div>
                        </div>
                        <div>
                            <p>Community</p>
                            <div className='flex flex-col gap-[8px]'>
                                <MappedFunction1 resources={Community} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* //////////////////////// */}

                <div className='w-[1px] xl:block hidden h-full border-[#2C333F] border-[1px] '></div>

                {/* /////////////////// */}
                <div className=' xl:w-[49%] flex justify-start gap-[50px] xl:gap-[12px] h-full'>
                    <MappedFunction resources={FooterLink2} />
                </div>



            </div>
            <div className='w-11/12 h-[1px] border-[#2C333F] border-[1px] '></div>
            <div className='w-11/12 h-[22px] gap-[12px] flex max-md:flex-col justify-between'>
                <div className='flex'>
                    {
                        BottomFooter.map((item,idx) => {
                            return (
                                <Link to={item.split(" ").join("-").toLocaleLowerCase()} key={idx} className={` ${
                                    BottomFooter.length - 1 === idx
                                      ? ""
                                      : "border-r border-[#2C333F]  "
                                  }  text-[14px] leading-[22px] font-medium px-[8px] hover:text-richblack-50 transition-all duration-200 text-[#838894] cursor-pointer`}>{item}</Link>
                            )
                        })
                    }
                </div>
                <div className='text-[#838894] font-medium'>
                Made with ❤️ CodeHelp © 2023 Studynotion
                </div>
            </div>
        </div>
    )
}

export default footer

