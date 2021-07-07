import { ValueEditorProps } from '../types';

const ValueEditor = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values,
  fieldData
}: ValueEditorProps) => {
  if (operator === 'null' || operator === 'notNull') {
    return null;
  }
  let placeHolderText = (fieldData && fieldData.placeholder) || '';

  const renderInput = () => {
    placeHolderText = Array.isArray(placeHolderText) ? placeHolderText : [placeHolderText];

    if (operator === 'between') {
      return (
        <div style={{ display: 'inline-block' }}>
          <input
            type={inputType || 'text'}
            placeholder={placeHolderText[0]}
            value={value[0]}
            title={title}
            className={className}
            onChange={(e) => handleOnChange([e.target.value, value[1] || ''])}
          />

          <input
            type={inputType || 'text'}
            placeholder={placeHolderText[1]}
            value={value[1]}
            title={title}
            className={className}
            onChange={(e) => handleOnChange([value[0] || '', e.target.value])}
          />
        </div>
      );
    }

    return (
      <input
        type={inputType || 'text'}
        placeholder={placeHolderText[0]}
        value={value}
        title={title}
        className={className}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    );
  };

  switch (type) {
    case 'select':
      return (
        <select
          className={className}
          title={title}
          onChange={(e) => handleOnChange(e.target.value)}
          value={value}>
          {values &&
            values.map((v) => (
              <option key={v.name} value={v.name}>
                {v.label}
              </option>
            ))}
        </select>
      );

    case 'checkbox':
      return (
        <input
          type="checkbox"
          className={className}
          title={title}
          onChange={(e) => handleOnChange(e.target.checked)}
          checked={!!value}
        />
      );

    case 'radio':
      return (
        <span className={className} title={title}>
          {values &&
            values.map((v) => (
              <label key={v.name}>
                <input
                  type="radio"
                  value={v.name}
                  checked={value === v.name}
                  onChange={(e) => handleOnChange(e.target.value)}
                />
                {v.label}
              </label>
            ))}
        </span>
      );

    default:
      return renderInput();
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
