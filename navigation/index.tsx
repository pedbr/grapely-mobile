import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import WineriesScreen from '../screens/WineriesScreen'
import TasksScreen from '../screens/TasksScreen'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { useAuthentication } from '../hooks/useAuthentication'
import SignInScreen from '../screens/SignInScreen'
import QrScannerScreen from '../screens/QrScannerScreen'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const { user } = useAuthentication()

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {user ? <RootNavigator /> : <SignInScreen />}
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
        <Stack.Screen name='QrScannerScreen' component={QrScannerScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Wineries'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Wineries'
        component={WineriesScreen}
        options={({ navigation }: RootTabScreenProps<'Wineries'>) => ({
          title: 'Wineries',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='industry' color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('QrScannerScreen')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name='qrcode'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='Tasks'
        component={TasksScreen}
        options={({ navigation }) => ({
          title: 'Tasks',
          tabBarIcon: ({ color }) => <TabBarIcon name='tasks' color={color} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('QrScannerScreen')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name='qrcode'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
