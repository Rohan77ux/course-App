import React from 'react'
import HighlightText from './HighlightText'
import CodeBlocks1 from './CodeBlocks1'

function CodeSection2() {
  return (
    <div className='flex items-center flex-col py-[12px] pt-6 w-11/12'>
            <div className='pt-[40px] max-430:px-2 max-550:w-full md:w-[95%] xl:max-w-[75%]'>
                <CodeBlocks1
                position = "lg:flex-row-reverse"
                heading = {
                    <div>Start<HighlightText text=' coding'/><br /><HighlightText text=' in seconds '/></div>
                  } 
                subheading = "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                ctabtn1 = {
                  {
                    active:true,
                    linkto:"/login",
                    btnText:"Try it Yourself",
                  }  
                }
                ctabtn2 = {
                  {
                    active:false,
                    linkto:"/signup",
                    btnText:"Learn More",
                  }  
                }
                codeblock = {`<!DOCTYPE> <html><html> <head>\n<title>Example</title>\n <linkrel="stylesheet"\nhref="styles.css">\n</head><body>\n<h1><a href="/">Header</a>\n</h1><nav><a href="one/">One</a>\n<a href="two/">Two</a>\t\n<a href="three/">Three</a></nav>`} 
                backgroundGradient = "bg-gradient-to-br to-[#1FA2FF,#12D8FA] from-[#A6FFCB]" 
                codeColor ="text-pink-100"
                
                />
            </div>
        </div>
  )
}

export default CodeSection2
