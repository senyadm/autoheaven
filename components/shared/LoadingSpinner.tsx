import { cn } from "../../src/shared/utils/cn";

interface LoadingSpinnerProps {
  className?: string;
  strokeWidth?: number;
}
const LoadingSpinner = ({
  className,
  strokeWidth = 2,
}: LoadingSpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export default LoadingSpinner;
