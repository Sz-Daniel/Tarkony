//Need to polish
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
    diffPrice: Math.floor( (item.avg24hPrice / item.lastLowPrice) * 100) / 100,
    category: item.category.normalizedName,
    wiki: item.wikiLink
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
      category {
        normalizedName,
      }
      wikiLink     
    } 
  }`
}

export const categoriesQuery = {
  name: 'categoriesQuery',
  query: `
  query{
     itemCategories {
      id
      name
      normalizedName
      children {
        name
      }
      parent {
        name
      }
    }
  }`
}