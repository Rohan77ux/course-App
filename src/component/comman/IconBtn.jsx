import React from 'react'

function IconBtn(
    {text,
    onClick,
    children,
    disabled,
    outline=true,
    customClasses,
    active,
    type,
}
){
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={`text-black ${active ? "bg-yellow-50":"bg-pure-greys-200"} ${customClasses} py-2 font-medium text-xl px-4 rounded-lg`}  >
      {
        children ? (
            <div className={`flex justify-center items-center gap-1  `}>
                <p className=''>  
                    
                        {text}
                    
                </p>
                {children}
            </div>
        ):(text)
      }
    </button>
  )
}

export default IconBtn