import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/ApiConfig';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [referralCode, setReferralCode] = useState('');
    const [isValidReferral, setIsValidReferral] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleUseremailChange = (event) => {
        setUseremail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        // Memeriksa kesesuaian kata sandi dan ulangi kata sandi
        if (repassword && event.target.value !== repassword) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
    };

    const handleRepasswordChange = (event) => {
        setRepassword(event.target.value);
        // Memeriksa kesesuaian kata sandi dan ulangi kata sandi
        if (password && event.target.value !== password) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
    };

    const handleReferralCodeChange = (event) => {
        setReferralCode(event.target.value);
        setIsValidReferral(false);
    };

    const checkReferralValidity = () => {
        if (referralCode === 'dummy123') {
            setIsValidReferral(true);
        } else {
            setIsValidReferral(false);
        }
    };

    const handlePackageChange = (event) => {
        setSelectedPackage(event.target.value);
    };

    

    const handleRegister = () => {

        if (password !== repassword) {
            setPasswordMatchError(true);
            return;
        }

        const isSuccess = registerUser(username, useremail, password, repassword, referralCode, selectedPackage);

        if (isSuccess) {
            navigate('/login');
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 mb-4">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="text-2xl font-semibold mb-8 justify-center text-center border-b-2">
                    <h6 className='text-xl font-semibold mb-1'>Daftar Akun Baru</h6>
                </div>
                <div>
                    <div className="mb-4 mt-10">
                        <label className="block text-sm font-medium text-gray-700">Nama Pengguna</label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full border rounded"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder='Masukkan Nama Pengguna'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Alamat Email</label>
                        <input
                            type="email"
                            className="mt-1 p-2 w-full border rounded"
                            value={useremail}
                            onChange={handleUseremailChange}
                            placeholder='Masukkan Alamat Email'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="mt-1 p-2 w-full border rounded"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder='Masukkan Kata Sandi'
                            />
                            <button
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Ulangi Kata Sandi</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`mt-1 p-2 w-full border rounded ${passwordMatchError ? 'border-red-500' : ''}`}
                                value={repassword}
                                onChange={handleRepasswordChange}
                                placeholder='Masukkan Ulang Kata Sandi'
                            />
                            <button
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                            </button>
                        </div>
                        {passwordMatchError && <p className="text-red-500 mt-1">Kata Sandi tidak cocok.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kode Referral (opsional)</label>
                        <input
                            type="text"
                            className={`mt-1 p-2 w-full border rounded ${isValidReferral ? 'border-green-500' : 'border-red-500'}`}
                            value={referralCode}
                            onChange={handleReferralCodeChange}
                            placeholder='Masukkan Kode Referral (jika ada)'
                        />
                        <button
                            className="mt-1 bg-blue-500 text-white p-2 rounded"
                            onClick={checkReferralValidity}
                        >
                            Periksa Kode
                        </button>
                        {isValidReferral ? (
                            <p className="text-green-500 mt-1">Kode Referral valid</p>
                        ) : (
                            <p className="text-red-500 mt-1">Kode Referral tidak valid</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Paket Pelanggan</label>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="packageA"
                                    name="package"
                                    value="1"
                                    checked={selectedPackage === '1'}
                                    onChange={handlePackageChange}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor="packageA" className="ml-1 hover:text-blue-600 cursor-pointer">Warrior</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="packageB"
                                    name="package"
                                    value="2"
                                    checked={selectedPackage === '2'}
                                    onChange={handlePackageChange}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor="packageB" className="ml-1 hover:text-blue-600 cursor-pointer">Royal Warrior</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="packageC"
                                    name="package"
                                    value="11"
                                    checked={selectedPackage === '11'}
                                    onChange={handlePackageChange}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor="packageC" className="ml-1 hover:text-blue-600 cursor-pointer">Commander</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="packageD"
                                    name="package"
                                    value="12"
                                    checked={selectedPackage === '12'}
                                    onChange={handlePackageChange}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor="packageD" className="ml-1 hover:text-blue-600 cursor-pointer">Princess</label>
                            </div>
                        </div>
                    </div>


                    <button
                        className={`bg-blue-500 text-white p-2 rounded w-full mt-4 ${isValidReferral && !passwordMatchError ? '' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={handleRegister}
                        disabled={!isValidReferral || passwordMatchError}
                    >
                        Daftar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
