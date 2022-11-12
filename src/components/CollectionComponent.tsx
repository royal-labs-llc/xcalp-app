import { useNavigation } from "@react-navigation/native";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useEffect, useState } from "react";
import "@ethersproject/shims"
import style from "styled-components/native";
import { ethers } from "ethers";
import { ERC721ABI } from "../utils/string";

const Collection = style.View`
  flex-direction: row;
  margin-bottom: 16px;
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
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const CollectionDetailsSubHeading = style.Text`
  color: white;
  font-size: 16px;
  font-weight: 400;
`;

const CollectionAction = style.View`
  margin-left: 16px;
`;

const CollectionActionButton = style.TouchableOpacity`
  height: 30px;
  width: 60px;
  justify-content: center;
  align-items: center;
  background: #404040;
  border-radius: 16px;
`;

const CollectionActionButtonText = style.Text`
  color: white;
`;

export const CollectionComponent = ({ event }) => {
  const connector = useWalletConnect();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const loadUserAddress = async (currentAddress: string) => {
    try {
      const provider = new WalletConnectProvider({
        infuraId: "f3ce9eccdd924806bcdc0aa809375a96",
      });
      await provider.enable();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();
      const contract = new ethers.Contract(
        event.contractAddress,
        ERC721ABI,
        signer
      );

      const currentBalance = await contract.balanceOf(currentAddress);

      console.log({ currentAddress, currentBalance });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserAddress(connector.accounts[0]);
  }, []);

  const onCollectionPress = () => {
    navigation.navigate("Collection", { event });
  };
  return (
    <Collection>
      <CollectionImageWrapper>
        <CollectionImage source={event.image} />
      </CollectionImageWrapper>
      <CollectionDetails>
        <CollectionDetailsHeading>{event.name}</CollectionDetailsHeading>
        <CollectionDetailsSubHeading>
          {event.location}
        </CollectionDetailsSubHeading>
        <CollectionDetailsSubHeading>
          {event.datetime}
        </CollectionDetailsSubHeading>
      </CollectionDetails>
      <CollectionAction>
        <CollectionActionButton
          onPress={() => onCollectionPress(event.contractAddress)}
        >
          <CollectionActionButtonText>Open</CollectionActionButtonText>
        </CollectionActionButton>
      </CollectionAction>
    </Collection>
  );
};
