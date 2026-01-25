import { useState } from 'react';
import { Thermometer, Droplets, Wind, Sun, ArrowLeft, Plus, TrendingUp, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Screen } from '../App';

interface EnvironmentalScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function EnvironmentalScreen({ onNavigate }: EnvironmentalScreenProps) {
  const [manualData, setManualData] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    windSpeed: '',
    notes: ''
  });

  const currentConditions = {
    temperature: 18.5,
    humidity: 75,
    rainfall: 12.3,
    windSpeed: 8.2,
    pressure: 1013.2,
    uvIndex: 6
  };

  const historicalData = [
    { date: '2024-12-27', temp: 18.5, humidity: 75, rain: 0, wind: 8.2 },
    { date: '2024-12-26', temp: 20.1, humidity: 68, rain: 3.2, wind: 12.5 },
    { date: '2024-12-25', temp: 22.3, humidity: 82, rain: 15.7, wind: 6.8 },
    { date: '2024-12-24', temp: 19.8, humidity: 70, rain: 0, wind: 9.1 },
    { date: '2024-12-23', temp: 17.2, humidity: 85, rain: 8.4, wind: 15.3 },
  ];

  const correlationData = [
    {
      condition: "Humedad > 80%",
      pestRisk: "Alto riesgo de hongos",
      probability: "85%",
      color: "text-red-600"
    },
    {
      condition: "Temperatura 15-20°C",
      pestRisk: "Condiciones óptimas para Tizón",
      probability: "70%",
      color: "text-orange-600"
    },
    {
      condition: "Lluvia frecuente",
      pestRisk: "Propagación de bacterias",
      probability: "60%",
      color: "text-yellow-600"
    }
  ];

  const handleManualSubmit = () => {
    if (!manualData.temperature || !manualData.humidity) {
      toast.error('Por favor completa al menos temperatura y humedad');
      return;
    }

    toast.success('Datos ambientales registrados exitosamente');
    setManualData({
      temperature: '',
      humidity: '',
      rainfall: '',
      windSpeed: '',
      notes: ''
    });
  };

  const getConditionColor = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        if (value < 10 || value > 30) return 'text-red-600';
        if (value < 15 || value > 25) return 'text-orange-600';
        return 'text-green-600';
      case 'humidity':
        if (value > 85 || value < 40) return 'text-red-600';
        if (value > 75 || value < 50) return 'text-orange-600';
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('home')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-green-800">Datos Ambientales</h1>
      </div>

      {/* Current Conditions */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="text-blue-600" size={20} />
            Condiciones Actuales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Thermometer className={`mx-auto mb-1 ${getConditionColor(currentConditions.temperature, 'temperature')}`} size={24} />
              <div className={getConditionColor(currentConditions.temperature, 'temperature')}>
                {currentConditions.temperature}°C
              </div>
              <div className="text-xs text-gray-600">Temperatura</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Droplets className={`mx-auto mb-1 ${getConditionColor(currentConditions.humidity, 'humidity')}`} size={24} />
              <div className={getConditionColor(currentConditions.humidity, 'humidity')}>
                {currentConditions.humidity}%
              </div>
              <div className="text-xs text-gray-600">Humedad</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Droplets className="mx-auto mb-1 text-green-600" size={24} />
              <div className="text-green-600">{currentConditions.rainfall}mm</div>
              <div className="text-xs text-gray-600">Lluvia (24h)</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Wind className="mx-auto mb-1 text-green-600" size={24} />
              <div className="text-green-600">{currentConditions.windSpeed} km/h</div>
              <div className="text-xs text-gray-600">Viento</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Data Entry and History */}
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="correlation">Correlación</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-4 mt-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="text-green-600" size={20} />
                Registro Manual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="temperature">Temperatura (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="18.5"
                    value={manualData.temperature}
                    onChange={(e) => setManualData(prev => ({ ...prev, temperature: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="humidity">Humedad (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="75"
                    value={manualData.humidity}
                    onChange={(e) => setManualData(prev => ({ ...prev, humidity: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="rainfall">Lluvia (mm)</Label>
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="0"
                    value={manualData.rainfall}
                    onChange={(e) => setManualData(prev => ({ ...prev, rainfall: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="windSpeed">Viento (km/h)</Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    placeholder="8.2"
                    value={manualData.windSpeed}
                    onChange={(e) => setManualData(prev => ({ ...prev, windSpeed: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Observaciones</Label>
                <Input
                  id="notes"
                  placeholder="Condiciones especiales, eventos climáticos..."
                  value={manualData.notes}
                  onChange={(e) => setManualData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              
              <Button 
                onClick={handleManualSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Registrar Datos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 mt-4">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-blue-600" size={20} />
                Historial (5 días)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historicalData.map((data, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800">{data.date}</span>
                      <span className="text-xs text-gray-500">
                        {index === 0 ? 'Hoy' : `Hace ${index} días`}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <div className={getConditionColor(data.temp, 'temperature')}>
                          {data.temp}°C
                        </div>
                        <div className="text-xs text-gray-500">Temp</div>
                      </div>
                      <div className="text-center">
                        <div className={getConditionColor(data.humidity, 'humidity')}>
                          {data.humidity}%
                        </div>
                        <div className="text-xs text-gray-500">Hum</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-600">{data.rain}mm</div>
                        <div className="text-xs text-gray-500">Lluvia</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">{data.wind}km/h</div>
                        <div className="text-xs text-gray-500">Viento</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="correlation" className="space-y-4 mt-4">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-purple-600" size={20} />
                Correlación Clima-Plagas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {correlationData.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-gray-800">{item.condition}</h4>
                      <span className={`text-sm ${item.color}`}>
                        {item.probability}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{item.pestRisk}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <h4 className="text-purple-800 mb-2">Recomendación Actual</h4>
                <p className="text-purple-700 text-sm">
                  Las condiciones actuales (18.5°C, 75% humedad) presentan riesgo moderado 
                  para desarrollo de hongos. Monitorear sectores con historial de problemas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={() => onNavigate('alerts')}
          variant="outline"
          className="border-blue-600 text-blue-600"
        >
          Ver Alertas Climáticas
        </Button>
        <Button 
          onClick={() => onNavigate('trends')}
          variant="outline"
          className="border-purple-600 text-purple-600"
        >
          Análisis de Tendencias
        </Button>
      </div>
    </div>
  );
}