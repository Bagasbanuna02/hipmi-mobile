import { AccentColor, MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface NavbarItem {
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

interface NavbarMenuProps {
  items: NavbarItem[];
  onClose?: () => void;
}

export default function NavbarMenuBackup({ items, onClose }: NavbarMenuProps) {
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
      
      // Temukan menu induk yang sesuai dengan path saat ini dan buka dropdown-nya
      for (const item of items) {
        // Cocokkan dengan link langsung
        if (item.link && normalizedPathname.startsWith(item.link)) {
          setOpenKeys(prev => {
            if (!prev.includes(item.label)) {
              return [...prev, item.label];
            }
            return prev;
          });
          break; // Hentikan loop setelah menemukan kecocokan pertama
        }
        
        // Cocokkan dengan submenu
        if (item.links && item.links.length > 0) {
          const matchingSubItem = item.links.find(link => normalizedPathname.startsWith(link.link));
          if (matchingSubItem) {
            setOpenKeys(prev => {
              if (!prev.includes(item.label)) {
                return [...prev, item.label];
              }
              return prev;
            });
            break; // Hentikan loop setelah menemukan kecocokan pertama
          }
        }
      }
    }
  }, [normalizedPathname, items]);

  // Toggle dropdown
  const toggleOpen = (label: string) => {
    setOpenKeys((prev) =>
      prev.includes(label) ? prev.filter((key) => key !== label) : [...prev, label]
    );
  };

  return (
    <View
      style={{
        //  flex: 1,
        //  backgroundColor: MainColor.black,
        marginBottom: 20, 
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10, // Opsional: tambahkan padding
        }}
        //  showsVerticalScrollIndicator={false} // Opsional: sembunyikan indikator scroll
      >
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
      </ScrollView>
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
  item: NavbarItem;
  onClose?: () => void;
  activeLink: string | null;
  setActiveLink: (link: string | null) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  // Cek apakah menu ini atau submenu-nya yang aktif
  const isActive = activeLink === item.link;
  
  // Cek apakah path saat ini cocok dengan salah satu submenu
  const isSubmenuActive = item.links && item.links.some(subItem => activeLink === subItem.link);
  
  // Cek apakah path saat ini adalah detail dari submenu ini (misalnya /admin/event/123/detail)
  const isDetailPageOfThisMenu = item.links && item.links.length > 0 && activeLink && 
    item.links.some(link => {
      const linkPath = link.link.replace(/\/+$/, "");
      return activeLink.startsWith(linkPath + "/");
    });
  
  // Gabungkan status aktif untuk menentukan apakah menu ini harus aktif
  const isMenuActive = isActive || isSubmenuActive || isDetailPageOfThisMenu;
  
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // Animasi saat isOpen berubah
  React.useEffect(() => {
    // Jika ini adalah halaman detail dari menu ini, buka dropdown secara otomatis
    const shouldAutoOpen = isDetailPageOfThisMenu && !isOpen;
    
    Animated.timing(animatedHeight, {
      toValue: (isOpen || isDetailPageOfThisMenu) ? (item.links ? item.links.length * 40 : 0) : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    // Jika perlu membuka dropdown otomatis, panggil toggleOpen
    if (shouldAutoOpen) {
      toggleOpen();
    }
  }, [isOpen, item.links, animatedHeight, isDetailPageOfThisMenu, toggleOpen]);

  // Jika ada submenu
  if (item.links && item.links.length > 0) {
    return (
      <View>
        {/* Parent Item */}
        <TouchableOpacity
          style={[
            styles.parentItem,
            isMenuActive && styles.parentItemActive,
          ]}
          onPress={toggleOpen}
        >
          <Ionicons
            name={item.icon}
            size={16}
            color={isMenuActive ? MainColor.yellow : MainColor.white}
            style={styles.icon}
          />
          <Text
            style={[
              styles.parentText,
              isMenuActive && { color: MainColor.yellow },
            ]}
          >
            {item.label}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color={isMenuActive ? MainColor.yellow : MainColor.white}
          />
        </TouchableOpacity>

        {/* Submenu (Animated) */}
        <Animated.View
          style={[
            styles.submenu,
            // {
            //   backgroundColor: "red",
            // },
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
                  name="radio-button-on-outline"
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
        size={16}
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
    marginBottom: 5,
  },
  parentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    // backgroundColor: AccentColor.darkblue,
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: "space-between",
  },
  parentItemActive: {
    backgroundColor: AccentColor.blue,
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
    // backgroundColor: AccentColor.darkblue,
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
    fontSize: 16,
    fontWeight: "500",
  },
});
