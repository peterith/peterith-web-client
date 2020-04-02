/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useToggle, useClickOutside } from '../hooks';

const EditableInput = ({
  type,
  value,
  placeholder,
  isInitiallyEditing,
  isEditable,
  onChange,
  onClickOutside,
}) => {
  const { colours } = useTheme();
  const [isEditing, toggleEditing] = useToggle(isInitiallyEditing);
  const node = useClickOutside(isEditing, () => {
    toggleEditing();
    onClickOutside();
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
        />
      ) : (
        value
      )}
      {isEditable && !isEditing && (
        <div css={icons}>
          <span
            css={icon}
            className="fas fa-edit"
            role="button"
            aria-label="edit field"
            tabIndex="0"
            onKeyPress={toggleEditing}
            onClick={toggleEditing}
          />
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
  isEditable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

EditableInput.defaultProps = {
  value: '',
  placeholder: null,
  isInitiallyEditing: false,
};

export default EditableInput;
