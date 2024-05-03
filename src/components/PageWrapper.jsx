import React from 'react'

function PageWrapper({ children }) {
    return (
        <div className='px-4 py-2 sm:px-10 sm:py-4 md:px-16 md:py-10  overflow-y-auto '>
            {children}
        </div>
    )
}

export default PageWrapper