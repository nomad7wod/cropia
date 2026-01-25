import { Home, Search, FileText, MapPin, Bell } from 'lucide-react';
import { Screen } from '../App';

interface NavigationBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function NavigationBar({ currentScreen, onNavigate }: NavigationBarProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Inicio' },
    { id: 'detection' as Screen, icon: Search, label: 'Detectar' },
    { id: 'reports' as Screen, icon: FileText, label: 'Reportes' },
    { id: 'map' as Screen, icon: MapPin, label: 'Mapa' },
    { id: 'alerts' as Screen, icon: Bell, label: 'Alertas' },
  ];

  return (
    <nav className="bg-white border-t border-green-200 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === id
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}