import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layout/Layout';
import { Items } from '../pages/Items';
import { ItemSingle } from '../pages/ItemSingle';
import { Worth } from '../pages/Worth';
import { Mod } from '../pages/Mod';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Items />} />
          <Route path="/item/:normalizeName" element={<ItemSingle />} />
          <Route path="/worth" element={<Worth />} />
          <Route path="/mod" element={<Mod />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
