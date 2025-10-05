import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

type ProductDetailsProps = {
  name: string;
  price: string;
  description: string;
};

export function ProductDetails({
  name,
  price,
  description,
}: ProductDetailsProps) {
  return (
    <div className="flex flex-col justify-center">
      <Card className="border-0 shadow-none md:border md:shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight lg:text-4xl">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-3xl font-semibold text-primary-foreground bg-primary/80 rounded-md px-4 py-2 inline-block">
            {price}
          </p>
          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
