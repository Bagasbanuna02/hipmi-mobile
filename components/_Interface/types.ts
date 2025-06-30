import { Href } from "expo-router";

export { ICustomTab, ITabs };

interface ICustomTab {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

interface ITabs {
  id: string;
  icon: string;
  activeIcon: string;
  label: string;
  path: Href;
  isActive: boolean;
  disabled?: boolean;
}
