import React from 'react'

function SidebarTogglerBtn({fill , height , width}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
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
            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
        </svg>

    )
}

export default SidebarTogglerBtn