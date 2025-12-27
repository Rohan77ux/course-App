import React from 'react'

const HighlightText=({text,color}) => {
    return (
        // bg-gradient-to-b from-[#2d1a1a] to-[#7676ff]
      <span className={`font-bold ${color ? `${color}` : "text-[#12D8FA]"}`}>
        {text}
      </span>
    )
  }

export default HighlightText;
