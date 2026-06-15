import React from 'react'
import { useState } from 'react'

const Counter = ()=>{
    const  [sayi, setSayi] = useState(0);

    const arttir = ()=>{
        setSayi(sayi+1);
    }
    const azalt = ()=>{
        setSayi(sayi-1);
    }
    const sifirla = ()=>{
        setSayi(0);
    }
    const besArttir = ()=>{
        setSayi((oncekiSayi)=> oncekiSayi + 5); 
    }

    return(
        <div className="p-4">
            <h3 className='font-bold'>Temel Counter</h3>
            <div className="card p-4">
                <span className='text-sm'>Mevcut değer</span>
                <span className='text-sm'>{sayi}</span>
                <div className="flex flex-wrap gap-2">
                    <button className='flex-1 border rounded' onClick={azalt}>-1 azalt </button>
                    <button className='flex-1 border rounded' onClick={sifirla}>Sıfırla </button>
                    <button className='flex-1 border rounded' onClick={arttir}> +1 arttır </button>
                    <button className='flex-1 border rounded m-3' onClick={besArttir}>+5 arttır </button>
                </div>
                <div className="mt-6">
                    <h4 className='font-semibold'>Öğrenim Notu</h4>
                    <ul className='list-disc'>
                        <li>(0) başlangıç değerini 0 olarak kodlar</li>
                        <li>state içindeki sayi = sayi +1 şeklinde değiştirilemez useState set ile başlayan bir fonksiyon ister</li>
                        <li>ardışık veya async durumlarda önceki değere bağımlı güncellemeler için prev(callback) yapısı tercih edilmelidir.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}



export default Counter