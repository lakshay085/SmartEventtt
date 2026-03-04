import { View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function EventDetails() {

  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState<any>(null);
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {

    axios
      .get("http://10.193.18.65:3000/events")
      .then((res) => {

        const found = res.data.find(
          (e: any) => e._id.toString() === id
        );

        setEvent(found);

      })
      .catch((err) => console.log(err));

  }, [id]);

  if (!event) {
    return null;
  }

  return (

    <View style={{ flex: 1, padding: 20 }}>

      <Card>

        <Card.Content>

          <Title>{event.title}</Title>

          <Paragraph>
            📍 {event.location}
          </Paragraph>

          <Paragraph>
            🗓 {event.date}
          </Paragraph>

          <Button
            mode="contained"
            style={{ marginTop: 20 }}
            onPress={async () => {

              try {

                const res = await axios.post(
                  "http://10.193.18.65:3000/tickets",
                  {
                    eventId: id,
                    userName: "Lakshay",
                  }
                );

                setQr(res.data.qrCode);

              } catch (err) {

                console.log(err);

              }

            }}
          >
            Book Ticket
          </Button>

        </Card.Content>

      </Card>

      {qr && (

        <Card style={{ marginTop: 20 }}>

          <Card.Content>

            <Title>Your Ticket</Title>

            <Image
              source={{ uri: qr }}
              style={{
                width: 220,
                height: 220,
                alignSelf: "center",
                marginTop: 10
              }}
            />

          </Card.Content>

        </Card>

      )}

    </View>
  );
}