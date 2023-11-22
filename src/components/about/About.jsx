import React from 'react';

function About() {
  return (
    <div className="p-4 mb-1">
      <h1 className="text-4xl font-semibold mb-4 text-center">Tentang Kami</h1>
      <h3 className='text-xl mb-2'>Sobermart adalah aplikasi e-commerce yang dapat menghasilkan pendapatan. Dibawah naungan PT Solusi Bersama Rakyat, Sobermart didirikan pada tahun 2022.</h3>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Visi SOBERMART :</h3>
        <p>Menjadi perusahaan yang memberikan solusi kepada masyarakat untuk meningkatkan ekonomi.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Misi SOBERMART :</h3>
        <ul className="list-disc pl-6">
          <li>Menyelenggarakan pembekalan pada setiap member agar dapat lebih mudah meningkatkan penghasilan.</li>
          <li>Membentuk komunitas masyarakat yang solid.</li>
          <li>Meningkatkan perekonomian masyarakat melalui pendaftaran aplikasi SOBERMART.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
