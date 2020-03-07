import React from 'react';
import { render, fireEvent } from '../../utils/test';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should not show message in initial state', () => {
    const { getByText } = render(<Tooltip>tooltip</Tooltip>);
    expect(getByText('tooltip')).not.toBeVisible();
  });

  it('should show message when mouse enter the icons', async () => {
    const { getByTestId, getByText } = render(<Tooltip>tooltip</Tooltip>);
    fireEvent.mouseEnter(getByTestId('tooltip'));
    expect(getByText('tooltip')).toBeVisible();
  });
});
