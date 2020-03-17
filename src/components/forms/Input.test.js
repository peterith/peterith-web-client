import React from 'react';
import { render, fireEvent } from '../../utils/test';
import Input from './Input';
import { InputTypeEnum } from '../../utils/enums';

describe('Input', () => {
  it('should show tooltip when description is provided', () => {
    const { queryByText } = render(
      <Input
        type={InputTypeEnum.TEXT}
        label="label"
        description="description"
        name="name"
        onChange={jest.fn()}
        value="input"
      />,
    );
    expect(queryByText('description')).toBeInTheDocument();
  });

  it('should not show tooltip when description is provided', () => {
    const { queryByText } = render(
      <Input type={InputTypeEnum.TEXT} label="label" name="name" onChange={jest.fn()} value="input" />,
    );
    expect(queryByText('description')).not.toBeInTheDocument();
  });

  it('should show "*" when isRequired is provided', () => {
    const { queryByText } = render(
      <Input type={InputTypeEnum.TEXT} label="label" isRequired name="name" onChange={jest.fn()} value="input" />,
    );
    expect(queryByText('*')).toBeInTheDocument();
  });

  it('should not show "*" when isRequired is not provided', () => {
    const { queryByText } = render(
      <Input type={InputTypeEnum.TEXT} label="label" name="name" onChange={jest.fn()} value="input" />,
    );
    expect(queryByText('*')).not.toBeInTheDocument();
  });

  it('should call onChange when typing on the input', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Input type={InputTypeEnum.TEXT} label="label" name="name" onChange={onChange} value="input" />,
    );
    fireEvent.change(getByLabelText(/label/), { target: { value: 'value' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should have correct value', () => {
    const { getByLabelText } = render(
      <Input type={InputTypeEnum.TEXT} label="label" name="name" onChange={jest.fn()} value="input" />,
    );
    expect(getByLabelText(/label/)).toHaveValue('input');
  });
});
