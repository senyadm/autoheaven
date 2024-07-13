import { FiltersDictionary } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { Filter } from "../types";
import { Label } from "@/components/ui/label";

export type TabKeys = "cars" | "moto" | "trucks" | "busses";

type BrandEntry = [
  string,
  { id: number; models: { name: string; id: number }[] }
];

type VirtualizedListProps = {
  // dict: FiltersDictionary;
  entries: BrandEntry[];
  filter: Filter;
  toggleBrands: () => void;
  hidden: boolean;
  handleBrandClick: (brand: string) => void;
  // handleSelectorChange: (
  //   tab: TabKeys,
  //   type: string,
  //   selectorValue: string
  // ) => void;
  handleModelClick: (make: string, model: string) => void;
};

interface GroupedEntries {
  [key: string]: BrandEntry[];
}

const VirtualizedList: React.FC<VirtualizedListProps> = React.memo(
  ({
    // dict,
    entries,
    handleBrandClick,
    handleModelClick,
    toggleBrands,
    hidden,
  }) => {
    const [showModels, setShowModels] = useState(false);
    const [hoveredBrand, setHoveredBrand] = useState("");
    const [typedChars, setTypedChars] = useState("");
    const [modelListTopPosition, setModelListTopPosition] = useState<
      number | undefined
    >(undefined);
    const [modelListBottomPosition, setModelListBottomPosition] = useState<
      number | undefined
    >(undefined);
    const [hoveringOverModels, setHoveringOverModels] = useState(false);
    const mainContainerRef = useRef<HTMLDivElement | null>(null);
    const brandRefs = entries.reduce((acc, [brand]) => {
      acc[brand] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>);

    let topPosition: number | undefined;
    if (
      hoveredBrand &&
      brandRefs[hoveredBrand]?.current &&
      brandRefs[hoveredBrand]
    ) {
      topPosition = brandRefs[hoveredBrand]?.current?.offsetTop;
    }

    function scrollToBrand(brandElement: HTMLElement | null) {
      if (brandElement && brandElement.parentElement) {
        // Get the current scroll position of the container
        const containerScrollTop = brandElement.parentElement.scrollTop;

        // Determine the offset of the brandElement relative to its container
        const brandOffsetTop = brandElement.offsetTop;

        // Determine how much to adjust the scroll by
        const adjustment = 50; // You can adjust this value to set the preferred offset

        // Set the new scroll position
        brandElement.parentElement.scrollTop = brandOffsetTop - adjustment;
      }
    }

    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        const char = event.key;
        if (["ArrowDown", "ArrowUp", "Space", "x", "f"].includes(char)) {
          event.preventDefault();
        }
        if (char.length === 1 && /[a-zA-Z]/.test(char)) {
          const newTypedChars = typedChars + char.toLowerCase();

          const matchingBrand = Object.keys(brandRefs).find((brand) =>
            brand.toLowerCase().startsWith(newTypedChars)
          );
          if (matchingBrand && brandRefs[matchingBrand]?.current) {
            const brandElement = brandRefs[matchingBrand].current;
            scrollToBrand(brandElement);
          }

          setTypedChars(newTypedChars);
        }
      }

      function handleClickOutside(event: MouseEvent) {
        if (
          mainContainerRef.current &&
          !mainContainerRef.current.contains(event.target as Node) &&
          !hidden
        ) {
          toggleBrands();
        }
      }

      if (!hidden) {
        document.addEventListener("keydown", handleKeyDown);
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [hidden, typedChars]);

    useEffect(() => {
      const clearCharsTimeout = setTimeout(() => {
        setTypedChars("");
      }, 1000);

      return () => {
        clearTimeout(clearCharsTimeout);
      };
    }, [typedChars]);
    const modelsDropdownRef = React.createRef<HTMLDivElement>();

    const sortedEntries = [...entries].sort((a, b) => a[0].localeCompare(b[0]));

    const groupedByLetter = sortedEntries.reduce<GroupedEntries>(
      (acc, entry) => {
        const letter = entry[0][0].toUpperCase();
        if (!acc[letter]) {
          acc[letter] = [];
        }

        acc[letter].push(entry);
        return acc;
      },
      {}
    );

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          mainContainerRef.current &&
          !mainContainerRef.current.contains(event.target as Node) &&
          !hidden
        ) {
          toggleBrands();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [hidden]);

    return (
      <div
        className={`relative w-1/2 bg-white border border-gray-200 rounded shadow-md transition-transform transition-opacity duration-300 ease-in-out transform ${
          hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
        ref={mainContainerRef}
      >
        <div className="w-full border-r h-[200px] absolute overflow-y-auto bg-white">
          {Object.entries(groupedByLetter).map(([letter, brandsForLetter]) => (
            <div key={letter}>
              <div className="font-bold text-xl p-2">{letter}</div>
              {brandsForLetter.map(([brand], brandIndex) => (
                <div
                  key={brandIndex}
                  ref={brandRefs[brand]}
                  className="group relative hover:bg-gray-200 p-2 ml-1 cursor-pointer"
                  onMouseEnter={() => {
                    const brandRef = brandRefs[brand]?.current;
                    if (brandRef) {
                      const container = brandRef.closest(".overflow-y-auto");
                      const brandTopPosition =
                        brandRef.getBoundingClientRect().top;
                      const brandBottomPosition =
                        brandRef.getBoundingClientRect().bottom;
                      const availableSpaceBelow =
                        window.innerHeight - brandBottomPosition;
                      const availableSpaceAbove = brandTopPosition;

                      const dropdownHeight =
                        modelsDropdownRef.current?.getBoundingClientRect()
                          .height || 0;
                      const adjustedTopPosition =
                        brandRef.offsetTop -
                        (container ? container.scrollTop : 0);

                      if (
                        availableSpaceBelow < dropdownHeight &&
                        availableSpaceAbove < dropdownHeight
                      ) {
                        setModelListTopPosition(adjustedTopPosition);
                        setModelListBottomPosition(undefined);
                      } else if (availableSpaceBelow < dropdownHeight) {
                        setModelListTopPosition(
                          adjustedTopPosition - dropdownHeight
                        );
                        setModelListBottomPosition(undefined);
                      } else {
                        setModelListTopPosition(adjustedTopPosition);
                        setModelListBottomPosition(undefined);
                      }
                    }
                    setHoveredBrand(brand);
                    setShowModels(true);
                  }}
                  onClick={() => handleBrandClick && handleBrandClick(brand)}
                >
                  <Label>{brand}</Label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {showModels && (
          <div
            className="absolute left-full mt-0 z-10 bg-white border border-gray-200 rounded shadow-md w-64 max-h-60 overflow-y-auto"
            style={{
              top: modelListTopPosition,
              bottom: modelListBottomPosition,
            }}
            onMouseEnter={() => setHoveringOverModels(true)}
            onMouseLeave={() => {
              setHoveringOverModels(false);
              setShowModels(false);
            }}
          >
            {entries.map(([make, models]) => {
              if (make === hoveredBrand) {
                console.log("models", models.models[0]);
                return models.models.map((model, modelIndex) => (
                  <div
                    key={modelIndex}
                    className="p-2 cursor-pointer hover:bg-gray-300"
                    onClick={() =>
                      handleModelClick && handleModelClick(make, model.name)
                    }
                  >
                    {model.name}
                  </div>
                ));
              }
              return null;
            })}
          </div>
        )}
      </div>
    );
  }
);
VirtualizedList.displayName = "VirtualizedList";
export { VirtualizedList };
