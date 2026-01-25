import { useState } from 'react';
import { Settings, Wand2, RotateCw, Crop, Filter, ArrowLeft, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { Screen } from '../App';

interface PreprocessingScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function PreprocessingScreen({ onNavigate }: PreprocessingScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>("https://images.unsplash.com/photo-1704029809769-058e04426f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWF2ZXMlMjBwZXN0JTIwZGFtYWdlfGVufDF8fHx8MTc1ODkzMTg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processedImages, setProcessedImages] = useState<Array<{
    id: number;
    original: string;
    processed: string;
    improvements: string[];
  }>>([]);

  const [settings, setSettings] = useState({
    autoEnhance: true,
    noiseReduction: true,
    sharpening: true,
    colorCorrection: true,
    contrastBoost: 20,
    brightnessAdjust: 10,
    saturationBoost: 15,
  });

  const availableImages = [
    "https://images.unsplash.com/photo-1704029809769-058e04426f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWF2ZXMlMjBwZXN0JTIwZGFtYWdlfGVufDF8fHx8MTc1ODkzMTg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1704785119987-1d255fecb1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjcm9wcyUyMGZpZWxkJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU4OTMxODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const handleProcessImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simular proceso de preprocesamiento
    const steps = [
      "Analizando calidad de imagen...",
      "Reduciendo ruido...",
      "Ajustando contraste...",
      "Mejorando nitidez...",
      "Corrigiendo colores...",
      "Optimizando para análisis...",
      "Finalizando proceso..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingProgress(((i + 1) / steps.length) * 100);
      toast.info(steps[i]);
    }

    // Agregar imagen procesada
    const newProcessed = {
      id: Date.now(),
      original: selectedImage,
      processed: selectedImage, // En una app real, sería la imagen procesada
      improvements: [
        "Ruido reducido en 85%",
        "Contraste mejorado",
        "Nitidez aumentada",
        "Colores balanceados"
      ]
    };

    setProcessedImages(prev => [newProcessed, ...prev]);
    setIsProcessing(false);
    toast.success("Imagen procesada exitosamente");
  };

  const getImageStyle = (type: 'original' | 'processed') => {
    if (type === 'processed') {
      return {
        filter: `contrast(${100 + settings.contrastBoost}%) brightness(${100 + settings.brightnessAdjust}%) saturate(${100 + settings.saturationBoost}%)`
      };
    }
    return {};
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
        <h1 className="text-green-800">Preprocesamiento</h1>
      </div>

      {/* Image Selection */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="text-green-600" size={20} />
            Seleccionar Imagen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {availableImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === image ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing Settings */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="text-blue-600" size={20} />
            Configuración de Procesamiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Mejora Automática</label>
              <Switch
                checked={settings.autoEnhance}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoEnhance: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Reducción de Ruido</label>
              <Switch
                checked={settings.noiseReduction}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, noiseReduction: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Aumento de Nitidez</label>
              <Switch
                checked={settings.sharpening}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sharpening: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Corrección de Color</label>
              <Switch
                checked={settings.colorCorrection}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, colorCorrection: checked }))}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Contraste: +{settings.contrastBoost}%
              </label>
              <Slider
                value={[settings.contrastBoost]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, contrastBoost: value[0] }))}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Brillo: +{settings.brightnessAdjust}%
              </label>
              <Slider
                value={[settings.brightnessAdjust]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, brightnessAdjust: value[0] }))}
                max={30}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Saturación: +{settings.saturationBoost}%
              </label>
              <Slider
                value={[settings.saturationBoost]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, saturationBoost: value[0] }))}
                max={40}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      {selectedImage && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Original</h4>
                <ImageWithFallback
                  src={selectedImage}
                  alt="Imagen original"
                  className="w-full h-32 object-cover rounded-lg"
                  style={getImageStyle('original')}
                />
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Con ajustes</h4>
                <ImageWithFallback
                  src={selectedImage}
                  alt="Imagen con ajustes"
                  className="w-full h-32 object-cover rounded-lg"
                  style={getImageStyle('processed')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center space-y-4">
            <div className="animate-pulse">
              <Wand2 size={48} className="mx-auto text-blue-600 mb-4" />
            </div>
            <h3 className="text-blue-800">Procesando imagen...</h3>
            <Progress value={processingProgress} className="w-full" />
            <p className="text-sm text-blue-600">
              Aplicando filtros y optimizaciones para mejor detección
            </p>
          </CardContent>
        </Card>
      )}

      {/* Process Button */}
      {!isProcessing && selectedImage && (
        <Button 
          onClick={handleProcessImage}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          size="lg"
        >
          <Wand2 size={20} className="mr-2" />
          Procesar Imagen
        </Button>
      )}

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              Imágenes Procesadas ({processedImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processedImages.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <h5 className="text-xs text-gray-600 mb-1">Antes</h5>
                      <ImageWithFallback
                        src={item.original}
                        alt="Original"
                        className="w-full h-20 object-cover rounded"
                      />
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-600 mb-1">Después</h5>
                      <ImageWithFallback
                        src={item.processed}
                        alt="Procesada"
                        className="w-full h-20 object-cover rounded"
                        style={getImageStyle('processed')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h5 className="text-sm text-gray-800">Mejoras aplicadas:</h5>
                    <div className="flex flex-wrap gap-1">
                      {item.improvements.map((improvement, index) => (
                        <Badge key={index} className="bg-green-100 text-green-700 text-xs">
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      onClick={() => onNavigate('detection')}
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Analizar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Guardar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Tips */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <h4 className="text-yellow-800 mb-2">Consejos de Preprocesamiento</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• La reducción de ruido mejora la precisión en condiciones de poca luz</li>
            <li>• El aumento de contraste resalta mejor las características de las plagas</li>
            <li>• La corrección de color normaliza las variaciones de iluminación</li>
            <li>• Procesa siempre antes del análisis para mejores resultados</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}