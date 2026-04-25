import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainPage = lazy(() => import('./pages/MainPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const TypingPage = lazy(() => import('./pages/TypingPage'));
const AdditionalTypePage = lazy(() => import('./pages/AdditionalTypePage'));
const AdditionalAccuracyPage = lazy(() => import('./pages/AdditionalAccuracyPage'));
const AdditionalReactionPage = lazy(() => import('./pages/AdditionalReactionPage'));

export default function App() {
  return (
    <Suspense fallback={<div style={{ padding: '16px' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/typing" element={<TypingPage />} />
        <Route path="/additional/type" element={<AdditionalTypePage />} />
        <Route path="/additional/accuracy" element={<AdditionalAccuracyPage />} />
        <Route path="/additional/reaction" element={<AdditionalReactionPage />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </Suspense>
  );
}
