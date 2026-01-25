import { useState } from 'react';
import { Lightbulb, Bookmark, CheckCircle, Clock, ArrowLeft, Sprout, Droplets, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Screen } from '../App';

interface RecommendationsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function RecommendationsScreen({ onNavigate }: RecommendationsScreenProps) {
  const [savedRecommendations, setSavedRecommendations] = useState<number[]>([]);

  const recommendations = {
    immediate: [
      {
        id: 1,
        title: "Aplicar Fungicida Sistémico",
        description: "Para controlar el Tizón Tardío detectado en Sector A-3",
        priority: "Alta",
        timeframe: "Inmediato (hoy)",
        products: ["Ridomil Gold", "Metalaxyl + Mancozeb"],
        dosage: "2.5 kg/ha",
        application: "Foliar con equipo de aspersión"
      },
      {
        id: 2,
        title: "Mejorar Drenaje",
        description: "Reducir humedad excesiva que favorece hongos",
        priority: "Alta",
        timeframe: "2-3 días",
        products: ["Trabajo mecánico"],
        dosage: "N/A",
        application: "Surcos de drenaje cada 50m"
      }
    ],
    preventive: [
      {
        id: 3,
        title: "Rotación de Cultivos",
        description: "Planificar rotación para próxima temporada",
        priority: "Media",
        timeframe: "Próxima siembra",
        products: ["Leguminosas", "Cereales"],
        dosage: "N/A",
        application: "Alternar con papa cada 2-3 años"
      },
      {
        id: 4,
        title: "Monitoreo Preventivo",
        description: "Inspección semanal de plantas indicadoras",
        priority: "Media",
        timeframe: "Semanal",
        products: ["Inspección visual"],
        dosage: "N/A",
        application: "5% de plantas por sector"
      }
    ],
    cultural: [
      {
        id: 5,
        title: "Manejo de Residuos",
        description: "Eliminación de restos vegetales infectados",
        priority: "Alta",
        timeframe: "2-3 días",
        products: ["Trabajo manual"],
        dosage: "N/A",
        application: "Recolección y quema controlada"
      },
      {
        id: 6,
        title: "Espaciamiento de Plantas",
        description: "Mejorar ventilación entre plantas",
        priority: "Baja",
        timeframe: "Próxima siembra",
        products: ["Planificación"],
        dosage: "N/A",
        application: "Aumentar 20% distancia entre hileras"
      }
    ]
  };

  const environmentalTips = [
    {
      icon: Sun,
      title: "Condiciones Óptimas",
      description: "Temperatura 15-20°C, humedad relativa 60-70%"
    },
    {
      icon: Droplets,
      title: "Riego Controlado",
      description: "Riego por goteo, evitar aspersión foliar tarde"
    },
    {
      icon: Sprout,
      title: "Nutrición Balanceada",
      description: "NPK equilibrado, evitar exceso de nitrógeno"
    }
  ];

  const handleSaveRecommendation = (id: number) => {
    if (savedRecommendations.includes(id)) {
      setSavedRecommendations(prev => prev.filter(r => r !== id));
      toast.success("Recomendación removida de guardados");
    } else {
      setSavedRecommendations(prev => [...prev, id]);
      toast.success("Recomendación guardada para después");
    }
  };

  const handleFollowRecommendation = (title: string) => {
    toast.success(`Siguiendo recomendación: ${title}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta': return 'bg-red-100 text-red-700';
      case 'media': return 'bg-orange-100 text-orange-700';
      case 'baja': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const RecommendationCard = ({ recommendation, type }: { recommendation: any, type: string }) => (
    <Card key={recommendation.id} className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{recommendation.title}</CardTitle>
          <Badge className={getPriorityColor(recommendation.priority)}>
            {recommendation.priority}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{recommendation.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Tiempo:</span>
            <p className="text-gray-800">{recommendation.timeframe}</p>
          </div>
          <div>
            <span className="text-gray-500">Aplicación:</span>
            <p className="text-gray-800">{recommendation.application}</p>
          </div>
        </div>
        
        {recommendation.products[0] !== "N/A" && (
          <div className="text-sm">
            <span className="text-gray-500">Productos:</span>
            <p className="text-gray-800">{recommendation.products.join(", ")}</p>
            {recommendation.dosage !== "N/A" && (
              <p className="text-gray-600">Dosis: {recommendation.dosage}</p>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => handleFollowRecommendation(recommendation.title)}
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle size={14} className="mr-1" />
            Seguir
          </Button>
          <Button 
            onClick={() => handleSaveRecommendation(recommendation.id)}
            size="sm"
            variant="outline"
            className={`${savedRecommendations.includes(recommendation.id) 
              ? 'bg-blue-50 border-blue-600 text-blue-600' 
              : 'border-gray-300'}`}
          >
            <Bookmark size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
        <h1 className="text-green-800">Recomendaciones</h1>
      </div>

      {/* Environmental Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Lightbulb className="text-blue-600" size={20} />
            Consejos Ambientales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {environmentalTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <tip.icon size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-blue-800 text-sm">{tip.title}</h4>
                  <p className="text-blue-700 text-sm">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Tabs */}
      <Tabs defaultValue="immediate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="immediate">Inmediatas</TabsTrigger>
          <TabsTrigger value="preventive">Preventivas</TabsTrigger>
          <TabsTrigger value="cultural">Culturales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="immediate" className="space-y-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="text-red-600" size={16} />
            <span className="text-red-700 text-sm">Acción inmediata requerida</span>
          </div>
          {recommendations.immediate.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} type="immediate" />
          ))}
        </TabsContent>
        
        <TabsContent value="preventive" className="space-y-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-orange-600" size={16} />
            <span className="text-orange-700 text-sm">Medidas preventivas</span>
          </div>
          {recommendations.preventive.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} type="preventive" />
          ))}
        </TabsContent>
        
        <TabsContent value="cultural" className="space-y-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="text-green-600" size={16} />
            <span className="text-green-700 text-sm">Prácticas culturales</span>
          </div>
          {recommendations.cultural.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} type="cultural" />
          ))}
        </TabsContent>
      </Tabs>

      {/* Saved Recommendations */}
      {savedRecommendations.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Bookmark className="text-yellow-600" size={20} />
              Guardadas para Después ({savedRecommendations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => onNavigate('history')}
              variant="outline"
              className="w-full border-yellow-600 text-yellow-600"
            >
              Ver todas las recomendaciones guardadas
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}