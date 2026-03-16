import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { RouteProp, useRoute } from '@react-navigation/native';

type RouteParams = {
  OrderDetails: { orderId: number };
};

export default function OrderDetailsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'OrderDetails'>>();
  const { orderId } = route.params || { orderId: undefined };

  return (
    <View style={styles.container}>
      <Text variant="h2">Order Details</Text>
      <Text variant="body" style={{ marginTop: 12 }}>Order ID: {String(orderId)}</Text>
      <Text variant="body" style={{ marginTop: 8 }}>This is a placeholder for the order details screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
});
