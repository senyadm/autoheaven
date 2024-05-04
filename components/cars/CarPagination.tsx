import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterParams } from "../../src/shared/model/params";

const paginationIconProps = {
  width: 16,
  height: 16,
};
interface CarPaginationProps {
  searchParams: FilterParams;
  pageCount: number;
}
const CarPagination = ({ searchParams, pageCount }: CarPaginationProps) => {
  const currentPage = Number(searchParams.page) || 0;
  const newURLSearchParams = new URLSearchParams(searchParams);
  const prepareHref = (nextPage) => {
    newURLSearchParams.set("page", nextPage);
    return `cars?${newURLSearchParams.toString()}`;
  };
  const disabledLinkProps = {
    className: "pointer-events-none text-gray-400",
    ariaDisabled: true,
    tabIndex: -1,
  };
  const previousPageProps = currentPage === 0 ? disabledLinkProps : {};
  const nextPageProps = currentPage + 1 >= pageCount ? disabledLinkProps : {};
  const paginationData = {
    previous: {
      href: prepareHref(currentPage - 1),
      ...previousPageProps,
    },
    next: {
      href: prepareHref(currentPage + 1),
      ...nextPageProps,
    },
  };
  // TODO: finish pagination to deal with multiple pages when there are more cars in db
  return (
    <div className="flex w-full justify-center space-x-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious {...paginationData.previous} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext {...paginationData.next} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CarPagination;
