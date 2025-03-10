import { ReactNode } from "react";

interface ButtonProps {
  title: string;
  size: "lg" | "sm" | "md";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  extraStyles?: string;
  // onClick?: (e?: React.MouseEventHandler<HTMLButtonElement>) => void;
  onClick?: () => void;
}

const sizeStyles = {
  sm: "px-2 py-1 text-sm rounded-sm",
  md: "px-4 py-2 text-md rounded-md",
  lg: "px-8 py-4 text-xl rounded-xl",
};

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};
function Button(props: ButtonProps) {
  const StartIcon = props.startIcon;
  const EndIcon = props.endIcon;
  const loadingStyles =
    props.loading || props.disabled
      ? "opacity-80"
      : "opacity-95 hover:opacity-100 cursor-pointer";
  return (
    <button
      className={`flex justify-center items-center gap-2 ${loadingStyles} ${
        sizeStyles[props.size]
      } ${variantStyles[props.variant]} ${props.extraStyles} `}
      disabled={props.disabled || props.loading}
      onClick={(e) => {
        e.stopPropagation();
        if (props.onClick) props.onClick();
      }}
    >
      {props.loading && (
        <svg
          className="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {StartIcon ? StartIcon : null}
      <div>{props.loading ? "Please wait..." : props.title}</div>
      {EndIcon ? EndIcon : null}
    </button>
  );
}

export default Button;
