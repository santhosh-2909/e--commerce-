import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import SocialProofToast from './SocialProofToast';
import QuickViewModal from '../product/QuickViewModal';
import AuthModal from '../account/AuthModal';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SocialProofToast />
      <QuickViewModal />
      <AuthModal />
    </div>
  );
}
