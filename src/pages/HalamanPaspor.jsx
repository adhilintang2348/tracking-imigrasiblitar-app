import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../App.css';
import batikBg from '../assets/batik-background.png';
import logoKemenimpas from '../assets/logo-kemenimpas.png';
import logoImigrasi from '../assets/logo-imigrasi.png';
import mapImg from '../assets/map-location.png';
import batikHeader from '../assets/batik-header.jpeg';

function HalamanPaspor() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataPemohon = location.state?.dataPemohon;
  const initialLang = location.state?.lang || 'id';
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    if (!dataPemohon) navigate('/');
  }, [dataPemohon, navigate]);

  if (!dataPemohon) return null;

  const text = {
    id: {
      headerTitle: "CEK STATUS LAYANAN PERMOHONAN KEIMIGRASIAN",
      btnBack: "← Kembali",
      appNumber: "No. Permohonan",
      dateSubmit: "Tanggal Pengajuan",
      dateEst: "Estimasi Selesai",
      statusHeader: "Status Permohonan",
      statusSub: "Lacak progres permohonan Anda secara real-time",
      infoTitle: "Informasi Saat Ini",
      infoActive: "Status Aktif:",
      nextInstruction: "Instruksi Selanjutnya:",
      processingLabel: "Sedang Diproses",
      footerAddress: "Jl. Mastrip No.45, Srengat II, Srengat, Kec. Srengat, Kabupaten Blitar, Jawa Timur 66152",
      footerMap: "Buka di Google Maps",
      stepsPaspor: ["Pengajuan Dokumen", "Verifikasi & Biometrik", "Paspor sedang dicetak", "Paspor Siap Diambil"],
      descPrinting: "Paspor Anda sedang dalam tahap pencetakan. Harap menunggu hingga proses selesai dan cek status secara berkala melalui laman ini.",
      resultNotePaspor: "Silahkan datang ke kantor Imigrasi Blitar dengan membawa formulir bukti pengantar pembayaran & identitas diri."
    },
    en: {
      headerTitle: "CHECK IMMIGRATION SERVICE APPLICATION STATUS",
      btnBack: "← Back",
      appNumber: "Application No.",
      dateSubmit: "Submission Date",
      dateEst: "Estimated Completion",
      statusHeader: "Application Status",
      statusSub: "Track your application progress in real-time",
      infoTitle: "Current Information",
      infoActive: "Active Status:",
      nextInstruction: "Next Instruction:",
      processingLabel: "In Progress",
      footerAddress: "Jl. Mastrip No.45, Srengat II, Srengat, Blitar Regency, East Java 66152",
      footerMap: "Open in Google Maps",
      stepsPaspor: ["Document Submission", "Verification & Biometrics", "Passport Printing", "Ready for Pickup"],
      descPrinting: "Your passport is currently being printed. Please wait for the process to complete and check your status periodically through this page.",
      resultNotePaspor: "Please visit the Blitar Immigration Office bringing your payment receipt form and identification card."
    }
  };

  const t = text[lang];

  const translateStatus = (status, language) => {
    if (language === 'id') return status;
    const mapping = {
      "Pengajuan Dokumen": "Document Submission",
      "Verifikasi & Biometrik": "Verification & Biometrics",
      "Paspor sedang dicetak": "Passport Printing",
      "Paspor Siap Diambil": "Passport Ready for Pickup",
      "E-Paspor 5 Tahun": "E-Passport 5 Years",
      "E-Paspor 10 Tahun": "E-Passport 10 Years",
      "Paspor Biasa 5 Tahun": "Standard Passport 5 Years",
      "Paspor Biasa 10 Tahun": "Standard Passport 10 Years"
    };
    return mapping[status] || status;
  };

  const activeStepsID = text.id.stepsPaspor;
  const displaySteps = t.stepsPaspor;
  const currentStepIndex = activeStepsID.findIndex(s => s.toLowerCase().trim() === dataPemohon.status_aktif.toLowerCase().trim());
  const safeCurrentIndex = currentStepIndex !== -1 ? currentStepIndex : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="app-container">
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

      <main className="result-page">
        <div className="header-banner" style={{ backgroundImage: `linear-gradient(to right, rgba(246, 235, 236, 0.85), rgba(230, 234, 245, 0.85)), url(${batikHeader})`, backgroundSize: 'cover' }}>
          <h2>{t.headerTitle}</h2>
        </div>
        <div className="container" style={{ padding: '0 5%' }}>
          <Link to="/"><button className="btn-kembali">{t.btnBack}</button></Link>
          <div className="user-info-card">
            <div className="user-main">
              <span className="label-type green-label">{translateStatus(dataPemohon.jenis_dokumen, lang)}</span>
              <h3>{dataPemohon.nama}</h3>
              <p>{t.appNumber} : {dataPemohon.no_permohonan}</p>
            </div>
          </div>
          <div className="result-grid">
            <div className="status-tracker-card card">
              <h4>{t.statusHeader}</h4>
              <div className="stepper">
                {displaySteps.map((step, index) => (
                  <div key={index} className={`step ${index <= safeCurrentIndex ? 'completed' : ''}`}>
                    <div className="circle">{index <= safeCurrentIndex ? '✓' : index + 1}</div>
                    <div className="step-content">
                      <span className="step-text">{step}</span>
                      {index === safeCurrentIndex && index < displaySteps.length - 1 && (
                        <div className="processing-badge"><span className="badge-dot"></span>{t.processingLabel}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="info-side-card card">
              <div className="info-header"><strong>{t.infoTitle}</strong></div>
              <div className="info-body">
                <small>{t.infoActive}</small>
                <h4>{translateStatus(dataPemohon.status_aktif, lang)}</h4>
                <div className="instruksi-box">
                  <strong>{t.nextInstruction}</strong>
                  <p>{safeCurrentIndex === displaySteps.length - 1 ? t.resultNotePaspor : (safeCurrentIndex === 2 ? t.descPrinting : "Mohon menunggu pembaruan sistem secara berkala.")}</p>
                </div>
              </div>
            </div>
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
            <p>{t.footerAddress}<br/>(0342) 554759 | kanimblitar@gmail.com</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/imigrasi_blitar/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="https://www.facebook.com/kanimblitar/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/ImigrasiBlitar" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-x-twitter"></i></a>
              <a href="https://www.youtube.com/@imigrasiblitar" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
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
      </footer>
    </motion.div>
  );
}

export default HalamanPaspor;