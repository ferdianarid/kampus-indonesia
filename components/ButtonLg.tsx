import { forwardRef, AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children?: string;
}

const ButtonLg = forwardRef<HTMLAnchorElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`bg-primary rounded-xl text-white px-5 py-2 ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ButtonLg.displayName = "ButtonLg";

export default ButtonLg;
