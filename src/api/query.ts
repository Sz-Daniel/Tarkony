/**
 * Function: generate the fragments for easy usable. 
 * queries will contain all of them with simple name 
 */

//Changed into { name, query } due graphQLClient.ts useFetchintoState improved hook, caching name normalized. 
//Adapters added. Query into PageState 

//Trader Price need to find the perfect vendor to sell
export function shortItemsListAdapter(data: any) {
  return data.map((item: any)=>({
    id: item.id,
    name: item.name,
    iconURL: item.gridImageLink,
    traderPrice: item.sellFor.reduce(
      (acc:number,cv:any,ci:number)=> 
        acc < cv.priceRUB ? acc = cv.priceRUB : acc
    ,0),
    traderName: item.sellFor[ 
      item.sellFor.reduce(
        (minIdx:number,cv:any,ci:number, src:any)=> 
          src[minIdx].priceRUB < cv.priceRUB ? minIdx = ci : minIdx
    ,0)]?.vendor?.name, 
    lowestPrice: item.lastLowPrice,
    lastPrice: item.avg24hPrice,
    diffPrice: Math.floor( (item.avg24hPrice / item.lastLowPrice) * 100) / 100
  }))   
}
export const shortItemsListQuery = {
  name: 'shortItemsListQuery',
  query: `   
  query {
    items {
      id
      avg24hPrice
      lastLowPrice
      name
      gridImageLink
      sellFor{ 
        priceRUB
        vendor{
          name,
        }
      }
    } 
  }`
}

export const testIdNameQuery = `
 query {
    itemCategories {
      id
      name
    }
  }`


  export const categoryListQuery = {
    name: 'categoryListQuery',
    query:`   
    query {
    itemCategories {
        id
        name
        normalizedName
        children {
          id
        }
        parent {
          id
        }
      }
    }`
  }




//AllAttrItemList
const MAIN_ITEM_LIST = `
    fragment MainItemList on Item {
      	id, 
        name, 
        normalizedName, 
        shortName, 
        description, 
        basePrice, 
        updated, 
        width, 
        height, 
        backgroundColor, 
        iconLink, 
        gridImageLink, 
        baseImageLink, 
        inspectImageLink, 
        image512pxLink, 
        image8xLink, 
        wikiLink, 
        types, 
        avg24hPrice, 
        properties{
          __typename
        },
        conflictingItems{
        	id,name
        },
        conflictingSlotIds, 
        accuracyModifier, 
        recoilModifier, 
        ergonomicsModifier,
        hasGrid, 
        blocksHeadphones, 
        link, 
        lastLowPrice, 
        changeLast48h, 
        changeLast48hPercent, 
        low24hPrice, 
        high24hPrice, 
        lastOfferCount, 
        sellFor{
          vendor{name, normalizedName,__typename},
          price,
          currency,
          currencyItem{id,name},
          priceRUB,
          __typename
        }, 
        buyFor{
                    vendor{name, normalizedName,__typename},
          price,
          currency,
          currencyItem{id,name},
          priceRUB,
          __typename
        }, 
        containsItems{
          item{id,name},
          count,
          quantity,
          attributes{type,name,value},
          __typename
        }, 
        category{id,name,normalizedName,parent{id},children{id},__typename}, 
        categories{id}, 
        bsgCategoryId, 
        handbookCategories{id,name,normalizedName,parent{id},children{id},__typename}, 
        weight, 
        velocity, 
        loudness, 
        usedInTasks{id,name,normalizedName,trader{id},map{id},experience,wikiLink}, 
        receivedFromTasks{id}, 
        bartersFor{id}, 
        bartersUsing{id}, 
        craftsFor{id}, 
        craftsUsing{id}, 
        historicalPrices{price,priceMin,timestamp}, 
        fleaMarketFee
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
export type GraphqlQueriesType = 'MainItemList' ;

//FragmentName: buildQuery(FRAGMANT_LITERAL, FragmentName)
export const queries = {
    MainItemList: buildQuery(MAIN_ITEM_LIST,'MainItemList'),
}

/**
 * 
 * const MAIN_ITEM_LIST = `
    fragment MainItemList on Item {
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
 */