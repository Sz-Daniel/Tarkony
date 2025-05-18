/**
 * Function: generate the fragments for easy usable. 
 * queries will contain all of them with simple name 
 */

//ShortItemsList
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

//Everytime when it's expanded the fragments list, these data should update manually
//FragmentName|
export type GraphqlQueriesType = 'ShortItemsList' | 'AllAttrItemList';
//FragmentName: buildQuery(FRAGMANT_LITERAL, FragmentName)
export const queries = {
    ShortItemsList: buildQuery(SHORT_ITEMS_LIST,'ShortItemsList'),
    AllAttrItemList: buildQuery(ALL_ATTR_ITEM_LIST,'AllAttrItemList'),
}