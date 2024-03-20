import Home from "./Components/Home";
import Gameboard from "./Components/Gameboard";
import Scoreboard from "./Components/Scoreboard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Gameboard') {
              iconName = focused 
              ? 'dice-d6' 
              : 'dice-d6';
            }
             else if (route.name === 'Scoreboard') {
            iconName = focused 
            ? 'view-headline' 
            : 'view-headline';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons 
            name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'lightblue',
          tabBarInactiveTintColor: 'violet',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: "none"}}} />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}