import {
  AllParams,
  FullPageParams,
  parsePageParams,
} from "../../../src/shared/utils/params";
import { BrowseVehicles } from "../../../src/app-pages/browse-vehicles";
import { Home } from "../../../src/app-pages/home";
import { ListHeaven } from "../../../src/widgets/listheaven";
import { Locale } from "../../../src/app/i18n.config";
import { ReadonlyURLSearchParams } from "next/navigation";

interface PageProps {
  params: {
    lang: Locale;
    slug: string[];
  };
  searchParams: ReadonlyURLSearchParams;
}

const page = ({ params, searchParams }: PageProps) => {
  console.log("🚀 ~ page ~ params:", params);
  const { lang, slug } = params;
  if (!lang) return;
  const parsedParams = parsePageParams(slug);
  console.log("🚀 ~ page ~ parsedParams:", parsedParams);
  const pathParams: FullPageParams = {
    lang: params.lang,
    ...parsedParams,
  };
  const allParams: AllParams = { ...pathParams, ...searchParams };

  if (parsedParams.vehicleType)
    return (
      <BrowseVehicles
        pathParams={pathParams}
        searchParams={searchParams}
        vehicleType={parsedParams.vehicleType}
      />
    );
  if (parsedParams.isListHeaven)
    return <ListHeaven params={allParams} searchParams={searchParams} />;
  return <Home params={allParams} />;
};

export default page;
