import { AccentColor, MainColor } from "@/constants/color-palet";
import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F", // Dark blue background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#001F3F",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700", // Gold color
  },
  notificationBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeCount: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#001F3F",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 16,
    borderRadius: 8,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "46%",
    height: "100%",
    aspectRatio: 1,
    backgroundColor: MainColor.darkblue,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderWidth: 2,
    borderColor: AccentColor.blue,
  },
  gridItemInactive: {
    width: "46%",
    height: "100%",
    aspectRatio: 1,
    backgroundColor: MainColor.darkblue,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderWidth: 2,
    borderColor: AccentColor.blue,
    opacity: 0.7,
  },
  gridLabel: {
    marginTop: 8,
    color: "white",
    fontWeight: "bold",
  },
  gridLabelInactive: {
    marginTop: 8,
    color: "gray",
    fontWeight: "bold",
  },
  jobVacancyContainer: {
    backgroundColor: MainColor.darkblue,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: AccentColor.blue,
  },
  jobVacancyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  jobVacancyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
  vacancyList: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  vacancyItem: {
    flex: 1,
    backgroundColor: MainColor.darkblue,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
    // borderWidth: 1,
    // borderColor: AccentColor.blue,
    // marginRight: 8,
  },
  vacancyDetails: {
    marginLeft: 8,
  },
  vacancyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
  },
  vacancyDescription: {
    fontSize: 12,
    color: "white",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 12,
    backgroundColor: "#001F3F",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    marginTop: 4,
    color: "white",
  },
});
