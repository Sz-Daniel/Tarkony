// Props type
type ItemDetailPropsType = {
  itemId: string;
};

type numberStatePropsType = {
  number: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
};

type TESTQueryType = {
  id: string;
  name: string;
  normalizedName: string;
  children?: IDType[];
  parent?: IDType;
};

type IDType = {
  id: string;
};

type TESTResultType = BaseType & {
  children?: TESTResultType[];
  parent?: TESTResultType;
};

type BaseType = {
  id: string;
  name: string;
  normalizedName: string;
};

type VarType = {
  variables?: {
    ids: string[];
  };
  name: string;
  normalizedName: string;
};
