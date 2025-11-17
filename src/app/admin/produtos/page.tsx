'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProductForm, ProductInterface, ProductFormData } from "@/components/ProductForm"; 
import { makeProductUseCases } from "@/core/factories/makeProductUseCases";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { StaticImageData } from "next/image"; 

const getPhotoUrl = (photo: string | StaticImageData): string => {
    if (typeof photo === 'string') return photo; 
    return photo.src;
};

export default function ProdutosPage() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);
    const productUseCases = makeProductUseCases();
    const { user } = useAuth(); 

    async function fetchProducts() {
        try {
            const allProducts = await productUseCases.findAllProducts.execute();
            setProducts(allProducts.map((p) => ({
                id: p.id,
                name: p.name.value,
                price: p.price.value,
                stock: p.stock,
                photo: p.photo.url, 
            })));
        } catch (err) {
            toast.error(String(err)); 
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await productUseCases.deleteProduct.execute({ id });
                toast.success("Produto excluído!");
                await fetchProducts();
            } catch (error) {
                toast.error(String(error)); 
            }
        }
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (product: ProductInterface) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleSave = async (formData: ProductFormData) => { 
        try {
            if (editingProduct) { 
                await productUseCases.updateProduct.execute({
                    id: formData.id!, 
                    name: formData.name,
                    price: formData.price,
                    stock: formData.stock,
                    photoUrl: formData.photo, 
                });
                toast.success("Produto atualizado!");
            } else { 
                if (!user) { 
                    toast.error("Você precisa estar logado para criar um produto.");
                    return; 
                }
                await productUseCases.createProduct.execute({
                    name: formData.name,
                    price: formData.price,
                    stock: formData.stock,
                    photoUrl: formData.photo,
                    userId: user.id, 
                });
                toast.success("Produto cadastrado!");
            }
            await fetchProducts(); 
            setIsFormOpen(false); 
            setEditingProduct(null); 
        } catch (error) {
            toast.error(String(error));
        }
    };

    return (
        <main className="container mx-auto py-10 min-h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
                <Button onClick={handleAddClick}>Adicionar Produto</Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome do Produto</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead>Foto (URL)</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                {}
                                <TableCell>
                                    {getPhotoUrl(product.photo)}
                                </TableCell>
                                {}
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>Editar</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <ProductForm
                        product={editingProduct}
                        onSave={handleSave}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </main>
    );
}