import { useRouter, usePathname } from "next/navigation";

export const useRedirectParams = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  return (params) => replace(`${pathname}?${params.toString()}`);
};
