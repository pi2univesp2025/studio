
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Heart, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrls: string[];
  imageHint: string;
  description: string;
};

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden group transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
          <CardContent className="p-0">
            <div className="aspect-[4/5] w-full relative">
              <Image
                src={product.imageUrls[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {product.imageUrls.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/75 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/75 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </CardContent>
          <div className="p-4 bg-background flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-muted-foreground">{product.price}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleToggleFavorite}>
              <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="aspect-square w-full relative mb-4">
             <Image
                src={product.imageUrls[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                data-ai-hint={product.imageHint}
              />
               {product.imageUrls.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/75 text-foreground"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/75 text-foreground"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
          </div>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription className="text-lg">{product.price}</DialogDescription>
        </DialogHeader>
        <p>{product.description}</p>
        <DialogFooter>
          <Button className="w-full" onClick={(e) => e.stopPropagation()}>
            <ShoppingCart className="mr-2 h-4 w-4" /> COMPRAR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
