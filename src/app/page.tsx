
'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
  ShoppingCart,
} from 'lucide-react';
import { WhatsappIcon } from '@/components/ui/whatsapp-icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProductCard } from '@/components/product-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';

// Define product type matching Firestore data model
type Product = {
  id: string;
  title: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  thumbnailImageUrls: string[];
  description: string;
  tags: string[];
};

export default function Home() {
  const { user } = useUser();
  const firestore = useFirestore();

  // State
  const [favorites, setFavorites] = useState<string[]>([]);
  const [shoppingCart, setShoppingCart] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCartOnly, setShowCartOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const userId = user?.uid;

  // Memoize Firestore references
  const siteConfigRef = useMemoFirebase(() => userId ? doc(firestore, 'siteConfig', userId) : null, [firestore, userId]);
  const categoriesRef = useMemoFirebase(() => userId ? doc(firestore, 'categories', userId) : null, [firestore, userId]);
  const productsQuery = useMemoFirebase(() => userId ? collection(firestore, 'users', userId, 'products') : null, [firestore, userId]);

  // Fetch data from Firestore
  const { data: siteConfig, isLoading: isSiteConfigLoading } = useDoc(siteConfigRef);
  const { data: categoriesData, isLoading: areCategoriesLoading } = useDoc(categoriesRef);
  const { data: products, isLoading: areProductsLoading } = useCollection<Product>(productsQuery);

  const siteName = siteConfig?.siteName || 'Protótipo';
  const categories = categoriesData?.items || ['BLUSAS', 'VESTIDOS', 'CALÇAS', 'CALÇADOS'];
  const allCategories = ['TODOS', ...categories];
  const otherCategories = ['ACESSORIOS', 'BOLSAS', 'DECORACAO', 'MOVEIS', 'BRINQUEDOS'];


  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowFavoritesOnly(false);
    setShowCartOnly(false);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };
  
  const toggleInCart = (productId: string) => {
    setShoppingCart((prevCart) =>
      prevCart.includes(productId)
        ? prevCart.filter((id) => id !== productId)
        : [...prevCart, productId]
    );
  };

  const handleShowFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setShowCartOnly(false);
    setSelectedCategory('TODOS'); // Reset category filter when showing favorites
  }

  const handleShowCart = () => {
    setShowCartOnly(!showCartOnly);
    setShowFavoritesOnly(false);
    setSelectedCategory('TODOS');
  };

  const categoryFilteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === 'TODOS') return products;
    // This is a simple tag-based filtering. A more robust implementation might use a dedicated 'category' field.
    return products.filter(p => p.tags && p.tags.some(tag => tag.toUpperCase() === selectedCategory.toUpperCase()));
  }, [products, selectedCategory]);
  
  let displayedProducts;
  if (showFavoritesOnly) {
    displayedProducts = products?.filter((p) => favorites.includes(p.id)) || [];
  } else if (showCartOnly) {
    displayedProducts = products?.filter((p) => shoppingCart.includes(p.id)) || [];
  } else {
    displayedProducts = categoryFilteredProducts;
  }
  
  // Convert Product type to what ProductCard expects
  const cardProducts = useMemo(() => {
    return displayedProducts.map(p => ({
      id: p.id,
      name: p.title,
      price: `R$ ${p.price.toFixed(2).replace('.', ',')}`,
      discountPrice: p.discountPrice ? `R$ ${p.discountPrice.toFixed(2).replace('.', ',')}`: undefined,
      imageUrls: [p.imageUrl, ...p.thumbnailImageUrls].filter(Boolean),
      imageHint: p.tags?.join(' ') || '',
      description: p.description,
      category: p.tags?.[0] || 'N/A' // Use first tag as category for simplicity
    }));
  }, [displayedProducts]);


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              {isSiteConfigLoading ? 'Carregando...' : siteName}
            </a>
             {showMobileSearch ? (
              <div className="absolute top-0 left-0 w-full p-4 bg-background border-b z-50 md:hidden">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="BUSCAR"
                    className="w-full pl-10"
                    autoFocus
                    onBlur={() => setShowMobileSearch(false)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ) : (
            <>
              <div className="hidden md:flex flex-1 max-w-md items-center gap-4">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder="BUSCAR"
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Button variant={showFavoritesOnly ? "secondary" : "ghost"} className="flex items-center gap-2" onClick={handleShowFavorites}>
                  <Heart className={`h-5 w-5 ${showFavoritesOnly ? 'text-red-500 fill-current' : ''}`} />
                  <span>FAVORITOS</span>
                </Button>
                <Button variant={showCartOnly ? "secondary" : "ghost"} className="flex items-center gap-2" onClick={handleShowCart}>
                  <Package className="h-5 w-5" />
                  <span>MEUS PEDIDOS</span>
                </Button>
                <ThemeToggle />
              </div>
            </>
            )}
            <div className="md:hidden flex items-center gap-2">
               <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(true)}>
                <Search className="h-6 w-6" />
              </Button>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                   {areCategoriesLoading ? (
                     <DropdownMenuItem>Carregando...</DropdownMenuItem>
                   ) : (
                    allCategories.map(cat => (
                      <DropdownMenuItem key={cat} onClick={() => handleCategoryClick(cat)}>{cat}</DropdownMenuItem>
                    ))
                   )}
                  <DropdownMenuSeparator />
                  {otherCategories.map(cat => (
                    <DropdownMenuItem key={cat} onClick={() => handleCategoryClick(cat)}>{cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}</DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleShowFavorites}>
                    <Heart className={`mr-2 h-4 w-4 ${showFavoritesOnly ? 'text-red-500 fill-current' : ''}`} /> FAVORITOS
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShowCart}>
                    <Package className="mr-2 h-4 w-4" /> MEUS PEDIDOS
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <nav className="hidden md:flex h-12 items-center justify-center gap-6">
            {areCategoriesLoading ? (
              <p className="text-sm text-muted-foreground">Carregando categorias...</p>
            ) : (
              allCategories.map(cat => (
                <Button key={cat} variant={selectedCategory === cat && !showFavoritesOnly && !showCartOnly ? "secondary" : "ghost"} className="text-sm font-medium" onClick={() => handleCategoryClick(cat)}>
                  {cat}
                </Button>
              ))
            )}
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
                {otherCategories.map(cat => (
                  <DropdownMenuItem key={cat} onClick={() => handleCategoryClick(cat)}>{cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 my-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
                {showCartOnly ? "Seu Carrinho" : (showFavoritesOnly ? "Seus Favoritos" : "Todos os Produtos")}
            </h2>
            {showCartOnly && shoppingCart.length > 0 && (
                <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    COMPRAR
                </Button>
            )}
        </div>
        {areProductsLoading ? (
           <div className="flex-1 flex items-center justify-center text-center text-muted-foreground py-16">
            <p>Carregando produtos...</p>
          </div>
        ) : cardProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cardProducts.map((product) => (
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
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground py-16">
            <p>{showFavoritesOnly ? "NENHUM ITEM ADICIONADO AOS FAVORITOS" : showCartOnly ? "SEU CARRINHO ESTÁ VAZIO" : "Nenhum produto encontrado nesta categoria."}</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col items-center z-50 gap-2">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="text-muted-foreground">AVALIAÇÕES</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Em breve...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
}

    