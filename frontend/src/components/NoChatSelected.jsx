import React from 'react';
import Logo from '../assets/logo.png';

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
      <div className='max-w-md text-center space-y-6'>
        {/* Icon Display */}
        <div className='flex justify-center gap-4 mb-4'>
          <div className='relative'>
            <div className='w-16 h-16 flex items-center justify-center animate-bounce'>
              <img src={Logo} className='h-12 w-15 rounded-2xl' />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <h2 className='text-2xl font-bold'>Welcome to sMs</h2>
      <p className='text-base-content/60'>
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
    
  )
}

export default NoChatSelected