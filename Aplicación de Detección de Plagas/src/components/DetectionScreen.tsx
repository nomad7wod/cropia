import { useState } from 'react';
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen } from '../App';

interface DetectionScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function DetectionScreen({ onNavigate }: DetectionScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleDetection = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setCapturedImage("https://images.unsplash.com/photo-1704029809769-058e04426f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWF2ZXMlMjBwZXN0JTIwZGFtYWdlfGVufDF8fHx8MTc1ODkzMTg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");

    // Simular progreso de análisis
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setScanProgress(i);
    }

    // Simular resultados
    setResults({
      pestDetected: true,
      pestType: "Tizón Tardío (Phytophthora infestans)",
      confidence: 87,
      severity: "Moderado",
      affectedArea: "25%",
      recommendations: [
        "Aplicar fungicida sistémico",
        "Mejorar ventilación del cultivo",
        "Reducir riego foliar",
        "Monitorear cada 3 días"
      ]
    });

    setIsScanning(false);
  };

  const resetDetection = () => {
    setResults(null);
    setCapturedImage(null);
    setScanProgress(0);
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
        <h1 className="text-green-800">Detección de Plagas</h1>
      </div>

      {/* Camera/Upload Section */}
      {!capturedImage && !isScanning && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="text-green-600" size={20} />
              Capturar Imagen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <Camera size={48} className="mx-auto mb-2" />
                <p>Toca para activar la cámara</p>
                <p className="text-sm">o selecciona una imagen</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleDetection}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Camera size={16} className="mr-2" />
                Tomar Foto
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDetection}
                className="border-green-600 text-green-600"
              >
                <Upload size={16} className="mr-2" />
                Subir Imagen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="border-blue-200">
          <CardContent className="p-6 text-center space-y-4">
            <div className="animate-pulse">
              <Scan size={48} className="mx-auto text-blue-600 mb-4" />
            </div>
            <h3>Analizando imagen...</h3>
            <Progress value={scanProgress} className="w-full" />
            <p className="text-sm text-gray-600">
              Procesando con modelos de visión computacional
            </p>
          </CardContent>
        </Card>
      )}

      {/* Captured Image */}
      {capturedImage && !isScanning && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Imagen Capturada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src={capturedImage}
                alt="Imagen capturada del cultivo"
                className="w-full h-48 object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <Card className={`border-2 ${results.pestDetected ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {results.pestDetected ? (
                  <>
                    <AlertTriangle className="text-red-600" size={20} />
                    <span className="text-red-800">Plaga Detectada</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-800">Cultivo Saludable</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.pestDetected && (
                <>
                  <div>
                    <h4 className="text-red-800 mb-1">Tipo de Plaga</h4>
                    <p className="text-red-700">{results.pestType}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-red-600">{results.confidence}%</div>
                      <div className="text-xs text-gray-600">Confianza</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-600">{results.severity}</div>
                      <div className="text-xs text-gray-600">Severidad</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600">{results.affectedArea}</div>
                      <div className="text-xs text-gray-600">Área afectada</div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {results.pestDetected && (
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Recomendaciones Inmediatas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => onNavigate('recommendations')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ver Tratamientos
            </Button>
            <Button 
              onClick={resetDetection}
              variant="outline"
              className="border-green-600 text-green-600"
            >
              Nueva Detección
            </Button>
          </div>
        </div>
      )}

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="text-blue-800 mb-2">Consejos para mejor detección</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Toma fotos con buena iluminación natural</li>
            <li>• Enfoca las hojas o áreas afectadas</li>
            <li>• Evita fotos borrosas o muy lejanas</li>
            <li>• Limpia la lente de tu cámara</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}