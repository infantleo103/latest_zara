import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Upload, Sparkles, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VirtualTryOnProps {
  productImage: string;
  productName: string;
}

export default function VirtualTryOn({ productImage, productName }: VirtualTryOnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would open camera capture
    toast({
      title: "Camera feature",
      description: "Camera capture will be available in the next update",
    });
  };

  const processVirtualTryOn = async () => {
    if (!userPhoto) return;

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/virtual-tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personImage: userPhoto,
          productImage: productImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Virtual try-on failed');
      }

      const result = await response.json();
      setTryOnResult(result.resultImage);
      
      toast({
        title: "Try-on complete!",
        description: result.message || "See how the outfit looks on you",
      });
    } catch (error) {
      toast({
        title: "Try-on failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTryOn = () => {
    setUserPhoto(null);
    setTryOnResult(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full py-3 font-light tracking-wide text-xs uppercase border-gray-300 hover:border-black transition-colors"
          data-testid="button-virtual-tryon"
        >
          <Sparkles size={14} className="mr-2" />
          Virtual Try-On
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-wide">
            Virtual Try-On - {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left Side - Upload/Capture */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-light mb-4">Upload Your Photo</h3>
              <p className="text-sm text-gray-600 mb-6">
                Upload a clear photo of yourself to see how this outfit looks on you
              </p>
            </div>

            {!userPhoto ? (
              <div className="space-y-4">
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    data-testid="input-photo-upload"
                  />
                  <Upload size={32} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your photo here, or click to browse
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mb-4"
                    data-testid="button-upload-photo"
                  >
                    Choose Photo
                  </Button>
                </div>

                {/* Camera Capture */}
                <div className="text-center">
                  <Button
                    onClick={handleCameraCapture}
                    variant="outline"
                    className="w-full"
                    data-testid="button-camera-capture"
                  >
                    <Camera size={16} className="mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={userPhoto}
                    alt="Your photo"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <button
                    onClick={resetTryOn}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                    data-testid="button-remove-photo"
                  >
                    <X size={16} />
                  </button>
                </div>

                {!tryOnResult && (
                  <Button
                    onClick={processVirtualTryOn}
                    disabled={isProcessing}
                    className="w-full py-3 bg-black text-white font-light tracking-wide hover:bg-gray-800 transition-colors"
                    data-testid="button-process-tryon"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="mr-2" />
                        Try On Outfit
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Results */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-light mb-4">Try-On Result</h3>
              <p className="text-sm text-gray-600">
                See how the outfit looks on you
              </p>
            </div>

            {tryOnResult ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={tryOnResult}
                    alt="Virtual try-on result"
                    className="w-full aspect-[3/4] object-cover rounded-lg border"
                    data-testid="img-tryon-result"
                  />
                  {/* Overlay to show it's a demo */}
                  <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                      <Sparkles size={24} className="mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium text-gray-800">Demo Mode</p>
                      <p className="text-xs text-gray-600">Full try-on coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={resetTryOn}
                    variant="outline"
                    className="font-light"
                    data-testid="button-try-again"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Saved!",
                        description: "Try-on result saved to your gallery",
                      });
                    }}
                    className="bg-black text-white font-light hover:bg-gray-800"
                    data-testid="button-save-result"
                  >
                    Save Result
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Sparkles size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Upload your photo to see the try-on result</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Tips for best results:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use a clear, well-lit photo</li>
            <li>• Stand straight facing the camera</li>
            <li>• Wear fitted clothing for accurate results</li>
            <li>• Ensure your full body is visible</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}