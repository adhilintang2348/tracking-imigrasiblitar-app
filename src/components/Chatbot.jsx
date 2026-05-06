import React, { useState, useRef, useEffect } from 'react';
import '../App.css'; 
import avatarPetugas from '../assets/petugas-imigrasi.png'; 

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Halo! Saya Mita, asisten virtual Imigrasi Blitar. / Hello! I am Mita, the virtual assistant for the Blitar Immigration Office. Ada yang bisa saya bantu? / How can I help you today?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processMessage = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey || apiKey === 'undefined') {
        throw new Error("API Key kosong. File .env belum terbaca.");
      }

      const promptText = `
        Instruksi: Kamu adalah Mita, Asisten Virtual Kantor Imigrasi Kelas II Non TPI Blitar. 
        Jawab pertanyaan warga dengan ramah, informatif, sangat singkat, dan profesional.
        
        ATURAN BAHASA (SANGAT PENTING): 
        Deteksi bahasa yang digunakan oleh pengguna. Jika pengguna bertanya dalam Bahasa Indonesia, jawab dengan Bahasa Indonesia. Jika pengguna bertanya dalam Bahasa Inggris (English), kamu WAJIB menjawab dengan Bahasa Inggris yang natural, dan terjemahkan nama layanan ke dalam istilah bahasa Inggris yang tepat (misalnya: Izin Tinggal Terbatas menjadi Limited Stay Permit / ITAS).

        INFORMASI TARIF PNBP IMIGRASI TERBARU:
        1. PASPOR & DOKUMEN PERJALANAN WNI:
        - E-Paspor (5 Tahun): Rp 650.000
        - E-Paspor (10 Tahun): Rp 950.000
        - Layanan Percepatan Paspor (Selesai 1 Hari): Rp 1.000.000 (di luar biaya paspor)
        - Denda Paspor Rusak: Rp 500.000
        - Denda Paspor Hilang: Rp 1.000.000
        - Surat Perjalanan Laksana Paspor (SPLP) WNI: Rp 100.000

        2. IZIN TINGGAL KUNJUNGAN (ITK):
        - Paling lama 7 Hari: Rp 250.000
        - Paling lama 14 Hari: Rp 350.000
        - Paling lama 30 Hari: Rp 500.000
        - Paling lama 60 Hari: Rp 1.000.000
        - Paling lama 90 Hari: Rp 1.500.000
        - Paling lama 180 Hari: Rp 2.000.000

        3. IZIN MASUK KEMBALI (RE-ENTRY PERMIT):
        - Paling Lama 30 Hari: Rp 300.000 | 60 Hari: Rp 400.000 | 90 Hari: Rp 500.000 | 6 Bulan: Rp 750.000
        - Paling Lama 1 Tahun: Rp 1.500.000 | 2 Tahun: Rp 2.000.000 | 5 Tahun: Rp 3.500.000 | 10 Tahun: Rp 5.000.000
        - Tidak Terbatas: Rp 8.000.000

        4. IZIN TINGGAL TERBATAS (ITAS):
        - Paling Lama 30 Hari: Rp 500.000 | 60 Hari: Rp 1.000.000 | 90 Hari: Rp 1.500.000 | 6 Bulan: Rp 2.000.000
        - Paling Lama 1 Tahun: Rp 3.000.000 | 2 Tahun: Rp 5.000.000 | 5 & 10 Tahun: Rp 7.000.000

        5. IZIN TINGGAL TETAP (ITAP) & EPO:
        - ITAP 5 Tahun: Rp 7.000.000 | 10 Tahun: Rp 12.000.000 | Tidak Terbatas: Rp 15.000.000
        - Exit Permit Only (EPO): Rp 100.000

        6. LAYANAN LAINNYA:
        - KPP APEC (Baru/Pengganti): Rp 2.500.000
        - Afidavit Anak Berkewarganegaraan Ganda: Rp 500.000
        - Ganti Kartu Izin Tinggal Rusak/Hilang: Rp 500.000
        - Smart Card: Rp 1.500.000

        Pertanyaan warga: ${text}
      `;

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      };

      // SOLUSI FINAL: Kita gunakan nama model "gemini-2.5-flash" persis seperti di gambar Anda!
      // Kita gunakan v1beta karena versi 2.5 biasanya masih berada di jalur beta
      let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      
      let response = await fetch(url, requestOptions);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Akses ditolak oleh server Google.");
      }

      // Ambil teks balasannya
      const botReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);

    } catch (error) {
      console.error("Gagal total:", error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Mohon maaf, terjadi kendala teknis: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button className="floating-cs-btn avatar-mode" onClick={() => setIsOpen(true)}>
          <img src={avatarPetugas} alt="Petugas" className="bot-avatar-img" />
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-profile">
              <div className="chatbot-avatar">
                <img src={avatarPetugas} alt="Avatar" />
              </div>
              <div className="chatbot-name">
                <strong>Asisten Imigrasi</strong>
                <small>Online</small>
              </div>
            </div>
            <button className="close-chat-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-block">
                <div className={`chat-bubble-wrapper ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="chat-avatar-small">
                      <img src={avatarPetugas} alt="Avatar" />
                    </div>
                  )}
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
               <div className="chat-block">
                 <div className="chat-bubble-wrapper bot">
                   <div className="chat-avatar-small">
                     <img src={avatarPetugas} alt="Avatar" />
                   </div>
                   <div className="chat-bubble bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                     Sedang berpikir...
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Tanya seputar paspor..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && processMessage(inputValue)}
              disabled={isLoading}
            />
            <button onClick={() => processMessage(inputValue)} className="send-btn" disabled={isLoading}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;