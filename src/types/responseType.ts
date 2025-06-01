export type ItemBaseResultType = {
  id: string | null,
  name: string,
  iconURL: string,
  bestPrice: number | null,
  bestPlace: string | null,
  changePrice: number,
  changePercent: number,
  category: string,
};

export type ItemDetailResultType = {
  id: string | null,
  wiki: string,
  sellOffer: VendorOffer[],
  buyOffer: VendorOffer[],
  bartersNeeds: CountedItemMicro[],
  bartersGive: CountedItemMicro[],
  craftsNeeds: CountedItemMicro[],
  craftsGive: CountedItemMicro[],
  tasksRewards: TaskReward[], 
};

//Side type
type TaskReward = {
  name: string,
  count: number,
}
type CountedItemMicro = {
  count: number,
  name: string,
  icon: string,
};

type VendorOffer = {
  price: number,
  vendor: string,
};
  