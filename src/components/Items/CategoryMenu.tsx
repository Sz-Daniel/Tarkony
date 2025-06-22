import { useQueryClient } from '@tanstack/react-query';
import { categoriesQuery } from '../../api/itemsQuery';
import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import type { CategoryType } from '../../api/types/Items/queryType';
import { useSelectedBulkCategoryLogic } from './categoryLogic';

type Props = {
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
};

export function CategoryMenu({ selectedCategory, setSelectedCategory }: Props) {
  // Selected single category directly from the category list
  const [selected, setSelected] = useState<string>('item');

  // This state stores the category map to display, showing the current level plus one level of children based on the previously selected category
  const [categoryListShow, setCategoryListShow] = useState<
    Map<string, string[]>
  >(new Map());

  // Helper function to update the category map state
  const updateCategoryListShow = (key: string, value: string[]) => {
    setCategoryListShow((map) => new Map(map.set(key, value)));
  };

  // Sets the selected category on user interaction
  const categHandler = (onClickNormalizedName: string) => {
    setSelected(onClickNormalizedName);
  };

  // Retrieves categories from the cache (source)
  const queryClient = useQueryClient();
  const categoriesCache: CategoryType[] =
    queryClient.getQueryData([categoriesQuery.name]) ?? [];

  // Generates the complete category array for item display based on the selected category (uses custom hook)
  useSelectedBulkCategoryLogic({
    selected,
    setSelectedCategory,
    categoriesCache,
  });

  useEffect(() => {
    // When navigating upwards in the category hierarchy, removes intermediate categories from the displayed map
    // Checks if the newly selected category already exists in the current map values
    const iterValues = Array.from(categoryListShow.values());

    for (let index = 0; index < iterValues.length; index++) {
      const selectedCheck = Array.from(iterValues[index]).includes(selected);
      if (selectedCheck) {
        // Cuts off the map entries beyond the found level to reflect upward navigation
        const slicedMap = new Map(
          Array.from(categoryListShow.entries()).slice(0, index + 1)
        );
        setCategoryListShow(slicedMap);
      }
    }

    // Updates the map with the children of the currently selected category
    const categoryChilds =
      categoriesCache
        .find((cat) => cat.normalizedName === selected)
        ?.children.flatMap((child) => child.normalizedName) ?? [];
    updateCategoryListShow(selected, categoryChilds);
  }, [selected]);

  // Chip component disabled property logic: disables chips that represent already selected categories in the current map during rerenders

  return (
    <div style={{ margin: 4 }}>
      {Array.from(categoryListShow.entries()).map(([Mapkey, value]) => (
        <div key={Mapkey}>
          {value.map((cat, idx) => (
            <Chip
              key={idx}
              label={
                categoriesCache.find((cached) => cached.normalizedName === cat)
                  ?.name
              }
              disabled={
                categoryListShow.has(Mapkey) &&
                Array.from(categoryListShow.keys()).includes(cat)
              }
              onClick={() => categHandler(cat)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
