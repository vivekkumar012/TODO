import React from 'react'

function PageNotFound() {
  return (
    <>
     <div className='flex items-center justify-center h-screen space-x-2 flex-col'>
        <span className='text-xl font-semibold text-red-400'>404</span>
        <div className='text-xl font-semibold text-orange-700'>Page Not Found</div>
     </div>
    </>
  )
}

export default PageNotFound
