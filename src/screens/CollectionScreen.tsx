import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";

import style from "styled-components/native";

const StyleContainer = style.ScrollView`
  padding: 16px;
  background: #1a1a1a;
`;

const StyleHeader = style.View`
  flex-direction: row;
  align-items: center;
`;

const CollectionImageWrapper = style.View`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  overflow: hidden;
  margin-right: 16px;
`;

const CollectionImage = style.Image`
  width: 50px;
  height: 50px;
`;

const CollectionDetails = style.View`
  flex-direction: column;
  flex: 1;
`;

const CollectionDetailsHeading = style.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const BackButton = style.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: white;
`;

const BackText = style.Text`
  color: white;
  font-size: 8px;
`;

const BackImageWrapper = style.View`
  width: 30px;
  height: 30px;
  border-radius: 16px;
  overflow: hidden;
`;

const BackImage = style.Image`
  width: 30px;
  height: 30px;
`;

export const CollectionScreen = ({ route, navigation }) => {
  const connector = useWalletConnect();

  const { accounts, key } = connector.session;
  const { contractAddress, name, image, isStatic } = route.params.event;
  const hasNFT = route.params.hasNFT;

  const content = {
    aa: accounts[0],
    ca: contractAddress,
  };

  return (
    <StyleContainer>
      <StyleHeader>
        <BackButton onPress={() => navigation.goBack()}>
          <BackImageWrapper>
            <BackImage source={require("../assets/back.png")} />
          </BackImageWrapper>
        </BackButton>
        <CollectionImageWrapper>
          <CollectionImage source={image} />
        </CollectionImageWrapper>
        <CollectionDetails>
          <CollectionDetailsHeading>
            { name }
          </CollectionDetailsHeading>
        </CollectionDetails>
      </StyleHeader>

      <QRCode content={JSON.stringify(content)} backgroundColor="white" />

      <Text>1</Text>
    </StyleContainer>
  );
};
