import React from 'react'

function EditSvg({ height = "24", width = "24" , fill = "white"}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height={height}
            viewBox="0 0 24 24"
            width={width}
            focusable="false"
            fill={fill}
            style={{
                pointerEvents: "none",
                display: "inherit",
                width: "100%",
                height: "100%"
            }}
        >
            <path d="m14.06 7.6 2.34 2.34L6.34 20H4v-2.34L14.06 7.6m0-1.41L3 17.25V21h3.75L17.81 9.94l-3.75-3.75zm3.55-2.14 2.37 2.37-1.14 1.14-2.37-2.37 1.14-1.14m0-1.42-2.55 2.55 3.79 3.79 2.55-2.55-3.79-3.79z" />
        </svg>

    )
}

export default EditSvg