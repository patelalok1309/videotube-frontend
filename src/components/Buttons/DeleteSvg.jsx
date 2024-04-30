import React from 'react'

function DeleteSvg({ height = "24", width = "24" , fill = "white"}) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height={24}
        viewBox="0 0 24 24"
        width={24}
        focusable="false"
        fill={fill}
        style={{
          pointerEvents: "none",
          display: "inherit",
          width: "100%",
          height: "100%"
        }}
      >
        <path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z" />
      </svg>
      

    )
}

export default DeleteSvg