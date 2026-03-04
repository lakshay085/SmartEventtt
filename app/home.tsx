import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text style={{ fontSize: 24 }}>Events</Text>

      <Button
        title="View Event"
        onPress={() => router.push("/event/1")}
      />

      <Button
        title="My Tickets"
        onPress={() => router.push("/tickets")}
      />
    </View>
  );
}