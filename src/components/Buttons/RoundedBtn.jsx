import React from 'react'

function RoundedBtn({ btnText, classNames, onClick, param1, disabled = false , id }) {
    return (
        <button
            className={`${classNames}  px-6 h-9 text-xl rounded-3xl  flex items-center justify-center`}
            onClick={() => onClick(param1)}
            disabled={disabled}
            id={id}
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