import { StyleSheet } from 'react-native';
import { MD3LightTheme } from "react-native-paper";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily:'sans-serif-condensed',
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'violet',
    flexDirection: 'row',
    fontFamily:'sans-serif-condensed',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'violet',
    flexDirection: 'row',
    fontFamily:'sans-serif-condensed',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily:'sans-serif-condensed',
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily:'sans-serif-condensed',
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:'sans-serif-condensed',
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    fontFamily:'sans-serif-condensed',
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  buttons: {
    alignItems:"center",
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius:5,
    border: 2,
    backgroundColor: 'violet',
    margin: 10,
    padding: 10,
    fontFamily:'sans-serif-condensed',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:1,
    backgroundColor: 'lightgray',
    margin: 15,
    padding: 8,
    fontFamily:'sans-serif-condensed',
  },
  rulesText:{
   textAlign: 'center',
   justifyContent:'center',
   alignItems:'center',
   padding: 7,
   fontFamily:'sans-serif-condensed',
  },
  InfoIcon:{
    alignItems: 'center',
    justifyContent:'center',
    textAlign: 'center',
    fontFamily:'sans-serif-condensed',
  },
  headerText:{
    fontWeight:'bold',
    fontSize: 16,
    fontFamily:'sans-serif-condensed',
  },
  Enlarge:{
    padding: 5,
    fontSize: 20,
    fontFamily:'sans-serif-condensed',
  },
  rows:{
    justifyContent:'center',
    alignItems:'center',
  },
})

export const MyTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
      ...MD3LightTheme.colors,
      primary: 'violet',
      surfaceVariant: 'blue',
      onSurface: 'black'
  }
}