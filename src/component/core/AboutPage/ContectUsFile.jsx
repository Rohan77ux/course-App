import React from 'react'
import ContectForm from './ContectForm'
function ContectUsFile() {

   


    return (
        <div className='flex flex-col gap-[32px] w-full px-2'>
            <div className='max-w-[600px] flex flex-col gap-[12px]  mx-auto'>
                <h1 className='text-[#F1F2FF] text-center text-[24px] sm:text-[36px] font-semibold leading-10'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='text-[#838894] text-[16px] text-center font-medium leading-6'>Tall us more about yourself and what you’re got in mind.</p>
            </div>

            <div>
                <ContectForm></ContectForm>
            </div>
        </div>
    )
}

export default ContectUsFile
