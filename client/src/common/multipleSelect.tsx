import React from "react";
import Multiselect from "multiselect-react-dropdown";

interface Option {
  id: string;
  name: string;
}

type Props = {
  name: string;
  label: string;
  options: { id: string; name: string }[];
  error?: string;
  value: { id: string; name: string }[];
  selectedOptions?: { id: string; name: string }[];
  setSelectedOptions?: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;

  onChange: (name: string, selectedOptions: Option[]) => void; // Update the onChange prop type
};

function MultipleSelect({
  name,
  label,
  value,
  options,
  error,
  selectedOptions,
  setSelectedOptions,
  onChange,
  ...rest
}: Props) {
  const handleSelect = (
    selectedList: Option[],
    selectedItem: Option | undefined
  ) => {
    if (setSelectedOptions) {
      setSelectedOptions(selectedList);
      onChange(name, selectedList);
    }
  };

  return (
    <>
      <div className="form-group">
        <label
          id={name}
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: label }}
        />

        <Multiselect
          options={options}
          selectedValues={value}
          onSelect={handleSelect}
          onRemove={handleSelect}
          displayValue="name"
        />

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
}

export default MultipleSelect;
