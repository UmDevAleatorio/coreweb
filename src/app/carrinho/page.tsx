'use client'

import Image from 'next/image';
import styled from "styled-components";
import { colors } from "@/styles/colors";
import sacosdecimentoImg from '@/assets/sacosdecimento.jpeg';
import marteloImg from '@/assets/martelo.jpeg';

const SCarrinhoMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Alinha os itens no topo */
    padding: 3rem;
    gap: 3rem;
    background-color: ${colors.mediumGray};
    min-height: calc(100vh - 120px); /* Ocupa a altura da tela menos header e footer */
`;

const SItemList = styled.section`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap; /* Permite que os itens quebrem a linha se necessário */
`;

const SItemCard = styled.article`
    background-color: ${colors.white};
    border-radius: 16px;
    padding: 2rem;
    width: 280px;  /* Aumentado */
    height: 320px; /* Aumentado */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);

    p {
        font-size: 1.2rem;
        font-weight: 600;
    }

    /* 3. TAMANHO DO PREÇO: Aumentamos o tamanho da fonte */
    span {
        font-size: 1.5rem; /* Aumentado */
        font-weight: 700;
    }
`;

const SSummary = styled.aside`
    background-color: ${colors.lightGray};
    border-radius: 16px;
    padding: 2rem;
    width: 350px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: sticky; /* Faz o card de total "flutuar" no lugar ao rolar a página */
    top: 3rem;

    h2 {
        font-size: 2.5rem;
    }

    p {
        font-size: 2.25rem;
        font-weight: 700;
    }

    button {
        background-color: ${colors.white};
        color: ${colors.primaryDark};
        border: none;
        border-radius: 12px;
        padding: 1rem 0;
        width: 100%;
        font-size: 1.25rem;
        font-weight: 600;
        cursor: pointer;
    }
`;


export default function CarrinhoPage() {
    return (
        <SCarrinhoMain>
            <SItemList>
                <SItemCard>
                    {}
                    <Image src={sacosdecimentoImg} alt="Saco de Cimento" width={150} height={150} />
                    <p>Saco de Cimento</p>
                    <span>R$ 100</span>
                </SItemCard>
                <SItemCard>
                    {}
                    <Image src={marteloImg} alt="Martelo" width={150} height={150} />
                    <p>Martelo</p>
                    <span>R$ 39</span>
                </SItemCard>
            </SItemList>

            <SSummary>
                <h2>Total</h2>
                <p>R$ 139,00</p>
                <button>Comprar</button>
            </SSummary>
        </SCarrinhoMain>
    )
}