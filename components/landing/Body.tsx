

'useClient'


import BrandsBlock from "./BrandsBlock";
import Carousel from "./Carousel";
import FilterComponent from "./Filters";
import TipsBlock from "./TipsBlock";
function Body() {
    return (
        <main className="body-container flex flex-col items-center bg-topography-light relative">
            <Carousel />
            <FilterComponent />
            <TipsBlock />
            <BrandsBlock />
        </main>
    );
}

export default Body;