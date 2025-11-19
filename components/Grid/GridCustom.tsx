import React, { createContext, useContext, useMemo } from "react";
import { StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";

// Tipe untuk span
type SpanValue = {
  base?: number;
  md?: number;
  lg?: number;
};

// Props untuk Grid.Col
interface ColProps {
  children: React.ReactNode;
  span?: number | SpanValue;
  style?: ViewStyle;
}

// Props untuk Grid
interface GridProps {
  children: React.ReactNode;
  gap?: number;
  columns?: number;
  containerStyle?: ViewStyle;
}

// Context untuk menyimpan konfigurasi grid
type GridContextType = {
  gap: number;
  columns: number;
};

const GridContext = createContext<GridContextType>({
  gap: 0,
  columns: 12,
});

const useGrid = () => useContext(GridContext);

// Helper untuk menentukan span berdasarkan lebar layar
const getSpan = (
  spanProp: number | SpanValue | undefined,
  width: number
): number => {
  if (typeof spanProp === "number") return spanProp;

  const span = spanProp || { base: 12 };

  if (width >= 992 && span.lg) return span.lg;
  if (width >= 768 && span.md) return span.md;
  return span.base ?? 12;
};

// Grid Component
const GridComponent: React.FC<GridProps> = ({
  children,
  gap = 6,
  columns = 12,
  containerStyle,
}) => {
  const contextValue = useMemo(() => ({ gap, columns }), [gap, columns]);

  return (
    <GridContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          { marginHorizontal: -gap / 2 },
          containerStyle,
        ]}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<ColProps>, {})
            : child
        )}
      </View>
    </GridContext.Provider>
  );
};

// Grid.Col Component
const Col: React.FC<ColProps> = ({ children, span, style }) => {
  const { gap, columns } = useGrid();
  const { width } = useWindowDimensions();

  const colSpan = getSpan(span, width);
  const margin = gap / 2;

  const styles = StyleSheet.create({
    col: {
      flexBasis: `${(100 / columns) * colSpan}%`,
      paddingVertical: margin,
      // marginBottom: gap,
      marginBlock: gap,
    },
  });

  return <View style={[styles.col, style]}>{children}</View>;
};

// Export bersama-sama
const Grid = Object.assign(GridComponent, { Col });

export default Grid;

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    // marginInline: 0.1
    margin: 0.1
  },
});
