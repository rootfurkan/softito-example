import React, { useState } from 'react'

const EkleSil = () => {
    const [kisiler, setKisiler] = useState([
        { id: 1, isim: "Furkan Yorulmaz", durum: true },
        { id: 2, isim: "Selahaddin Çiftçi", durum: false },
        { id: 3, isim: "Ayşenur Akgün", durum: false },
    ]);

    const [yeniKisi, setYeniKisi] = useState("");

    const kisiEkle = (e) => {
        e.preventDefault();
        if (yeniKisi.trim() === "") return;

        const ekle = {
            id: crypto.randomUUID(),
            isim: yeniKisi,
            durum: false
        };

        setKisiler([...kisiler, ekle]);
        setYeniKisi("");
    };

    const kisiSil = (id) => {
        setKisiler(kisiler.filter((k) => k.id !== id)); // bir kişinin id si silinmek istenenle aynı değilse kalsın button keyden gelir bu değer
    };

    return (
        <div className="bg-indigo-100 h-screen flex flex-col justify-center items-center">
            <h3 className="text-2xl mb-2 font-bold">Kişi Ekle Sil Ödev</h3>

            <div className="bg-white rounded border border-gray-100 p-6 w-[400px]">
                <span className="text-sm">Yeni Kişi Ekle</span>

                <form onSubmit={kisiEkle} className="flex gap-2 mt-2">
                    <input
                        type="text"
                        value={yeniKisi}
                        onChange={(e) => setYeniKisi(e.target.value)}
                        placeholder="aranacak kişi ekleyin.."
                        className="bg-gray-100 p-3 flex-1 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-green-500 px-6 py-1 rounded text-gray-800"
                    >
                        Ekle
                    </button>
                </form>

                <div className="mt-5">
                    <h4 className="font-semibold mb-2">Kişiler</h4>

                    {kisiler.length === 0 ? (
                        <p className="text-sm text-gray-500">Henüz kişi eklenmedi.</p>
                    ) : (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {kisiler.map((kisi) => (
                                <div
                                    key={kisi.id}
                                    className="flex justify-between items-center bg-gray-100 p-3 rounded"
                                >
                                    <span>{kisi.isim}</span>

                                    <button
                                        onClick={() => kisiSil(kisi.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EkleSil