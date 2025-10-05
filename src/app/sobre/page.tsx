
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Package,
  Search,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { WhatsappIcon } from '@/components/ui/whatsapp-icon';


export default function SobrePage() {
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
                    <Package className="mr-2 h-4 w-4" /> MEUS PEDIDOS
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <nav className="flex h-12 items-center justify-center gap-6">
            <Button variant="ghost" className="text-sm font-medium" asChild>
                <Link href="/">TODOS</Link>
            </Button>
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
        <div className="prose dark:prose-invert max-w-none">
          <h1>Sobre Nós</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            nonummy, nisl vitae tempus aliquet, Olor sit amet, consectetur
            adipiscing elit. Sed nonummy, nisl vitae tempus aliquet,
            ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy,
            nisl vitae tempus aliquet, ipsum dolor sit amet, consectetur
            adipiscing elit. Sed nonummy, nisl vitae tempus aliquet,
            ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy,
            nisl vitae tempus aliquet.
          </p>
          <p>
            Praesentium, voluptatem, occaecati, quos, quod, quae,
            explicabo, quibusdam, eaque, similique, sunt, in, culpa,
            qui, officia, deserunt, mollit, anim, id, est, laborum.
            Et, harumd, und, relinques, facilis, est, et, expedita,
            distinctio. Nam, liber, te, conscient, to, factor, tum,
            poen, legum, odio, quae, ad, eam, per, se,acula, ut,
            falli, in, libidine, et, tam, stabilis, amicitiae, ac,
            ludum, et, vita, et, moribus, et, in, vita, et, moribus,
            et.
          </p>
          <p>
            Neque, porro, quisquam, est, qui, dolorem, ipsum, quia,
            dolor, sit, amet, consectetur, adipisci, velit, sed,
            quia, non, numquam, eius, modi, tempora, incidunt, ut,
            labore, et, dolore, magnam, aliquam, quaerat, voluptatem.
            Ut, enim, ad, minima, veniam, quis, nostrum,
            exercitationem, ullam, corporis, suscipit, laboriosam,
            nisi, ut, aliquid, ex, ea, commodi, consequatur? Quis,
            autem, vel, eum, iure, reprehenderit, qui, in, ea,
            voluptate, velit, esse, quam, nihil, molestiae,
            consequatur, vel, illum, qui, dolorem, eum, fugiat, quo,
            voluptas, nulla, pariatur?
          </p>
        </div>
      </main>
      <Button
        variant="default"
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg flex flex-col items-center justify-center h-auto w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white dark:text-white"
      >
        <WhatsappIcon className="h-8 w-8" />
        <span className="text-xs mt-1">Compre Aqui</span>
      </Button>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex justify-center items-center gap-6 text-sm">
          <Button variant="link" asChild>
            <Link href="/sobre" className="text-muted-foreground">SOBRE NÓS</Link>
          </Button>
          <Button variant="link" className="text-muted-foreground">AVALIAÇÕES</Button>
          <Button variant="link" className="text-muted-foreground">RECURSOS</Button>
        </div>
      </footer>
    </div>
  );
}
