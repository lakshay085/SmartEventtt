import { View, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import axios from "axios";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    requestPermission();
    return (
      <View style={{ padding: 20 }}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  const handleScan = async ({ data }) => {
    if (scanned) return;

    setScanned(true);

    try {
      const qrData = JSON.parse(data);

      const res = await axios.get(
        `http://10.193.18.65:3000/tickets/${qrData.ticketId}`
      );

      if (res.data.valid) {
        Alert.alert("✅ Ticket Valid");
      } else {
        Alert.alert("❌ Invalid Ticket");
      }

    } catch (err) {
      Alert.alert("Invalid QR Code");
    }

    setTimeout(() => setScanned(false), 3000);
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      onBarcodeScanned={handleScan}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
    />
  );
}