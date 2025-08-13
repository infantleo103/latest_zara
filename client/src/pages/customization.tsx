import { useState, useRef, useCallback } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Type, 
  Palette, 
  Move, 
  RotateCcw, 
  Download, 
  ShoppingCart,
  ArrowLeft,
  Eye,
  Trash2,
  Copy,
  Plus,
  Minus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cart";
import type { ProductWithCategory } from "@shared/schema";

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
  rotation: number;
}

interface ImageElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export default function Customization() {
  const { slug } = useParams();
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Design state
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Design tools state
  const [currentText, setCurrentText] = useState("");
  const [currentFontSize, setCurrentFontSize] = useState([20]);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentFont, setCurrentFont] = useState("Inter");
  const [currentWeight, setCurrentWeight] = useState("400");

  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', slug],
  }) as { data: ProductWithCategory; isLoading: boolean };

  const fonts = [
    "Inter", "Arial", "Helvetica", "Times New Roman", "Georgia", 
    "Verdana", "Courier New", "Impact", "Comic Sans MS"
  ];

  const fontWeights = [
    { value: "300", label: "Light" },
    { value: "400", label: "Regular" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semi Bold" },
    { value: "700", label: "Bold" },
    { value: "800", label: "Extra Bold" }
  ];

  const predefinedColors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#000080", "#008000"
  ];

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: ImageElement = {
          id: `img-${Date.now()}`,
          src: e.target?.result as string,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          rotation: 0
        };
        setImageElements(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const addTextElement = useCallback(() => {
    if (!currentText.trim()) return;
    
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      text: currentText,
      x: 50,
      y: 50,
      fontSize: currentFontSize[0],
      fontFamily: currentFont,
      color: currentColor,
      fontWeight: currentWeight,
      rotation: 0
    };
    
    setTextElements(prev => [...prev, newText]);
    setCurrentText("");
  }, [currentText, currentFontSize, currentFont, currentColor, currentWeight]);

  const updateTextElement = useCallback((id: string, updates: Partial<TextElement>) => {
    setTextElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  }, []);

  const updateImageElement = useCallback((id: string, updates: Partial<ImageElement>) => {
    setImageElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setTextElements(prev => prev.filter(el => el.id !== id));
    setImageElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  const duplicateElement = useCallback((id: string) => {
    const textEl = textElements.find(el => el.id === id);
    const imageEl = imageElements.find(el => el.id === id);
    
    if (textEl) {
      const newText: TextElement = {
        ...textEl,
        id: `text-${Date.now()}`,
        x: textEl.x + 20,
        y: textEl.y + 20
      };
      setTextElements(prev => [...prev, newText]);
    } else if (imageEl) {
      const newImage: ImageElement = {
        ...imageEl,
        id: `img-${Date.now()}`,
        x: imageEl.x + 20,
        y: imageEl.y + 20
      };
      setImageElements(prev => [...prev, newImage]);
    }
  }, [textElements, imageElements]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicked on any element
    let clickedElement = null;
    
    // Check text elements (simple bounding box check)
    for (const textEl of textElements) {
      if (x >= textEl.x && x <= textEl.x + 100 && y >= textEl.y && y <= textEl.y + 30) {
        clickedElement = textEl.id;
        break;
      }
    }
    
    // Check image elements
    if (!clickedElement) {
      for (const imageEl of imageElements) {
        if (x >= imageEl.x && x <= imageEl.x + imageEl.width && 
            y >= imageEl.y && y <= imageEl.y + imageEl.height) {
          clickedElement = imageEl.id;
          break;
        }
      }
    }
    
    setSelectedElement(clickedElement);
  }, [textElements, imageElements]);

  const handleElementDrag = useCallback((id: string, deltaX: number, deltaY: number) => {
    const textEl = textElements.find(el => el.id === id);
    const imageEl = imageElements.find(el => el.id === id);
    
    if (textEl) {
      updateTextElement(id, { x: textEl.x + deltaX, y: textEl.y + deltaY });
    } else if (imageEl) {
      updateImageElement(id, { x: imageEl.x + deltaX, y: imageEl.y + deltaY });
    }
  }, [textElements, imageElements, updateTextElement, updateImageElement]);

  const addToCart = useCallback(async () => {
    if (!product) return;

    try {
      // Save custom design first
      const designData = {
        productId: product.id,
        textElements,
        imageElements,
        canvas: {
          width: 600,
          height: 600
        }
      };

      const response = await fetch('/api/custom-designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      });

      if (response.ok) {
        const { designId } = await response.json();
        
        // Add to cart with custom design ID
        addItem(product.id, 1, "Custom", `Custom Design #${designId.slice(-6)}`);
        
        toast({
          title: "Added to cart",
          description: "Your customized product has been saved and added to cart",
        });
      } else {
        throw new Error('Failed to save design');
      }
    } catch (error) {
      console.error('Error saving custom design:', error);
      toast({
        title: "Error",
        description: "Failed to save your custom design. Please try again.",
        variant: "destructive",
      });
    }
  }, [product, textElements, imageElements, addItem, toast]);

  const selectedTextElement = textElements.find(el => el.id === selectedElement);
  const selectedImageElement = imageElements.find(el => el.id === selectedElement);

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extralight tracking-widest text-gray-900 dark:text-white mb-2">
                CUSTOMIZE {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Design your perfect piece with our customization tools
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                data-testid="button-toggle-preview"
              >
                <Eye className="mr-2 h-4 w-4" />
                {isPreviewMode ? "Edit" : "Preview"}
              </Button>
              <Button onClick={addToCart} data-testid="button-add-custom-to-cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ${product.price}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Design Tools Panel */}
          {!isPreviewMode && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-light">Design Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="text" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Text</TabsTrigger>
                      <TabsTrigger value="images">Images</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="text" className="space-y-4">
                      <div className="space-y-3">
                        <Label>Add Text</Label>
                        <Input
                          value={currentText}
                          onChange={(e) => setCurrentText(e.target.value)}
                          placeholder="Enter your text"
                          data-testid="input-custom-text"
                        />
                        <Button 
                          onClick={addTextElement}
                          className="w-full"
                          disabled={!currentText.trim()}
                          data-testid="button-add-text"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Text
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label>Font Family</Label>
                        <Select value={currentFont} onValueChange={setCurrentFont}>
                          <SelectTrigger data-testid="select-font-family">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fonts.map(font => (
                              <SelectItem key={font} value={font}>{font}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Font Size: {currentFontSize[0]}px</Label>
                        <Slider
                          value={currentFontSize}
                          onValueChange={setCurrentFontSize}
                          min={8}
                          max={72}
                          step={1}
                          data-testid="slider-font-size"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Font Weight</Label>
                        <Select value={currentWeight} onValueChange={setCurrentWeight}>
                          <SelectTrigger data-testid="select-font-weight">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontWeights.map(weight => (
                              <SelectItem key={weight.value} value={weight.value}>
                                {weight.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Text Color</Label>
                        <div className="grid grid-cols-5 gap-2 mb-2">
                          {predefinedColors.map(color => (
                            <button
                              key={color}
                              onClick={() => setCurrentColor(color)}
                              className={`w-8 h-8 rounded border-2 ${
                                currentColor === color ? 'border-gray-900' : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: color }}
                              data-testid={`color-${color}`}
                            />
                          ))}
                        </div>
                        <Input
                          type="color"
                          value={currentColor}
                          onChange={(e) => setCurrentColor(e.target.value)}
                          className="h-10"
                          data-testid="input-custom-color"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="images" className="space-y-4">
                      <div className="space-y-3">
                        <Label>Upload Image</Label>
                        <div
                          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                          data-testid="upload-image-area"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click to upload image
                          </p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          data-testid="input-upload-image"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Element Controls */}
                  {selectedElement && (selectedTextElement || selectedImageElement) && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-3">
                        <Label>Selected Element</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => duplicateElement(selectedElement)}
                            data-testid="button-duplicate-element"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteElement(selectedElement)}
                            data-testid="button-delete-element"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {selectedTextElement && (
                          <div className="space-y-3">
                            <Input
                              value={selectedTextElement.text}
                              onChange={(e) => updateTextElement(selectedElement, { text: e.target.value })}
                              placeholder="Edit text"
                              data-testid="input-edit-text"
                            />
                            <div>
                              <Label>Size: {selectedTextElement.fontSize}px</Label>
                              <Slider
                                value={[selectedTextElement.fontSize]}
                                onValueChange={([value]) => updateTextElement(selectedElement, { fontSize: value })}
                                min={8}
                                max={72}
                                step={1}
                                data-testid="slider-edit-font-size"
                              />
                            </div>
                            <Input
                              type="color"
                              value={selectedTextElement.color}
                              onChange={(e) => updateTextElement(selectedElement, { color: e.target.value })}
                              data-testid="input-edit-text-color"
                            />
                          </div>
                        )}
                        
                        {selectedImageElement && (
                          <div className="space-y-3">
                            <div>
                              <Label>Width: {selectedImageElement.width}px</Label>
                              <Slider
                                value={[selectedImageElement.width]}
                                onValueChange={([value]) => updateImageElement(selectedElement, { width: value })}
                                min={20}
                                max={300}
                                step={1}
                                data-testid="slider-edit-image-width"
                              />
                            </div>
                            <div>
                              <Label>Height: {selectedImageElement.height}px</Label>
                              <Slider
                                value={[selectedImageElement.height]}
                                onValueChange={([value]) => updateImageElement(selectedElement, { height: value })}
                                min={20}
                                max={300}
                                step={1}
                                data-testid="slider-edit-image-height"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Canvas Area */}
          <div className={isPreviewMode ? "lg:col-span-4" : "lg:col-span-3"}>
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="text-lg font-light">Design Canvas</CardTitle>
                <CardDescription>
                  Click and drag elements to position them on your product
                </CardDescription>
              </CardHeader>
              <CardContent className="relative h-full">
                <div
                  className="relative w-full h-full bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden cursor-crosshair"
                  onClick={handleCanvasClick}
                  data-testid="design-canvas"
                  style={{
                    backgroundImage: `url(${product.images[0]})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Text Elements */}
                  {textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`absolute cursor-move select-none ${
                        selectedElement === textEl.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      style={{
                        left: textEl.x,
                        top: textEl.y,
                        fontSize: textEl.fontSize,
                        fontFamily: textEl.fontFamily,
                        color: textEl.color,
                        fontWeight: textEl.fontWeight,
                        transform: `rotate(${textEl.rotation}deg)`,
                        userSelect: 'none'
                      }}
                      onMouseDown={(e) => {
                        setSelectedElement(textEl.id);
                        setDraggedElement(textEl.id);
                        e.preventDefault();
                      }}
                      data-testid={`text-element-${textEl.id}`}
                    >
                      {textEl.text}
                    </div>
                  ))}

                  {/* Image Elements */}
                  {imageElements.map((imageEl) => (
                    <div
                      key={imageEl.id}
                      className={`absolute cursor-move ${
                        selectedElement === imageEl.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      style={{
                        left: imageEl.x,
                        top: imageEl.y,
                        width: imageEl.width,
                        height: imageEl.height,
                        transform: `rotate(${imageEl.rotation}deg)`
                      }}
                      onMouseDown={(e) => {
                        setSelectedElement(imageEl.id);
                        setDraggedElement(imageEl.id);
                        e.preventDefault();
                      }}
                      data-testid={`image-element-${imageEl.id}`}
                    >
                      <img
                        src={imageEl.src}
                        alt="Custom"
                        className="w-full h-full object-cover rounded"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}