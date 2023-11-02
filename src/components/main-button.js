import React, { forwardRef } from "react";
import { Button } from "@mui/material";
import clsx from "clsx";

const MainButton = forwardRef(function MainButton(props, ref) {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      ref={ref}
      {...otherProps}
      className={clsx(
        "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-600 hover:to-secondary-600 text-white",
        className
      )}
    >
      {children}
    </Button>
  );
});

export { MainButton };
