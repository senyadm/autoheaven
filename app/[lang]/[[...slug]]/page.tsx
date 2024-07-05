import { parsePageParams } from "../../../src/app-pages/browse-vehicles/lib/params";
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
  const fullParams = {
    lang: params.lang,
    country: parsedParams.country,
    city: parsedParams.city,
  };
  if (parsedParams.vehicleType)
    return (
      <BrowseVehicles
        params={fullParams}
        searchParams={searchParams}
        vehicleType={parsedParams.vehicleType}
      />
    );
  if (parsedParams.isListHeaven)
    return <ListHeaven params={fullParams} searchParams={searchParams} />;
  return <Home params={fullParams} />;
};

export default page;
