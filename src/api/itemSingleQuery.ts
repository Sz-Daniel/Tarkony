import type { QueryType } from "../types/Items/queryType"
import type { SingleItemQueryType } from "../types/ItemSingle/queryType";
import type { SingleItemResultType } from "../types/ItemSingle/responseType";

export const singleItemQuery  = (normalizedName: string = ""): QueryType => {
    return {
    name: `singleItemQuery-${normalizedName}`,
    key: 'item',
    query: `  
    query {
        item(normalizedName: "${normalizedName}") {

            id
            name
            shortName

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
                vendor{
                    name
                }
            }


            buyFor {
                currency
                price
                priceRUB
                requirements {
                  type
                  value
                }
                vendor {
                ... on TraderOffer {
                  minTraderLevel
                  buyLimit
                  name
                  taskUnlock {
                    name
                    minPlayerLevel
                  }
                }
              }
            }

           

            bartersUsing {
              buyLimit

              trader {
                name
              }

              taskUnlock {
                name
                minPlayerLevel
              }



              rewardItems {
                count
                item {
                  name
                }
              }

              requiredItems {
                count
                item {
                  gridImageLink
                  name
                }
              }

              requirements {
                type
                value
              }

            }
     
            
        }
    }
    `}
}

/**
 *         

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
} 
 */

const unixtimeToDate = (unixTimestamp:string = "1748952521000") => {
    const a = new Date(parseInt("1748952521000") * 1000); // ha ezredmásodperc, akkor csak parseInt(unixTimestamp)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getDay();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    console.log("TIMESTAMP", a);
    return unixTimestamp
}
type reqT = {
      requirementType: string,
    requirementValue: number,
}
export function singleItemAdapter(data: SingleItemQueryType): SingleItemResultType {
   
  return {
    id:data.id ?? "",
    name:data.name ?? "",
    shortName:data.shortName ?? "",

    lastLowPrice:data.lastLowPrice ?? null,
    low24hPrice:data.low24hPrice ?? null,
    avg24hPrice:data.avg24hPrice ?? null,
    high24hPrice:data.high24hPrice ?? null,
    changeLast48hPercent:data.changeLast48hPercent ?? null,
    changeLast48h:data.changeLast48h ?? null,
    lastOfferCount:data.lastOfferCount ?? null,

    width:data.width ?? null,
    weight:data.weight ?? null,
    hasGrid:data.hasGrid ?? null,

    inspectImageLink:data.inspectImageLink ?? "",
    backgroundColor:data.backgroundColor ?? "",
    gridImageLink:data.gridImageLink ?? "",

    description:data.description ?? "",
    wikiLink:data.wikiLink ?? "",

    height:data.height ?? null,
    velocity:data.velocity ?? null,
    recoilModifier:data.recoilModifier ?? null,
    loudness:data.loudness ?? null,
    accuracyModifier:data.accuracyModifier ?? null,
    ergonomicsModifier:data.ergonomicsModifier ?? null,
    updated:data.updated ?? "",
    
    sellTo: data.sellFor.sort((a, b)=>(b.priceRUB - a.priceRUB)).map((sell)=>({
        price: sell.price ?? null,
        priceRub: sell.priceRUB ?? null,
        vendor: sell.vendor.name ?? "",
        currency: sell.currency ?? "",
    })),

    buyFrom: data.buyFor.sort((a, b)=>(a.priceRUB - b.priceRUB)).map(buy=>{
      console.log(buy.requirements);
      return{
        priceRUB:buy.priceRUB ?? null,
        price: buy.price ?? null,
        currency: buy.currency ?? "",

        minTraderLevel: buy.vendor.minTraderLevel ?? null,
        buyLimit: buy.vendor.buyLimit ?? null,
        vendorname: buy.vendor.name ?? "",
        questName: buy.vendor?.taskUnlock?.name ?? "" ,
        minPlayerLevel:buy.vendor?.taskUnlock?.minPlayerLevel ?? null,

        requirement: buy.requirements.map(req => ({
          requirementType:  req.type,
          requirementValue: req.value,
        })
      )}


    
    }),
  }
}


/**
 
    historicalPrices: data.historicalPrices.map((history)=>({
        offerCount: history.offerCount,
        price: history.price,
        priceMin: history.priceMin,
        timestamp:unixtimeToDate(history.timestamp),
    }))

 */