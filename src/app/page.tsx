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

const products = [
  {
    id: 1,
    name: 'Blusa Estilosa',
    price: 'R$ 89,90',
    imageUrl: 'https://picsum.photos/seed/1/400/500',
    imageHint: 'stylish blouse',
  },
  {
    id: 2,
    name: 'Calça Jeans',
    price: 'R$ 129,90',
    imageUrl: 'https://picsum.photos/seed/2/400/500',
    imageHint: 'denim pants',
  },
  {
    id: 3,
    name: 'Vestido Floral',
    price: 'R$ 159,90',
    imageUrl: 'https://picsum.photos/seed/3/400/500',
    imageHint: 'floral dress',
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              LOGO
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
            </div>
            <div className="md:hidden">
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
                  MENU SUSPENSO <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
                <DropdownMenuItem>Item 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="aspect-[4/5] w-full relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </CardContent>
              <div className="p-4 bg-background">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Button
        variant="default"
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg flex flex-col items-center justify-center"
        style={{backgroundColor: '#25D366', color: 'white'}}
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
