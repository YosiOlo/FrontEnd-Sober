import React from 'react';

const Info = () => {
    return (
        <div className="content-info-wrapaper">
            <div className="rows-info-wrapaper flex flex-col lg:flex-row gap-10 py-8 px-2 mr-4 ">
                <div className="info-right flex-1 border-r-2">
                    <div className="contac-info">
                        <h3 className="text-4xl font-semibold mb-8">Contact Info</h3>
                        <h4 className="text-xl font-semibold mb-4">Sobermart</h4>
                        <p className="text-xl">Location</p>
                        <p className="mb-4">Office 88 Lt 9 Unit A Gedung 88, Jl. Casablanca Raya Kav. 88, Kota Casablanca, Menteng Dalam, Tebet, Jakarta Selatan, 12870</p>
                        <p className="mb-4">021-39701924</p>
                        <a href="mailto:support@sobermart.id">support@sobermart.id</a>
                    </div>
                </div>
                <div className="info-left md:basis-2/3">
                    <div className="contact-us">
                        <h3 className="text-4xl font-semibold mb-8">Hubungi Kami</h3>
                        <form>
                            <div className="responsif flex flex-col lg:flex-row gap-2">
                            <div className="mb-4">
                                <label htmlFor="nama" className="text-xl font-semibold">Nama</label>
                                <input type="text" id="nama" className="mt-2 p-2 w-full border rounded " placeholder='Masukkan Nama' />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-xl font-semibold">Email</label>
                                <input type="email" id="email" className="mt-2 p-2 w-full border rounded" placeholder="Masukan Email" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="hp" className="text-xl font-semibold">Nomor HP</label>
                                <input type="tel" id="hp" className="mt-2 p-2 w-full border rounded" placeholder="Masukan Nomor Hp"/>
                            </div>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="subjek" className="text-xl font-semibold">Subjek</label>
                                <input type="text" id="subjek" className="mt-2 p-2 w-full border rounded" placeholder="Masukan Subjek"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pesan" className="text-xl font-semibold">Pesan</label>
                                <textarea id="pesan" rows="4" className="mt-2 p-2 w-full border rounded" placeholder="Masukan Isi Pesan"></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded w-full"
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Info;