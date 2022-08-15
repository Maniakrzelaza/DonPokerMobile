/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import CreateScreen from '../screens/CreateScreen';
import JoinScreen from '../screens/JoinScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { navigationRef } from "../redux/navigation-service";
import PokerScreen from "../screens/PokerScreen";



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { } }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{
          presentation: 'modal',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.primaryPurple },
          headerTintColor: "white",
      }} >
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="Poker" component={PokerScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
      <View style={styles.container}>
          <BottomTab.Navigator
              initialRouteName="Create"
              screenOptions={{
                  tabBarActiveTintColor: "white",
                  tabBarInactiveTintColor: "#803b47",
                  tabBarStyle: {
                      backgroundColor: "#ec6d84",
                      borderTopWidth: 0,
                      shadowColor: "transparent"
                  },
              }}
          >
              <BottomTab.Screen
                  name="Create"
                  component={CreateScreen}
                  options={{
                      headerShown: false,
                      title: "Create",
                      tabBarIcon: ({ color }) => <TabBarIcon name="create" color={color} />,
                  }}
              />
              <BottomTab.Screen
                  name="Join"
                  component={JoinScreen}
                  options={{
                      headerShown: false,
                      title: "Join",
                      tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
                  }}
              />
          </BottomTab.Navigator>
      </View>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    header: {
        height: 80,
        width: 100,
    },
    headerText: {
        color: "red",
        fontSize: 20,
    }
});

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
