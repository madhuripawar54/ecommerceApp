import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useThemeStore} from '../store/theme.store';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import Icons from '../commonConfig/Icons';
import Home from '../screens/Home';
import BagScreen from '../screens/BagScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const {theme} = useThemeStore();
  const tabBarStyle = {
    backgroundColor: theme.colors.background,
    borderTopWidth: 0,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    position: 'absolute',
    left: scaleWidth(12),
    right: scaleWidth(12),
    //bottom: scaleHeight(12),
    height: scaleHeight(61),
    borderRadius: scaleWidth(16),
    paddingHorizontal: scaleWidth(12),
  } as any;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text + '80',
        tabBarItemStyle: { marginTop: 4 },
        tabBarIcon: ({ color }) => {
          const iconProps = { width: scaleWidth(24), height: scaleHeight(24), fill: color };
          switch (route.name) {
            case 'Home':
              return <Icons.HomeIcon {...iconProps} />;
            case 'Search':
              return <Icons.SearchIcon {...iconProps} />;
            case 'Bag':
              return <Icons.BagIcon {...iconProps} />;
            case 'Account':
              return <Icons.AccountIcon {...iconProps} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bag" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
