export type DataProps = {
  categories: string[] | [];
  series: { name: string; type: string; data: number[] }[] | [];
  isLoading: boolean;
};

export type PerformanceListProps = {
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  onSetData: OnSetDataProps;
  data: DataProps;
  isLoading: boolean;
};

export type OnSetDataProps = (selectedCategories: string[] | []) => void;

export type HeatMapListProps = {
  heatMapData: {
    data: any[];
    isLoading: boolean;
    rangeDetails: any;
    totalRow: any;
  };
  selectedCategories: string[];
};
