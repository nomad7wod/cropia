import { BellRing, Cloud, Bug, Thermometer, Droplets, Bell } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { useState } from 'react';

export function AlertSettingsScreen() {
  const [notifications, setNotifications] = useState({
    pestDetection: true,
    weatherAlerts: true,
    temperatureChanges: false,
    humidityAlerts: true,
    dailySummary: true,
  });

  const [threshold, setThreshold] = useState([60]);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Configuración de Alertas</h1>
        <p className="text-gray-600">Personaliza tus notificaciones</p>
      </div>

      {/* Alertas principales */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Bell size={20} className="text-green-600" />
            </div>
            <h3 className="text-green-800">Notificaciones Principales</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bug size={18} className="text-orange-600" />
                <Label htmlFor="pest" className="text-gray-700">
                  Detección de Plagas
                </Label>
              </div>
              <Switch
                id="pest"
                checked={notifications.pestDetection}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, pestDetection: checked })
                }
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud size={18} className="text-blue-600" />
                <Label htmlFor="weather" className="text-gray-700">
                  Alertas Climáticas
                </Label>
              </div>
              <Switch
                id="weather"
                checked={notifications.weatherAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weatherAlerts: checked })
                }
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Thermometer size={18} className="text-red-600" />
                <Label htmlFor="temp" className="text-gray-700">
                  Cambios de Temperatura
                </Label>
              </div>
              <Switch
                id="temp"
                checked={notifications.temperatureChanges}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, temperatureChanges: checked })
                }
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Droplets size={18} className="text-cyan-600" />
                <Label htmlFor="humidity" className="text-gray-700">
                  Alertas de Humedad
                </Label>
              </div>
              <Switch
                id="humidity"
                checked={notifications.humidityAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, humidityAlerts: checked })
                }
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing size={18} className="text-purple-600" />
                <Label htmlFor="daily" className="text-gray-700">
                  Resumen Diario
                </Label>
              </div>
              <Switch
                id="daily"
                checked={notifications.dailySummary}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, dailySummary: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Umbral de riesgo */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-green-800 mb-4">Umbral de Riesgo</h3>
          <p className="text-gray-600 text-sm mb-4">
            Nivel mínimo de riesgo para recibir alertas de plagas
          </p>
          <div className="space-y-3">
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Bajo</span>
              <span className="text-gray-700">{threshold[0]}%</span>
              <span className="text-red-600">Alto</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horario de notificaciones */}
      <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
        <CardContent className="p-4">
          <h4 className="text-green-800 mb-2">Horario de Notificaciones</h4>
          <p className="text-gray-600 text-sm">
            📱 Activo: 6:00 AM - 10:00 PM
          </p>
          <p className="text-gray-600 text-sm mt-1">
            🔕 Modo silencioso durante la noche
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
