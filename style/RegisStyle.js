import { Dimensions, StyleSheet } from "react-native";
import Colors from "../colors/Color";
const { width, height } = Dimensions.get("window");
const RegisStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    
  },

  backButtonContainer: {
    marginTop: 40,
    marginStart: 10,
    padding: 20,
  },
  mainUIContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    marginStart: 10,
    marginEnd: 20,
  },

  heading: {
    color: Colors.white,
    marginStart: 20,
    fontSize: 36,
    fontWeight: "bold",
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    marginStart: 20,
  },
  TextColor: {
    color: Colors.textColorRegister,
  },
  buttonText: {
    color: Colors.white,
  },
  InputContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  bottomButton: {
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Colors.primary,
    padding: 20,
    alignItems: "center",
  },
});

export default RegisStyle;
