import type { CategoryType } from "../types/items/queryType";

export function printCategoryTree(
    categories: CategoryType[],
    currentName: string,
    depth: number = 0
    ): void {
    const current = categories.find(cat => cat.normalizedName === currentName);
    if (!current) return;

    // kiírás tabulátorral (mélység szerint)
    console.log(`${'  '.repeat(depth)}- ${current.normalizedName}`);

    // minden gyerekre meghívjuk újra
    for (const child of current.children) {
        printCategoryTree(categories, child.normalizedName, depth + 1);
    }
    }