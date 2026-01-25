import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { DetectionScreen } from './components/DetectionScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { RecommendationsScreen } from './components/RecommendationsScreen';
import { MapScreen } from './components/MapScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { CaptureScreen } from './components/CaptureScreen';
import { EnvironmentalScreen } from './components/EnvironmentalScreen';
import { PreprocessingScreen } from './components/PreprocessingScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { TrendsScreen } from './components/TrendsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AlertSettingsScreen } from './components/AlertSettingsScreen';
import { BannerSettingsScreen } from './components/BannerSettingsScreen';
import { SessionHistoryScreen } from './components/SessionHistoryScreen';
import { HelpScreen } from './components/HelpScreen';
import { AboutScreen } from './components/AboutScreen';
import { NavigationBar } from './components/NavigationBar';
import { HamburgerMenu } from './components/HamburgerMenu';

export type Screen = 
  | 'home' 
  | 'detection' 
  | 'reports' 
  | 'recommendations' 
  | 'map' 
  | 'alerts' 
  | 'capture' 
  | 'environmental' 
  | 'preprocessing' 
  | 'history' 
  | 'trends'
  | 'profile'
  | 'alert-settings'
  | 'banner-settings'
  | 'sessions'
  | 'help'
  | 'about';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'detection':
        return <DetectionScreen onNavigate={setCurrentScreen} />;
      case 'reports':
        return <ReportsScreen onNavigate={setCurrentScreen} />;
      case 'recommendations':
        return <RecommendationsScreen onNavigate={setCurrentScreen} />;
      case 'map':
        return <MapScreen onNavigate={setCurrentScreen} />;
      case 'alerts':
        return <AlertsScreen onNavigate={setCurrentScreen} />;
      case 'capture':
        return <CaptureScreen onNavigate={setCurrentScreen} />;
      case 'environmental':
        return <EnvironmentalScreen onNavigate={setCurrentScreen} />;
      case 'preprocessing':
        return <PreprocessingScreen onNavigate={setCurrentScreen} />;
      case 'history':
        return <HistoryScreen onNavigate={setCurrentScreen} />;
      case 'trends':
        return <TrendsScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen />;
      case 'alert-settings':
        return <AlertSettingsScreen />;
      case 'banner-settings':
        return <BannerSettingsScreen />;
      case 'sessions':
        return <SessionHistoryScreen />;
      case 'help':
        return <HelpScreen />;
      case 'about':
        return <AboutScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col max-w-md mx-auto">
      {/* Header con menú hamburguesa */}
      <header className="bg-white border-b border-green-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <HamburgerMenu onNavigate={setCurrentScreen} />
        <h2 className="text-green-800">Cultivos de Papa</h2>
        <div className="w-10" /> {/* Espaciador para centrar el título */}
      </header>
      
      <main className="flex-1 overflow-auto">
        {renderScreen()}
      </main>
      
      <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}