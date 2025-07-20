export type QueryType = {
  name: string;
  key: string;
  query: string;
};

export const modGearModListQuery = {
  name: `modGearModList`,
  key: 'items',
  query: `   
    query {
        items(categoryNames: GearMod) {
            id
            name
            ergonomicsModifier
            accuracyModifier
            loudness
            velocity
            recoilModifier
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
                }
            }
            containsItems {
                item {
                    id
                    name
                }
            }
            conflictingItems {
                id
                name
            }
        }
    }`,
};

/**

          query {
  items(categoryNames: GearMod) {
    name
  }
}
query F {
  items(categoryNames: FunctionalMod) {
    name
  }
}

query E {
  items(categoryNames: EssentialMod) {
    name
  }
}
 */
