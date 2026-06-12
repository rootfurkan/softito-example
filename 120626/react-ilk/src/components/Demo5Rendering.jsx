import React from 'react'

const UrunKutusu = (props)=>{
    return(
        <div className="card">
            <h4 className='font-bold'>{props.ad}</h4>
            <div className="mt-2">
                {props.stokAdedi > 0 ? (
                    <span className='badge-success'>Stokta var ({props.stokAdedi}) adet</span>
                ): (
                    <span className='badge-danger'>Stokta yok - Tükendi</span>
                )
                
                }
            </div>
                <div className="mt-2">
                    {
                        props.indirimdeMi && (
                            <span className='badge-danger'>Kampanyalı Ürün</span>
                        )
                    }
                </div>
        </div>
    )
}

const Demo5Rendering=()=>{
    return(
        <div className="p-4">
            <h1 className="text-xl font-bold">Demo 5 Sayfası</h1>
            <h3 className='text-xl font-bold'>Demo 5 Koşullu Render</h3>
            <div className="product-grid">
                <UrunKutusu ad="Televizyon" stokAdedi={5} indirimdeMi={true} />
                <UrunKutusu ad="Bilgisayar" stokAdedi={15} indirimdeMi={true} />
                <UrunKutusu ad="Bulaşık Makinesi" stokAdedi={0} indirimdeMi={false} />
                <UrunKutusu ad="Tablet" stokAdedi={10} indirimdeMi={true} />


            </div>
        </div>
    )
}

export default Demo5Rendering;