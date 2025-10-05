
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Package,
  Search,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { WhatsappIcon } from '@/components/ui/whatsapp-icon';
import { useState } from 'react';


export default function SobrePage() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              Protótipo
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
                  <Button variant="ghost" className="flex items-center gap-2">
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
            <h1 className="mb-4">Sobre o Protótipo</h1>
            <p className="mb-6">
                Bem-vindo ao Protótipo, o seu destino para encontrar peças únicas e cheias de estilo!
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
                    <strong>Email para contato:</strong> contato@prototipo.com.br
                </p>
            </div>

            <h2 className="mt-12 mb-4">Dados da Empresa</h2>
            <div className="space-y-4">
                <p>
                    <strong>Razão Social:</strong> Protótipo Ltda.
                </p>
                <p>
                    <strong>CNPJ:</strong> 12.345.678/0001-90
                </p>
            </div>
        </div>
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
          <Button variant="link" className="text-muted-foreground">Preciso de ajuda</Button>
        </div>
      </footer>
    </div>
  );
}

    