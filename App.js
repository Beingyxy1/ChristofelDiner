import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import CoursesScreen from "./CoursesScreen";
import FilterScreen from "./FilterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // ✅ Shared menu state here
  const [menu, setMenu] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menu={menu} />}
        </Stack.Screen>
        <Stack.Screen name="Courses">
          {(props) => <CoursesScreen {...props} menu={menu} setMenu={setMenu} />}
        </Stack.Screen>
        <Stack.Screen name="Filter">
          {(props) => <FilterScreen {...props} menu={menu} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
