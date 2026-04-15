import React from 'react'

const Loader = () => {
    return (
        <div className='h-screen flex items-center justify-center '>
            <div className=' size-12 animate-spin rounded-full h-12 w-12 border-3 border-gray-400 border-t-transparent'></div>
        </div>
    )
}

export default Loader
