

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BurgerMenu from './BurgerMenu';

// Mock getComputedStyle for Ant Design Drawer
// Robust mock for getComputedStyle to prevent jsdom errors with Ant Design
beforeAll(() => {
  window.getComputedStyle = window.getComputedStyle || (element => {
    return {
      getPropertyValue: () => '',
      display: 'none',
      appearance: ['-webkit-appearance'],
      // Add any other needed properties here
    };
  });
});

describe('BurgerMenu', () => {
  it('renders the burger button', () => {
    render(<BurgerMenu />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('BurgerMenu Drawer', () => {
  it('opens the drawer and shows menu items when burger button is clicked', () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});

import { waitFor } from '@testing-library/react';

describe('BurgerMenu Drawer Close', () => {
  it('closes the drawer when onClose is triggered', async () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));
    // Simulate closing the drawer by clicking the first close button
    const closeBtns = screen.getAllByLabelText(/close/i);
    fireEvent.click(closeBtns[0]);
    // Wait for the drawer to close and menu items to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Portfolio/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    });
  });
});
