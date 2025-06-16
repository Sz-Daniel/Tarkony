import type { QueryType  } from "../types/Items/queryType";

/** Queries
 * 
 *  Name usage for cache name 
 *  Key type name a feldolgozás alatt objektum azonosításra hogy tömböt adhasson vissza a fetch
 *  Query string for API call 
 */

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
        sellFor {
          currency
          price
          priceRUB
          vendor {
            name
            ... on FleaMarket {
              foundInRaidRequired
            }
          }
        }

        buyFor {
            currency
            price
            priceRUB
            vendor {
            ... on TraderOffer {
              minTraderLevel
              buyLimit
              name
              trader {
                levels {
                  level
                  requiredPlayerLevel
                  requiredReputation
                  requiredCommerce
                }
              }
              taskUnlock {
                name
                minPlayerLevel
              }
            }
          }
        }
        bartersUsing {
              id
              level
              buyLimit
              taskUnlock {
                name
                minPlayerLevel
              }
              trader {
                name
                imageLink
                levels {
                  level
                  requiredPlayerLevel
                  requiredReputation
                  requiredCommerce
                }
              }
              rewardItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
              requiredItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
            }  

            bartersFor {
            id
              level
              buyLimit
              taskUnlock {
                name
                minPlayerLevel
              }
              trader {
                name
                imageLink
                levels {
                  level
                  requiredPlayerLevel
                  requiredReputation
                  requiredCommerce
                }
              }
              rewardItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
              requiredItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
            } 

            craftsUsing {
            id
              duration
              level
              station {
                name
                imageLink
              }
              taskUnlock {
                name
                minPlayerLevel
              }
              rewardItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
              requiredItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
            }  

            craftsFor {
            id
              duration
              level
              station {
                name
                imageLink
              }
              taskUnlock {
                name
                minPlayerLevel
              }
             rewardItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
              requiredItems {
                count
                item {
                  id
                  gridImageLink
                  name
                }
              }
            }

      }  
    }`
  }
}


