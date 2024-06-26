import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native";

export default function RenderScrollableData({
  headerTitle,
  data,
}: {
  headerTitle: string;
  data: any;
}) {
  return (
    <View style={styles.content}>
      <ScrollView style={styles.dataContainer}>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 24,
    display: "flex",
    alignItems: "center",

    width: "100%",
  },
  dataContainer: { paddingHorizontal: 32 },
});
