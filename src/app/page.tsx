import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductGallery } from '@/components/product-gallery';
import { ProductDetails } from '@/components/product-details';
import { ThemeToggle } from '@/components/theme-toggle';
import { ShoppingCart } from 'lucide-react';

const product = {
  name: 'Aether-Watch Model V',
  price: '$599.99',
  description:
    'Experience the perfect blend of timeless design and cutting-edge technology. The Aether-Watch Model V features a scratch-resistant sapphire crystal face, a precision-engineered automatic movement, and a supple full-grain leather strap. Water-resistant up to 50 meters, it\'s the ideal companion for both boardrooms and back-country adventures. Stay connected with subtle smart notifications, all while enjoying the classic elegance of an analog timepiece.',
};

export default function Home() {
  const productImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('product-') || img.id.startsWith('thumb-')
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold">
            <ShoppingCart className="h-6 w-6" />
            <span className="text-lg">Bazaar Showcase</span>
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto my-8 md:my-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
            <ProductGallery images={productImages} />
            <ProductDetails
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built by an expert user experience designer.
          </p>
        </div>
      </footer>
    </div>
  );
}
