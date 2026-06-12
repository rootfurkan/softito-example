import React from 'react'

const Demo7EventHandling = ()=>{
    const butonaTiklandi = (mesaj) =>{
        alert(mesaj);
    }
    const formGonder = (event)=>{
        event.preventDefault();
        alert('form gönderilmedi sayfa yenilenmedi')
    }
    return (
        <div className="p-4">
            <h3 className='text-xl font-bold'>Demo 7 Olay Yönetimi</h3>
            <div className="mt-4">
                <h4 className='font-bold'>Buton Tıklama Olayı</h4>
                <div className="flex flex-col">
                    <button onClick={()=>butonaTiklandi('basit tıklama')} className='p-2 bg-blue-500'>Tıkla mesaj ver</button>
                    <button onClick={()=>butonaTiklandi('parametreli tıklama')} className='p-2 bg-green-700'>parametreli tıklama</button>
                </div>
            </div>
            <div className="mt-4">
                <h4 className='font-bold'>Form olayı submit</h4>
                <form onSubmit={formGonder} className='p-2 border'>
                    <input type="text" placeholder='metin girin..' className='p-2 border' />
                    <button type='submit' className='p-2 purple-800'>formu gönder</button>
                </form>
            </div>
        </div>
    )
}

export default Demo7EventHandling