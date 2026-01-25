import { useState } from 'react';
import { Bell, Cloud, Thermometer, Droplets, Wind, Settings, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Screen } from '../App';

interface AlertsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const [alertSettings, setAlertSettings] = useState({
    weatherAlerts: true,
    pestAlerts: true,
    temperatureAlerts: true,
    humidityAlerts: true,
    temperatureThreshold: [25],
    humidityThreshold: [80],
  });

  const activeAlerts = [
    {
      id: 1,
      type: 'weather',
      priority: 'high',
      title: 'Condiciones Favorables para Hongos',
      description: 'Alta humedad (85%) y temperatura moderada (18°C) detectadas',
      time: 'Hace 2 horas',
      icon: Cloud,
      action: 'Revisar sectores A-3 y C-2'
    },
    {
      id: 2,
      type: 'pest',
      priority: 'medium',
      title: 'Aumento de Detecciones',
      description: 'Incremento del 40% en detecciones de Tizón Tardío esta semana',
      time: 'Hace 4 horas',
      icon: AlertTriangle,
      action: 'Implementar tratamiento preventivo'
    },
    {
      id: 3,
      type: 'temperature',
      priority: 'low',
      title: 'Temperatura Óptima',
      description: 'Condiciones ideales para crecimiento del cultivo (15-20°C)',
      time: 'Hace 6 horas',
      icon: Thermometer,
      action: 'Mantener condiciones actuales'
    },
  ];

  const weatherForecast = [
    { day: 'Hoy', temp: '18°C', humidity: '85%', rain: '60%', risk: 'Alto' },
    { day: 'Mañana', temp: '22°C', humidity: '75%', rain: '30%', risk: 'Medio' },
    { day: 'Pasado', temp: '25°C', humidity: '65%', rain: '10%', risk: 'Bajo' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'alto': return 'text-red-600';
      case 'medio': return 'text-orange-600';
      case 'bajo': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const updateSetting = (key: string, value: any) => {
    setAlertSettings(prev => ({
      ...prev,
      [key]: value
    }));
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
        <h1 className="text-green-800">Alertas y Clima</h1>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto p-2"
        >
          <Settings size={20} />
        </Button>
      </div>

      {/* Active Alerts */}
      <div>
        <h3 className="text-gray-800 mb-3 flex items-center gap-2">
          <Bell className="text-orange-600" size={20} />
          Alertas Activas ({activeAlerts.length})
        </h3>
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <Card key={alert.id} className={`border ${getPriorityColor(alert.priority)}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <alert.icon size={20} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-gray-800">{alert.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {alert.priority === 'high' ? 'Alta' : alert.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-500 mb-2">{alert.time}</p>
                    <p className="text-sm text-blue-600">{alert.action}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weather Forecast */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="text-blue-600" size={20} />
            Pronóstico del Tiempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weatherForecast.map((forecast, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-600">{forecast.day}</div>
                    <div className="text-blue-600">{forecast.temp}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Droplets size={14} className="text-blue-500" />
                      <span>{forecast.humidity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Cloud size={14} className="text-gray-500" />
                      <span>{forecast.rain}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600">Riesgo</div>
                  <div className={`${getRiskColor(forecast.risk)}`}>
                    {forecast.risk}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="text-green-600" size={20} />
            Configuración de Alertas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Alertas Climáticas</label>
              <Switch
                checked={alertSettings.weatherAlerts}
                onCheckedChange={(checked) => updateSetting('weatherAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Alertas de Plagas</label>
              <Switch
                checked={alertSettings.pestAlerts}
                onCheckedChange={(checked) => updateSetting('pestAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Alertas de Temperatura</label>
              <Switch
                checked={alertSettings.temperatureAlerts}
                onCheckedChange={(checked) => updateSetting('temperatureAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Alertas de Humedad</label>
              <Switch
                checked={alertSettings.humidityAlerts}
                onCheckedChange={(checked) => updateSetting('humidityAlerts', checked)}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Umbral de Temperatura: {alertSettings.temperatureThreshold[0]}°C
              </label>
              <Slider
                value={alertSettings.temperatureThreshold}
                onValueChange={(value) => updateSetting('temperatureThreshold', value)}
                max={35}
                min={10}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Umbral de Humedad: {alertSettings.humidityThreshold[0]}%
              </label>
              <Slider
                value={alertSettings.humidityThreshold}
                onValueChange={(value) => updateSetting('humidityThreshold', value)}
                max={100}
                min={40}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => onNavigate('environmental')}
            variant="outline" 
            className="w-full justify-start"
          >
            <Thermometer size={16} className="mr-2" />
            Ver Datos Ambientales Detallados
          </Button>
          <Button 
            onClick={() => onNavigate('map')}
            variant="outline" 
            className="w-full justify-start"
          >
            <Wind size={16} className="mr-2" />
            Mapa de Condiciones Climáticas
          </Button>
          <Button 
            onClick={() => onNavigate('trends')}
            variant="outline" 
            className="w-full justify-start"
          >
            <AlertTriangle size={16} className="mr-2" />
            Análisis de Tendencias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}