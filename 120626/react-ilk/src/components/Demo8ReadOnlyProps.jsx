import React from 'react'

const DegistirilmeyenKart = (props) =>{
    const deneVeHataGoster = ()=>{
        try {
            props.baslik = "Yeni Başlık"
        } catch (hata) {
            alert('hata yakalandı props değişirilemez' +" " + hata.message);
        }
    }

    return(
        <div className="card">
            <h4 className='font-bold'>{props.baslik}</h4>
            <p className='text-gray-500'>Gelen props değeri {props.baslik}</p>
            <button onClick={deneVeHataGoster} className='btn-red'>prop değiştirmeyi dene</button>
        </div>
    )
}

const Demo8ReadOnlyProps = ()=>{
    return(
        <div className="p-4">
            <h3 className='text-xl font-bold'>Demo Salt okunur readonly props</h3>
            <div className="mt-4">
                <DegistirilmeyenKart  baslik="Değiştirilmeyen Kart Başlık"/>
            </div>
        </div>
    )
}

export default Demo8ReadOnlyProps;