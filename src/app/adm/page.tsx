
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GripVertical, LogOut, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth, useFirestore, useUser, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, doc, signOut } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useRouter } from 'next/navigation';

// Funções de conversão de cor
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

type Product = {
  id: string;
  name: string;
  price: string;
  discountPrice: string;
  category: string;
  imageUrls: string;
  tags: string;
};

export default function AdmPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const userId = user?.uid;

  // Firestore Refs
  const siteConfigRef = useMemoFirebase(() => userId ? doc(firestore, 'siteConfig', userId) : null, [firestore, userId]);
  const categoriesRef = useMemoFirebase(() => userId ? doc(firestore, 'categories', userId) : null, [firestore, userId]);
  const productsQuery = useMemoFirebase(() => userId ? collection(firestore, 'users', userId, 'products') : null, [firestore, userId]);
  const themeRef = useMemoFirebase(() => userId ? doc(firestore, 'users', userId, 'theme', 'settings') : null, [firestore, userId]);

  // Firestore Data
  const { data: siteConfigData } = useDoc(siteConfigRef);
  const { data: categoriesData } = useDoc(categoriesRef);
  const { data: productsData } = useCollection(productsQuery);
  const { data: themeData } = useDoc(themeRef);

  // Component State
  const [siteName, setSiteName] = useState('Protótipo');
  const [aboutMe, setAboutMe] = useState("Bem-vindo ao Protótipo...");
  const [categories, setCategories] = useState<{ id: string; content: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [lightPrimary, setLightPrimary] = useState('240 5.9% 10%');
  const [lightBackground, setLightBackground] = useState('0 0% 100%');
  const [lightAccent, setLightAccent] = useState('0 0% 96.1%');
  const [darkPrimary, setDarkPrimary] = useState('0 0% 98%');
  const [darkBackground, setDarkBackground] = useState('240 10% 3.9%');
  const [darkAccent, setDarkAccent] = useState('0 0% 14.9%');
  const [colorFormat, setColorFormat] = useState('hsl');

  // Sign in anonymously if not logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  // Hydrate state from Firestore
  useEffect(() => {
    if (siteConfigData) {
      setSiteName(siteConfigData.siteName || 'Protótipo');
      setAboutMe(siteConfigData.aboutUs || "Bem-vindo ao Protótipo...");
    }
  }, [siteConfigData]);

  useEffect(() => {
    if (categoriesData) {
      setCategories((categoriesData.items || []).map((cat: string, index: number) => ({ id: `cat-${index}`, content: cat })));
    }
  }, [categoriesData]);

  useEffect(() => {
    if (productsData) {
      const formattedProducts: Product[] = productsData.map((p: any) => ({
        id: p.id,
        name: p.title || 'Novo Produto',
        price: p.price ? `R$ ${p.price.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        discountPrice: p.discountPrice ? `R$ ${p.discountPrice.toFixed(2).replace('.', ',')}` : '',
        category: p.category || '',
        imageUrls: Array.isArray(p.thumbnailImageUrls) ? p.thumbnailImageUrls.join('\n') : '',
        tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
      }));
      setProducts(formattedProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (themeData) {
      setLightPrimary(themeData.light?.primary || '240 5.9% 10%');
      setLightBackground(themeData.light?.background || '0 0% 100%');
      setLightAccent(themeData.light?.accent || '0 0% 96.1%');
      setDarkPrimary(themeData.dark?.primary || '0 0% 98%');
      setDarkBackground(themeData.dark?.background || '240 10% 3.9%');
      setDarkAccent(themeData.dark?.accent || '0 0% 14.9%');
    }
  }, [themeData]);

  const handleLogout = async () => {
    try {
      await (auth as any).signOut(); // Using `signOut` from the auth instance
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no Logout",
        description: "Não foi possível desconectar. Tente novamente.",
      });
    }
  };

  const handleSaveChanges = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você precisa estar logado para salvar as alterações.",
      });
      return;
    }

    const userId = user.uid;

    if (siteConfigRef) {
        setDocumentNonBlocking(siteConfigRef, { siteName, aboutUs: aboutMe }, { merge: true });
    }
    
    if (categoriesRef) {
        setDocumentNonBlocking(categoriesRef, { items: categories.map(c => c.content) }, { merge: true });
    }

    products.forEach(product => {
      const productRef = doc(firestore, 'users', userId, 'products', product.id);
      const priceNumber = parseFloat(product.price.replace('R$ ', '').replace(',', '.')) || 0;
      const discountPriceNumber = product.discountPrice ? parseFloat(product.discountPrice.replace('R$ ', '').replace(',', '.')) : undefined;

      const productData = {
        id: product.id,
        title: product.name,
        price: priceNumber,
        ...(discountPriceNumber && { discountPrice: discountPriceNumber }),
        category: product.category,
        description: '', // Placeholder
        imageUrl: product.imageUrls.split(/[\n,]/)[0]?.trim() || '',
        thumbnailImageUrls: product.imageUrls.split(/[\n,]/).map(url => url.trim()).filter(url => url),
        tags: product.tags.split(',').map(t => t.trim()).filter(t => t),
      };
      setDocumentNonBlocking(productRef, productData, { merge: true });
    });
    
    if (themeRef) {
        const themeData = {
          id: userId,
          light: { primary: lightPrimary, background: lightBackground, accent: lightAccent },
          dark: { primary: darkPrimary, background: darkBackground, accent: darkAccent },
        };
        setDocumentNonBlocking(themeRef, themeData, { merge: true });
    }

    toast({
      title: "Sucesso!",
      description: "Suas alterações foram salvas.",
    });
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
  }
  
  const handleAddCategory = () => {
    const newId = `cat-${Date.now()}`;
    setCategories([...categories, { id: newId, content: 'Nova Categoria' }]);
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };
  
  const handleAddProduct = () => {
    const newId = `prod-${Date.now()}`;
    setProducts([...products, {
      id: newId,
      name: 'Novo Produto',
      price: 'R$ 0,00',
      discountPrice: '',
      category: categories.length > 0 ? categories[0].content : '',
      imageUrls: 'https://picsum.photos/seed/new_product/400/500',
      tags: ''
    }]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };
  
  const handleProductChange = (id: string, field: string, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };


  const getBackgroundColor = (value: string) => {
    if (colorFormat === 'hsl') {
      return `hsl(${value.replace(/%/g, '')})`;
    }
    if(colorFormat === 'rgb'){
      return `rgb(${value})`;
    }
    return value;
  }

  const ColorPreviewInput = ({ label, id, value, onChange, onPickerChange }: { label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onPickerChange: (hex: string) => void }) => {
    const colorValueForPicker = () => {
        try {
            if (colorFormat === 'hsl') {
                const [h, s, l] = value.split(' ').map(v => parseFloat(v));
                return hslToHex(h,s,l);
            }
             if (colorFormat === 'rgb') {
                const [r, g, b] = value.split(',').map(v => parseInt(v.trim()));
                return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
            }
            return value;
        } catch(e) {
            return '#000000'; // fallback
        }
    }
    
    return (
        <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-2">
            <Input id={id} value={value} onChange={onChange} />
            <div className="h-10 w-10 rounded-md border relative">
                <div 
                    className="h-full w-full"
                    style={{ backgroundColor: getBackgroundColor(value) }}
                />
                <input
                    type="color"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    value={colorValueForPicker()}
                    onChange={(e) => onPickerChange(e.target.value)}
                />
            </div>
        </div>
        </div>
    );
  };

  const handleColorPickerChange = (hex: string, setter: (value: string) => void) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    if(colorFormat === 'hsl') {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setter(`${hsl.h} ${hsl.s}% ${hsl.l}%`);
    } else if (colorFormat === 'rgb') {
        setter(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
    } else { // hex
        setter(hex);
    }
  }


  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <div className="flex-1 w-full max-w-4xl p-4 sm:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Painel de Administração</h1>
                <p className="text-muted-foreground">Edite as informações do seu site aqui.</p>
            </div>
            {user && !user.isAnonymous && (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          )}
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
                <Input id="business_name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="categories">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="grid gap-4">
                        {categories.map(({ id, content }, index) => (
                            <Draggable key={id} draggableId={id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex items-center gap-2 p-2 rounded-md transition-shadow ${snapshot.isDragging ? 'shadow-lg bg-background' : 'shadow-none'}`}
                                >
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                <Input value={content} onChange={(e) => {
                                  const newCategories = [...categories];
                                  newCategories[index].content = e.target.value;
                                  setCategories(newCategories);
                                }} />
                                <Button variant="destructive" size="icon" onClick={() => handleRemoveCategory(id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
                <Button className="mt-4" onClick={handleAddCategory}>Adicionar Nova Categoria</Button>
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
                {products.map(product => (
                  <AccordionItem value={product.id} key={product.id}>
                    <AccordionTrigger>{product.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`product-name-${product.id}`}>Nome do Produto</Label>
                          <Input id={`product-name-${product.id}`} value={product.name} onChange={(e) => handleProductChange(product.id, 'name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor={`product-category-${product.id}`}>Categoria</Label>
                                <Select value={product.category} onValueChange={(value) => handleProductChange(product.id, 'category', value)}>
                                <SelectTrigger id={`product-category-${product.id}`}>
                                    <SelectValue placeholder="Selecione a categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.content}>{cat.content}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor={`product-price-${product.id}`}>Preço</Label>
                                <Input id={`product-price-${product.id}`} value={product.price} onChange={(e) => handleProductChange(product.id, 'price', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`product-discount-price-${product.id}`}>Preço com Desconto (opcional)</Label>
                          <Input id={`product-discount-price-${product.id}`} value={product.discountPrice} onChange={(e) => handleProductChange(product.id, 'discountPrice', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`product-images-${product.id}`}>URLs das Imagens (separadas por quebra de linha)</Label>
                          <Textarea id={`product-images-${product.id}`} value={product.imageUrls} onChange={(e) => handleProductChange(product.id, 'imageUrls', e.target.value)} />
                        </div>
                         <div className="grid gap-2">
                          <Label htmlFor={`product-tags-${product.id}`}>Tags (separadas por vírgula)</Label>
                          <Input id={`product-tags-${product.id}`} value={product.tags} onChange={(e) => handleProductChange(product.id, 'tags', e.target.value)} />
                        </div>
                        <Button variant="destructive" size="sm" className="w-fit" onClick={() => handleRemoveProduct(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover Produto
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
               <Button className="mt-4" onClick={handleAddProduct}>Adicionar Novo Produto</Button>
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
                <Textarea id="about_me" rows={8} value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
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
                 <div className="flex justify-between items-center mb-6">
                    <TabsList className="grid grid-cols-2 w-fit">
                      <TabsTrigger value="light">Modo Claro</TabsTrigger>
                      <TabsTrigger value="dark">Modo Escuro</TabsTrigger>
                    </TabsList>
                    <div className="max-w-[200px]">
                        <Label htmlFor="color-format" className="mb-2 block text-sm font-medium text-right">Formato da Cor</Label>
                        <Select value={colorFormat} onValueChange={setColorFormat}>
                          <SelectTrigger id="color-format">
                            <SelectValue placeholder="Selecione o formato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hsl">HSL</SelectItem>
                            <SelectItem value="rgb">RGB</SelectItem>
                            <SelectItem value="hex">HEX</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                </div>
                <TabsContent value="light" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <ColorPreviewInput
                      label="Cor Primária"
                      id="color-primary-light"
                      value={lightPrimary}
                      onChange={(e) => setLightPrimary(e.target.value)}
                      onPickerChange={(hex) => handleColorPickerChange(hex, setLightPrimary)}
                    />
                    <ColorPreviewInput
                      label="Cor do Fundo"
                      id="color-background-light"
                      value={lightBackground}
                      onChange={(e) => setLightBackground(e.target.value)}
                      onPickerChange={(hex) => handleColorPickerChange(hex, setLightBackground)}
                    />
                     <ColorPreviewInput
                      label="Cor de Destaque"
                      id="color-accent-light"
                      value={lightAccent}
                      onChange={(e) => setLightAccent(e.target.value)}
                      onPickerChange={(hex) => handleColorPickerChange(hex, setLightAccent)}
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
                        onPickerChange={(hex) => handleColorPickerChange(hex, setDarkPrimary)}
                      />
                      <ColorPreviewInput
                        label="Cor do Fundo"
                        id="color-background-dark"
                        value={darkBackground}
                        onChange={(e) => setDarkBackground(e.target.value)}
                        onPickerChange={(hex) => handleColorPickerChange(hex, setDarkBackground)}
                      />
                      <ColorPreviewInput
                        label="Cor de Destaque"
                        id="color-accent-dark"
                        value={darkAccent}
                        onChange={(e) => setDarkAccent(e.target.value)}
                        onPickerChange={(hex) => handleColorPickerChange(hex, setDarkAccent)}
                      />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleSaveChanges}>Salvar Alterações</Button>
          </div>
        </div>
      </div>
       <footer className="w-full border-t py-6 mt-8">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Button variant="link" className="text-muted-foreground">Preciso de ajuda</Button>
        </div>
      </footer>
    </div>
  );
}

    