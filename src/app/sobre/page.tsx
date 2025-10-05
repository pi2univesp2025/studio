
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
            <h1 className="mb-4">Sobre o Protótipo Bazar</h1>
            <p className="mb-6">
                Bem-vindo ao Protótipo Bazar, o seu destino para encontrar peças únicas e cheias de estilo!
                Nascemos da paixão por moda sustentável e da vontade de criar uma comunidade que valoriza
                a qualidade e a originalidade. Em nosso bazar, cada item tem uma história e está pronto para
                começar um novo capítulo com você.
            </p>
            <p className="mb-8">
                Nossa curadoria é feita com muito carinho, selecionando roupas, acessórios e objetos de decoração
                que combinam charme, bom gosto e preços acessíveis. Acreditamos que é possível se vestir bem e
                decorar sua casa de forma consciente e criativa.
            </p>
            
            <h2 className="mt-12 mb-4">Informações de Contato</h2>
            <div className="space-y-4">
                <p>
                    <strong>Endereço:</strong> Rua da Moda, 123 - Bairro Criativo, Cidade Exemplo - EX, CEP 12345-678
                </p>
                <p>
                    <strong>Telefone para contato:</strong> (11) 98765-4321
                </p>
                <p>
                    <strong>Email para contato:</strong> contato@prototipobazar.com.br
                </p>
            </div>

            <h2 className="mt-12 mb-4">Dados da Empresa</h2>
            <div className="space-y-4">
                <p>
                    <strong>Razão Social:</strong> Protótipo Bazar Ltda.
                </p>
                <p>
                    <strong>CNPJ:</strong> 12.345.678/0001-90
                </p>
            </div>
        </div>
      </main>
      <Button
        variant="default"
        className="fixed bottom-[90px] right-6 h-16 w-16 rounded-full shadow-lg flex flex-col items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white dark:text-white"
      >
        <span className="text-xs mb-1">Compre Aqui</span>
        <WhatsappIcon className="h-8 w-8" />
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
