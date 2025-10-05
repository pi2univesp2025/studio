
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialCategories = [
  'BLUSAS',
  'VESTIDOS',
  'CALÇAS',
  'CALÇADOS',
  'BOLSAS'
];

export default function AdmPage() {
  const [categories, setCategories] = useState(initialCategories);

  const [lightPrimary, setLightPrimary] = useState('240 5.9% 10%');
  const [lightBackground, setLightBackground] = useState('0 0% 100%');
  const [lightAccent, setLightAccent] = useState('0 0% 96.1%');
  const [darkPrimary, setDarkPrimary] = useState('0 0% 98%');
  const [darkBackground, setDarkBackground] = useState('240 10% 3.9%');
  const [darkAccent, setDarkAccent] = useState('0 0% 14.9%');

  const moveCategory = (index: number, direction: 'up' | 'down') => {
    const newCategories = [...categories];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newCategories.length) {
      const temp = newCategories[index];
      newCategories[index] = newCategories[newIndex];
      newCategories[newIndex] = temp;
      setCategories(newCategories);
    }
  };

  const ColorPreviewInput = ({ label, id, value, onChange }: { label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input id={id} value={value} onChange={onChange} />
        <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: `hsl(${value})` }} />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <p className="text-muted-foreground">Edite as informações do seu site aqui.</p>
        </header>

        <div className="grid gap-8">
          {/* Nome do Site */}
          <Card>
            <CardHeader>
              <CardTitle>Nome do Site</CardTitle>
              <CardDescription>Altere o nome principal que aparece no cabeçalho do site.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="business_name">Nome do Site</Label>
                <Input id="business_name" defaultValue="Protótipo Bazar" />
              </div>
            </CardContent>
          </Card>
          
          {/* Categorias */}
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
              <CardDescription>Adicione, remova ou edite e reordene as categorias dos produtos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <button onClick={() => moveCategory(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ArrowUpDown className="h-3 w-3 transform -rotate-180" />
                      </button>
                      <button onClick={() => moveCategory(index, 'down')} disabled={index === categories.length - 1} className="p-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </div>
                    <Input defaultValue={category} />
                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
              <Button className="mt-4">Adicionar Nova Categoria</Button>
            </CardContent>
          </Card>

          {/* Informações dos Produtos */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <CardDescription>Adicione, remova ou edite as informações dos produtos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Exemplo de Produto 1 */}
                <AccordionItem value="item-1">
                  <AccordionTrigger>Blusa Estilosa</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="product-name-1">Nome do Produto</Label>
                        <Input id="product-name-1" defaultValue="Blusa Estilosa" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="product-price-1">Preço</Label>
                          <Input id="product-price-1" defaultValue="R$ 89,90" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="product-discount-price-1">Preço com Desconto (opcional)</Label>
                          <Input id="product-discount-price-1" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="product-images-1">URLs das Imagens (separadas por vírgula)</Label>
                        <Textarea id="product-images-1" defaultValue="https://picsum.photos/seed/tshirt1/400/500, https://picsum.photos/seed/tshirt2/400/500, https://picsum.photos/seed/tshirt3/400/500" />
                      </div>
                       <div className="grid gap-2">
                        <Label htmlFor="product-tags-1">Tags (separadas por vírgula)</Label>
                        <Input id="product-tags-1" defaultValue="blusa, estilosa, feminina" />
                      </div>
                      <Button variant="destructive" size="sm" className="w-fit">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover Produto
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Exemplo de Produto 2 */}
                <AccordionItem value="item-2">
                  <AccordionTrigger>Calça Jeans</AccordionTrigger>
                  <AccordionContent>
                     <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="product-name-2">Nome do Produto</Label>
                        <Input id="product-name-2" defaultValue="Calça Jeans" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="product-price-2">Preço</Label>
                          <Input id="product-price-2" defaultValue="R$ 129,90" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="product-discount-price-2">Preço com Desconto (opcional)</Label>
                          <Input id="product-discount-price-2" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="product-images-2">URLs das Imagens (separadas por vírgula)</Label>
                        <Textarea id="product-images-2" defaultValue="https://picsum.photos/seed/jeans1/400/500, https://picsum.photos/seed/jeans2/400/500, https://picsum.photos/seed/jeans3/400/500" />
                      </div>
                       <div className="grid gap-2">
                        <Label htmlFor="product-tags-2">Tags (separadas por vírgula)</Label>
                        <Input id="product-tags-2" defaultValue="calça, jeans, masculina" />
                      </div>
                       <Button variant="destructive" size="sm" className="w-fit">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover Produto
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
               <Button className="mt-4">Adicionar Novo Produto</Button>
            </CardContent>
          </Card>

          {/* Sobre Nós */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre Nós</CardTitle>
              <CardDescription>Edite a descrição que aparece na página "Sobre Nós".</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="about_me">Descrição</Label>
                <Textarea id="about_me" rows={8} defaultValue="Bem-vindo ao Protótipo Bazar, o seu destino para encontrar peças únicas e cheias de estilo! Nascemos da paixão por moda sustentável e da vontade de criar uma comunidade que valoriza a qualidade e a originalidade." />
              </div>
            </CardContent>
          </Card>
          
          {/* Avaliações */}
           <Card>
            <CardHeader>
              <CardTitle>Avaliações</CardTitle>
              <CardDescription>Gerencie as avaliações dos seus clientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve você poderá gerenciar as avaliações aqui.</p>
            </CardContent>
          </Card>

          {/* Cores do Site */}
          <Card>
            <CardHeader>
              <CardTitle>Cores do Site</CardTitle>
              <CardDescription>Personalize as cores do seu site para os modos claro e escuro. Use valores HSL (ex: 240 5.9% 10%).</CardDescription>
            </CardHeader>
            <CardContent>
               <Tabs defaultValue="light">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="light">Modo Claro</TabsTrigger>
                  <TabsTrigger value="dark">Modo Escuro</TabsTrigger>
                </TabsList>
                <TabsContent value="light" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <ColorPreviewInput
                      label="Cor Primária"
                      id="color-primary-light"
                      value={lightPrimary}
                      onChange={(e) => setLightPrimary(e.target.value)}
                    />
                    <ColorPreviewInput
                      label="Cor do Fundo"
                      id="color-background-light"
                      value={lightBackground}
                      onChange={(e) => setLightBackground(e.target.value)}
                    />
                     <ColorPreviewInput
                      label="Cor de Destaque"
                      id="color-accent-light"
                      value={lightAccent}
                      onChange={(e) => setLightAccent(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="dark" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                     <ColorPreviewInput
                        label="Cor Primária"
                        id="color-primary-dark"
                        value={darkPrimary}
                        onChange={(e) => setDarkPrimary(e.target.value)}
                      />
                      <ColorPreviewInput
                        label="Cor do Fundo"
                        id="color-background-dark"
                        value={darkBackground}
                        onChange={(e) => setDarkBackground(e.target.value)}
                      />
                      <ColorPreviewInput
                        label="Cor de Destaque"
                        id="color-accent-dark"
                        value={darkAccent}
                        onChange={(e) => setDarkAccent(e.target.value)}
                      />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg">Salvar Alterações</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
