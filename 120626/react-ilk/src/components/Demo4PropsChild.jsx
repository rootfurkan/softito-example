import React from 'react'

const Kart = (props)=>{
    return(
        <div className="card">
            {props.children}
        </div>
    )
}

const Demo4PropsChild = ()=>{
    return(
        <div className="p-4">
            <h1 className='text-xl'>Demo 4 Sayfası</h1>
            <h3 className='text-xl font-bold'>Demo 4 props children kullanımı</h3>
            <div className="product-grid">
                <Kart>
                    <h4 className='font-bold'>Kart 1 başlık</h4>
                    <p className='text-sm'>Birinci kartın içerik metni</p>
                </Kart>
                <Kart>
                    <h4 className='font-bold'>
                        Kart 2 başlık
                    </h4>
                    <button className='btn-value'>Kart Butonu</button>
                </Kart>
            </div>
        </div>
    )
}

export default Demo4PropsChild;