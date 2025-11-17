'use client'
import Image from "next/image";
import { SProductCard } from "./styles";
import cartIcon from "@/assets/add.svg";
import { Product } from "@/core/domain/entities/Product"; 
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: Product; 
}

export function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    const formatPrice = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (
        <SProductCard>
            <figure>
                {}
                <Image 
                    src={product.photo.url} 
                    alt={product.name.value} 
                    width={180} 
                    height={180} 
                />
                <figcaption>
                    {}
                    <span>{formatPrice(product.price.value)}</span>
                    <button title="Adicionar ao carrinho" onClick={() => router.push('/login')}>
                        <Image src={cartIcon} alt="Adicionar ao Carrinho" width={32} height={32} />
                    </button>
                </figcaption>
            </figure>

            {}
            <h5>{product.name.value}</h5>

            <a onClick={() => router.push(`/produtos/${product.id}`)}>
                Ver detalhes
            </a>
        </SProductCard>
    );
}