import React from "react";

const sizeClasses = {
  txtPoppinsRegular14GreenA40090: "font-normal font-poppins",
  txtPoppinsMedium20Black900: "font-medium font-poppins",
  txtPoppinsMedium12Gray5099: "font-medium font-poppins",
  txtInterRegular20: "font-inter font-normal",
  txtPoppinsRegular16Gray50: "font-normal font-poppins",
  txtPoppinsRegular16Black90087: "font-normal font-poppins",
  txtPoppinsRegular14Gray50: "font-normal font-poppins",
  txtPoppinsRegular14Black90087: "font-normal font-poppins",
  txtPoppinsMedium16Black90087: "font-medium font-poppins",
  txtInterSemiBold24: "font-inter font-semibold",
  txtPoppinsRegular12WhiteA700: "font-normal font-poppins",
  txtInterBold24: "font-bold font-inter",
  txtPoppinsRegular16WhiteA700: "font-normal font-poppins",
  txtPoppinsSemiBold14: "font-poppins font-semibold",
  txtPoppinsRegular12Gray50: "font-normal font-poppins",
  txtPoppinsRegular12: "font-normal font-poppins",
  txtPoppinsRegular16Red600: "font-normal font-poppins",
  txtPoppinsMedium12: "font-medium font-poppins",
  txtPoppinsSemiBold16: "font-poppins font-semibold",
  txtInterRegular24: "font-inter font-normal",
  txtPoppinsMedium16: "font-medium font-poppins",
  txtInterBold24Gray50: "font-bold font-inter",
  txtPoppinsMedium16WhiteA700: "font-medium font-poppins",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtPoppinsMedium20Gray50: "font-medium font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtInterMedium36: "font-inter font-medium",
  txtPoppinsMedium16Red600: "font-medium font-poppins",
  txtPoppinsMedium20: "font-medium font-poppins",
  txtPoppinsRegular16Black9007e: "font-normal font-poppins",
  txtPoppinsRegular20: "font-normal font-poppins",
  txtPoppinsSemiBold14Black90087: "font-poppins font-semibold",
} as const;

export type TextProps = Partial<{
  className: string;
  size: keyof typeof sizeClasses;
  as: any;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  size,
  as,
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
