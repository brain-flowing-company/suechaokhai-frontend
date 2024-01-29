import React from "react";
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  children?: React.ReactNode;
}

const TextBox = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, children, label, type = "text", error, ...props }, ref) => {
    return (
      <div className={className + "py-[9px]"}>
        {label && (
          <label className="inline-block pb-[8px]" htmlFor="txt">
            {label}:
          </label>
        )}
        <input
          id="txt"
          autoComplete="off"
          className="block h-[50px] w-[510px] rounded-[10px] border border-[#B3B3B3] p-2 text-gray-700"
          {...props}
          ref={ref}
          type={type}
        ></input>

        <div className="flex">{children}</div>
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
export default TextBox;
