import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {

  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://10.193.18.65:3000/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredEvents = events.filter((event: any) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>
        SmartEventtt 🎫
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>

        <Ionicons name="search" size={20} color="#777" />

        <TextInput
          placeholder="Search events..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

      </View>

      {/* Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (

          <Card
            style={styles.card}
            onPress={() => router.push(`/event/${item._id}`)}
          >
            <Card.Content>

              <Title>{item.title}</Title>

              <Paragraph>
                📍 {item.location}
              </Paragraph>

              <Paragraph>
                🗓 {item.date}
              </Paragraph>

            </Card.Content>

          </Card>

        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.tabs}>

        <Ionicons
          name="home-outline"
          size={26}
          onPress={() => router.push("/")}
        />

        <Ionicons
          name="ticket-outline"
          size={26}
          onPress={() => router.push("/tickets")}
        />

        <Ionicons
          name="scan-outline"
          size={26}
          onPress={() => router.push("/scan")}
        />

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  card: {
    marginBottom: 15,
    borderRadius: 12,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#eee",
  }

});