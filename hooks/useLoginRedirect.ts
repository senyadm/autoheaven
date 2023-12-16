import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const useLoginRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();

  const redirectToLogin = () => {
    localStorage.setItem("originalUrl", pathname || '/');
    router.push("/login");
  };

  return redirectToLogin;
};

export default useLoginRedirect;
