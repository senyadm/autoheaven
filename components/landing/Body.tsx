

'useClient'


import FilterComponent from "./Filters";
import TipsBlock from "./TipsBlock";
function Body() {
    return (
        <main className="body-container flex flex-col items-center">
            <FilterComponent />
            <TipsBlock />

        </main>
    );
}

export default Body;