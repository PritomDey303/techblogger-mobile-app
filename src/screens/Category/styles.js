import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    //box shadow
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    elevation: 4,
  },
  categoriesPhoto: {
    width: "100%",
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginTop: 8,
    textTransform: "capitalize",
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
  },
});

export default styles;
