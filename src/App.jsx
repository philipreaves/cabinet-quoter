import { Routes, Route } from 'react-router-dom';
import Configurator from './pages/Configurator';
import CabinetEntry from './pages/CabinetEntry';
import QuoteResult from './pages/QuoteResult';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Configurator />} />
      <Route path="/entry" element={<CabinetEntry />} />
      <Route path="/quote" element={<QuoteResult />} />
    </Routes>
  );
}

export default App;
