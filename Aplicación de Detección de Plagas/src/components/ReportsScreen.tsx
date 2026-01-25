import { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, ArrowLeft, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { Screen } from '../App';

interface ReportsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ReportsScreen({ onNavigate }: ReportsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reportData = {
    totalAnalysis: 45,
    pestsDetected: 12,
    healthyPlants: 33,
    mostCommonPest: "Tizón Tardío",
    affectedArea: "2.3 hectáreas",
    riskLevel: "Moderado"
  };

  const recentDetections = [
    {
      id: 1,
      date: "2024-12-27",
      pest: "Tizón Tardío",
      severity: "Alto",
      location: "Sector A-3",
      status: "Tratando"
    },
    {
      id: 2,
      date: "2024-12-26",
      pest: "Pulgón Verde",
      severity: "Bajo",
      location: "Sector B-1",
      status: "Controlado"
    },
    {
      id: 3,
      date: "2024-12-25",
      pest: "Gusano Alambre",
      severity: "Moderado",
      location: "Sector C-2",
      status: "Monitoreando"
    }
  ];

  const handleExportReport = (format: 'pdf' | 'excel') => {
    toast.success(`Reporte ${format.toUpperCase()} generado exitosamente`);
    // Simular descarga
    setTimeout(() => {
      toast.info(`Descargando reporte_cultivos_${new Date().toISOString().split('T')[0]}.${format}`);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'alto': return 'bg-red-100 text-red-700';
      case 'moderado': return 'bg-orange-100 text-orange-700';
      case 'bajo': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'controlado': return 'bg-green-100 text-green-700';
      case 'tratando': return 'bg-blue-100 text-blue-700';
      case 'monitoreando': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
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
        <h1 className="text-green-800">Reportes y Análisis</h1>
      </div>

      {/* Filters */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="text-green-600" size={20} />
            Configurar Reporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Última 24h</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Formato</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={() => handleExportReport(selectedFormat as 'pdf' | 'excel')}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Download size={16} className="mr-2" />
            Generar Reporte {selectedFormat.toUpperCase()}
          </Button>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={20} />
            Resumen Estadístico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 text-xl">{reportData.totalAnalysis}</div>
              <div className="text-xs text-gray-600">Análisis totales</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">{reportData.pestsDetected}</div>
              <div className="text-xs text-gray-600">Plagas detectadas</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 text-xl">{reportData.healthyPlants}</div>
              <div className="text-xs text-gray-600">Plantas sanas</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-orange-600 text-xl">{reportData.affectedArea}</div>
              <div className="text-xs text-gray-600">Área afectada</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plaga más común:</span>
              <Badge className="bg-red-100 text-red-700">{reportData.mostCommonPest}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nivel de riesgo:</span>
              <Badge className="bg-orange-100 text-orange-700">{reportData.riskLevel}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Detections */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-green-600" size={20} />
            Detecciones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDetections.map((detection) => (
              <div key={detection.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-gray-800">{detection.pest}</h4>
                    <p className="text-sm text-gray-600">{detection.location}</p>
                  </div>
                  <div className="text-xs text-gray-500">{detection.date}</div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getSeverityColor(detection.severity)}>
                    {detection.severity}
                  </Badge>
                  <Badge className={getStatusColor(detection.status)}>
                    {detection.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Export Options */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle>Exportación Rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => handleExportReport('pdf')}
            variant="outline" 
            className="w-full justify-start"
          >
            <FileText size={16} className="mr-2" />
            Reporte Completo PDF
          </Button>
          <Button 
            onClick={() => handleExportReport('excel')}
            variant="outline" 
            className="w-full justify-start"
          >
            <BarChart3 size={16} className="mr-2" />
            Datos Excel para Análisis
          </Button>
          <Button 
            onClick={() => onNavigate('history')}
            variant="outline" 
            className="w-full justify-start"
          >
            <Calendar size={16} className="mr-2" />
            Historial Completo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}