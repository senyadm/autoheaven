"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import AppDropdownMenu, { SortValue } from "../shared/AppDropdownMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CarSortDropdown = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useMemo(
    () =>
      searchParams ? new URLSearchParams(searchParams) : new URLSearchParams(),
    [searchParams]
  );

  const [sort, setSort] = useState<SortValue>(
    (params.get("sortBy") as SortValue) || "newestFirst"
  );
  useEffect(() => {
    if (params.get("sortBy") !== sort) {
      params.set("sortBy", sort);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [params, pathname, replace, sort]);

  return <AppDropdownMenu sort={sort} setSort={setSort} />;
};

export default memo(CarSortDropdown);
