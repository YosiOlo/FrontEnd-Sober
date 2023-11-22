import React, { useState } from 'react';
import Swal from 'sweetalert2';

function SearchMembership() {
    const [referralCode, setReferralCode] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);

    const handleCodeChange = (e) => {
        setReferralCode(e.target.value);
    };

    const checkReferralCode = () => {
        // Di sini, Anda dapat memeriksa apakah kode referal sesuai dengan yang ada.
        // Misalnya, dengan melakukan permintaan ke server atau validasi lainnya.

        // Contoh sederhana: Jika kode adalah "12345", maka dianggap valid.
        if (referralCode === '12345') {
            setIsValidCode(true);
            Swal.fire('Kode Referal Valid', '', 'success');
        } else {
            setIsValidCode(false);
            Swal.fire('Kode Referal Tidak Valid', '', 'error');
        }
    };

    return (
        <div className="SearchMembership">
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Masukkan Kode Referal"
                    value={referralCode}
                    onChange={handleCodeChange}
                    className="border p-2 mr-2"
                />
                <button onClick={checkReferralCode} className="bg-blue-500 text-white p-2 rounded">Cek Kode</button>
            </div>
            {/* <div className="Refereal flex justify-center">
                {isValidCode ? (
                    <p className="text-green-500 mt-2">Kode Referal Valid.</p>
                ) : (
                    <p className="text-red-500 mt-2">Kode Referal Tidak Valid.</p>
                )}
            </div> */}
        </div>
    );
}

export default SearchMembership;
