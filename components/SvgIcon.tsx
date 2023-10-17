import Image from "next/image";

interface SvgIconProps {
  filepath: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any; // Allow any additional props
}
const SvgIcon = ({
  filepath,
  alt,
  width = 30,
  height = 30,
  ...props
}: SvgIconProps) => {
  return (
    <Image src={filepath} alt={alt} width={width} height={height} {...props} />
  );
};

export default SvgIcon;
