

'useClient'


import BrandsBlock from "./BrandsBlock";
import FilterComponent from "./Filters";
import TipsBlock from "./TipsBlock";
function Body() {
    return (
        <main className="body-container flex flex-col items-center bg-topography-light">
            <FilterComponent />
            <TipsBlock />
            <BrandsBlock />
        </main>
    );
}

export default Body;