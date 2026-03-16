import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, LayoutChangeEvent } from 'react-native';
import {  scaleHeight } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';

type Props = {
  min: number;
  max: number;
  step?: number;
  low: number;
  high: number;
  onValuesChange?: (low: number, high: number) => void;
};

const RangeSlider: React.FC<Props> = ({ min, max, step = 1, low, high, onValuesChange }) => {
  const { theme } = useThemeStore();
  const colors = theme.colors;

  const [width, setWidth] = useState(0);
  const [lowVal, setLowVal] = useState(low);
  const [highVal, setHighVal] = useState(high);

  const lowX = useRef(new Animated.Value(0)).current;
  const highX = useRef(new Animated.Value(0)).current;

  const valueToX = (val: number) => ((val - min) / (max - min)) * (width || 1);
  const xToValue = (x: number) => {
    const ratio = Math.max(0, Math.min(1, x / (width || 1)));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    // set initial positions
    lowX.setValue(valueToX(low));
    highX.setValue(valueToX(high));
  };

  const panLow = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (_, gestureState) => {
     // const x = Math.max(0, Math.min(width, valueToX(highVal) - 20, valueToX(lowVal) + gestureState.dx + (valueToX(lowVal) - valueToX(lowVal))));
      const v = xToValue(valueToX(lowVal) + gestureState.dx);
      if (v <= highVal) {
        setLowVal(v);
        lowX.setValue(valueToX(v));
        onValuesChange && onValuesChange(v, highVal);
      }
    },
    onPanResponderRelease: () => {},
  });

  const panHigh = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const v = xToValue(valueToX(highVal) + gestureState.dx);
      if (v >= lowVal) {
        setHighVal(v);
        highX.setValue(valueToX(v));
        onValuesChange && onValuesChange(lowVal, v);
      }
    },
    onPanResponderRelease: () => {},
  });

  return (
    <View>
      <View style={[styles.track, { backgroundColor: colors.border }]} onLayout={onLayout}>
        <Animated.View
          style={[
            styles.selectedTrack,
            {
              left: lowX,
              width: Animated.subtract(highX, lowX),
              backgroundColor: colors.primary,
            },
          ]}
        />

        <Animated.View
          {...panLow.panHandlers}
          style={[styles.thumb, { transform: [{ translateX: Animated.add(lowX, new Animated.Value(-12)) }], backgroundColor: colors.primary }]}
        />

        <Animated.View
          {...panHigh.panHandlers}
          style={[styles.thumb, { transform: [{ translateX: Animated.add(highX, new Animated.Value(-12)) }], backgroundColor: colors.primary }]}
        />
      </View>
      <View style={styles.valuesRow}>
        <Animated.Text style={{ color: colors.text }}>{lowVal}</Animated.Text>
        <Animated.Text style={{ color: colors.text }}>{highVal}</Animated.Text>
      </View>
    </View>
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  track: { height: scaleHeight(6), borderRadius: 6, position: 'relative', overflow: 'hidden' },
  selectedTrack: { position: 'absolute', top: 0, bottom: 0 },
  thumb: { position: 'absolute', width: 24, height: 24, borderRadius: 12, top: -9 },
  valuesRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleHeight(8) },
});
