import React from 'react'

function RoundedBtn({ btnText, bgColor, textColor, classNames, onClick, param1 }) {
    return (
        <button
            className={`${classNames}  px-6 h-9 text-xl rounded-3xl  flex items-center justify-center`}
            onClick={() => onClick(param1)}
        >
            {btnText}
        </button>
    )
}

export default RoundedBtn

// padding: 0 16px;
// height: 36px;
// font-size: 14px;
// line-height: 36px;
// border-radius: 18px;