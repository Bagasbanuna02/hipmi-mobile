import { StyleSheet } from "react-native";
import { MainColor } from "./color-palet";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 30,
    paddingBlock: 20,
  },
  mainContainer: {
    flex: 1,
    paddingInline: 25,
    paddingBlock: 10,
    backgroundColor: MainColor.darkblue,
  },

  imageBackground: {
    height: "100%",
    width: "100%",
  },

  // AUTHENTICATION
  authContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 50,
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
  textLabel: {
    fontSize: 16,
    color: MainColor.white,
    fontWeight: "normal",
  },
});
