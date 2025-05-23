import { colors } from "@/constants";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type Props = PressableProps & {
  label: string;
  size?: "medium" | "large";
  variant?: "filled" | "standard";
};

export default function CustomButton({
  label,
  size = "large",
  variant = "filled",
  ...rest
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...rest}
    >
      <Text style={styles[variant]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  standard: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.8,
  },
});
