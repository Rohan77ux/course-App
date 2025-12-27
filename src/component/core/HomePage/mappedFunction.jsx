

import React from 'react';
import { Link } from 'react-router-dom';

function MappedFunction({ resources }) {
    return (
        <div className="flex max-500:px-[0px] min-550:px-[30px] justify-evenly min-550:justify-center min-430:gap-10 sm:gap-[40px] pt-6 md:gap-[56px] max-550:flex-wrap xl:gap-[12px]">
            {resources.map((resItem, resIdx) => (
                <div
                    key={resIdx}
                    className="text-[16px] pl-[15px] w-[158px] leading-[24px] cursor-pointer font-semibold text-[#AFB2BF] flex flex-col gap-[8px]"
                >
                    <h3>{resItem.title}</h3>
                    <div className="text-[14px] leading-[22px] font-normal text-[#6E727F] flex flex-col gap-[10px]">
                        {resItem.links.map((linkItem, linkIdx) => (
                            <Link
                                key={linkIdx}
                                to={linkItem.link}
                                className="hover:text-[#AFB2BF]"
                            >
                                {linkItem.title}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MappedFunction;



