import { useState } from 'react';
import { History, Search, Filter, Calendar, MapPin, ArrowLeft, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen } from '../App';

interface HistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  const historyRecords = [
    {
      id: 1,
      date: '2024-12-27',
      time: '14:30',
      type: 'detection',
      pest: 'Tizón Tardío',
      location: 'Sector A-3',
      severity: 'Alto',
      confidence: 87,
      image: "https://images.unsplash.com/photo-1704029809769-058e04426f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWF2ZXMlMjBwZXN0JTIwZGFtYWdlfGVufDF8fHx8MTc1ODkzMTg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      treatment: 'Fungicida sistémico aplicado',
      status: 'En tratamiento'
    },
    {
      id: 2,
      date: '2024-12-26',
      time: '09:15',
      type: 'detection',
      pest: 'Pulgón Verde',
      location: 'Sector B-1',
      severity: 'Bajo',
      confidence: 92,
      image: "https://images.unsplash.com/photo-1704785119987-1d255fecb1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjcm9wcyUyMGZpZWxkJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU4OTMxODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      treatment: 'Insecticida natural aplicado',
      status: 'Controlado'
    },
    {
      id: 3,
      date: '2024-12-25',
      time: '16:45',
      type: 'environmental',
      pest: 'N/A',
      location: 'Sector C-2',
      severity: 'N/A',
      confidence: null,
      image: null,
      treatment: 'Monitoreo ambiental',
      status: 'Registrado'
    },
    {
      id: 4,
      date: '2024-12-24',
      time: '11:20',
      type: 'detection',
      pest: 'Gusano Alambre',
      location: 'Sector C-2',
      severity: 'Moderado',
      confidence: 78,
      image: "https://images.unsplash.com/photo-1704029809769-058e04426f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWF2ZXMlMjBwZXN0JTIwZGFtYWdlfGVufDF8fHx8MTc1ODkzMTg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      treatment: 'Nematicida biológico',
      status: 'Monitoreando'
    },
    {
      id: 5,
      date: '2024-12-23',
      time: '08:30',
      type: 'report',
      pest: 'Múltiples',
      location: 'Todos los sectores',
      severity: 'Variado',
      confidence: null,
      image: null,
      treatment: 'Reporte semanal generado',
      status: 'Completado'
    }
  ];

  const filteredRecords = historyRecords.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.pest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPeriod = filterPeriod === 'all' || 
      (filterPeriod === 'today' && record.date === '2024-12-27') ||
      (filterPeriod === 'week' && new Date(record.date) >= new Date('2024-12-21')) ||
      (filterPeriod === 'month' && new Date(record.date) >= new Date('2024-11-27'));
    
    const matchesType = filterType === 'all' || record.type === filterType;
    
    return matchesSearch && matchesPeriod && matchesType;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'detection': return 'Detección';
      case 'environmental': return 'Ambiental';
      case 'report': return 'Reporte';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'detection': return 'bg-red-100 text-red-700';
      case 'environmental': return 'bg-blue-100 text-blue-700';
      case 'report': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'alto': return 'bg-red-100 text-red-700';
      case 'moderado': return 'bg-orange-100 text-orange-700';
      case 'bajo': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'controlado': case 'completado': return 'bg-green-100 text-green-700';
      case 'en tratamiento': case 'monitoreando': return 'bg-blue-100 text-blue-700';
      case 'registrado': return 'bg-gray-100 text-gray-700';
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
        <h1 className="text-green-800">Historial de Reportes</h1>
      </div>

      {/* Search and Filters */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="text-blue-600" size={20} />
            Buscar y Filtrar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Buscar por plaga o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Período</label>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Tipo</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="detection">Detecciones</SelectItem>
                  <SelectItem value="environmental">Ambientales</SelectItem>
                  <SelectItem value="report">Reportes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">
          Mostrando {filteredRecords.length} de {historyRecords.length} registros
        </span>
        <Button variant="outline" size="sm">
          <Download size={14} className="mr-1" />
          Exportar
        </Button>
      </div>

      {/* History Records */}
      <div className="space-y-3">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {record.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={record.image}
                      alt="Imagen del registro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-800">
                        {record.type === 'detection' ? record.pest : getTypeLabel(record.type)}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={12} />
                        <span>{record.date} {record.time}</span>
                        <MapPin size={12} />
                        <span>{record.location}</span>
                      </div>
                    </div>
                    <Badge className={getTypeColor(record.type)}>
                      {getTypeLabel(record.type)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {record.severity !== 'N/A' && (
                      <Badge className={getSeverityColor(record.severity)}>
                        {record.severity}
                      </Badge>
                    )}
                    {record.confidence && (
                      <Badge className="bg-blue-100 text-blue-700">
                        {record.confidence}% confianza
                      </Badge>
                    )}
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">{record.treatment}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setSelectedRecord(selectedRecord === record.id ? null : record.id)}
                      size="sm" 
                      variant="outline"
                      className="border-blue-600 text-blue-600"
                    >
                      <Eye size={14} className="mr-1" />
                      {selectedRecord === record.id ? 'Ocultar' : 'Ver más'}
                    </Button>
                    {record.type === 'detection' && (
                      <Button 
                        onClick={() => onNavigate('recommendations')}
                        size="sm" 
                        variant="outline"
                      >
                        Ver Tratamiento
                      </Button>
                    )}
                  </div>
                  
                  {/* Extended Details */}
                  {selectedRecord === record.id && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                      <h5 className="text-sm text-gray-800 mb-2">Detalles adicionales:</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">ID:</span>
                          <span className="ml-2 text-gray-800">#{record.id.toString().padStart(4, '0')}</span>
                        </div>
                        {record.confidence && (
                          <div>
                            <span className="text-gray-600">Precisión:</span>
                            <span className="ml-2 text-gray-800">{record.confidence}%</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Estado:</span>
                          <span className="ml-2 text-gray-800">{record.status}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Ubicación:</span>
                          <span className="ml-2 text-gray-800">{record.location}</span>
                        </div>
                      </div>
                      
                      {record.type === 'detection' && (
                        <div className="mt-2">
                          <span className="text-gray-600 text-sm">Recomendaciones aplicadas:</span>
                          <p className="text-gray-800 text-sm mt-1">{record.treatment}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-8 text-center">
            <History size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-gray-600 mb-2">No se encontraron registros</h3>
            <p className="text-gray-500 text-sm">
              Intenta ajustar los filtros o realizar nuevas detecciones
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={() => onNavigate('reports')}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Generar Reporte
        </Button>
        <Button 
          onClick={() => onNavigate('trends')}
          variant="outline"
          className="border-purple-600 text-purple-600"
        >
          Ver Tendencias
        </Button>
      </div>
    </div>
  );
}