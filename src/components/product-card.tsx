
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
  DialogClose,
} from '@/components/ui/dialog';
import { Heart, ChevronLeft, ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';

type Product = {
  id: string; // Changed to string to match Firestore ID
  name: string;
  price: string;
  discountPrice?: string;
  imageUrls: string[];
  imageHint: string;
  description: string;
};

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isInCart: boolean;
  onToggleInCart: () => void;
}

function ProductDialogContent({ product, isInCart, onToggleInCart }: { product: Product, isInCart: boolean, onToggleInCart: (e: React.MouseEvent) => void }) {
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

    return (
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="aspect-square w-full relative mb-4">
             <Image
                src={product.imageUrls[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain rounded-md"
                data-ai-hint={product.imageHint}
                sizes="100vw"
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
          <DialogDescription className="text-lg flex items-baseline gap-2">
            <span>{product.discountPrice || product.price}</span>
            {product.discountPrice && <span className="text-sm text-muted-foreground line-through">{product.price}</span>}
          </DialogDescription>
        </DialogHeader>
        <p>{product.description}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" onClick={onToggleInCart} variant={isInCart ? 'destructive' : 'default'}>
              {isInCart ? (
                <>
                  <Trash2 className="mr-2 h-4 w-4" /> DESCARTAR
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> COMPRAR
                </>
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    );
}

export function ProductCard({ product, isFavorite, onToggleFavorite, isInCart, onToggleInCart }: ProductCardProps) {

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite();
  }

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleInCart();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden group transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
          <CardContent className="p-0">
            <div className="aspect-[4/5] w-full relative">
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-contain"
                data-ai-hint={product.imageHint}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
               {isInCart && (
                <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1.5 shadow-md">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
          </CardContent>
          <div className="p-4 bg-background flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="flex items-baseline gap-2 text-muted-foreground">
                <span>{product.discountPrice || product.price}</span>
                {product.discountPrice && <span className="text-xs line-through">{product.price}</span>}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleToggleFavorite}>
              <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      <ProductDialogContent product={product} isInCart={isInCart} onToggleInCart={handleBuyClick} />
    </Dialog>
  );
}
