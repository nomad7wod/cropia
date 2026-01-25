import { useState } from 'react';
import { Camera, Image, Save, Trash2, ArrowLeft, Sliders, Sun, Contrast } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { Screen } from '../App';

interface CaptureScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function CaptureScreen({ onNavigate }: CaptureScreenProps) {
  const [capturedImages, setCapturedImages] = useState<Array<{
    id: number;
    src: string;
    timestamp: string;
    adjustments: {
      brightness: number;
      contrast: number;
      clarity: number;
    };
  }>>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    clarity: 0,
  });

  const handleCapture = () => {
    const newImage = {
      id: Date.now(),
      src: "https://images.unsplash.com/photo-1704029809769-058e04426f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWF2ZXMlMjBwZXN0JTIwZGFtYWdlfGVufDF8fHx8MTc1ODkzMTg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      timestamp: new Date().toLocaleString(),
      adjustments: { brightness: 0, contrast: 0, clarity: 0 }
    };
    setCapturedImages(prev => [newImage, ...prev]);
    setSelectedImage(newImage.id);
    toast.success('Imagen capturada exitosamente');
  };

  const handleSaveImage = () => {
    if (selectedImage) {
      const image = capturedImages.find(img => img.id === selectedImage);
      if (image) {
        setCapturedImages(prev => prev.map(img => 
          img.id === selectedImage 
            ? { ...img, adjustments: { ...adjustments } }
            : img
        ));
        toast.success('Imagen guardada con ajustes aplicados');
      }
    }
  };

  const handleDeleteImage = (id: number) => {
    setCapturedImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage === id) {
      setSelectedImage(null);
      setAdjustments({ brightness: 0, contrast: 0, clarity: 0 });
    }
    toast.success('Imagen eliminada');
  };

  const selectedImageData = capturedImages.find(img => img.id === selectedImage);

  const getImageStyle = (imageAdjustments: typeof adjustments) => ({
    filter: `brightness(${100 + imageAdjustments.brightness}%) contrast(${100 + imageAdjustments.contrast}%) saturate(${100 + imageAdjustments.clarity}%)`
  });

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
        <h1 className="text-green-800">Captura de Imágenes</h1>
      </div>

      {/* Camera Controls */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="text-green-600" size={20} />
            Cámara de Campo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <Camera size={48} className="mx-auto mb-2" />
              <p>Vista previa de la cámara</p>
              <p className="text-sm">Enfoca el área afectada</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleCapture}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Camera size={16} className="mr-2" />
              Capturar
            </Button>
            <Button 
              onClick={() => onNavigate('detection')}
              variant="outline"
              className="border-blue-600 text-blue-600"
            >
              <Image size={16} className="mr-2" />
              Galería
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Gallery */}
      {capturedImages.length > 0 && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="text-blue-600" size={20} />
              Imágenes Capturadas ({capturedImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {capturedImages.map((image) => (
                <div key={image.id} className="relative">
                  <button
                    onClick={() => {
                      setSelectedImage(image.id);
                      setAdjustments(image.adjustments);
                    }}
                    className={`w-full rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === image.id ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt="Imagen capturada"
                      className="w-full h-24 object-cover"
                      style={getImageStyle(image.adjustments)}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                  <div className="absolute bottom-1 left-1">
                    <Badge className="bg-black bg-opacity-70 text-white text-xs">
                      {image.timestamp.split(' ')[1]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Editor */}
      {selectedImageData && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sliders className="text-purple-600" size={20} />
              Editor de Imagen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Preview */}
            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src={selectedImageData.src}
                alt="Imagen seleccionada"
                className="w-full h-48 object-cover"
                style={getImageStyle(adjustments)}
              />
            </div>

            {/* Adjustment Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Sun size={14} />
                  Brillo: {adjustments.brightness > 0 ? '+' : ''}{adjustments.brightness}%
                </label>
                <Slider
                  value={[adjustments.brightness]}
                  onValueChange={(value) => setAdjustments(prev => ({ ...prev, brightness: value[0] }))}
                  max={50}
                  min={-50}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Contrast size={14} />
                  Contraste: {adjustments.contrast > 0 ? '+' : ''}{adjustments.contrast}%
                </label>
                <Slider
                  value={[adjustments.contrast]}
                  onValueChange={(value) => setAdjustments(prev => ({ ...prev, contrast: value[0] }))}
                  max={50}
                  min={-50}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Sliders size={14} />
                  Claridad: {adjustments.clarity > 0 ? '+' : ''}{adjustments.clarity}%
                </label>
                <Slider
                  value={[adjustments.clarity]}
                  onValueChange={(value) => setAdjustments(prev => ({ ...prev, clarity: value[0] }))}
                  max={50}
                  min={-50}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button 
                onClick={() => setAdjustments({ brightness: 0, contrast: 0, clarity: 0 })}
                variant="outline"
                size="sm"
              >
                Resetear
              </Button>
              <Button 
                onClick={handleSaveImage}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save size={14} className="mr-1" />
                Guardar
              </Button>
              <Button 
                onClick={() => onNavigate('preprocessing')}
                size="sm"
                variant="outline"
                className="border-blue-600 text-blue-600"
              >
                Procesar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photography Tips */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h4 className="text-green-800 mb-2">Consejos de Fotografía</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Usa luz natural abundante pero evita sombras fuertes</li>
            <li>• Mantén la cámara estable para evitar imágenes borrosas</li>
            <li>• Enfoca directamente las hojas o áreas afectadas</li>
            <li>• Toma múltiples ángulos de la misma planta</li>
            <li>• Limpia la lente antes de cada sesión</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {capturedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => onNavigate('detection')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Analizar Imágenes
          </Button>
          <Button 
            onClick={() => onNavigate('preprocessing')}
            variant="outline"
            className="border-purple-600 text-purple-600"
          >
            Preprocesamiento
          </Button>
        </div>
      )}
    </div>
  );
}