import React from 'react'

const Selamla =()=>{
      return (
    <div className='p-3 border'>
        <h4 className='font-bold'>Merhaba Dünya</h4>
    </div>
  )
}

const Demo2Component = ()=>{
    return(
        <div className="p4">
            <h1 className='text-xl'>Demo 2 Sayfası</h1>
            <h4 className='text-xl font-bold'>Demo 2 Bileşen</h4>
            <div className="mt-4">
                <Selamla /> 
            </div>
        </div>
    )
}


export default Demo2Component;