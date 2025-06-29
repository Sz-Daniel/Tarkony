/** Queries
 * Name usage for cache naming
 * Key type name for identifying the object being processed so that the fetch can return an array
 * Query string for the API call
 */

export type QueryType = {
  name: string;
  key: string;
  query: string;
};

export const worthNameListQuery = {
  name: `worthNameList`,
  key: 'items',
  query: `   
    query {
        items {
            id
            name
        }
    }`,
};

export const worthBestBuyQuery = (id: string = ''): QueryType => {
  return {
    name: `worthBestBuy-${id}`,
    key: 'item',
    query: `   
    query {
        item {
            id
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
        }
    }`,
  };
};

export const worthQuery = (id: string = ''): QueryType => {
  return {
    name: `worth-${id}`,
    key: 'item',
    query: `query {
    item(id: "${id}") {
        id
        
        

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
}
    `,
  };
};

export const worthItemMetaQuery = (id: string = ''): QueryType => {
  return {
    name: `worthItemMeta-${id}`,
    key: 'item',
    query: `   
    query {
        item(id: "${id}"){
            id
            name
            shortName
            categories {
                name
            }
            height
            width
            weight
            hasGrid
            inspectImageLink
            updated
            wikiLink

           
        }
    }`,
  };
};
