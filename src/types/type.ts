// Props type
export type ItemDetailPropsType = {
  itemId: string
}


export type numberStatePropsType = {
  number: number,
  setter: React.Dispatch<React.SetStateAction<number>>;
}

export type TESTQueryType = {
  id: string,
  name: string,
  normalizedName: string,
  children?: IDType[],
  parent?:IDType,
}

type IDType = {
  id: string,
}

export type TESTResultType = BaseType &{
  children?: TESTResultType[],
  parent?: TESTResultType,
}

type BaseType = {
  id: string,
  name: string,
  normalizedName: string,
};

//TEST
export type VarType = {
  variables?: {
    ids: string[];
  };
  name: string,
  normalizedName: string,
};


/**
    id
    wikiLink
    sellFor {
      priceRUB
      vendor {
        name
      }
    }
    buyFor {
      priceRUB
      vendor {
        name
        ... on TraderOffer {
          minTraderLevel
          taskUnlock {
            minPlayerLevel
            name
            id
          }
        }
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
    usedInTasks {
      name
      objectives {
        description
        type
        ... on TaskObjectiveItem {
          item {
            name
          }
          foundInRaid
          count
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
*/