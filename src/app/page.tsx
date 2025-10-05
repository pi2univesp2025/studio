
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    imageUrls: [
      'https://picsum.photos/seed/1/400/500',
      'https://picsum.photos/seed/11/400/500',
      'https://picsum.photos/seed/111/400/500',
    ],
    imageHint: 'stylish blouse',
  },
  {
    id: 2,
    name: 'Calça Jeans',
    price: 'R$ 129,90',
    imageUrls: [
      'https://picsum.photos/seed/2/400/500',
      'https://picsum.photos/seed/22/400/500',
      'https://picsum.photos/seed/222/400/500',
    ],
    imageHint: 'denim pants',
  },
  {
    id: 3,
    name: 'Vestido Floral',
    price: 'R$ 159,90',
    imageUrls: [
      'https://picsum.photos/seed/3/400/500',
      'https://picsum.photos/seed/33/400/500',
      'https://picsum.photos/seed/333/400/500',
    ],
    imageHint: 'floral dress',
  },
  {
    id: 4,
    name: 'Bolsa de Couro',
    price: 'R$ 199,90',
    imageUrls: [
        'https://picsum.photos/seed/4/400/500',
        'https://picsum.photos/seed/44/400/500',
        'https://picsum.photos/seed/444/400/500',
    ],
    imageHint: 'leather bag',
  }
];


export default function Home() {
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
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
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
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" /> FAVORITOS
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" /> MEUS PEDIDOS
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <nav className="flex h-12 items-center justify-center gap-6">
            <Button variant="ghost" className="text-sm font-medium">
              BLUSAS
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              VESTIDOS
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              CALÇAS
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
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
                <DropdownMenuItem>Acessórios</DropdownMenuItem>
                <DropdownMenuItem>Bolsas</DropdownMenuItem>
                <DropdownMenuItem>Decoração</DropdownMenuItem>
                <DropdownMenuItem>Móveis</DropdownMenuItem>
                <DropdownMenuItem>Brinquedos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Button
        variant="default"
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg flex flex-col items-center justify-center h-auto w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white dark:text-white"
      >
        <WhatsappIcon className="h-8 w-8 text-white" />
        <span className="text-xs mt-1">Compre Aqui</span>
      </Button>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex justify-center items-center gap-6 text-sm">
          <Button variant="link" className="text-muted-foreground">SOBRE NÓS</Button>
          <Button variant="link" className="text-muted-foreground">AVALIAÇÕES</Button>
          <Button variant="link" className="text-muted-foreground">RECURSOS</Button>
        </div>
      </footer>
    </div>
  );
}
