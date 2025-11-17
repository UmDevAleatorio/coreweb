import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';
import ProdutosPage from '@/app/admin/produtos/page';
import { useRouter } from 'next/navigation';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository'; 
import { MockProductRepository } from '@/core/infra/mocks/MockProductRepository'; 

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => {
    const originalModule = jest.requireActual('@/context/AuthContext');
    const { User } = jest.requireActual('@/core/domain/entities/User');
    const { Name } = jest.requireActual('@/core/domain/value-objects/Name');
    const { Email } = jest.requireActual('@/core/domain/value-objects/Email');
    const { Password } = jest.requireActual('@/core/domain/value-objects/Password');
    
    const validPassword = 'ValidPassword1!'; 
    
    const user = User.create(
        'test-user-id',
        Name.create('Test User'),
        Email.create('test@example.com'),
        Password.create(validPassword)
    );

    return {
        __esModule: true,
        ...originalModule,
        useAuth: () => ({
            user: user,
        }),
    };
});


describe('Product CRUD Integration Test', () => {
  let push: jest.Mock;

  beforeEach(() => {
    push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    
    MockUserRepository.getInstance().reset();
    MockProductRepository.getInstance().reset();

    window.confirm = jest.fn(() => true);
  });

  it('deve criar, ler, atualizar e deletar um produto', async () => {
    render(
        <AuthProvider>
            <ProdutosPage />
        </AuthProvider>
    );

    await waitFor(() => {
        expect(screen.getByText('Gerenciar Produtos')).toBeInTheDocument();
    });

    await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Adicionar Produto' }));
    });

    await waitFor(() => { 
            expect(screen.getByRole('heading', { name: 'Adicionar Produto' })).toBeInTheDocument();
        });

    await act(async () => {
        fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Martelo' } });
        fireEvent.change(screen.getByLabelText('Preço'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Estoque'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Imagem'), { target: { value: 'https://example.com/martelo.jpg' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    });

    await waitFor(() => {
        expect(screen.getByText('Martelo')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
    });

    const rowToUpdate = screen.getByText('Martelo').closest('tr');
    if (!rowToUpdate) throw new Error('Não foi possível encontrar a linha da tabela para o novo produto.');
    
    const editButton = within(rowToUpdate).getByRole('button', { name: 'Editar' });

    await act(async () => {
        fireEvent.click(editButton);
    });

    await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Editar Produto' })).toBeInTheDocument();
    });

    await act(async () => {
        fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Martelo Atualizado' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    });

    await waitFor(() => {
        expect(screen.getByText('Martelo Atualizado')).toBeInTheDocument();
    });

    const rowToDelete = screen.getByText('Martelo Atualizado').closest('tr');
    if (!rowToDelete) throw new Error('Não foi possível encontrar a linha da tabela para o produto atualizado.');

    const deleteButton = within(rowToDelete).getByRole('button', { name: 'Excluir' });

    await act(async () => {
        fireEvent.click(deleteButton);
    });

    await waitFor(() => {
        expect(screen.queryByText('Martelo Atualizado')).not.toBeInTheDocument();
    });
  });
});