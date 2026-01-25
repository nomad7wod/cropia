import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

export function ProfileScreen() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Perfil del Usuario</h1>
        <p className="text-gray-600">Gestiona tu información personal</p>
      </div>

      {/* Avatar y nombre */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-green-100 text-green-700 text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-gray-800">Juan Pérez</h3>
              <p className="text-gray-600 text-sm">Agricultor</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Edit size={16} className="mr-2" />
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Información personal */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-green-800 mb-4">Información Personal</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Mail size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Correo electrónico</p>
                <p className="text-gray-800">juan.perez@ejemplo.com</p>
              </div>
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Phone size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Teléfono</p>
                <p className="text-gray-800">+51 987 654 321</p>
              </div>
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <MapPin size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Ubicación</p>
                <p className="text-gray-800">Cusco, Perú</p>
              </div>
            </div>

            <Separator className="bg-green-100" />

            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Calendar size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Miembro desde</p>
                <p className="text-gray-800">Enero 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
        <CardContent className="p-4">
          <h4 className="text-green-800 mb-3">Estadísticas</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-green-600">124</div>
              <div className="text-xs text-gray-600">Análisis realizados</div>
            </div>
            <div>
              <div className="text-orange-600">12</div>
              <div className="text-xs text-gray-600">Alertas recibidas</div>
            </div>
            <div>
              <div className="text-blue-600">5</div>
              <div className="text-xs text-gray-600">Parcelas registradas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
