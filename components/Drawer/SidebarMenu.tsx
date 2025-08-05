import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AccentColor, MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

// Lebar sidebar
const SIDEBAR_WIDTH = Dimensions.get("window").width * 0.8;

interface SidebarItem {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  link?: string;
  links?: {
    label: string;
    link: string;
  }[];
  initiallyOpened?: boolean;
}

interface SidebarMenuProps {
  items: SidebarItem[];
  onClose?: () => void;
}

export default function SidebarMenu({ items, onClose }: SidebarMenuProps) {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [openKeys, setOpenKeys] = useState<string[]>([]); // Untuk kontrol dropdown

  // Normalisasi path: hapus trailing slash
  const normalizePath = (path: string) => path.replace(/\/+$/, "");
  const normalizedPathname = pathname ? normalizePath(pathname) : "";

  // Set activeLink saat pathname berubah
  useEffect(() => {
    if (normalizedPathname) {
      setActiveLink(normalizedPathname);
    }
  }, [normalizedPathname]);

  // Auto-buka dropdown jika submenu aktif
  useEffect(() => {
    const activeItem = items.find((item) =>
      item.links?.some((sub) => sub.link === normalizedPathname)
    );
    if (activeItem && !openKeys.includes(activeItem.label)) {
      setOpenKeys([activeItem.label]);
    }
  }, [normalizedPathname, items, openKeys]);

  // Toggle dropdown
  const toggleOpen = (label: string) => {
    setOpenKeys((prev) =>
      prev.includes(label) ? prev.filter((key) => key !== label) : [label]
    );
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <MenuItem
          key={item.label}
          item={item}
          onClose={onClose}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          isOpen={openKeys.includes(item.label)}
          toggleOpen={() => toggleOpen(item.label)}
        />
      ))}
    </View>
  );
}

// Komponen Item Menu
function MenuItem({
  item,
  onClose,
  activeLink,
  setActiveLink,
  isOpen,
  toggleOpen,
}: {
  item: SidebarItem;
  onClose?: () => void;
  activeLink: string | null;
  setActiveLink: (link: string | null) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // Animasi saat isOpen berubah
  React.useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? (item.links ? item.links.length * 40 : 0) : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, item.links]);

  // Cek apakah menu ini aktif
  const isActive = activeLink === item.link;

  // Cek apakah ada submenu aktif
  const hasActiveSubItem = item.links?.some((sub) => sub.link === activeLink);

  // Jika ada submenu
  if (item.links && item.links.length > 0) {
    return (
      <View>
        {/* Parent Item */}
        <TouchableOpacity style={styles.parentItem} onPress={toggleOpen}>
          <Ionicons
            name={item.icon}
            size={20}
            color={MainColor.white}
            style={styles.icon}
          />
          <Text style={styles.parentText}>{item.label}</Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color={MainColor.white}
          />
        </TouchableOpacity>

        {/* Submenu (Animated) */}
        <Animated.View
          style={[
            styles.submenu,
            {
              height: animatedHeight,
              opacity: animatedHeight.interpolate({
                inputRange: [0, item.links.length * 40],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          {item.links.map((subItem, index) => {
            const isSubActive = activeLink === subItem.link;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.subItem, isSubActive && styles.subItemActive]}
                onPress={() => {
                  setActiveLink(subItem.link);
                  onClose?.();
                  router.push(subItem.link as any);
                }}
              >
                <Ionicons
                  name="caret-forward-sharp"
                  size={16}
                  color={isSubActive ? MainColor.yellow : MainColor.white}
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.subText,
                    isSubActive && { color: MainColor.yellow },
                  ]}
                >
                  {subItem.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    );
  }

  // Menu tanpa submenu
  return (
    <TouchableOpacity
      style={[styles.singleItem, isActive && styles.singleItemActive]}
      onPress={() => {
        setActiveLink(item.link || null);
        onClose?.();
        router.push(item.link as any);
      }}
    >
      <Ionicons
        name={item.icon}
        size={20}
        color={isActive ? MainColor.yellow : MainColor.white}
        style={styles.icon}
      />
      <Text
        style={[
          styles.singleText,
          { color: isActive ? MainColor.yellow : MainColor.white },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  parentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: AccentColor.darkblue,
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: "space-between",
  },
  parentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    color: MainColor.white,
  },
  singleItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: AccentColor.darkblue,
    borderRadius: 8,
    marginBottom: 5,
  },
  singleItemActive: {
    backgroundColor: AccentColor.blue,
  },
  singleText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    color: MainColor.white,
  },
  icon: {
    width: 24,
    textAlign: "center",
    paddingRight: 10,
  },
  submenu: {
    overflow: "hidden",
    marginLeft: 30,
    marginTop: 5,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 4,
  },
  subItemActive: {
    backgroundColor: AccentColor.blue,
  },
  subText: {
    color: MainColor.white,
    fontSize: 14,
  },
});
