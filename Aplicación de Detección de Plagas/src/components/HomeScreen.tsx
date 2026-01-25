import { Search, FileText, Lightbulb, MapPin, Bell, Camera, Thermometer, Settings, History, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CropStatusBanner } from './CropStatusBanner';
import { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const quickActions = [
    { id: 'detection' as Screen, icon: Search, label: 'Detectar Plaga', color: 'bg-green-500' },
    { id: 'capture' as Screen, icon: Camera, label: 'Capturar Imagen', color: 'bg-blue-500' },
    { id: 'reports' as Screen, icon: FileText, label: 'Generar Reporte', color: 'bg-purple-500' },
    { id: 'recommendations' as Screen, icon: Lightbulb, label: 'Recomendaciones', color: 'bg-orange-500' },
  ];

  const features = [
    { id: 'map' as Screen, icon: MapPin, label: 'Mapa de Riesgos', description: 'Visualiza áreas de riesgo' },
    { id: 'alerts' as Screen, icon: Bell, label: 'Alertas Climáticas', description: 'Notificaciones automáticas' },
    { id: 'environmental' as Screen, icon: Thermometer, label: 'Datos Ambientales', description: 'Registro de condiciones' },
    { id: 'preprocessing' as Screen, icon: Settings, label: 'Procesamiento', description: 'Optimiza tus imágenes' },
    { id: 'history' as Screen, icon: History, label: 'Historial', description: 'Revisa reportes anteriores' },
    { id: 'trends' as Screen, icon: TrendingUp, label: 'Tendencias', description: 'Análisis de patrones' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Plagas en Cultivos de Papa</h1>
        <p className="text-gray-600">Sistema inteligente de detección y manejo</p>
      </div>

      {/* Estado del Cultivo - Banner Dinámico */}
      <CropStatusBanner />

      {/* Quick Actions */}
      <div>
        <h3 className="text-gray-800 mb-3">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ id, icon: Icon, label, color }) => (
            <Button
              key={id}
              onClick={() => onNavigate(id)}
              className={`${color} hover:opacity-90 h-20 flex flex-col gap-1 text-white`}
            >
              <Icon size={24} />
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-gray-800 mb-3">Funcionalidades</h3>
        <div className="space-y-3">
          {features.map(({ id, icon: Icon, label, description }) => (
            <Card key={id} className="border-green-200">
              <CardContent className="p-4">
                <button
                  onClick={() => onNavigate(id)}
                  className="w-full flex items-center gap-3 text-left hover:bg-green-50 rounded-lg p-2 -m-2 transition-colors"
                >
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Icon size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800">{label}</h4>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </div>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status Summary */}
      <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
        <CardContent className="p-4">
          <h4 className="text-green-800 mb-2">Resumen del Estado</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-green-600">15</div>
              <div className="text-xs text-gray-600">Análisis hoy</div>
            </div>
            <div>
              <div className="text-orange-600">3</div>
              <div className="text-xs text-gray-600">Alertas activas</div>
            </div>
            <div>
              <div className="text-blue-600">8.2</div>
              <div className="text-xs text-gray-600">Hectáreas monitoreadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}