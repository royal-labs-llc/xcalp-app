import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Text, Button, View, Dimensions } from "react-native";

export const ScannerScreen = ({}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert('Attendance Validated!');
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ width: '100%' }}>
      <BarCodeScanner
      style={{
        height: 300,
        width: 300,
        marginTop: 40,
        marginHorizontal: Dimensions.get('window').width / 2 - 150,
      }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <Button title={"Scan Ticket QR"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
