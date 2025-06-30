import { Href } from "expo-router";

export { ITabs };

interface ITabs {
  id: string;
  icon: string;
  activeIcon: string;
  label: string;
  path: Href;
  isActive: boolean;
  disabled: boolean;
}
