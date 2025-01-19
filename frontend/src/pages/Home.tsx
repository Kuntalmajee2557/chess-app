import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div className='bg-slate-800 h-screen flex flex-col justify-center items-center'>
      <img src="pieces.png" alt="" className='h-4/6 relative top-5'/>
        <button onClick={() => navigate("/game")} className='text-white font-bold text-8xl border border-stone-600 px-56 py-6 hover:bg-slate-700 rounded-xl relative bottom-16'>Ready to Play</button>
    </div>
  )
}

export default Home