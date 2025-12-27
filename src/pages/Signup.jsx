import React from 'react'
import singupImg from '../assets/Images/signup.png';
import Template from '../component/core/Auth/Template';

function Signup(props) {
    let setIsLoggedIn = props.setIsLoggedIn;
  return (
    <Template 
        title="Join the millions learning to code with StudyNotion for free"
        desc1 = "Build skills for today, tomorrow, and beyond."
        desc2 = "Education to future-proof your career."
        image= {singupImg}
        formtype = "signup"
        setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup;
