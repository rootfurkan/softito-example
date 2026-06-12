import React from 'react'

const Demo1 = () => {
  const dersAdi = "React Dersi";
  const ogrenciSayisi = 24;
  const aktifMi = true;
  const dersYili = 2026
  return (
    <div>
      <h1 className='text-xl font-bold'>İlk Ders</h1>
      <div className='mt-4'>
          <p className='border-b'><strong>Ders Adı:</strong>{dersAdi}</p>
          <p className='border-b'><strong>Öğrenci Sayısı:</strong>{ogrenciSayisi}</p>
          <p className='border-b'><strong>Aktif mi:</strong>{aktifMi}</p>,
          <p className='border-b'><strong>Ders yılı:</strong>{dersYili}</p>
          <p className='border-b'><strong>İşlem:</strong>{2+2}</p>
          <p className='border-b'><strong>Metin Dönüştürme:</strong>{dersAdi.toUpperCase()}</p>
          <p className='border-b'><strong>Ders durum:</strong>{aktifMi ? "Aktif":"Pasif"}</p>
      </div>

    </div>
  )
}

export default Demo1