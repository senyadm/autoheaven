import {
  AllParams,
  FullPageParams,
  getMetadataFromRawParams,
  parsePageParams,
} from "../../../src/shared/utils/params";
import { BrowseVehicles } from "../../../src/app-pages/browse-vehicles";
import { Home } from "../../../src/app-pages/home";
import { ListHeaven } from "../../../src/widgets/listheaven";
import { Locale } from "../../../src/app/i18n.config";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next/types";
import ListHeavenHome from "../../../src/app-pages/listheaven/ui/ListHeavenHome";
import { staticParams } from '@/src/app/static-params';

export async function generateStaticParams() {
  const {default: defaultParams, browseVehicles, listHeaven} = staticParams;
  return [ ...defaultParams, ...browseVehicles, ...listHeaven ];
}


export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const m = getMetadataFromRawParams(params);
  return m;
}

interface PageProps {
  params: {
    lang: Locale;
    slug: string[];
  };
  searchParams: ReadonlyURLSearchParams;
}

const page = ({ params, searchParams }: PageProps) => {
  const { lang, slug } = params;
  if (!lang) return;
  const parsedParams = parsePageParams(slug);
  const pathParams: FullPageParams = {
    lang: params.lang,
    ...parsedParams,
  };
  const allParams: AllParams = { ...pathParams, ...searchParams };

  if (parsedParams.vehicleType) {
    if (parsedParams.isListHeaven) {
      return <ListHeaven params={allParams} searchParams={searchParams} />;
    }
    return (
      <BrowseVehicles
        pathParams={pathParams}
        searchParams={searchParams}
        vehicleType={parsedParams.vehicleType}
      />
    );
  } else {
    if (parsedParams.isListHeaven) {
      return <ListHeavenHome params={params} />;
    } else {
      return <Home params={allParams} />;
    }
  }
};

export default page;
