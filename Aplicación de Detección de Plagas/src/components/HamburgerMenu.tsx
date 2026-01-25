import { Menu, User, BellRing, Settings2, Clock, HelpCircle, Info } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useState } from 'react';
import { Screen } from '../App';

interface HamburgerMenuProps {
  onNavigate: (screen: Screen) => void;
}

export function HamburgerMenu({ onNavigate }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);

  const menuOptions = [
    {
      id: 'profile' as Screen,
      icon: User,
      label: 'Perfil del Usuario',
      description: 'Gestiona tu información personal',
    },
    {
      id: 'alert-settings' as Screen,
      icon: BellRing,
      label: 'Configuración de Alertas',
      description: 'Personaliza tus notificaciones',
    },
    {
      id: 'banner-settings' as Screen,
      icon: Settings2,
      label: 'Personalización del Banner',
      description: 'Ajusta la información del estado',
    },
    {
      id: 'sessions' as Screen,
      icon: Clock,
      label: 'Historial de Sesiones',
      description: 'Revisa tu actividad reciente',
    },
  ];

  const helpOptions = [
    {
      id: 'help' as Screen,
      icon: HelpCircle,
      label: 'Ayuda',
      description: 'Centro de ayuda y tutoriales',
    },
    {
      id: 'about' as Screen,
      icon: Info,
      label: 'Acerca de la App',
      description: 'Versión 1.0.0',
    },
  ];

  const handleOptionClick = (screen: Screen) => {
    onNavigate(screen);
    setOpen(false); // Cerrar el menú después de seleccionar
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-green-800 hover:bg-green-100"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="bg-gradient-to-b from-white to-green-50 w-[280px] sm:w-[320px]"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-green-800">Menú</SheetTitle>
          <p className="text-sm text-gray-600">
            Plagas en Cultivos de Papa
          </p>
        </SheetHeader>

        <div className="space-y-1">
          {menuOptions.map(({ id, icon: Icon, label, description }) => (
            <button
              key={id}
              onClick={() => handleOptionClick(id)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-green-100 transition-colors text-left"
            >
              <div className="bg-green-100 p-2 rounded-lg mt-0.5">
                <Icon size={18} className="text-green-700" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800">{label}</div>
                <p className="text-xs text-gray-600 mt-0.5">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <Separator className="my-6 bg-green-200" />

        <div className="space-y-1">
          {helpOptions.map(({ id, icon: Icon, label, description }) => (
            <button
              key={id}
              onClick={() => handleOptionClick(id)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-green-100 transition-colors text-left"
            >
              <div className="bg-gray-100 p-2 rounded-lg mt-0.5">
                <Icon size={18} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800">{label}</div>
                <p className="text-xs text-gray-600 mt-0.5">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-xs text-green-800">
              💡 Tip: Usa el banner personalizable para ver solo los datos que te interesan
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
