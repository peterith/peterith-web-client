/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useToggle, useClickOutside } from '../hooks';

const EditableInput = ({ type, value, onChange, onBlur }) => {
  const { colours } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, toggleEditing] = useToggle();
  const inputNode = useRef(null);
  const editableInputNode = useClickOutside(isEditing, () => {
    toggleEditing();
    onBlur();
  });

  useEffect(() => {
    if (isEditing) {
      inputNode.current.focus();
    }
  }, [isEditing]);

  const editableInput = css`
    display: flex;
  `;

  const input = css`
    border-radius: 5px;
    width: 200px;
  `;

  const icon = css`
    margin-left: auto;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div css={editableInput} ref={editableInputNode} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isEditing ? (
        <input css={input} ref={inputNode} type={type} value={value} onChange={onChange} onBlur={onBlur} />
      ) : (
        <span>{value}</span>
      )}
      {isHovering && !isEditing && (
        <span
          css={icon}
          className="fas fa-edit"
          role="button"
          aria-label="edit information"
          tabIndex="0"
          onKeyPress={toggleEditing}
          onClick={toggleEditing}
        />
      )}
    </div>
  );
};

EditableInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default EditableInput;
