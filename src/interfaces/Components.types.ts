import { OnSetDataProps } from "./Dashboard.types";

export type NavbarProps = {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
};

export type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DrawerListProps = {
  toggleDrawer: (newOpen: boolean) => () => void;
};

export type SelectMenuProps = {
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  onSetData: OnSetDataProps;
  isLoading: boolean;
};

export type ColorMappingProps = {
  index: number;
  value: number;
  minValue: number;
  maxValue: number;
  reverse: boolean;
};
