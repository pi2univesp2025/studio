"use client";

import Image from 'next/image';
import { useState } from 'react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type ProductGalleryProps = {
  images: ImagePlaceholder[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const mainImage = images.find(img => img.id === 'product-main') || images[0];
  const thumbnails = images.filter(img => img.id.startsWith('thumb-'));
  
  // To handle the case where the main image might be a thumbnail itself
  const allDisplayImages = [mainImage, ...thumbnails];

  const currentImage = allDisplayImages[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square w-full relative">
            <Image
              key={currentImage.id}
              src={currentImage.imageUrl}
              alt={currentImage.description}
              fill
              className="object-cover animate-in fade-in-50 duration-300"
              data-ai-hint={currentImage.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-4 gap-4">
        {allDisplayImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
              index === activeIndex && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
            )}
          >
            <div className="aspect-square relative w-full">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                sizes="25vw"
              />
            </div>
            <span className="sr-only">View image {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
