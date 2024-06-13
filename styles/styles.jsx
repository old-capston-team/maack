import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#0007",
    aignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 32,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtonView: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
