'use client' // Vamos usar styled-components, então marcamos como client component
import styled from 'styled-components';

const SMainDetalhes = styled.main`
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 120px); // Altura do header + footer
`;

const SSection = styled.section`
    display: flex;
    gap: 2rem;
    align-items: center;
    max-width: 800px;
`;

const SAside = styled.aside`
    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
`;


export default function ProdutoDetalhePage({ params }: { params: { id: string } }) {

    const productId = params.id;

    return (
        <SMainDetalhes>
            <SSection>
                {}
                {}

                <SAside>
                    <h2>Detalhes do Produto (ID: {productId})</h2>
                    <p><strong>Preço:</strong> R$ XX,XX</p>
                    <p><strong>Descrição:</strong> Projeto futuro. </p>
                </SAside>
            </SSection>
        </SMainDetalhes>
    )
}