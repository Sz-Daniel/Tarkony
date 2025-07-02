import type { QueryType } from '../types/Items/queryType';

/** Queries
 * Name usage for cache naming
 * Key type name for identifying the object being processed so that the fetch can return an array
 * Query string for the API call
 */
export const singleItemQuery = (normalizedName: string = ''): QueryType => {
  return {
    name: `singleItemQuery-${normalizedName}`,
    key: 'item',
    query: `  
    query {
        item(normalizedName: "${normalizedName}") {

        id
        name
        shortName
        categories { name }

        lastLowPrice
        low24hPrice
        avg24hPrice
        high24hPrice
        changeLast48hPercent
        changeLast48h
        lastOfferCount

        width
        weight
        hasGrid


        inspectImageLink
        backgroundColor
        gridImageLink

        description
        wikiLink

        height
        velocity
        recoilModifier
        loudness
        accuracyModifier
        ergonomicsModifier

        updated

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

        usedInTasks {
            name
            objectives {
                ... on TaskObjectiveItem {
                    description
                    count
                    item {
                        name
                    }
                }
            }
        }
        receivedFromTasks {
            name
            finishRewards {
                items {
                    count
                    item {
                        name
                    }
                }
            }
        }
    }
}
    `,
  };
};
