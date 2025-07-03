import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

interface DynamicTruncatedTextProps {
  text: string;
  fontSize?: number;
  fontFamily?: TextStyle["fontFamily"];
  style?: TextStyle;
}

const DynamicTruncatedText: React.FC<DynamicTruncatedTextProps> = ({
  text,
  fontSize = 14,
  fontFamily,
  style

}) => {
  const [truncated, setTruncated] = useState<string>(text);
  const textRef = useRef<Text>(null);
  const containerWidth = useRef<number>(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    containerWidth.current = width;
    truncateText(width);
  };

  const truncateText = useCallback(
    (width: number) => {
      if (!text || !textRef.current || width <= 0) return;

      textRef.current.measure((x, y, textWidth, height, pageX, pageY) => {
        const avgCharWidth = fontSize * 0.5;
        const maxChars = Math.floor(width / avgCharWidth);

        if (text.length <= maxChars) {
          setTruncated(text);
        } else {
          const truncatedText = text.substring(0, maxChars - 3) + "...";
          setTruncated(truncatedText);
        }
      });
    },
    [text, fontSize]
  );

  useEffect(() => {
    if (containerWidth.current > 0) {
      truncateText(containerWidth.current);
    }
  }, [truncateText]);

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <Text
        ref={textRef}
        numberOfLines={1}
        ellipsizeMode="clip"
        style={{ fontSize, fontFamily, ...style }}
      >
        {truncated}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default DynamicTruncatedText;
