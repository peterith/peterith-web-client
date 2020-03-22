/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useToggle, useClickOutside } from '../hooks';

const EditableInput = ({ type, value, placeholder, isInitiallyEditing, onChange, onBlur, onDelete }) => {
  const { colours } = useTheme();
  const [isEditing, toggleEditing] = useToggle(isInitiallyEditing);
  const node = useClickOutside(isEditing, () => {
    toggleEditing();
    onBlur();
  });

  useEffect(() => {
    if (isEditing) {
      node.current.focus();
    }
  }, [node, isEditing]);

  const editableInput = css`
    display: flex;
  `;

  const input = css`
    border-radius: 5px;
    width: 200px;
  `;

  const icons = css`
    margin-left: auto;
  `;

  const icon = css`
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const handleChange = ({ target: { value: inputValue } }) => {
    onChange(inputValue);
  };

  return (
    <div css={editableInput}>
      {isEditing ? (
        <input
          css={input}
          ref={node}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
        />
      ) : (
        value
      )}
      {!isEditing && (
        <div css={icons}>
          <span
            css={icon}
            className="fas fa-edit"
            role="button"
            aria-label="edit field"
            tabIndex="0"
            onKeyPress={toggleEditing}
            onClick={toggleEditing}
          />{' '}
          {onDelete && (
            <span
              css={icon}
              className="fas fa-trash-alt"
              role="button"
              aria-label="delete field"
              tabIndex="0"
              onKeyPress={onDelete}
              onClick={onDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

EditableInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isInitiallyEditing: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

EditableInput.defaultProps = {
  value: '',
  placeholder: null,
  isInitiallyEditing: false,
  onDelete: null,
};

export default EditableInput;
