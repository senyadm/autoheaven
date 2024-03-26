import { useRouter, usePathname } from "next/navigation";

export const useRedirectParams = (params) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  return () => replace(`${pathname}?${params.toString()}`);
};
