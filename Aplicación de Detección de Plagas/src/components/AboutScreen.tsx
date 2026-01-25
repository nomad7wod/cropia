import { Info, Leaf, Shield, Users, Heart, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export function AboutScreen() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Acerca de la App</h1>
        <p className="text-gray-600">Protegiendo los cultivos de papa</p>
      </div>

      {/* Logo y versión */}
      <Card className="bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="bg-green-600 w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Leaf size={40} className="text-white" />
          </div>
          <h2 className="text-green-800">Plagas en Cultivos de Papa</h2>
          <Badge className="bg-green-600 text-white mt-2">Versión 1.0.0</Badge>
          <p className="text-gray-600 text-sm mt-3">
            Sistema inteligente de detección y manejo de plagas
          </p>
        </CardContent>
      </Card>

      {/* Misión */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Heart size={20} className="text-green-600" />
            </div>
            <h3 className="text-green-800">Nuestra Misión</h3>
          </div>
          <p className="text-gray-600">
            Ayudar a los agricultores a proteger sus cultivos mediante tecnología de detección temprana de plagas, 
            análisis climático y recomendaciones personalizadas, contribuyendo a una agricultura más sostenible y productiva.
          </p>
        </CardContent>
      </Card>

      {/* Características */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-green-800 mb-4">Características Principales</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1.5 rounded-lg mt-0.5">
                <Shield size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-gray-800">Detección Inteligente</h4>
                <p className="text-sm text-gray-600">
                  Visión computacional avanzada para identificar plagas
                </p>
              </div>
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1.5 rounded-lg mt-0.5">
                <Info size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-gray-800">Alertas en Tiempo Real</h4>
                <p className="text-sm text-gray-600">
                  Notificaciones climáticas y de riesgo personalizadas
                </p>
              </div>
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1.5 rounded-lg mt-0.5">
                <Leaf size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-gray-800">Recomendaciones Expertas</h4>
                <p className="text-sm text-gray-600">
                  Tratamientos específicos para cada tipo de plaga
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipo */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <h3 className="text-green-800">Desarrollado con ❤️</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Por un equipo dedicado de ingenieros agrónomos, desarrolladores y agricultores comprometidos 
            con la innovación en el sector agrícola.
          </p>
        </CardContent>
      </Card>

      {/* Enlaces */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-green-800 mb-4">Enlaces Útiles</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-green-50 rounded-lg transition-colors">
              <span className="text-gray-700">Política de Privacidad</span>
              <ExternalLink size={16} className="text-gray-400" />
            </button>
            <Separator className="bg-green-100" />
            <button className="w-full flex items-center justify-between p-3 hover:bg-green-50 rounded-lg transition-colors">
              <span className="text-gray-700">Términos de Uso</span>
              <ExternalLink size={16} className="text-gray-400" />
            </button>
            <Separator className="bg-green-100" />
            <button className="w-full flex items-center justify-between p-3 hover:bg-green-50 rounded-lg transition-colors">
              <span className="text-gray-700">Licencias de Código Abierto</span>
              <ExternalLink size={16} className="text-gray-400" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Información de contacto */}
      <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Plagas en Cultivos de Papa
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Todos los derechos reservados
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
