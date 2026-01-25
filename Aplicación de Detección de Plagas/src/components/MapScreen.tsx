import { useState } from 'react';
import { MapPin, Layers, ZoomIn, ZoomOut, ArrowLeft, AlertTriangle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Screen } from '../App';

interface MapScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function MapScreen({ onNavigate }: MapScreenProps) {
  const [selectedLayer, setSelectedLayer] = useState('risk');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones = [
    { id: 'A1', risk: 'low', name: 'Sector A-1', pests: 0, area: '1.2 ha' },
    { id: 'A2', risk: 'medium', name: 'Sector A-2', pests: 2, area: '1.5 ha' },
    { id: 'A3', risk: 'high', name: 'Sector A-3', pests: 5, area: '1.8 ha' },
    { id: 'B1', risk: 'low', name: 'Sector B-1', pests: 1, area: '1.1 ha' },
    { id: 'B2', risk: 'medium', name: 'Sector B-2', pests: 3, area: '1.4 ha' },
    { id: 'C1', risk: 'low', name: 'Sector C-1', pests: 0, area: '1.3 ha' },
    { id: 'C2', risk: 'high', name: 'Sector C-2', pests: 4, area: '1.6 ha' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-400';
      case 'medium': return 'bg-yellow-400';
      case 'high': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Bajo';
      case 'medium': return 'Medio';
      case 'high': return 'Alto';
      default: return 'Sin datos';
    }
  };

  const riskStats = {
    low: zones.filter(z => z.risk === 'low').length,
    medium: zones.filter(z => z.risk === 'medium').length,
    high: zones.filter(z => z.risk === 'high').length,
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
        <h1 className="text-green-800">Mapa de Riesgos</h1>
      </div>

      {/* Map Controls */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="text-green-600" size={20} />
            Controles del Mapa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Capa de visualización</label>
            <Select value={selectedLayer} onValueChange={setSelectedLayer}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="risk">Niveles de Riesgo</SelectItem>
                <SelectItem value="pests">Detecciones de Plagas</SelectItem>
                <SelectItem value="environmental">Datos Ambientales</SelectItem>
                <SelectItem value="treatment">Áreas Tratadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <ZoomIn size={16} className="mr-1" />
              Acercar
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ZoomOut size={16} className="mr-1" />
              Alejar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Mapa Interactivo de la Parcela</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Grid */}
          <div className="bg-green-50 p-4 rounded-lg border-2 border-dashed border-green-300">
            <div className="grid grid-cols-3 gap-2 h-64">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`
                    ${getRiskColor(zone.risk)} 
                    ${selectedZone === zone.id ? 'ring-2 ring-blue-500' : ''}
                    rounded-lg flex flex-col items-center justify-center text-white text-xs
                    hover:opacity-80 transition-all relative
                  `}
                >
                  <span className="font-semibold">{zone.id}</span>
                  <span className="text-xs opacity-90">{zone.area}</span>
                  {zone.pests > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {zone.pests}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span className="text-xs text-gray-600">Bajo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-400 rounded"></div>
              <span className="text-xs text-gray-600">Medio</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <span className="text-xs text-gray-600">Alto</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details */}
      {selectedZone && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Info className="text-blue-600" size={20} />
              Detalles del {zones.find(z => z.id === selectedZone)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const zone = zones.find(z => z.id === selectedZone);
              if (!zone) return null;
              
              return (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">Nivel de riesgo:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-3 h-3 ${getRiskColor(zone.risk)} rounded`}></div>
                        <span className="text-sm font-medium">{getRiskLabel(zone.risk)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Área:</span>
                      <p className="text-sm font-medium">{zone.area}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600">Plagas detectadas:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium">{zone.pests}</span>
                      {zone.pests > 0 && (
                        <Badge className="bg-red-100 text-red-700">
                          Requiere atención
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => onNavigate('detection')}
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Analizar Zona
                    </Button>
                    <Button 
                      onClick={() => onNavigate('environmental')}
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                    >
                      Ver Datos
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Risk Summary */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-green-600" size={20} />
            Resumen de Riesgos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 text-xl">{riskStats.low}</div>
              <div className="text-xs text-gray-600">Zonas de Bajo Riesgo</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-yellow-600 text-xl">{riskStats.medium}</div>
              <div className="text-xs text-gray-600">Zonas de Riesgo Medio</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">{riskStats.high}</div>
              <div className="text-xs text-gray-600">Zonas de Alto Riesgo</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm text-gray-800 mb-2">Recomendaciones del Mapa</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Priorizar tratamiento en sectores A-3 y C-2</li>
              <li>• Monitorear evolución en sectores A-2 y B-2</li>
              <li>• Mantener medidas preventivas en zonas verdes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}