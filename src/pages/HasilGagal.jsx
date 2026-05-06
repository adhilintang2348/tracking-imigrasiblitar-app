import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../App.css';

// IMPORT GAMBAR YANG SAMA PERSIS DENGAN HALAMAN PASPOR
import batikBg from '../assets/batik-background.png';
import logoKemenimpas from '../assets/logo-kemenimpas.png';
import logoImigrasi from '../assets/logo-imigrasi.png';
import mapImg from '../assets/map-location.png';
import batikHeader from '../assets/batik-header.jpeg';

function HasilGagal() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil state bahasa dari Home (jika ada), default ke 'id'
  const initialLang = location.state?.lang || 'id';
  const [lang, setLang] = useState(initialLang);

  // KAMUS TERJEMAHAN
  const text = {
    id: {
      headerTitle: "CEK STATUS LAYANAN PERMOHONAN KEIMIGRASIAN",
      btnBack: "← Kembali",
      errorTitle: "Nomor Permohonan Anda tidak ditemukan",
      errorMessage: "Pastikan kembali bahwa nomor permohonan yang Anda masukkan sudah sesuai, serta Anda telah menyelesaikan proses verifikasi dan penginputan data di Kantor Imigrasi Kelas II Non TPI Blitar.",
      footerAddress: "Jl. Mastrip No.45, Srengat II, Srengat, Kec. Srengat, Kabupaten Blitar, Jawa Timur 66152",
      footerMap: "Buka di Google Maps"
    },
    en: {
      headerTitle: "CHECK IMMIGRATION SERVICE APPLICATION STATUS",
      btnBack: "← Back",
      errorTitle: "Application Number Not Found",
      errorMessage: "Please ensure that the application number you entered is correct, and that you have completed the verification and data entry process at the Class II Non TPI Immigration Office of Blitar.",
      footerAddress: "Jl. Mastrip No.45, Srengat II, Srengat, Srengat District, Blitar Regency, East Java 66152",
      footerMap: "Open in Google Maps"
    }
  };

  const t = text[lang];

  return (
    <div className="app-container">
      
      {/* =========================================================
          1. HEADER DENGAN PILIHAN BAHASA
      ========================================================= */}
      <header className="navbar" style={{ backgroundImage: `url(${batikBg})` }}>
        <div className="navbar-overlay"></div> 
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <img src={logoKemenimpas} alt="Logo Kemenimpas" className="nav-logo" />
            <img src={logoImigrasi} alt="Logo Imigrasi" className="nav-logo" />
          </div>
        </Link>

        {/* TOMBOL PENGUBAH BAHASA */}
        <div className="lang-switcher">
          <button 
            className={`lang-btn ${lang === 'id' ? 'active' : ''}`} 
            onClick={() => setLang('id')}
          >ID</button>
          <span className="lang-divider">|</span>
          <button 
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
            onClick={() => setLang('en')}
          >EN</button>
        </div>
      </header>

      <main className="result-page">
        {/* BANNER BATIK BAWAH NAVBAR */}
        <div 
          className="header-banner" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(246, 235, 236, 0.85), rgba(230, 234, 245, 0.85)), url(${batikHeader})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <h2>{t.headerTitle}</h2>
        </div>

        {/* =========================================================
            2. BAGIAN TENGAH: KARTU GAGAL 
        ========================================================= */}
        <div className="container" style={{ padding: '0 5%', marginBottom: '60px' }}>
          
          <div style={{ marginTop: '20px', marginBottom: '30px' }}>
            <Link to="/">
              <button className="btn-kembali">{t.btnBack}</button>
            </Link>
          </div>

          <div className="gagal-card">
            <div className="gagal-card-header">
              <div className="gagal-icon-circle">!</div>
              <h2>{t.errorTitle}</h2>
            </div>
            
            <div className="gagal-card-body">
              <p>{t.errorMessage}</p>
            </div>
          </div>

        </div>
      </main>

      {/* =========================================================
          3. FOOTER 
      ========================================================= */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logos">
              <img src={logoKemenimpas} alt="Logo Kemenimpas" className="footer-logo" />
              <img src={logoImigrasi} alt="Logo Imigrasi" className="footer-logo" />
            </div>
            <p>
              {t.footerAddress}<br/>
              <a href="tel:0342554759" className="footer-link">(0342) 554759</a><br/>
              <a href="mailto:kanimblitar@gmail.com" className="footer-link">kanimblitar@gmail.com</a>
            </p>

            {/* MEDIA SOSIAL */}
            <div className="footer-socials">
              <a href="https://www.instagram.com/imigrasi_blitar/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/kanimblitar/?locale=id_ID" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/ImigrasiBlitar" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCXIIlpwbpHAwy4jSXquLH1A" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-map">
            <a 
              href="https://maps.app.goo.gl/QVMhArZ3xduwcRFfA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="map-link"
              style={{ display: 'block' }}
            >
              <div className="map-container">
                <img src={mapImg} alt="Peta Lokasi" className="map-image" />
                <div className="map-overlay">
                  <span>{t.footerMap}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2026 Imigrasi Blitar</p>
        </div>
      </footer>
    </div>
  );
}

export default HasilGagal;