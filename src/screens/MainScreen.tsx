import * as React from "react";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { View, Text } from "react-native";
import style from "styled-components/native";
import { CollectionComponent } from "../components/CollectionComponent";
import { shortenAddress } from "../utils/string";
import axios from "axios";
import { useEffect } from "react";

const StyleContainer = style.ScrollView`
  padding: 16px;
  background: #1a1a1a;
`;

const StyleCard = style.View`
  border-radius: 8px;
  width: 200px;
  height: 100px;
  margin-right: 16px;
  background: white;
  overflow: hidden;
  margin-bottom: 10px;
`;

const StyleRow = style.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const StyleTextHeading = style.Text`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
  color: white;
`;

const StyleImage = style.Image`
  width: 200px;
  height: 100px;
`;

const StyleWrapperCard = style.View`
  flex-direction: column;
`;

const StyleTextCard = style.Text`
  color: white;
`;

const MyCollections = style.View`
  border-radius: 16px;
  border-width: 1px;
  border-color: #404040;
  padding: 20px;
  margin-top: 20px;
`;

const StyleButton = style.TouchableOpacity`
  border-radius: 16px;
  margin-top: 24px;
  margin-left: auto;
`;

const StyleCollectionFooter = style.View`
  flex-direction: row;
  justify-content: center;
`;

const StyleButtonText = style.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0 auto;
`;
const events = [
  {
    _id: "636fce1ef0d89ba076817763",
    contractAddress: "0x648a1561aa45ec275071383c5026a63535ae2378",
    name: "BlackPink Concert",
    location: "Philippine Arena, Bulacan, Philippines",
    datetime: "26 March 2023 19:00",
    image: require("../assets/blackpink.jpeg"),
  },
  {
    _id: 1,
    name: "ApprovingCorgis Concert",
    contractAddress: "0x24D76753D6Ccb3a38686C8E8ddEED16852d5f1A4",
    location: "MOA Arena",
    datetime: "12 Nov 2022 3 PM",
    isStatic: true,
    image: require("../assets/collection-1.png"),
  },
  {
    _id: 2,
    name: "TastyBones Meeting",
    contractAddress: "0x24D76753D6Ccb3a38686C8E8ddEED16852d5f1A4",
    location: "AIM Conference Room",
    datetime: "15 Nov 2022 1 PM",
    isStatic: true,
    image: require("../assets/collection-2.png"),
  },
];

const StyleButtonConnect = style.TouchableOpacity`
  background: #00a3c2;
  color: #FFFFFF;
  border-radius: 12px;
  padding: 12px 16px;
  margin-left: auto;
`;

const StyleButtonConnectText = style.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
`;

const Button = ({ onPress, label }: any) => {
  return (
    <StyleButtonConnect onPress={onPress}>
      <StyleButtonConnectText>{label}</StyleButtonConnectText>
    </StyleButtonConnect>
  );
};

const BLACKPINK_ADDRESS = "0x648a1561aa45ec275071383c5026a63535ae2378";

export const MainScreen = ({ navigation }) => {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <StyleContainer>
      <StyleTextHeading>News</StyleTextHeading>
      <StyleRow>
        <StyleWrapperCard>
          <StyleCard>
            <StyleImage source={require("../assets/news-1.jpeg")} />
          </StyleCard>
          <StyleTextCard>BLACKPINK: THE SHOW now ha...</StyleTextCard>
        </StyleWrapperCard>
        <StyleWrapperCard>
          <StyleCard>
            <StyleImage source={require("../assets/news-2.png")} />
          </StyleCard>
          <StyleTextCard>Binance Easter Egg Hunt | Blog...</StyleTextCard>
        </StyleWrapperCard>
      </StyleRow>
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect Wallet" />
      ) : (
        <>
          <Button
            onPress={killSession}
            label={"Logout: " + shortenAddress(connector.accounts[0])}
          />
          <MyCollections>
            <StyleTextHeading>Upcoming Hot Events</StyleTextHeading>
            {events.map((event) => (
              <CollectionComponent key={event._id} event={event} />
            ))}
            <StyleCollectionFooter>
              <StyleButton onPress={() => {}}>
                <StyleButtonText>Show more</StyleButtonText>
              </StyleButton>
            </StyleCollectionFooter>
          </MyCollections>
        </>
      )}
    </StyleContainer>
  );
};
