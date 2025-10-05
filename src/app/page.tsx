
'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Heart,
  Package,
  Search,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WhatsappIcon } from '@/components/ui/whatsapp-icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProductCard } from '@/components/product-card';

const products = [
  {
    id: 1,
    name: 'Blusa Estilosa',
    price: 'R$ 89,90',
    category: 'BLUSAS',
    imageUrls: [
      'https://picsum.photos/seed/1/400/500',
      'https://picsum.photos/seed/11/400/500',
      'https://picsum.photos/seed/111/400/500',
    ],
    imageHint: 'stylish blouse',
    description: 'Uma blusa estilosa para todas as ocasiões. Feita com tecido de alta qualidade para garantir conforto e durabilidade.'
  },
  {
    id: 2,
    name: 'Calça Jeans',
    price: 'R$ 129,90',
    category: 'CALÇAS',
    imageUrls: [
      'https://picsum.photos/seed/2/400/500',
      'https://picsum.photos/seed/22/400/500',
      'https://picsum.photos/seed/222/400/500',
    ],
    imageHint: 'denim pants',
    description: 'Calça jeans com corte moderno e caimento perfeito. Ideal para compor looks casuais e despojados.'
  },
  {
    id: 3,
    name: 'Vestido Floral',
    price: 'R$ 159,90',
    category: 'VESTIDOS',
    imageUrls: [
      'https://picsum.photos/seed/3/400/500',
      'https://picsum.photos/seed/33/400/500',
      'https://picsum.photos/seed/333/400/500',
    ],
    imageHint: 'floral dress',
    description: 'Vestido floral leve e romântico. Perfeito para passeios ao ar livre e eventos durante o dia.'
  },
  {
    id: 4,
    name: 'Bolsa de Couro',
    price: 'R$ 199,90',
    category: 'BOLSAS',
    imageUrls: [
        'https://picsum.photos/seed/4/400/500',
        'https://picsum.photos/seed/44/400/500',
        'https://picsum.photos/seed/444/400/500',
    ],
    imageHint: 'leather bag',
    description: 'Bolsa de couro legítimo com design elegante e espaçosa. Um acessório indispensável para o dia a dia.'
  }
];


export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shoppingCart, setShoppingCart] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('TODOS');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowFavoritesOnly(false); // Reset favorites filter when a category is clicked
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };
  
  const toggleInCart = (productId: number) => {
    setShoppingCart((prevCart) =>
      prevCart.includes(productId)
        ? prevCart.filter((id) => id !== productId)
        : [...prevCart, productId]
    );
  };

  const handleShowFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setSelectedCategory('TODOS'); // Reset category filter when showing favorites
  }

  const categoryFilteredProducts = selectedCategory === 'TODOS'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const displayedProducts = showFavoritesOnly
    ? products.filter((p) => favorites.includes(p.id))
    : categoryFilteredProducts;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              Protótipo Bazar
            </a>
            <div className="hidden md:flex flex-1 max-w-md items-center gap-4">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="BUSCA"
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="flex items-center gap-2" onClick={handleShowFavorites}>
                <Heart className={`h-5 w-5 ${showFavoritesOnly ? 'text-red-500 fill-current' : ''}`} />
                <span>FAVORITOS</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>MEUS PEDIDOS</span>
              </Button>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Input type="search" placeholder="BUSCA" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShowFavorites}>
                    <Heart className={`mr-2 h-4 w-4 ${showFavoritesOnly ? 'text-red-500 fill-current' : ''}`} /> FAVORITOS
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" /> MEUS PEDIDOS
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <nav className="flex h-12 items-center justify-center gap-6">
            <Button variant={selectedCategory === 'TODOS' ? "secondary" : "ghost"} className="text-sm font-medium" onClick={() => handleCategoryClick('TODOS')}>
              TODOS
            </Button>
            <Button variant={selectedCategory === 'BLUSAS' ? "secondary" : "ghost"} className="text-sm font-medium" onClick={() => handleCategoryClick('BLUSAS')}>
              BLUSAS
            </Button>
            <Button variant={selectedCategory === 'VESTIDOS' ? "secondary" : "ghost"} className="text-sm font-medium" onClick={() => handleCategoryClick('VESTIDOS')}>
              VESTIDOS
            </Button>
            <Button variant={selectedCategory === 'CALÇAS' ? "secondary" : "ghost"} className="text-sm font-medium" onClick={() => handleCategoryClick('CALÇAS')}>
              CALÇAS
            </Button>
            <Button variant={selectedCategory === 'CALÇADOS' ? "secondary" : "ghost"} className="text-sm font-medium" onClick={() => handleCategoryClick('CALÇADOS')}>
              CALÇADOS
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  OUTROS <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleCategoryClick('ACESSORIOS')}>Acessórios</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick('BOLSAS')}>Bolsas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick('DECORACAO')}>Decoração</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick('MOVEIS')}>Móveis</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick('BRINQUEDOS')}>Brinquedos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 my-8">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
                isInCart={shoppingCart.includes(product.id)}
                onToggleInCart={() => toggleInCart(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
            <p>{showFavoritesOnly ? "NENHUM ITEM ADICIONADO AOS FAVORITOS" : "Nenhum produto encontrado nesta categoria."}</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-[90px] right-6 flex flex-col items-center z-50 gap-2">
        <span className="bg-background text-foreground text-sm font-medium px-3 py-1.5 rounded-full shadow-lg">Compre Aqui</span>
        <Button
          variant="default"
          className="h-16 w-16 rounded-full shadow-lg flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white dark:text-white"
        >
          <WhatsappIcon className="h-8 w-8" />
        </Button>
      </div>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex justify-center items-center gap-6 text-sm">
          <Button variant="link" className="text-muted-foreground" asChild>
            <Link href="/sobre">SOBRE NÓS</Link>
          </Button>
          <Button variant="link" className="text-muted-foreground">AVALIAÇÕES</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-muted-foreground">RECURSOS</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex flex-col gap-2">
                <Button variant="link" className="text-muted-foreground p-0 h-auto justify-start text-sm">Políticas de venda</Button>
                <Button variant="link" className="text-muted-foreground p-0 h-auto justify-start text-sm">Políticas de troca</Button>
                <Button variant="link" className="text-muted-foreground p-0 h-auto justify-start text-sm">Políticas de privacidade</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </footer>
    </div>
  );

    


    
