import {
  PADDING_EXTRA_SMALL,
  PADDING_LARGE,
  PADDING_MEDIUM,
  PADDING_SMALL,
  TEXT_SIZE_LARGE,
  TEXT_SIZE_MEDIUM,
  TEXT_SIZE_SMALL,
} from "@/constants/constans-value";
import { Dimensions, StyleSheet } from "react-native";
import { AccentColor, MainColor } from "../constants/color-palet";

const { width } = Dimensions.get("window");

export const GStyles = StyleSheet.create({
  // =============== Main Styles =============== //
  container: {
    flex: 1,
    paddingInline: PADDING_SMALL,
    paddingTop: PADDING_EXTRA_SMALL,
    paddingBottom: 5,
    // paddingBlock: PADDING_EXTRA_SMALL,
    backgroundColor: MainColor.darkblue,
  },
  containerWithBackground: {
    flex: 1,
    paddingInline: PADDING_LARGE,
    paddingBlock: PADDING_EXTRA_SMALL,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  stickyHeader: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
    // paddingBlock: PADDING_EXTRA_SMALL,
    paddingInline: PADDING_MEDIUM,
    // padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  floatingContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 8,
  },

  // =============== Disabled Styles =============== //
  disabledBox: {
    backgroundColor: MainColor.disabled,
    borderColor: AccentColor.disabledBorder,
  },
  inputDisabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
  inputTextDisabled: {
    color: "#777",
  },
  inputPlaceholderDisabled: {
    color: "#444",
  },
  // =============== Disabled Styles =============== //

  // =============== AUTHENTICATION =============== //
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
  // =============== AUTHENTICATION =============== //

  // =============== TEXT & LABEL =============== //
  textLabel: {
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.white_gray,
    fontWeight: "normal",
  },
  textLabelBold: {
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.white_gray,
    fontWeight: "bold",
  },
  // =============== TEXT & LABEL =============== //

  // =============== STACK HEADER =============== //
  headerStyle: {
    backgroundColor: AccentColor.darkblue,
  },
  headerTitleStyle: {
    color: MainColor.yellow,
    fontWeight: "bold",
    fontSize: TEXT_SIZE_LARGE,
  },
  // =============== STACK HEADER =============== //

  // =============== HOME =============== //
  homeContainer: {
    flex: 1,
    paddingInline: 25,
    paddingBlock: 10,
    backgroundColor: MainColor.darkblue,
  },
  // =============== HOME =============== //

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
    padding: 5,
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
    color: MainColor.white_gray,
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

  // =============== BOTTOM BAR =============== //
  bottomBar: {
    backgroundColor: MainColor.darkblue,
    borderTopColor: AccentColor.blue,
    // borderTopWidth: 0.5,
    height: "100%",
    justifyContent: "center",
    shadowColor: AccentColor.blue,
    shadowOffset: { width: 0, height: -5},
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 8, // untuk Android
  },
  bottomBarContainer: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  // =============== BOTTOM BAR =============== //

  // =============== BUTTON =============== //

  buttonCentered50Percent: {
    width: "50%",
    alignSelf: "center",
  },
  // =============== BUTTON =============== //

  // =============== TEXT INPUT , TEXT AREA , SELECT =============== //
  // Container utama input (View luar)
  inputContainerArea: {
    marginBottom: 16,
  },

  // Label di atas input
  inputLabel: {
    fontSize: TEXT_SIZE_MEDIUM,
    marginBottom: 4,
    fontWeight: "500",
    color: MainColor.white_gray,
  },

  // Tanda bintang merah untuk required
  inputRequired: {
    color: "red",
  },

  // Pesan error di bawah input
  inputErrorMessage: {
    marginTop: 4,
    fontSize: TEXT_SIZE_SMALL,
    color: MainColor.red,
  },

  // Input Length
  inputMaxLength: {
    fontSize: TEXT_SIZE_SMALL,
    color: MainColor.white_gray,
  },

  // Wrapper input (View pembungkus TextInput)
  inputContainerInput: {
    borderWidth: 1,
    borderColor: MainColor.white_gray,
    backgroundColor: MainColor.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },

  // Input utama (TextInput)
  inputText: {
    flex: 1,
    fontSize: TEXT_SIZE_MEDIUM,
    paddingVertical: 0,
  },

  // Ikon di kiri/kanan
  inputIcon: {
    marginHorizontal: 4,
    justifyContent: "center",
  },

  // Teks ikon jika berupa string
  inputIconText: {
    fontSize: TEXT_SIZE_LARGE,
    color: "#000",
  },

  // Border merah jika ada error
  inputErrorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },

  // Placeholder input
  inputPlaceholder: {
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.placeholder,
  },

  //  TextArea untuk tambahan
  textAreaInput: {
    textAlignVertical: "top",
    paddingTop: 10,
    // height: undefined, // biar multiline bebas tinggi
    height: 100,
    width: "100%",
  },

  // Select
  selectModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  selectModalContent: {
    width: "80%",
    maxHeight: 300,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  selectOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: MainColor.white_gray,
  },

  // =============== TEXT INPUT , TEXT AREA , SELECT =============== //

  // =============== Alignment =============== //
  alignSelfCenter: {
    alignSelf: "center",
  },
  alignSelfFlexEnd: {
    alignSelf: "flex-end",
  },
  forumBox: {
    backgroundColor: MainColor.soft_darkblue,
    borderRadius: 8,
    paddingBlock: 20,
    paddingInline: 10,
  },
});
