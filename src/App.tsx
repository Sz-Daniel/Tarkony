import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Items } from './pages/Items';
import { ItemSingle } from './pages/ItemSingle';
import { MainLayout } from './pages/MainLayout';
import { Worth } from './pages/Worth';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Items />} />
          <Route path="/item/:normalizeName" element={<ItemSingle />} />
          <Route path="/worth" element={<Worth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
