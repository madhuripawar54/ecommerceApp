import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import { useThemeStore } from '../store/theme.store';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BagScreen from '../screens/BagScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import FilterScreen from '../screens/FilterScreen';
import NotificationScreen from '../screens/NotificationScreen';

export type RootStackParamList = {
  BottomTabs: undefined;
  ProductDetailsScreen: { product: any };
  Cart: { product?: any } | undefined;
  Checkout: undefined;
  Orders: undefined;
  OrderDetails: { orderId: number };
  Filter: undefined;
  Notifications: undefined;
  BagScreen: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useThemeStore();

  return (
    <NavigationContainer
      theme={theme.dark ? NavigationDarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Bottom Tabs */}
        <Stack.Screen name="BottomTabs" component={BottomTabs} />

        {/* Product Details */}
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          name="BagScreen"
          component={BagScreen}
        />
         <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
        />
        
       
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
