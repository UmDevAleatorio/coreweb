'use client'
import { useState } from "react";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";

export interface ProductInterface {
  id: string;
  name: string;
  price: number;
  stock: number;
  photo: string | StaticImageData;
}

export type ProductFormData = Omit<ProductInterface, 'id' | 'photo'> & {
    id?: string;
    photo: string;
};

interface ProductFormProps {
  product: ProductInterface | null;
  onSave: (data: ProductFormData) => void; 
  onCancel: () => void;
}

const getPhotoUrl = (photo: string | StaticImageData | null | undefined): string => {
    if (!photo) return '';
    if (typeof photo === 'string') return photo;
    return photo.src; 
};

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  
  const [formData, setFormData] = useState<ProductFormData>({
    id: product?.id || '',
    name: product?.name || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    photo: getPhotoUrl(product?.photo) 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
        <DialogDescription>
          {product ? 'Altere os detalhes do seu produto.' : 'Adicione um novo produto.'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Nome</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">Preço</Label>
          <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">Estoque</Label>
          <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="photo" className="text-right">Imagem</Label>
          {}
          <Input id="photo" type="url" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} className="col-span-3" required />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
}