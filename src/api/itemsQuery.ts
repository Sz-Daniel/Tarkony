import type { ItemBaseQueryType, ItemDetailQueryType, QueryType, traderForType,  } from "../types/Items/queryType";
import type { ItemBaseResultType, ItemDetailResultType } from "../types/Items/responseType";

/** Queries
 * 
 *  Name usage for cache name 
 *  Key type name a feldolgozás alatt objektum azonosításra hogy tömböt adhasson vissza a fetch
 *  Query string for API call 
 */

export function itemBaseAdapter(data: ItemBaseQueryType[]): ItemBaseResultType[] {
  const bestSeller = (sellers: traderForType[]) => {
    if (!sellers || sellers.length === 0) return null;
    return sellers.reduce((best, current) =>
      current.priceRUB > best.priceRUB ? current : best
    );
  };
  return data.map((item: ItemBaseQueryType)=>{
    const top = bestSeller(item.sellFor);
      return {
      id: item.id ?? null,
      name: item.name ?? "",
      iconURL: item.gridImageLink ?? "",
      bestPrice: top?.priceRUB ?? null,
      bestPlace: top?.vendor?.name ?? null,
      changePrice: item.changeLast48h ?? 0,
      changePercent: item.changeLast48hPercent ?? 0,
      category: item.category.normalizedName ?? "",
    }
  })   
}

export const itemBaseQuery = {
  name: 'itemBaseQuery',
  key: 'items',
  query: `   
  query {
    items {
      id
      name
      category {
        normalizedName,
      } 
      gridImageLink
      changeLast48h
      changeLast48hPercent
      sellFor{ 
        priceRUB
        vendor{
          name
        }
      }
   
    } 
  }`
}

export const searchNameItemBaseQuery = (name: string = ""): QueryType => {
  return {
  name: `searchNameItemBaseQuery`,
  key: 'items',
  query: `   
  query{
    items(name: "${name}") {
      id
      name
      category {
        normalizedName
      }
      gridImageLink
      changeLast48h
      changeLast48hPercent
      sellFor {
        priceRUB
        vendor {
          name
        }
      }
    }
  }
`}
}

export const categoriesQuery = {
  name: 'categoriesQuery',
  key: 'itemCategories',
  query: `
  query{
     itemCategories {
      id
      name
      normalizedName
      children {
        normalizedName
      }
      parent {
        normalizedName
      }
    }
  }`
}

export function itemDetailsAdapter(data: ItemDetailQueryType[]): ItemDetailResultType[] {
  //functions
  console.log("details data",data)
  return data.map((item: ItemDetailQueryType)=>{
    //att fix
    return{
      id: item.id ?? null,
      name: item.name ?? "",
      normalizedName: item.normalizedName ?? "",
      wiki: item.wikiLink ?? "",
      sellOffer: item.sellFor.map((sell)=>{
        return{
          price: sell.priceRUB ?? 0,
          vendor: sell.vendor.name ?? "",
        }
      }),
      buyOffer: item.buyFor.map((buy)=>{
        return{
          price: buy.priceRUB ?? 0,
          vendor: buy.vendor.name ?? "",
        }
      }),
      bartersNeeds: item.bartersFor.flatMap((req) => 
        req.requiredItems.map((needs) => ({
          count: needs.count ?? 0,
          name: needs.item.name ?? "",
          icon: needs.item.gridImageLink ?? "",
        }))
      ),
      bartersGive: item.bartersUsing.flatMap((rew)=> 
        rew.rewardItems.map((gives)=>({      
          count: gives.count ?? 0,
          name: gives.item.name ?? "",
          icon: gives.item.gridImageLink ?? "",
        }))
      ),
      craftsNeeds: item.craftsFor.flatMap((req)=>
        req.requiredItems.map((needs)=>({      
          count: needs.count ?? 0,
          name: needs.item.name ?? "",
          icon: needs.item.gridImageLink ?? "",
        }))
      ),
      craftsGive:item.craftsUsing.flatMap((rew)=>
         rew.rewardItems.map((gives)=>({      
          count: gives.count ?? 0,
          name: gives.item.name ?? "",
          icon: gives.item.gridImageLink ?? "",
        }))
      ),
      tasksRewards: item.receivedFromTasks.flatMap((rew) => {
        const found = rew.finishRewards.items.findIndex((rewardItem) => 
          rewardItem.item.name.includes(item.name)
        );
        if (found >= 0) {
          return [{
            name: rew.name ?? "",
            count: rew.finishRewards.items[found].count ?? 0,
          }];
        }
        return [];
      })

    }
  })
}

export const itemDetailsQuery = (id: string = ""): QueryType => {
  return {
    name: `itemDetails-${id}`,
    key: 'items',
    query: `   
    query {
      items(ids: "${id}") {
        id
        name
        normalizedName
        wikiLink
        sellFor{ 
          priceRUB
          vendor{
            name,
          }
        }
        buyFor{ 
          priceRUB
          vendor{
            name,
          }
        }
        bartersFor {
          requiredItems {
            count
            item {
              gridImageLink
              name
            }
          }
        }
        bartersUsing {
          rewardItems {
            count
            item {
              gridImageLink
              name
            }
          }
        }
        craftsFor {
          requiredItems {
            count
            item {
              gridImageLink
              name
            }
          }
        }
        craftsUsing {
          rewardItems {
            count
            item {
              gridImageLink
              name
            }
          }
        }
        receivedFromTasks {
          name
          finishRewards {
            items {
              item {
                name
              }
              count
            }
          }
        }

      }  
    }`
  }
}


