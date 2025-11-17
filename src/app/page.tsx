'use client'

import { useEffect, useState } from "react";
import { ProductCard }from "@/components/ProductCard"; 
import { Product } from "@/core/domain/entities/Product";
import { makeProductUseCases } from "@/core/factories/makeProductUseCases";
import martelo from '@/assets/martelo.jpeg';
import serraeletrica from '@/assets/serraeletrica.jpeg';
import serracircular from '@/assets/serracircular.jpeg';
import betoneira from '@/assets/betoneira.jpeg';
import carrinhodemao from '@/assets/carrinhodemao.jpeg';
import chaveinglesa from '@/assets/chaveinglesa.jpeg';
import sacodeareia from '@/assets/sacodeareia.jpeg';
import sacosdecimento from '@/assets/sacosdecimento.jpeg';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { findAllProducts, createProduct } = makeProductUseCases();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let fetchedProducts = await findAllProducts.execute();

        if (fetchedProducts.length === 0) {
          console.log("Nenhum produto encontrado, criando mocks...");
          
          const mockProductsData = [
            { name: "Martelo", price: 30.00, stock: 100, photo: martelo.src },
            { name: "Serra Elétrica", price: 250.00, stock: 50, photo: serraeletrica.src },
            { name: "Serra Circular", price: 400.00, stock: 30, photo: serracircular.src },
            { name: "Betoneira", price: 1500.00, stock: 10, photo: betoneira.src },
            { name: "Carrinho de Mão", price: 120.00, stock: 75, photo: carrinhodemao.src },
            { name: "Chave Inglesa", price: 50.00, stock: 200, photo: chaveinglesa.src },
            { name: "Saco de Areia", price: 5.00, stock: 500, photo: sacodeareia.src },
            { name: "Saco de Cimento", price: 25.00, stock: 300, photo: sacosdecimento.src },
          ];

          for (const p of mockProductsData) {
            await createProduct.execute({
              name: p.name,
              price: p.price,
              photoUrl: p.photo,
              stock: p.stock,
              userId: 'mock-user' 
            });
          }
          
          fetchedProducts = await findAllProducts.execute();
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Falha ao buscar ou criar produtos:", error);
      }
    };

    fetchProducts();
  }, [findAllProducts, createProduct]); 

  return (
    <main className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[calc(100vh-8rem)]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}