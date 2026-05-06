import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HalamanPaspor from './pages/HalamanPaspor'; // 
import HasilGagal from './pages/HasilGagal'; //
import Chatbot from './components/Chatbot'; // 
import HalamanIzinTinggal from './pages/HalamanIzinTinggal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/halaman-paspor" element={<HalamanPaspor />} />
        <Route path="/hasil-gagal" element={<HasilGagal />} />
        <Route path="/izin-tinggal" element={<HalamanIzinTinggal/>} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;