import { Loader2 } from 'lucide-react'
import React from 'react'

export const Loader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader2 size={72} color='gray'/>
        </div>
    )
}
