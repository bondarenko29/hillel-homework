import MainLayout from '@/components/layouts/mainLayout';
import HomePage from '@/pages/Home';
import HotelsListPage from '@/pages/HotelsList';
import HotelDetailsPage from '@/pages/HotelDetails';
import AboutPage from '@/pages/About';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="hotels" element={<HotelsListPage />} />
        <Route path="hotels/:id" element={<HotelDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
