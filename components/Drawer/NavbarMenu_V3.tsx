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

export interface NavbarItem_V3 {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  link?: string;
  links?: {
    label: string;
    link: string;
    detailPattern?: string; // NEW: Pattern untuk match detail pages
  }[];
  initiallyOpened?: boolean;
}

interface NavbarMenuProps {
  items: NavbarItem_V3[];
  onClose?: () => void;
}

export default function NavbarMenu_V3({ items, onClose }: NavbarMenuProps) {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // Normalisasi path: hapus trailing slash
  const normalizePath = (path: string) => path.replace(/\/+$/, "");
  const normalizedPathname = pathname ? normalizePath(pathname) : "";

  // Auto-open parent menu jika submenu aktif
  useEffect(() => {
    if (!normalizedPathname || !items || items.length === 0) {
      return;
    }

    try {
      const newOpenKeys: string[] = [];
      
      // Helper function yang sama dengan di MenuItem
      const checkPathMatch = (linkPath: string, detailPattern?: string) => {
        const normalizedLink = linkPath.replace(/\/+$/, "");
        
        // Exact match
        if (normalizedPathname === normalizedLink) return true;
        
        // Detail pattern match
        if (detailPattern) {
          const patternRegex = new RegExp(
            "^" + detailPattern.replace(/\*/g, "[^/]+") + "(/.*)?$"
          );
          if (patternRegex.test(normalizedPathname)) {
            return true;
          }
        }
        
        // Detail page match (fallback)
        if (normalizedPathname.startsWith(normalizedLink + "/")) {
          const remainder = normalizedPathname.substring(normalizedLink.length + 1);
          const segments = remainder.split("/").filter(s => s.length > 0);
          
          if (segments.length === 0) return false;
          
          const commonWords = [
            // Actions
            'detail', 'edit', 'create', 'new', 'add', 'delete', 'view', 
            
            // Status types
            'publish', 'review', 'reject', 'status', 'active', 'inactive', 'pending',
            
            // General pages
            'category', 'history', 'dashboard', 'index',
            
            // Event specific
            'type-of-event', 'type-create', 'type-update',
            
            // Forum specific
            'posting', 'report-posting', 'report-comment',
            
            // Collaboration
            'group',
            
            // App Information
            'business-field', 'information-bank', 'sticker',
            'bidang-update', 'sub-bidang-update',
            
            // Transaction/Finance related
            'transaction-detail', 'transaction', 'payment', 
            'disbursement-of-funds', 'detail-disbursement-of-funds',
            'list-disbursement-of-funds',
            
            // List pages (CRITICAL!)
            'list-of-investor', 'list-of-donatur', 'list-of-participants',
            'list-comment', 'list-report-comment', 'list-report-posting',
            
            // Input/Form pages
            'reject-input',
            
            // Category pages
            'category-create', 'category-update'
          ];
          
          const hasIdSegment = segments.some(segment => {
            if (commonWords.includes(segment.toLowerCase())) {
              return false;
            }
            
            const isPureNumber = /^\d+$/.test(segment);
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
            const hasNumber = /\d/.test(segment);
            const isAlphanumericId = /^[a-z0-9_-]+$/i.test(segment) && segment.length <= 50 && hasNumber;
            
            return isPureNumber || isUUID || isAlphanumericId;
          });
          
          return hasIdSegment;
        }
        
        return false;
      };
      
      // Calculate all potential matches for conflict resolution
      const allMatches = items.flatMap(item => {
        if (!item.links || item.links.length === 0) return [];
        
        return item.links
          .filter(subItem => checkPathMatch(subItem.link, subItem.detailPattern))
          .map(subItem => ({
            parentLabel: item.label,
            subItem,
            pathLength: subItem.link.length
          }));
      });

      // Find the most specific match for each parent
      const uniqueParents = new Map<string, { parentLabel: string, longestPathLength: number }>();
      
      allMatches.forEach(match => {
        const existing = uniqueParents.get(match.parentLabel);
        if (!existing || match.pathLength > existing.longestPathLength) {
          uniqueParents.set(match.parentLabel, {
            parentLabel: match.parentLabel,
            longestPathLength: match.pathLength
          });
        }
      });

      // Add only the parents with the most specific matches
      newOpenKeys.push(...Array.from(uniqueParents.values()).map(item => item.parentLabel));
      
      // Additionally, if no specific submenu match was found but the current path
      // starts with one of the parent menu links, add that parent
      if (newOpenKeys.length === 0) {
        // Find the parent whose link is the longest prefix of the current path
        let longestMatchParent = null;
        let longestMatchLength = 0;

        items.forEach(item => {
          if (item.links && item.links.length > 0) {
            item.links.forEach(link => {
              const linkPath = link.link.replace(/\/+$/, "");
              if (normalizedPathname.startsWith(linkPath + "/") && linkPath.length > longestMatchLength) {
                longestMatchLength = linkPath.length;
                longestMatchParent = item.label;
              }
            });
          }
        });

        if (longestMatchParent) {
          newOpenKeys.push(longestMatchParent);
        }
      }
      
      // NEW: Check if user is on a detail page (contains ID segments or specific keywords)
      const isOnDetailPage = (() => {
        // Check if current path has ID-like segments or detail keywords
        const segments = normalizedPathname.split('/').filter(s => s.length > 0);
        
        if (segments.length === 0) return false;
        
        const commonWords = [
          // Actions
          'detail', 'edit', 'create', 'new', 'add', 'delete', 'view',
          
          // Status types
          'publish', 'review', 'reject', 'status', 'active', 'inactive', 'pending',
          
          // General pages
          'category', 'history', 'dashboard', 'index',
          
          // Event specific
          'type-of-event', 'type-create', 'type-update',
          
          // Forum specific
          'posting', 'report-posting', 'report-comment',
          
          // Collaboration
          'group',
          
          // App Information
          'business-field', 'information-bank', 'sticker',
          'bidang-update', 'sub-bidang-update',
          
          // Transaction/Finance related
          'transaction-detail', 'transaction', 'payment',
          'disbursement-of-funds', 'detail-disbursement-of-funds',
          'list-disbursement-of-funds',
          
          // List pages (CRITICAL!)
          'list-of-investor', 'list-of-donatur', 'list-of-participants',
          'list-comment', 'list-report-comment', 'list-report-posting',
          
          // Input/Form pages
          'reject-input',
          
          // Category pages
          'category-create', 'category-update'
        ];
        
        const hasIdSegment = segments.some(segment => {
          if (commonWords.includes(segment.toLowerCase())) {
            return false;
          }

          const isPureNumber = /^\d+$/.test(segment);
          const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
          const hasNumber = /\d/.test(segment);
          const isAlphanumericId = /^[a-z0-9_-]+$/i.test(segment) && segment.length <= 50 && hasNumber;

          return isPureNumber || isUUID || isAlphanumericId;
        });
        
        return hasIdSegment;
      })();

      // NEW: Check if user is on a detail page (contains ID segments or specific keywords)
      const isOnDetailPageGlobal = (() => {
        // Check if current path has ID-like segments or detail keywords
        const segments = normalizedPathname.split('/').filter(s => s.length > 0);
        
        if (segments.length === 0) return false;
        
        const commonWords = [
          // Actions
          'detail', 'edit', 'create', 'new', 'add', 'delete', 'view',
          
          // Status types
          'publish', 'review', 'reject', 'status', 'active', 'inactive', 'pending',
          
          // General pages
          'category', 'history', 'dashboard', 'index',
          
          // Event specific
          'type-of-event', 'type-create', 'type-update',
          
          // Forum specific
          'posting', 'report-posting', 'report-comment',
          
          // Collaboration
          'group',
          
          // App Information
          'business-field', 'information-bank', 'sticker',
          'bidang-update', 'sub-bidang-update',
          
          // Transaction/Finance related
          'transaction-detail', 'transaction', 'payment',
          'disbursement-of-funds', 'detail-disbursement-of-funds',
          'list-disbursement-of-funds',
          
          // List pages (CRITICAL!)
          'list-of-investor', 'list-of-donatur', 'list-of-participants',
          'list-comment', 'list-report-comment', 'list-report-posting',
          
          // Input/Form pages
          'reject-input',
          
          // Category pages
          'category-create', 'category-update'
        ];
        
        // Check if any segment is a common word
        const hasCommonWord = segments.some(segment => commonWords.includes(segment.toLowerCase()));
        
        // Check if any segment looks like an ID (number, UUID, alphanumeric with numbers)
        const hasIdSegment = segments.some(segment => {
          const isPureNumber = /^\d+$/.test(segment);
          const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
          const hasNumber = /\d/.test(segment);
          const isAlphanumericId = /^[a-z0-9_-]+$/i.test(segment) && segment.length <= 50 && hasNumber;

          return isPureNumber || isUUID || isAlphanumericId;
        });
        
        // A detail page is one that has either common words or ID segments
        return hasCommonWord || hasIdSegment;
      })();

      // NEW: Only open parent menu if the current path is a detail page of the most relevant parent
      if (isOnDetailPageGlobal && newOpenKeys.length === 0) {
        // Find the parent whose link is the longest prefix of the current path
        let longestMatchParent = null;
        let longestMatchLength = 0;

        items.forEach(item => {
          if (item.links && item.links.length > 0) {
            item.links.forEach(link => {
              const linkPath = link.link.replace(/\/+$/, "");
              if (normalizedPathname.startsWith(linkPath + "/") && linkPath.length > longestMatchLength) {
                longestMatchLength = linkPath.length;
                longestMatchParent = item.label;
              }
            });
          }
        });

        if (longestMatchParent) {
          newOpenKeys.push(longestMatchParent);
        }
      }

      setOpenKeys(newOpenKeys);
    } catch (error) {
      console.error("Error in NavbarMenu useEffect:", error);
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
        marginBottom: 20,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      >
        {items && items.length > 0 ? (
          items.map((item) => (
            <MenuItem
              key={item.label}
              item={item}
              items={items}
              onClose={onClose}
              currentPath={normalizedPathname}
              isOpen={openKeys.includes(item.label)}
              toggleOpen={() => toggleOpen(item.label)}
            />
          ))
        ) : null}
      </ScrollView>
    </View>
  );
}

// Komponen Item Menu
function MenuItem({
  item,
  items,
  onClose,
  currentPath,
  isOpen,
  toggleOpen,
}: {
  item: NavbarItem_V3;
  items: NavbarItem_V3[];
  onClose?: () => void;
  currentPath: string;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // Helper function untuk check apakah path aktif
  const isPathActive = (linkPath: string | undefined, detailPattern?: string) => {
    if (!linkPath) return false;
    const normalizedLink = linkPath.replace(/\/+$/, "");
    
    // 1. Match exact - prioritas tertinggi
    if (currentPath === normalizedLink) return true;
    
    // 2. Jika ada detailPattern, cek pattern dulu
    if (detailPattern) {
      // detailPattern contoh: "/admin/job/*/review" 
      // akan match dengan:
      // - /admin/job/123/review ✅
      // - /admin/job/123/review/transaction-detail ✅
      // - /admin/job/123/review/anything/nested ✅
      const patternRegex = new RegExp(
        "^" + detailPattern.replace(/\*/g, "[^/]+") + "(/.*)?$"
      );
      const isMatch = patternRegex.test(currentPath);
      
      // Debug log untuk pattern matching
    //   if (currentPath.includes('transaction-detail') || currentPath.includes('disbursement')) {
    //     console.log('🔍 Pattern Match Check:', {
    //       currentPath,
    //       detailPattern,
    //       regex: patternRegex.toString(),
    //       isMatch
    //     });
    //   }
      
      if (isMatch) {
        return true;
      }
    }
    
    // 3. Match untuk detail pages (fallback)
    if (currentPath.startsWith(normalizedLink + "/")) {
      const remainder = currentPath.substring(normalizedLink.length + 1);
      const segments = remainder.split("/").filter(s => s.length > 0);
      
      if (segments.length === 0) return false;
      
      const commonWords = [
        // Actions
        'detail', 'edit', 'create', 'new', 'add', 'delete', 'view', 
        
        // Status types
        'publish', 'review', 'reject', 'status', 'active', 'inactive', 'pending',
        
        // General pages
        'category', 'history', 'index',
        
        // Event specific
        'type-of-event', 'type-create', 'type-update',
        
        // Forum specific
        'posting', 'report-posting', 'report-comment',
        
        // Collaboration
        'group',
        
        // App Information
        'business-field', 'information-bank', 'sticker',
        'bidang-update', 'sub-bidang-update',
        
        // Transaction/Finance related
        'transaction-detail', 'transaction', 'payment', 
        'disbursement-of-funds', 'detail-disbursement-of-funds',
        'list-disbursement-of-funds',
        
        // List pages (CRITICAL!)
        'list-of-investor', 'list-of-donatur', 'list-of-participants',
        'list-comment', 'list-report-comment', 'list-report-posting',
        
        // Input/Form pages
        'reject-input',
        
        // Category pages
        'category-create', 'category-update'
      ];
      
      const hasCommonWord = segments.some(segment => 
        commonWords.includes(segment.toLowerCase())
      );

      // Hanya anggap sebagai detail page jika mengandung commonWords
      return hasCommonWord;
    }
    
    return false;
  };

  // Check apakah menu item ini atau submenu-nya yang aktif
  const isActive = isPathActive(item.link);

  // NEW LOGIC: Check if user is on a detail page (contains ID segments or specific keywords)
  const isOnDetailPage = (() => {
    // Check if current path has ID-like segments or detail keywords
    const segments = currentPath.split('/').filter(s => s.length > 0);
    
    if (segments.length === 0) return false;
    
    const commonWords = [
      // Actions
      'detail', 'edit', 'create', 'new', 'add', 'delete', 'view',
      
      // Status types
      'publish', 'review', 'reject', 'status', 'active', 'inactive', 'pending',
      
      // General pages
      'category', 'history', 'dashboard', 'index',
      
      // Event specific
      'type-of-event', 'type-create', 'type-update',
      
      // Forum specific
      'posting', 'report-posting', 'report-comment',
      
      // Collaboration
      'group',
      
      // App Information
      'business-field', 'information-bank', 'sticker',
      'bidang-update', 'sub-bidang-update',
      
      // Transaction/Finance related
      'transaction-detail', 'transaction', 'payment',
      'disbursement-of-funds', 'detail-disbursement-of-funds',
      'list-disbursement-of-funds',
      
      // List pages (CRITICAL!)
      'list-of-investor', 'list-of-donatur', 'list-of-participants',
      'list-comment', 'list-report-comment', 'list-report-posting',
      
      // Input/Form pages
      'reject-input',
      
      // Category pages
      'category-create', 'category-update'
    ];
    
    // Check if any segment is a common word
    const hasCommonWord = segments.some(segment => commonWords.includes(segment.toLowerCase()));
    
    // Check if any segment looks like an ID (number, UUID, alphanumeric with numbers)
    const hasIdSegment = segments.some(segment => {
      const isPureNumber = /^\d+$/.test(segment);
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
      const hasNumber = /\d/.test(segment);
      const isAlphanumericId = /^[a-z0-9_-]+$/i.test(segment) && segment.length <= 50 && hasNumber;

      return isPureNumber || isUUID || isAlphanumericId;
    });
    
    // A detail page is one that has either common words or ID segments
    return hasCommonWord || hasIdSegment;
  })();

  // Calculate all submenu active states for conflict resolution
  const submenuActiveStates = item.links?.map(subItem => ({
    subItem,
    isActive: isPathActive(subItem.link, subItem.detailPattern),
    pathLength: subItem.link.length
  })) || [];

  // Determine if any submenu is active considering conflicts
  const hasActiveSubmenu = submenuActiveStates.some(({ isActive: isSubActive, pathLength, subItem }) => {
    if (!isSubActive) return false;

    // Check if there's a more specific match elsewhere
    const hasMoreSpecificMatch = submenuActiveStates.some(other => {
      if (other.subItem.link === subItem.link) return false; // Skip self
      return other.isActive && other.pathLength > pathLength;
    });

    return isSubActive && !hasMoreSpecificMatch;
  }) || false;
  
  // For parent menu detection, if current path contains common words,
  // check if this parent menu's link is a prefix of the current path
  const isParentOfDetailPage = !isActive && !hasActiveSubmenu && item.links && item.links.length > 0 &&
    item.links.some(link => currentPath.startsWith(link.link.replace(/\/+$/, "") + "/"));

  // Determine if this is the most relevant parent menu for the current path
  const isMostRelevantParent = isParentOfDetailPage && (() => {
    let longestMatchLength = 0;
    let mostRelevantParent = null;

    // Find the parent with the longest matching prefix
    items.forEach(parentItem => {
      if (parentItem.links && parentItem.links.length > 0) {
        parentItem.links.forEach(link => {
          const linkPath = link.link.replace(/\/+$/, "");
          if (currentPath.startsWith(linkPath + "/") && linkPath.length > longestMatchLength) {
            longestMatchLength = linkPath.length;
            mostRelevantParent = parentItem.label;
          }
        });
      }
    });

    return mostRelevantParent === item.label;
  })();

  // NEW LOGIC: If we're on a detail page, NO submenu should be active regardless of pattern matching
  const hasActiveSubmenuOnDetailPage = isOnDetailPage ? false : hasActiveSubmenu;

  // NEW LOGIC: If user is on a detail page that belongs to this parent menu,
  // activate only the parent menu (open dropdown) without activating any submenu
  const isDetailPageOfThisMenu = !isActive && !hasActiveSubmenuOnDetailPage &&
    item.links && item.links.length > 0 &&
    item.links.some(link => {
      const linkPath = link.link.replace(/\/+$/, "");
      return currentPath.startsWith(linkPath + "/");
    }) &&
    !isMostRelevantParent; // Only apply this logic if this isn't the most relevant parent

  // NEW LOGIC: Check if this is a page that doesn't belong to any specific menu in the navbar
  const isUnlistedPage = !isActive && !hasActiveSubmenu && !isMostRelevantParent && !isDetailPageOfThisMenu && isOnDetailPage;

  // NEW LOGIC: If we're on a detail page and this menu is not the relevant parent or detail page owner,
  // then it should not be highlighted even if it would normally be the most relevant
  const isOnDetailPageAndNotRelevant = isOnDetailPage && !isMostRelevantParent && !isDetailPageOfThisMenu && !isActive;

  // NEW LOGIC: If this is an unlisted page, no menu should be highlighted
  const isUnlistedPageAndNotRelevant = isUnlistedPage;

  // FINAL LOGIC: Only activate this menu if:
  // 1. It's the exact match for current path, OR
  // 2. It's the most relevant parent, OR
  // 3. It's a detail page of this menu
  // But NOT if we're on a detail page and this isn't the relevant parent
  // And NOT if this is an unlisted page
  const isActuallyRelevant = (isActive || isMostRelevantParent || isDetailPageOfThisMenu) && !isOnDetailPageAndNotRelevant && !isUnlistedPageAndNotRelevant;

  // Animasi saat isOpen berubah
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: (isOpen || isDetailPageOfThisMenu) ? (item.links ? item.links.length * 44 : 0) : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, item.links, animatedHeight, isDetailPageOfThisMenu]);

  // Jika ada submenu
  if (item.links && item.links.length > 0) {
    return (
      <View>
        {/* Parent Item */}
        <TouchableOpacity
          style={[
            styles.parentItem,
            isActuallyRelevant && styles.parentItemActive,
          ]}
          onPress={toggleOpen}
        >
          <Ionicons
            name={item.icon}
            size={16}
            color={isActuallyRelevant ? MainColor.yellow : MainColor.white}
            style={styles.icon}
          />
          <Text
            style={[
              styles.parentText,
              isActuallyRelevant && { color: MainColor.yellow },
            ]}
          >
            {item.label}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color={isActuallyRelevant ? MainColor.yellow : MainColor.white}
          />
        </TouchableOpacity>

        {/* Submenu (Animated) */}
        <Animated.View
          style={[
            styles.submenu,
            {
              height: animatedHeight,
              opacity: animatedHeight.interpolate({
                inputRange: [0, item.links.length * 44],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          {submenuActiveStates.map(({ subItem, isActive: isSubActive, pathLength }, index) => {

            // CRITICAL FIX: Cek apakah ada submenu lain yang LEBIH PANJANG dan juga aktif
            const hasMoreSpecificMatch = submenuActiveStates.some(other => {
              if (other.subItem.link === subItem.link) return false; // Skip self

              const isOtherLonger = other.pathLength > pathLength;

              // Debug log untuk Dashboard
            //   if (subItem.label === "Dashboard" && isSubActive) {
            //     console.log(`🔎 Dashboard checking against ${other.subItem.label}:`, {
            //       dashboardLink: subItem.link,
            //       dashboardLength: pathLength,
            //       otherLabel: other.subItem.label,
            //       otherLink: other.subItem.link,
            //       otherPattern: other.subItem.detailPattern,
            //       otherLength: other.pathLength,
            //       otherIsActive: other.isActive,
            //       isOtherLonger,
            //       willDisableDashboard: other.isActive && isOtherLonger,
            //       currentURL: currentPath
            //     });
            //   }

              // Conflict log
            //   if (isSubActive && other.isActive) {
            //     console.log('🔍 CONFLICT DETECTED:', {
            //       current: subItem.label,
            //       currentPath: subItem.link,
            //       currentLength: pathLength,
            //       other: other.subItem.label,
            //       otherPath: other.subItem.link,
            //       otherLength: other.pathLength,
            //       isOtherLonger,
            //       shouldDisableCurrent: isOtherLonger,
            //       currentURL: currentPath
            //     });
            //   }

              return other.isActive && isOtherLonger;
            });

            // Final decision
            const finalIsActive = isSubActive && !hasMoreSpecificMatch;

            // NEW: If this is a detail page (regardless of which menu), don't highlight any submenu items
            // Also don't highlight if this is an unlisted page
            const shouldHighlight = (isOnDetailPage || isUnlistedPage) ? false : finalIsActive;

            // Debug final
            // if (isSubActive) {
            //   console.log('✅ Active check:', {
            //     label: subItem.label,
            //     link: subItem.link,
            //     isSubActive,
            //     hasMoreSpecificMatch,
            //     finalIsActive,
            //     shouldHighlight,
            //     isOnDetailPage,
            //     isUnlistedPage
            //   });
            // }

            return (
              <TouchableOpacity
                key={index}
                style={[styles.subItem, shouldHighlight && styles.subItemActive]}
                onPress={() => {
                  onClose?.();
                  router.push(subItem.link as any);
                }}
              >
                <Ionicons
                  name="radio-button-on-outline"
                  size={16}
                  color={shouldHighlight ? MainColor.yellow : MainColor.white}
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.subText,
                    shouldHighlight && { color: MainColor.yellow },
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