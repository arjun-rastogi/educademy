import React from "react";
import NoImageAvailable from "../assets/images/NoImageAvailable.jpg";
import ImageSuccess from "../assets/images/ImageSuccess.gif";
import getImageType from "./../utils/getImageType";

type Props = {
  name: string;
  label: string;
  value: string;
  type: string;
  error?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  src?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop to Props type
};

function Input({
  name,
  label,
  value,
  type,
  error,
  className,
  placeholder,
  required,
  src,
  onChange,
  ...rest
}: Props) {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name} dangerouslySetInnerHTML={{ __html: label }} />
        <div className="input">
          <input
            id={name}
            name={name}
            value={value}
            type={type}
            className={`form-control ${className}`}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            {...rest}
          />
          {type === "file" ? (
            <>
              {getImageType(src as string) === "No image" || src === "" ? (
                <img src={NoImageAvailable} alt={name} />
              ) : getImageType(src as string) === "Unknown image type" ? (
                <img src={ImageSuccess} alt={name} />
              ) : getImageType(src as string) === "Image" ? (
                <img src={src} alt={name} />
              ) : (
                <img src={NoImageAvailable} alt={name} />
              )}
            </>
          ) : null}
        </div>

        {error && <p className="text-danger">{error}</p>}
      </div>
    </>
  );
}

export default Input;
