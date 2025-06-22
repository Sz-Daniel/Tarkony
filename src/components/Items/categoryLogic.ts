import { useEffect } from 'react';
import type { CategoryType } from '../../api/types/Items/queryType';

type Props = {
  selected: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  categoriesCache: CategoryType[];
};

export const useSelectedBulkCategoryLogic = ({
  selected,
  setSelectedCategory,
  categoriesCache,
}: Props) => {
  /**
   * @param normalized The normalized name of the category
   * @param result The list already containing the selected category; children categories will be added to this list
   * @returns The filled array representing the selected category and all its descendants
   */
  const deepSearch = (normalized: string, result: string[] = []) => {
    const foundNode = categoriesCache.find(
      (cat) => cat.normalizedName === normalized
    );
    const foundName = foundNode?.normalizedName ?? '';

    result.push(foundName);

    foundNode?.children.forEach((child) =>
      deepSearch(child.normalizedName, result)
    );

    return result;
  };

  useEffect(() => {
    const result = deepSearch(selected);
    setSelectedCategory(result);
  }, [selected]);
};

/* Last version - instend local array, it's using state
    //collected the selected category normalizedname and childs normalized names
    const [collectorCategNormalizedNames, setCollectorCategNormalizedNames] =
    useState<string[]>([]);

    useEffect(() => {
    //null the prev categ
    setCollectorCategNormalizedNames([]);
    //search and list the selected category and all of childs
    deepSearch(selected);
    }, [selected]);

    const deepSearch = (normalized: string) => {
    //find the categ node by normalisedName and push the name to the Categ name collector (setCollectorCategNormalizedNames)
    const foundNode = categoriesCache.find(
        (cat) => cat.normalizedName === normalized
    );
    const foundName = foundNode?.normalizedName ?? '';
    setCollectorCategNormalizedNames((prev) => [...prev, foundName]);
    //then go into his childs
    foundNode?.children.forEach((cat) => deepSearch(cat.normalizedName));
    if (foundNode?.children === null) {
        console.log(collectorCategNormalizedNames);
    }
    };

    useEffect(() => {
    setSelectedCategory(collectorCategNormalizedNames);
    }, [collectorCategNormalizedNames]);
*/
