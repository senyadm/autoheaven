import React from "react";

const CarPagination = () => {
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!store) return;
    if (currentPage < store.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
  };
  return (
    <div className="flex w-full justify-center space-x-2">
      <Button onClick={goToFirstPage} disabled={!currentPage}>
        <ChevronsLeft key={"csl"} {...paginationIconProps} />
      </Button>
      <Button onClick={handlePrevious} disabled={!currentPage}>
        <ChevronLeft key={"cl"} {...paginationIconProps} />
      </Button>
      <Button onClick={handleNext} disabled={currentPage + 1 === store?.length}>
        <ChevronRight key={"cr"} {...paginationIconProps} />
      </Button>
    </div>
  );
};

export default CarPagination;
