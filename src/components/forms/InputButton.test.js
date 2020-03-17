import React from 'react';
import { render } from '../../utils/test';
import InputButton from './InputButton';

describe('Input Button', () => {
  it('should have correct value', () => {
    const { getByText } = render(<InputButton value="input" />);
    expect(getByText('input')).toBeInTheDocument();
  });
});
