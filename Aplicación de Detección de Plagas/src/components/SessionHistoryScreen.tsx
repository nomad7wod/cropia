import { Clock, Calendar, Activity, MapPin, Eye } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface Session {
  id: string;
  date: string;
  time: string;
  activity: string;
  location: string;
  duration: string;
  type: 'detection' | 'report' | 'analysis';
}

export function SessionHistoryScreen() {
  const sessions: Session[] = [
    {
      id: '1',
      date: '17 Oct 2025',
      time: '09:45 AM',
      activity: 'Detección de Plagas',
      location: 'Parcela Norte',
      duration: '15 min',
      type: 'detection',
    },
    {
      id: '2',
      date: '17 Oct 2025',
      time: '08:30 AM',
      activity: 'Generación de Reporte',
      location: 'Parcela Sur',
      duration: '8 min',
      type: 'report',
    },
    {
      id: '3',
      date: '16 Oct 2025',
      time: '04:20 PM',
      activity: 'Análisis de Tendencias',
      location: 'Todas las parcelas',
      duration: '22 min',
      type: 'analysis',
    },
    {
      id: '4',
      date: '16 Oct 2025',
      time: '02:15 PM',
      activity: 'Detección de Plagas',
      location: 'Parcela Este',
      duration: '12 min',
      type: 'detection',
    },
    {
      id: '5',
      date: '15 Oct 2025',
      time: '11:00 AM',
      activity: 'Revisión de Alertas',
      location: 'Dashboard',
      duration: '5 min',
      type: 'analysis',
    },
  ];

  const getTypeColor = (type: Session['type']) => {
    switch (type) {
      case 'detection':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'report':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'analysis':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Historial de Sesiones</h1>
        <p className="text-gray-600">Revisa tu actividad reciente</p>
      </div>

      {/* Resumen de actividad */}
      <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Activity size={20} className="text-white" />
            </div>
            <h3 className="text-green-800">Actividad de Hoy</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-green-600">2</div>
              <div className="text-xs text-gray-600">Sesiones</div>
            </div>
            <div>
              <div className="text-orange-600">23</div>
              <div className="text-xs text-gray-600">Minutos</div>
            </div>
            <div>
              <div className="text-blue-600">3</div>
              <div className="text-xs text-gray-600">Análisis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de sesiones */}
      <div className="space-y-3">
        <h3 className="text-gray-800">Sesiones Recientes</h3>
        {sessions.map((session) => (
          <Card key={session.id} className="border-green-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-800">{session.activity}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{session.date}</span>
                      <span className="text-gray-400">•</span>
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{session.time}</span>
                    </div>
                  </div>
                  <Badge className={getTypeColor(session.type)}>
                    {session.type === 'detection' ? 'Detección' :
                     session.type === 'report' ? 'Reporte' : 'Análisis'}
                  </Badge>
                </div>

                <Separator className="bg-green-100" />

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} />
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={14} />
                    <span>{session.duration}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Eye size={16} />
                  <span className="text-sm">Ver Detalles</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mostrar más */}
      <button className="w-full py-3 text-green-600 hover:bg-green-50 rounded-lg border border-green-200 transition-colors">
        Cargar Más Sesiones
      </button>
    </div>
  );
}
