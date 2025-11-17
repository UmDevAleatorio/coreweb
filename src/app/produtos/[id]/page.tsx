'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import { Product } from '@/core/domain/entities/Product';
import { makeProductUseCases } from '@/core/factories/makeProductUseCases';
import { colors } from '@/styles/colors';


const SMainDetalhes = styled.main`
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start; // Alinhar ao topo
    min-height: calc(100vh - 120px); // Altura do header + footer
    background-color: ${colors.mediumGray}; // Fundo cinza como o login
`;

const SSection = styled.section`
    display: grid; // Usar grid para as 2 colunas
    grid-template-columns: 1fr 1fr; // Duas colunas de tamanho igual
    gap: 3rem;
    align-items: flex-start; // Alinhar itens no topo
    max-width: 900px;
    background-color: ${colors.white}; // Card branco
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SImageContainer = styled.div`
    width: 100%;
    img {
        width: 100%;
        height: auto; // Manter proporção
        border-radius: 8px;
    }
`;

const SInfoContainer = styled.aside`
    display: flex;
    flex-direction: column;

    /* 1. Nome do produto (acima) */
    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${colors.primaryDark};
        margin-bottom: 1rem;
    }
    
    /* 2. Preço (abaixo do nome) */
    span {
        font-size: 2rem;
        font-weight: 600;
        color: ${colors.primaryDark};
        margin-bottom: 1.5rem;
    }

    /* 4. Descrição (embaixo) */
    p {
        font-size: 1rem;
        color: #555; // Um cinza mais suave para o texto
        line-height: 1.6;
        margin-top: 1.5rem; // Espaço acima da descrição
    }
`;

const SBuyButton = styled.button`
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    background-color: ${colors.primaryDark};
    color: ${colors.white};
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    text-align: center;
    width: 100%; // Ocupa a largura da coluna

    &:hover {
        opacity: 0.9;
    }
`;



export default function ProdutoDetalhePage({ params }: { params: { id: string } }) {
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const productUseCases = makeProductUseCases();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const foundProduct = await productUseCases.findProductById.execute({ id: params.id });
                setProduct(foundProduct);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [params.id, productUseCases]); 

    const formatPrice = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };


    if (loading) {
        return <SMainDetalhes><h2>Carregando...</h2></SMainDetalhes>;
    }

    if (!product) {
        return <SMainDetalhes><h2>Produto não encontrado.</h2></SMainDetalhes>;
    }

    return (
        <SMainDetalhes>
            <SSection>
                {}
                <SImageContainer>
                    <Image 
                        src={product.photo.url as StaticImageData} 
                        alt={product.name.value} 
                        width={400} 
                        height={400} 
                        priority 
                    />
                </SImageContainer>

                {}
                <SInfoContainer>
                    <h2>{product.name.value}</h2>
                    <span>{formatPrice(product.price.value)}</span>
                    
                    {}
                    <SBuyButton onClick={() => router.push('/login')}>
                        Comprar
                    </SBuyButton>
                    
                    {}
                    <p>Este é um produto de alta qualidade da Buildmart. Feito com os melhores materiais para garantir durabilidade e eficiência no seu projeto. Compre agora e aproveite!</p>
                </SInfoContainer>
            </SSection>
        </SMainDetalhes>
    )
}