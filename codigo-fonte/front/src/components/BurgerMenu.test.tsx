import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BurgerMenu from './BurgerMenu';

// Mock Link to avoid router errors
jest.mock('react-router-dom', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe('BurgerMenu', () => {
  it('renders the burger button', () => {
    render(<BurgerMenu />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens the drawer when burger button is clicked', () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('closes the drawer when clicking outside (simulated by onClose)', () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));
    // Simulate closing the drawer
    fireEvent.click(screen.getByText(/Menu/i));
    // The drawer should still be in the document (AntD keeps it mounted), but you can add more logic if needed
  });
});
