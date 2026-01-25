import { useState } from 'react';
import { TrendingUp, AlertTriangle, BarChart3, Calendar, ArrowLeft, Bell, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Screen } from '../App';

interface TrendsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function TrendsScreen({ onNavigate }: TrendsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('detections');

  const trendData = {
    currentWeek: {
      detections: 12,
      increase: 40,
      mostCommon: "Tizón Tardío",
      riskAreas: ["Sector A-3", "Sector C-2"]
    },
    predictions: [
      {
        pest: "Tizón Tardío",
        probability: 85,
        timeframe: "Próximos 7 días",
        areas: ["Sector A-1", "Sector B-2"],
        risk: "Alto"
      },
      {
        pest: "Pulgón Verde",
        probability: 60,
        timeframe: "Próximos 14 días",
        areas: ["Sector B-1"],
        risk: "Medio"
      },
      {
        pest: "Gusano Alambre",
        probability: 35,
        timeframe: "Próximos 21 días",
        areas: ["Sector C-1"],
        risk: "Bajo"
      }
    ],
    seasonalPattern: [
      { month: "Ene", detections: 3, average: 4 },
      { month: "Feb", detections: 2, average: 3 },
      { month: "Mar", detections: 5, average: 6 },
      { month: "Abr", detections: 8, average: 9 },
      { month: "May", detections: 12, average: 11 },
      { month: "Jun", detections: 15, average: 14 },
      { month: "Jul", detections: 18, average: 16 },
      { month: "Ago", detections: 14, average: 15 },
      { month: "Sep", detections: 11, average: 12 },
      { month: "Oct", detections: 8, average: 9 },
      { month: "Nov", detections: 6, average: 7 },
      { month: "Dic", detections: 4, average: 5 }
    ]
  };

  const weeklyTrends = [
    { week: "Sem 1", detections: 8, treated: 6, resolved: 5 },
    { week: "Sem 2", detections: 10, treated: 8, resolved: 7 },
    { week: "Sem 3", detections: 15, treated: 12, resolved: 9 },
    { week: "Sem 4", detections: 12, treated: 11, resolved: 10 },
  ];

  const alerts = [
    {
      id: 1,
      type: "trend",
      priority: "high",
      title: "Aumento Significativo de Tizón Tardío",
      description: "Incremento del 40% en las últimas 2 semanas",
      action: "Implementar tratamiento preventivo masivo",
      affectedAreas: 3
    },
    {
      id: 2,
      type: "prediction",
      priority: "medium", 
      title: "Riesgo de Brote de Pulgón Verde",
      description: "Condiciones favorables detectadas para próxima semana",
      action: "Monitorear sectores B-1 y B-2",
      affectedAreas: 2
    },
    {
      id: 3,
      type: "seasonal",
      priority: "low",
      title: "Patrón Estacional Normal",
      description: "Reducción esperada de plagas para próximo mes",
      action: "Preparar tratamientos para próxima temporada",
      affectedAreas: 0
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'alto': return 'text-red-600 bg-red-100';
      case 'medio': return 'text-orange-600 bg-orange-100';
      case 'bajo': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="text-red-600" size={16} />;
      case 'medium': return <Bell className="text-orange-600" size={16} />;
      case 'low': return <Target className="text-green-600" size={16} />;
      default: return <Bell className="text-gray-600" size={16} />;
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
        <h1 className="text-green-800">Tendencias y Alertas</h1>
      </div>

      {/* Period Selection */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            Configuración de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Métrica</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detections">Detecciones</SelectItem>
                  <SelectItem value="treatments">Tratamientos</SelectItem>
                  <SelectItem value="environmental">Datos Ambientales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Trends Summary */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-purple-600" size={20} />
            Resumen de Tendencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">{trendData.currentWeek.detections}</div>
              <div className="text-xs text-gray-600">Detecciones esta semana</div>
              <div className="text-xs text-red-600">+{trendData.currentWeek.increase}% vs semana anterior</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-orange-600">{trendData.currentWeek.mostCommon}</div>
              <div className="text-xs text-gray-600">Plaga más frecuente</div>
              <div className="text-xs text-orange-600">{trendData.currentWeek.riskAreas.length} áreas afectadas</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-gray-800 text-sm">Áreas de mayor riesgo:</h4>
            <div className="flex gap-2">
              {trendData.currentWeek.riskAreas.map((area, index) => (
                <Badge key={index} className="bg-red-100 text-red-700">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-green-600" size={20} />
            Predicciones y Riesgos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendData.predictions.map((prediction, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-gray-800">{prediction.pest}</h4>
                  <Badge className={getRiskColor(prediction.risk)}>
                    {prediction.risk}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Probabilidad:</span>
                    <Progress value={prediction.probability} className="flex-1 h-2" />
                    <span className="text-sm text-gray-800">{prediction.probability}%</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span>Tiempo estimado: </span>
                    <span className="text-gray-800">{prediction.timeframe}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span>Áreas en riesgo: </span>
                    <span className="text-gray-800">{prediction.areas.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends Chart */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={20} />
            Tendencias Semanales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyTrends.map((week, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-800">{week.week}</span>
                  <span className="text-xs text-gray-600">
                    {week.detections} detecciones, {week.resolved} resueltas
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-16">Detectadas</span>
                    <Progress value={(week.detections / 20) * 100} className="flex-1 h-2" />
                    <span className="text-xs text-gray-800 w-6">{week.detections}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-16">Resueltas</span>
                    <Progress value={(week.resolved / week.detections) * 100} className="flex-1 h-2" />
                    <span className="text-xs text-gray-800 w-6">{week.resolved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Alerts */}
      <div>
        <h3 className="text-gray-800 mb-3 flex items-center gap-2">
          <AlertTriangle className="text-orange-600" size={20} />
          Alertas de Tendencias ({alerts.length})
        </h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`border ${getPriorityColor(alert.priority)}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getPriorityIcon(alert.priority)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <p className="text-sm text-blue-600 mb-2">{alert.action}</p>
                    {alert.affectedAreas > 0 && (
                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                        {alert.affectedAreas} áreas afectadas
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle>Acciones Recomendadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => onNavigate('alerts')}
            variant="outline" 
            className="w-full justify-start border-red-600 text-red-600"
          >
            <AlertTriangle size={16} className="mr-2" />
            Configurar Alertas Automáticas
          </Button>
          <Button 
            onClick={() => onNavigate('recommendations')}
            variant="outline" 
            className="w-full justify-start border-blue-600 text-blue-600"
          >
            <Target size={16} className="mr-2" />
            Ver Recomendaciones Preventivas
          </Button>
          <Button 
            onClick={() => onNavigate('reports')}
            variant="outline" 
            className="w-full justify-start border-green-600 text-green-600"
          >
            <BarChart3 size={16} className="mr-2" />
            Generar Reporte de Tendencias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}