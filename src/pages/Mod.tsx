import { useEffect, useState } from 'react';

import { useCategoryQuery } from '../hooks/APICalls';
import { CategoryMenu } from '../components/Items/CategoryMenu';
import { Skeleton } from '../components/ui/skeletons/Skeleton';
import { ErrorOverlay } from '../components/ui/Status';

export function Mod() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const categoryFetch = useCategoryQuery();

  useEffect(() => {
    console.log('categoryFetch', categoryFetch.data);
    console.log('selectedCategory', selectedCategory);
  }, [categoryFetch.data, categoryFetch.isSuccess, selectedCategory]);

  return (
    <>
      {categoryFetch.data && (
        <CategoryMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryIni="weapon-mod"
        />
      )}

      {categoryFetch.isLoading && categoryFetch.isLoading && (
        <>
          <Skeleton component="CategoryChip" />
        </>
      )}

      {categoryFetch.isError && (
        <ErrorOverlay message={categoryFetch.error.message} />
      )}
    </>
  );
}
