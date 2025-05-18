/**
 * Function: generate the fragments for easy usable. 
 * queries will contain all of them with simple name 
 */

//ItemsList
const SHORT_ITEMS_LIST = `
    fragment ShortItemsList on Item {
        id
        name
    }`;
//AllAttrItemList
const ALL_ATTR_ITEM_LIST = `
    fragment AllAttrItemList on Item {
        id
        name
        description
        basePrice
        width
        height
        weight
        iconLink
        wikiLink
        category {
            name
        }
        properties{__typename}
    }`;

function buildQuery(fragment: string,fragmentName:string): string{
    return `
    ${fragment}
    query {
        items {
            ...${fragmentName}
        }
    }
    `;
}

//Everytime when expand the fragment list, these data should update manually
//FragmantName|
export type GraphqlQueriesType = 'ShortItemsList' | 'AllAttrItemList';
//FragmantName: buildQuery(FRAGMANT_LITERAL, FragmantName)
export const queries = {
    ShortItemsList: buildQuery(SHORT_ITEMS_LIST,'ShortItemsList'),
    AllAttrItemList: buildQuery(ALL_ATTR_ITEM_LIST,'AllAttrItemList'),
}