import { Dimensions, StyleSheet } from "react-native";
import { AccentColor, MainColor } from "../constants/color-palet";
import { TEXT_SIZE_MEDIUM } from "@/constants/constans-value";

const { width } = Dimensions.get("window");

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 20,
    paddingBlock: 10,
    backgroundColor: MainColor.darkblue,
  },
  containerWithBackground: {
    flex: 1,
    paddingInline: 20,
    paddingBlock: 10,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },

  // AUTHENTICATION
  authContainer: {
    flex: 1,
    justifyContent: "center",
  },
  authContainerTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  authTitle: {
    fontSize: 27,
    color: MainColor.yellow,
    fontWeight: "bold",
  },
  authSubTitle: {
    fontSize: 22,
    color: MainColor.yellow,
    fontWeight: "bold",
  },

  // TEXT & LABEL
  textLabel: {
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.white,
    fontWeight: "normal",
  },

  // Stack Header Style
  headerStyle: {
    backgroundColor: AccentColor.darkblue,
  },
  headerTitleStyle: {
    color: MainColor.yellow,
    fontWeight: "bold",
  },

  // HOME
  homeContainer: {
    flex: 1,
    paddingInline: 25,
    paddingBlock: 10,
    backgroundColor: MainColor.darkblue,
  },

  // =============== TAB =============== //
  tabBar: {
    backgroundColor: MainColor.darkblue,
    borderTopColor: AccentColor.blue,
    borderTopWidth: 1,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
    // tintColor: MainColor.yellow
    // paddingBottom: 20,
    // paddingTop: 10,
    // shadowColor: AccentColor.blue,
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 3,
    // elevation: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: width / 5,
    position: "relative",
  },
  activeTab: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    // marginBottom: 4,
  },
  activeIconContainer: {
    // backgroundColor: "#007AFF",
    // shadowColor: "#007AFF",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 4,
  },
  tabLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: MainColor.white,
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#007AFF",
  },
  // =============== TAB =============== //
});
