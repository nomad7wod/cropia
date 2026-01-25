import { HelpCircle, BookOpen, Video, MessageCircle, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function HelpScreen() {
  const tutorials = [
    {
      id: '1',
      title: 'Cómo Detectar Plagas',
      duration: '5 min',
      icon: Video,
    },
    {
      id: '2',
      title: 'Generar Reportes en PDF',
      duration: '3 min',
      icon: Video,
    },
    {
      id: '3',
      title: 'Usar el Mapa de Riesgos',
      duration: '4 min',
      icon: Video,
    },
  ];

  const faqs = [
    {
      question: '¿Cómo funciona la detección de plagas?',
      answer: 'La detección utiliza visión computacional avanzada para identificar plagas en las imágenes de tus cultivos. Simplemente captura una foto clara de la planta y el sistema analizará automáticamente la presencia de plagas.',
    },
    {
      question: '¿Qué hacer si recibo una alerta de riesgo alto?',
      answer: 'Si recibes una alerta de riesgo alto, revisa inmediatamente las recomendaciones de tratamiento en la sección correspondiente. Te sugerimos inspeccionar visualmente tus cultivos y aplicar las medidas preventivas indicadas.',
    },
    {
      question: '¿Cómo interpretar los datos del banner?',
      answer: 'El banner muestra condiciones ambientales clave: temperatura óptima (18-25°C), humedad relativa (60-80%), y nivel de riesgo calculado según las condiciones actuales. Puedes personalizar qué datos ver en Configuración.',
    },
    {
      question: '¿Puedo exportar los reportes?',
      answer: 'Sí, todos los reportes pueden exportarse en formato PDF o Excel desde la pantalla de reportes. Los datos incluyen análisis completo, imágenes y recomendaciones.',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-green-800">Centro de Ayuda</h1>
        <p className="text-gray-600">Encuentra respuestas y aprende a usar la app</p>
      </div>

      {/* Barra de búsqueda */}
      <Card className="border-green-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar ayuda..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tutoriales en video */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Video size={20} className="text-green-600" />
          <h3 className="text-gray-800">Tutoriales en Video</h3>
        </div>
        <div className="space-y-3">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="border-green-200">
              <CardContent className="p-4">
                <button className="w-full flex items-center justify-between hover:bg-green-50 rounded-lg p-2 -m-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <tutorial.icon size={18} className="text-green-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-800">{tutorial.title}</h4>
                      <p className="text-xs text-gray-600">{tutorial.duration}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preguntas frecuentes */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={20} className="text-green-600" />
          <h3 className="text-gray-800">Preguntas Frecuentes</h3>
        </div>
        <Card className="border-green-200">
          <CardContent className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Contacto */}
      <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <MessageCircle size={20} className="text-white" />
            </div>
            <h3 className="text-green-800">¿Necesitas más ayuda?</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Nuestro equipo de soporte está disponible para ayudarte
          </p>
          <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Contactar Soporte
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
