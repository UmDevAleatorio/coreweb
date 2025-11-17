import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';
import RegisterPage from '@/app/register/page';
import { useRouter } from 'next/navigation';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Auth Integration Test', () => {
  let push: jest.Mock;

    beforeEach(() => {
      push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });
      MockUserRepository.getInstance().reset();
    });

  it('deve registrar um usuário e fazer o auto-login', async () => {
    
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Password123!' } });

    await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/admin/produtos');
    });

  });
});