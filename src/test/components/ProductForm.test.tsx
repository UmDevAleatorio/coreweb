import { render, screen } from '@testing-library/react';
import { ProductForm } from '@/components/ProductForm'; 
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'; 

describe('ProductForm', () => {
  it('deve renderizar o formulário', () => {
    render(
      <Dialog open onOpenChange={() => { }}>
        <DialogContent>
          <DialogTitle className="sr-only">Form</DialogTitle>
          
          {}
          <ProductForm product={null} onSave={() => { }} onCancel={() => { }} />
        
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Preço')).toBeInTheDocument();
    expect(screen.getByLabelText('Estoque')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagem')).toBeInTheDocument();
  });
});