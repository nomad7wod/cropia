import { useState, useEffect } from 'react';
import { CloudSun, Droplets, AlertTriangle, Settings2, Sun, Wind } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { motion } from 'motion/react';

interface CropData {
  temperature: number;
  humidity: number;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  uvIndex?: number;
  windSpeed?: number;
}

interface DisplaySettings {
  showTemperature: boolean;
  showHumidity: boolean;
  showRisk: boolean;
  showUV: boolean;
  showWind: boolean;
}

export function CropStatusBanner() {
  const [cropData, setCropData] = useState<CropData>({
    temperature: 21,
    humidity: 72,
    riskLevel: 'Bajo',
    uvIndex: 6,
    windSpeed: 12,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    showTemperature: true,
    showHumidity: true,
    showRisk: true,
    showUV: false,
    showWind: false,
  });

  // Simular actualización de datos cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      updateCropData();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, []);

  const updateCropData = () => {
    setIsUpdating(true);
    
    // Simular datos dinámicos (en producción, esto vendría de una API o sensores)
    setTimeout(() => {
      setCropData({
        temperature: Math.round((18 + Math.random() * 8) * 10) / 10,
        humidity: Math.round(65 + Math.random() * 15),
        riskLevel: Math.random() > 0.7 ? 'Medio' : Math.random() > 0.4 ? 'Bajo' : 'Alto',
        uvIndex: Math.round(4 + Math.random() * 5),
        windSpeed: Math.round(8 + Math.random() * 10),
      });
      setIsUpdating(false);
    }, 800);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Bajo':
        return 'text-green-600';
      case 'Medio':
        return 'text-orange-600';
      case 'Alto':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const toggleSetting = (key: keyof DisplaySettings) => {
    setDisplaySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleItems = [
    { show: displaySettings.showTemperature, key: 'temperature' },
    { show: displaySettings.showHumidity, key: 'humidity' },
    { show: displaySettings.showRisk, key: 'risk' },
    { show: displaySettings.showUV, key: 'uv' },
    { show: displaySettings.showWind, key: 'wind' },
  ].filter(item => item.show);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isUpdating ? 0.6 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 border-green-200 shadow-md relative">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-800">Estado del Cultivo</h3>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings2 size={16} className="text-green-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <SheetHeader>
                  <SheetTitle className="text-green-800">Personalizar Banner</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    Selecciona qué información deseas ver en el banner:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temp" className="text-gray-700">Temperatura</Label>
                      <Switch
                        id="temp"
                        checked={displaySettings.showTemperature}
                        onCheckedChange={() => toggleSetting('showTemperature')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="humidity" className="text-gray-700">Humedad</Label>
                      <Switch
                        id="humidity"
                        checked={displaySettings.showHumidity}
                        onCheckedChange={() => toggleSetting('showHumidity')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="risk" className="text-gray-700">Nivel de Riesgo</Label>
                      <Switch
                        id="risk"
                        checked={displaySettings.showRisk}
                        onCheckedChange={() => toggleSetting('showRisk')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="uv" className="text-gray-700">Índice UV</Label>
                      <Switch
                        id="uv"
                        checked={displaySettings.showUV}
                        onCheckedChange={() => toggleSetting('showUV')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="wind" className="text-gray-700">Velocidad del Viento</Label>
                      <Switch
                        id="wind"
                        checked={displaySettings.showWind}
                        onCheckedChange={() => toggleSetting('showWind')}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={updateCropData}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Actualizar Datos Ahora
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className={`grid gap-3 ${
            visibleItems.length === 1 ? 'grid-cols-1' :
            visibleItems.length === 2 ? 'grid-cols-2' :
            visibleItems.length === 3 ? 'grid-cols-3' :
            'grid-cols-2'
          }`}>
            {displaySettings.showTemperature && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 1 }}
                animate={{ scale: isUpdating ? 0.95 : 1 }}
              >
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <CloudSun size={20} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-gray-700">{cropData.temperature}°C</div>
                  <div className="text-xs text-gray-600">Temperatura</div>
                </div>
              </motion.div>
            )}
            
            {displaySettings.showHumidity && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 1 }}
                animate={{ scale: isUpdating ? 0.95 : 1 }}
              >
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <Droplets size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-700">{cropData.humidity}%</div>
                  <div className="text-xs text-gray-600">Humedad</div>
                </div>
              </motion.div>
            )}
            
            {displaySettings.showRisk && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 1 }}
                animate={{ scale: isUpdating ? 0.95 : 1 }}
              >
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <AlertTriangle size={20} className={getRiskColor(cropData.riskLevel)} />
                </div>
                <div>
                  <div className={`${getRiskColor(cropData.riskLevel)}`}>{cropData.riskLevel}</div>
                  <div className="text-xs text-gray-600">Riesgo</div>
                </div>
              </motion.div>
            )}

            {displaySettings.showUV && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 1 }}
                animate={{ scale: isUpdating ? 0.95 : 1 }}
              >
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <Sun size={20} className="text-yellow-600" />
                </div>
                <div>
                  <div className="text-gray-700">{cropData.uvIndex}</div>
                  <div className="text-xs text-gray-600">Índice UV</div>
                </div>
              </motion.div>
            )}

            {displaySettings.showWind && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 1 }}
                animate={{ scale: isUpdating ? 0.95 : 1 }}
              >
                <div className="bg-white bg-opacity-70 p-2 rounded-lg">
                  <Wind size={20} className="text-cyan-600" />
                </div>
                <div>
                  <div className="text-gray-700">{cropData.windSpeed} km/h</div>
                  <div className="text-xs text-gray-600">Viento</div>
                </div>
              </motion.div>
            )}
          </div>

          {isUpdating && (
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
