import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import batikBg from '../assets/batik-background.png';
import batikUtama from '../assets/batik-utama.png';
import logoKemenimpas from '../assets/logo-kemenimpas.png'; 
import logoImigrasi from '../assets/logo-imigrasi.png';
import mapImg from '../assets/map-location.png'; 
import { supabase } from '../supabaseClient';

function Home() {
  const [jenisLayanan, setJenisLayanan] = useState('paspor');
  const [nomorPermohonan, setNomorPermohonan] = useState('');
  const [lang, setLang] = useState('id'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const text = {
    id: {
      welcome: "SELAMAT DATANG",
      office: "DI KANTOR IMIGRASI KELAS II NON TPI BLITAR",
      officeMobileTop: "KANTOR IMIGRASI",
      officeMobileBottom: "KELAS II NON TPI BLITAR",
      desc: "Gunakan layanan ini untuk mengecek status permohonan Paspor RI / Izin Tinggal Keimigrasian pada Kantor Imigrasi Kelas II Non TPI Blitar",
      title: "CEK STATUS PERMOHONAN LAYANAN KEIMIGRASIAN",
      subtitle: "Masukkan nomor permohonan paspor atau izin tinggal Anda untuk melacak status secara real-time",
      tabPaspor: "Paspor (WNI)",
      tabIzin: "Izin Tinggal (WNA)",
      placeholderPaspor: "Contoh: 11111",
      placeholderIzin: "Contoh: 12345679",
      btnSearch: "Cari Status Permohonan",
      loadingTxt: "Mencari data...",
      errEmpty: "Harap isi bidang ini", // Peringatan jika kosong
      errDigits: "Nomor permohonan harus berupa angka saja",
      alertTitle: "Perhatian",
      alertDesc: "Fitur ini hanya dapat digunakan bagi pemohon yang telah melakukan proses verifikasi di Kantor Imigrasi Kelas II Non TPI Blitar",
      footerAddress: "Jl. Mastrip No.45, Srengat II, Srengat, Kec. Srengat, Kabupaten Blitar, Jawa Timur 66152",
      footerMap: "Buka di Google Maps"
    },
    en: {
      welcome: "WELCOME",
      office: "TO IMMIGRATION OFFICE CLASS II NON TPI BLITAR",
      officeMobileTop: "BLITAR IMMIGRATION OFFICE",
      officeMobileBottom: "CLASS II NON TPI BLITAR",
      desc: "Use this service to check the status of your application",
      title: "CHECK APPLICATION STATUS",
      subtitle: "Enter your application number to track the status in real-time",
      tabPaspor: "Passport (Indonesian)",
      tabIzin: "Residence Permit (Foreigner)",
      placeholderPaspor: "Example: 11111",
      placeholderIzin: "Example: 12345679",
      btnSearch: "Track Status",
      loadingTxt: "Searching...",
      errEmpty: "Please fill out this field", // Peringatan jika kosong
      errDigits: "Application number must be digits only",
      alertTitle: "Attention",
      alertDesc: "This feature can only be used by applicants who have completed the verification process",
      footerAddress: "Jl. Mastrip No.45, Srengat II, Srengat, Blitar Regency, East Java 66152",
      footerMap: "Open in Google Maps"
    }
  };

  const t = text[lang];

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val !== '' && !/^\d+$/.test(val)) {
      setError(t.errDigits);
    } else {
      setError('');
      setNomorPermohonan(val);
    }
  };

  const handleCari = async (e) => {
    e.preventDefault();

    // 1. CEK JIKA KOSONG
    if (!nomorPermohonan.trim()) {
      setError(t.errEmpty);
      return;
    }

    if (error) return;
    setIsLoading(true);

    try {
      const { data, error: dbError } = await supabase
        .from('permohonan')
        .select('*')
        .eq('no_permohonan', nomorPermohonan)
        .eq('kategori_layanan', jenisLayanan)
        .single();

      setTimeout(() => {
        setIsLoading(false);
        if (dbError || !data) {
          // 2. KEMBALIKAN NAVIGASI KE HALAMAN GAGAL
          navigate('/hasil-gagal', { state: { lang: lang } });
        } else {
          const path = jenisLayanan === 'paspor' ? '/halaman-paspor' : '/izin-tinggal';
          navigate(path, { state: { dataPemohon: data, lang } });
        }
      }, 800);
    } catch (err) {
      setIsLoading(false);
      navigate('/hasil-gagal', { state: { lang: lang } });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="app-container">
      <header className="navbar" style={{ backgroundImage: `url(${batikBg})` }}>
        <div className="navbar-overlay"></div> 
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <img src={logoKemenimpas} alt="Logo" className="nav-logo" />
            <img src={logoImigrasi} alt="Logo" className="nav-logo" />
          </div>
        </Link>
        <div className="lang-switcher">
          <button className={`lang-btn ${lang === 'id' ? 'active' : ''}`} onClick={() => setLang('id')}>ID</button>
          <span className="lang-divider">|</span>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>
      </header>

      <section className="hero-section">
  <div className="hero-responsive-wrapper">
    <div className="hero-content">
      <div className="hero-text">
  {/* Teks versi panjang (hanya muncul di laptop) */}
  <h1 className="desktop-only">{t.welcome}</h1>
  <h2 className="desktop-only">{t.office}</h2>
  
  {/* Teks versi pendek (hanya muncul di HP) */}
  <h2 className="mobile-only">
  <span>{t.officeMobileTop}</span>
  <span>{t.officeMobileBottom}</span>
</h2>
  
  {/* Teks deskripsi */}
  <p className="hero-desc">{t.desc}</p>
</div>
    </div>
    <div className="hero-decoration-wrapper">
      <div className="small-yellow-triangle"></div>
      <div className="batik-corner-main" style={{ backgroundImage: `url(${batikUtama})` }}></div>
    </div>
  </div>
</section>

      <main className="search-section">
        <div className="search-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div className="search-card">
          <div className="tabs">
            <button className={`tab-btn ${jenisLayanan === 'paspor' ? 'active' : ''}`} onClick={() => setJenisLayanan('paspor')}>
              <span className="dot dot-green"></span> {t.tabPaspor}
            </button>
            <button className={`tab-btn ${jenisLayanan === 'izintinggal' ? 'active' : ''}`} onClick={() => setJenisLayanan('izintinggal')}>
              <span className="dot dot-orange"></span> {t.tabIzin}
            </button>
          </div>

          <form onSubmit={handleCari} className="search-form">
            <input 
              type="text" 
              className={`search-input ${error ? 'input-error' : ''}`}
              placeholder={jenisLayanan === 'paspor' ? t.placeholderPaspor : t.placeholderIzin}
              value={nomorPermohonan}
              onChange={handleInputChange} 
            />
            
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="error-message">
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" className="submit-btn" disabled={isLoading || !!error}>
              {isLoading ? (
                <div className="btn-loading-content">
                  <div className="spinner-small"></div>
                  <span>{t.loadingTxt}</span>
                </div>
              ) : t.btnSearch}
            </button>
          </form>

          <div className="alert-box">
            <div className="alert-icon">⚠️</div>
            <div className="alert-text"><strong>{t.alertTitle}</strong><p>{t.alertDesc}</p></div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logos">
              <img src={logoKemenimpas} alt="Logo" className="footer-logo" />
              <img src={logoImigrasi} alt="Logo" className="footer-logo" />
            </div>
            <p>
  {t.footerAddress}
  <br/>
  <a href="tel:0342554759" className="footer-link">(0342) 554759</a>
  <br/>
  <a href="mailto:kanimblitar@gmail.com" className="footer-link">kanimblitar@gmail.com</a>
</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/imigrasi_blitar/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="https://www.facebook.com/kanimblitar/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/ImigrasiBlitar" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-x-twitter"></i></a>
              <a href="https://www.youtube.com/channel/UCXIIlpwbpHAwy4jSXquLH1A" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-map">
            <a href="https://maps.app.goo.gl/QVMhArZ3xduwcRFfA" target="_blank" rel="noopener noreferrer">
              <div className="map-container">
                <img src={mapImg} alt="Map" className="map-image" />
                <div className="map-overlay"><span>{t.footerMap}</span></div>
              </div>
            </a>
          </div>
        </div>
        <div className="footer-bottom"><p>Copyright © 2026 Imigrasi Blitar</p></div>
      </footer>
    </motion.div>
  );
}

export default Home;