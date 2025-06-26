import { StyleSheet } from "react-native";
import { MainColor } from "../constants/color-palet";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 25,
    paddingBlock: 10,
    backgroundColor: MainColor.darkblue,
  },
  containerWithBackground: {
    flex: 1,
    paddingInline: 25,
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
    fontSize: 14,
    color: MainColor.white,
    fontWeight: "normal",
  },

  // Stack Header Style
  headerStyle: {
    backgroundColor: MainColor.darkblue,
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
});
