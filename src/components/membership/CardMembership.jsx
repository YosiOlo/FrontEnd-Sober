import React, { useState, useEffect } from 'react';
import { BASE_URL, memberShip } from '../../utils/ApiConfig';

function CardMembership() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await memberShip();
        setMembers(data);
        console.log('Status Keanggotaan:', data);
      } catch (error) {
        console.error('Kesalahan saat memeriksa status keanggotaan:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Card-Membership grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 ">
      {members.map((member) => (
        <div key={member.id} className="card">
          <img src={"https://kuro.asrofur.me/sober/"+member.image} alt={member.name} />
          <h2>{member.name}</h2>
          <p>{member.description}</p>
          <p>Keuntungan hingga {member.fee_commissions}%</p>
          <p>Nominal: Rp {member.nominal}</p>
        </div>
      ))}
    </div>
  );
}

export default CardMembership;
