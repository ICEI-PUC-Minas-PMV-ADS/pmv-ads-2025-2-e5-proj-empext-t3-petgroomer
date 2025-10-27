// Robust getComputedStyle mock for Ant Design Drawer
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BurgerMenu from '../components/BurgerMenu';
import { act } from 'react';

describe('BurgerMenu', () => {
  it('renders the burger button', () => {
    render(<BurgerMenu />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('BurgerMenu Drawer', () => {
  it('opens the drawer and shows menu items when burger button is clicked', async () => {
    render(<BurgerMenu />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});

import { waitFor } from '@testing-library/react';

describe('BurgerMenu Drawer Close', () => {
  it('adds hidden class to drawer when closed', async () => {
    render(<BurgerMenu />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    // Simulate closing the drawer by clicking the first close button
    const closeBtns = screen.getAllByLabelText(/close/i);
    await act(async () => {
      fireEvent.click(closeBtns[0]);
    });
    // Wait for the drawer to be hidden
    await waitFor(() => {
      const drawerWrapper = document.querySelector('.ant-drawer-content-wrapper');
      expect(drawerWrapper).toHaveClass('ant-drawer-content-wrapper-hidden');
    });
  });
});
