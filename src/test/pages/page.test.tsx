import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { makeProductUseCases } from '@/core/factories/makeProductUseCases';
import { useRouter } from 'next/navigation';

jest.mock('@/core/factories/makeProductUseCases');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockMakeProductUseCases = makeProductUseCases as jest.Mock;

describe('Home Page', () => {

  it('deve renderizar os produtos na página inicial', async () => {
    const mockFindAllProducts = {
      execute: jest.fn().mockResolvedValue([
        {
          id: '1',
          name: { value: 'Produto de Teste 1' },
          price: { value: 100 },
          photo: { url: 'https://example.com/image.jpg' },
          stock: 10
        },
      ]),
    };
    
    mockMakeProductUseCases.mockReturnValue({
      findAllProducts: mockFindAllProducts,
    });

    render(<Home />);

    await waitFor(() => {
        expect(screen.getByText('Produto de Teste 1')).toBeInTheDocument();
        
        expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    });
  });
});