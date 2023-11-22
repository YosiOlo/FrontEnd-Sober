import React, { useState, useEffect } from "react";
import Select from "react-select";
import { authToken, getCity, postOngkir } from '../../utils/ApiConfig';

const CheckOut = () => {
    const [weight, setWeight] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    console.log(selectedCity);
    const [selectedCityTo, setSelectedCityTo] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [province, setProvince] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostCode] = useState("");

    const [ongkirResult, setOngkirResult] = useState(null);
    console.log(ongkirResult);

    useEffect(() => {
        const fetchData = async () => {
            const token = `Bearer ${authToken}`;
            const isLoggedIn = !!authToken;

            const headers = {
                'Authorization': token,
                'Content-Type': 'application/json',
            };

            if (isLoggedIn) {
                try {
                    const cityData = await getCity(headers);

                    const options = cityData.map(city => ({
                        value: city.city_id,
                        label: city.city_name
                    }));

                    setCityOptions(options);
                } catch (error) {
                    console.error('Error fetching city data:', error);
                }
            }
        };

        fetchData();
    }, []);

    const handleCityChange = selectedOption => {
        setSelectedCity(selectedOption);
    };

    const handleCityToChange = selectedOption => {
        setSelectedCityTo(selectedOption);
    };

    const handleWeightChange = event => {
        setWeight(event.target.value);
    };

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleNumberChange = event => {
        setNumber(event.target.value);
    };

    const handleProvinceChange = event => {
        setProvince(event.target.value);
    };

    const handleAddressChange = event => {
        setAddress(event.target.value);
    };

    const handlePostCodeChange = event => {
        setPostCode(event.target.value);
    };

    const handleSendClick = async () => {
        const token = `Bearer ${authToken}`;
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json',
        };
        if (selectedCity && selectedCityTo && weight) {
            try {
                const ongkirData = await postOngkir(
                    selectedCity.value,
                    selectedCityTo.value,
                    weight,
                    headers
                );
                setOngkirResult(ongkirData);
            } catch (error) {
                console.error("Error posting ongkir:", error);
            }
        } else {
            console.warn("Mohon lengkapi semua field sebelum mengirim.");
        }
    };


    return (
        <div>
            <div className="left-content form-checkout w-3/4">
                <div className="content lg:mx-32">
                    <h1>Form Checkout</h1>
                    <div className="name">
                        <h1>Nama Lengkap</h1>
                        <input type="text" placeholder="Name" className="input input-bordered input-info w-full" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-x-6 bg-slate-500">
                        <div className="flex-1">
                            <h1>Email</h1>
                            <input type="email" placeholder="Email" className="input input-bordered input-info w-full" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="flex-1">
                            <h1>No HP</h1>
                            <input type="number" placeholder="Number" className="input input-bordered input-info w-full" value={number} onChange={handleNumberChange} />
                        </div>
                    </div>


                    <div className="province">
                        <h1>Provinsi</h1>
                        <input type="text" placeholder="Province" className="input input-bordered input-info w-full max-w-xs" value={province} onChange={handleProvinceChange} />
                    </div>
                    <div className="address">
                        <h1>Address</h1>
                        <input type="text" placeholder="Address" className="input input-bordered input-info w-full max-w-xs" value={address} onChange={handleAddressChange} />
                    </div>
                    <div className="postCode">
                        <h1>Post Code</h1>
                        <input type="number" placeholder="Post Code" className="input input-bordered input-info w-full max-w-xs" value={postCode} onChange={handlePostCodeChange} />
                    </div>
                </div>


                <div className="form-check-ongkir">
                    <div className="cityNow">
                        <h1>City</h1>
                        <Select
                            value={selectedCity}
                            onChange={handleCityChange}
                            options={cityOptions}
                        />
                    </div>
                    <div className="cityTo">
                        <h1>City To</h1>
                        <Select
                            value={selectedCityTo}
                            onChange={handleCityToChange}
                            options={cityOptions}
                        />

                    </div>
                    <div className="weight">
                        <h1>Weight</h1>
                        <input type="number" placeholder="Weight in gram" value={weight} onChange={handleWeightChange} />
                    </div>
                    <div className="button-send">
                        <button onClick={handleSendClick}>Send</button>
                    </div>
                    {ongkirResult && (
                        <div className="ongkir-result">
                            <div className="destination">
                                <h2>Kota Pengirim:</h2>
                                <div className="flex flex-row">
                                    <h3>Dari Provinsi: </h3>
                                    <p>{ongkirResult.destination_details.province}</p>
                                </div>
                                <div className="flex flex-row">
                                    <h3>Dari Kota: </h3>
                                    <p>{ongkirResult.destination_details.city_name}</p>
                                </div>
                                <div className="flex flex-row">
                                    <h3>Kode Pos: </h3>
                                    <p>{ongkirResult.destination_details.postal_code}</p>
                                </div>
                            </div>
                            <div className="origin">
                                <h2>Kota Penerima:</h2>
                                <div className="flex flex-row">
                                    <h3>Ke Provinsi: </h3>
                                    <p>{ongkirResult.origin_details.province}</p>
                                </div>
                                <div className="flex flex-row">
                                    <h3>Ke Kota: </h3>
                                    <p>{ongkirResult.origin_details.city_name}</p>
                                </div>
                                <div className="flex flex-row">
                                    <h3>Kode Pos: </h3>
                                    <p>{ongkirResult.origin_details.postal_code}</p>
                                </div>
                            </div>

                            <div className="query">
                                <div className="kurir flex flex-row">
                                    <h2>Kurir :</h2>
                                    <p>{ongkirResult.query.courier}</p>
                                </div>
                                <div className="destination flex flex-row">
                                    <h2>Destinasi sampai:</h2>
                                    <p>{ongkirResult.query.destination} Hari</p>
                                </div>
                                <div className="weight flex flex-row">
                                    <h2>Berat:</h2>
                                    <p>{ongkirResult.query.weight} gram</p>
                                </div>


                            </div>
                            <div className="option-kurir">
                                <h2>Biaya Kirim:</h2>
                                {ongkirResult.results.map((result, index) => (
                                    <div key={index} className="option-kurir">

                                        <div className="flex flex-row">
                                            <h3>Kurir: </h3>
                                            <p>{result.code}</p>
                                        </div>
                                        {result.costs.map((item, i) => (
                                            <div key={i} className="flex flex-col">
                                                <div className="flex flex-row bg-red-200">
                                                    <h3>Harga: </h3>
                                                    <p>{item.cost[0].value}</p>
                                                </div>
                                                <div className="flex flex-row">
                                                    <h3>Estimasi: </h3>
                                                    <p>{item.cost[0].etd} Hari</p>
                                                </div>
                                                <div className="description bg-slate-300">
                                                    <h3>Deskripsi: </h3>
                                                    <p>{item.service} - {item.description}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </div>

                        </div>

                    )}
                </div>
                <div className="right-content w-1/4"></div>


            </div>



        </div>
    );
};

export default CheckOut;
