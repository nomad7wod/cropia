import { Settings2, CloudSun, Droplets, AlertTriangle, Sun, Wind, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useState } from 'react';

export function BannerSettingsScreen() {
  const [displaySettings, setDisplaySettings] = useState({
    showTemperature: true,
    showHumidity: true,
    showRisk: true,
    showUV: false,
    showWind: false,
  });

  const [autoUpdate, setAutoUpdate] = useState(true);

  const toggleSetting = (key: keyof typeof displaySettings) => {
    setDisplaySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleCount = Object.values(displaySettings).filter(Boolean).length;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Personalización del Banner</h1>
        <p className="text-gray-600">Configura la información visible</p>
      </div>

      {/* Vista previa */}
      <Card className="bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 border-green-200 shadow-md">
        <CardContent className="p-5">
          <h3 className="text-green-800 mb-4">Vista Previa</h3>
          <div className={`grid gap-3 ${
            visibleCount === 1 ? 'grid-cols-1' :
            visibleCount === 2 ? 'grid-cols-2' :
            visibleCount === 3 ? 'grid-cols-3' :
            'grid-cols-2'
          }`}>
            {displaySettings.showTemperature && (
              <div className="flex items-center gap-2">
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <CloudSun size={20} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-gray-700">21°C</div>
                  <div className="text-xs text-gray-600">Temperatura</div>
                </div>
              </div>
            )}
            
            {displaySettings.showHumidity && (
              <div className="flex items-center gap-2">
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <Droplets size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-700">72%</div>
                  <div className="text-xs text-gray-600">Humedad</div>
                </div>
              </div>
            )}
            
            {displaySettings.showRisk && (
              <div className="flex items-center gap-2">
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <AlertTriangle size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-gray-700">Bajo</div>
                  <div className="text-xs text-gray-600">Riesgo</div>
                </div>
              </div>
            )}

            {displaySettings.showUV && (
              <div className="flex items-center gap-2">
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <Sun size={20} className="text-yellow-600" />
                </div>
                <div>
                  <div className="text-gray-700">6</div>
                  <div className="text-xs text-gray-600">Índice UV</div>
                </div>
              </div>
            )}

            {displaySettings.showWind && (
              <div className="flex items-center gap-2">
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <Wind size={20} className="text-cyan-600" />
                </div>
                <div>
                  <div className="text-gray-700">12 km/h</div>
                  <div className="text-xs text-gray-600">Viento</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Elementos visibles */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Eye size={20} className="text-green-600" />
            </div>
            <h3 className="text-green-800">Elementos Visibles</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CloudSun size={18} className="text-amber-600" />
                <Label htmlFor="temp-toggle" className="text-gray-700">
                  Temperatura
                </Label>
              </div>
              <Switch
                id="temp-toggle"
                checked={displaySettings.showTemperature}
                onCheckedChange={() => toggleSetting('showTemperature')}
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Droplets size={18} className="text-blue-600" />
                <Label htmlFor="humidity-toggle" className="text-gray-700">
                  Humedad
                </Label>
              </div>
              <Switch
                id="humidity-toggle"
                checked={displaySettings.showHumidity}
                onCheckedChange={() => toggleSetting('showHumidity')}
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-green-600" />
                <Label htmlFor="risk-toggle" className="text-gray-700">
                  Nivel de Riesgo
                </Label>
              </div>
              <Switch
                id="risk-toggle"
                checked={displaySettings.showRisk}
                onCheckedChange={() => toggleSetting('showRisk')}
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun size={18} className="text-yellow-600" />
                <Label htmlFor="uv-toggle" className="text-gray-700">
                  Índice UV
                </Label>
              </div>
              <Switch
                id="uv-toggle"
                checked={displaySettings.showUV}
                onCheckedChange={() => toggleSetting('showUV')}
              />
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wind size={18} className="text-cyan-600" />
                <Label htmlFor="wind-toggle" className="text-gray-700">
                  Velocidad del Viento
                </Label>
              </div>
              <Switch
                id="wind-toggle"
                checked={displaySettings.showWind}
                onCheckedChange={() => toggleSetting('showWind')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuración de actualización */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Settings2 size={20} className="text-green-600" />
            </div>
            <h3 className="text-green-800">Actualización Automática</h3>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-update" className="text-gray-700">
              Actualizar cada 30 segundos
            </Label>
            <Switch
              id="auto-update"
              checked={autoUpdate}
              onCheckedChange={setAutoUpdate}
            />
          </div>
        </CardContent>
      </Card>

      {/* Botón guardar */}
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
        Guardar Configuración
      </Button>
    </div>
  );
}
