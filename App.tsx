import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import useBusinessData from './hooks/useBusinessData';
import type { View, SaleItem } from './types';

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import AiChatbot from './components/AiChatbot';
import Footer from './components/Footer';
import ModuleView from './components/ModuleView'; // Import the new dynamic view handler
import PointOfSale from './components/PointOfSale';
import Reports from './components/Reports';
import Suppliers from './components/Suppliers';

const App: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { currentUser } = useAuth();
  const businessData = useBusinessData();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  const [uiPreferences, setUiPreferences] = useState(() => {
    const saved = localStorage.getItem('uiPreferences');
    return saved ? JSON.parse(saved) : { showRevenueCard: true, showAiSuggestionBox: true };
  });

  const updateUiPreference = (key: string, value: boolean) => {
    setUiPreferences((prev: any) => {
      const newState = { ...prev, [key]: value };
      localStorage.setItem('uiPreferences', JSON.stringify(newState));
      return newState;
    });
  };

  // --- POS State Lifted Up ---
  const [posCart, setPosCart] = useState<SaleItem[]>([]);
  const [posDiscount, setPosDiscount] = useState('');
  const [posDiscountType, setPosDiscountType] = useState<'percentage' | 'fixed'>('fixed');
  
  const clearPosCart = () => {
      setPosCart([]);
      setPosDiscount('');
      setPosDiscountType('fixed');
  };
  // --- End of Lifted State ---

  if (!currentUser) {
    return isLoginView
      ? <LoginPage onSwitchToSignUp={() => setIsLoginView(false)} />
      : <SignUpPage onSwitchToLogin={() => setIsLoginView(true)} />;
  }
  
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
      case 'products':
        return <ModuleView view={currentView} businessData={businessData} uiPreferences={uiPreferences} />;
      case 'pos':
        return <PointOfSale 
                  {...businessData} 
                  currentUser={currentUser}
                  cart={posCart}
                  setCart={setPosCart}
                  discount={posDiscount}
                  setDiscount={setPosDiscount}
                  discountType={posDiscountType}
                  setDiscountType={setPosDiscountType}
                  clearCart={clearPosCart}
                />;
      case 'reports':
        return <Reports {...businessData} />;
      case 'suppliers':
        return <Suppliers {...businessData} />;
      case 'ai_chatbot':
        return <AiChatbot {...businessData} />;
      case 'settings':
        return <Settings 
                    showRevenueCard={uiPreferences.showRevenueCard} 
                    onToggleRevenueCard={() => updateUiPreference('showRevenueCard', !uiPreferences.showRevenueCard)}
                    clearSalesData={businessData.clearSalesData}
                    showAiSuggestionBox={uiPreferences.showAiSuggestionBox}
                    onToggleAiSuggestionBox={() => updateUiPreference('showAiSuggestionBox', !uiPreferences.showAiSuggestionBox)}
                />;
      default:
        return <ModuleView view="dashboard" businessData={businessData} uiPreferences={uiPreferences} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
