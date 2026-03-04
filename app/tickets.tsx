import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Tickets() {
  const ticketId = "TICKET-12345";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Your Ticket
      </Text>

      <Text style={{ marginBottom: 10 }}>
        Coldplay Concert
      </Text>

      <Text style={{ marginBottom: 30 }}>
        Delhi • 20 March
      </Text>

      <QRCode
        value={ticketId}
        size={200}
      />

      <Text style={{ marginTop: 20 }}>
        Ticket ID: {ticketId}
      </Text>
    </View>
  );
}