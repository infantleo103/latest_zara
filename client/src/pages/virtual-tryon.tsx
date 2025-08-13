import { useState, useRef } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, Download, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ProductWithCategory } from "@shared/schema";

export default function VirtualTryOn() {
  const { slug } = useParams();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', slug],
  }) as { data: ProductWithCategory; isLoading: boolean };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !product) return;

    setIsProcessing(true);
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, use a placeholder result
      setResultImage(product.images[0]);
      
      toast({
        title: "Virtual try-on complete!",
        description: "Your personalized look is ready",
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extralight tracking-widest text-gray-900 dark:text-white mb-4">
            PRODUCT NOT FOUND
          </h1>
          <p className="text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              asChild
              className="mb-4"
              data-testid="button-back-to-product"
            >
              <Link href={`/product/${slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Product
              </Link>
            </Button>
            <h1 className="text-3xl font-extralight tracking-widest text-gray-900 dark:text-white mb-2">
              VIRTUAL TRY-ON
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              See how <strong>{product.name}</strong> looks on you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Upload Your Photo
                </CardTitle>
                <CardDescription>
                  Upload a clear, front-facing photo for the best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!userImage ? (
                  <div
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="upload-area"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Click to upload your photo
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Supports JPG, PNG up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={userImage}
                        alt="Your photo"
                        className="w-full h-64 object-cover rounded-lg"
                        data-testid="img-user-upload"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      data-testid="button-change-photo"
                    >
                      Change Photo
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="input-file-upload"
                />

                {userImage && (
                  <Button
                    onClick={handleTryOn}
                    disabled={isProcessing}
                    className="w-full h-12 text-lg font-light tracking-widest"
                    data-testid="button-start-tryon"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        START VIRTUAL TRY-ON
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Your Virtual Look
                </CardTitle>
                <CardDescription>
                  AI-generated preview of how the item looks on you
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!resultImage ? (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Upload your photo to see the virtual try-on result
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={resultImage}
                        alt="Virtual try-on result"
                        className="w-full h-64 object-cover rounded-lg"
                        data-testid="img-tryon-result"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                          data-testid="button-download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setResultImage(null)}
                        className="flex-1"
                        data-testid="button-try-again"
                      >
                        Try Again
                      </Button>
                      <Button
                        asChild
                        className="flex-1"
                        data-testid="button-add-to-cart"
                      >
                        <Link href={`/product/${slug}`}>
                          Add to Cart
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Clear Front-Facing Photo</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use a well-lit photo facing the camera directly
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">High Quality Image</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload images in good resolution for better results
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">AI Technology</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Powered by advanced AI for realistic try-on experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}