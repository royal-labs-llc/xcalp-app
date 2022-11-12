import { useNavigation } from "@react-navigation/native";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useEffect, useState } from "react";
import style from "styled-components/native";
import { ERC721ABI } from "../utils/string";
import { InfuraProvider } from "@ethersproject/providers";

// Import the ethers library
import { ethers } from "ethers";

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
  
  border-radius: 16px;
  ${props => props.toBuy ? 'background: #ffe500;' : 'background: #404040;'}
`;

const CollectionActionButtonText = style.Text`
  ${props => props.toBuy ? 'color: black;' : 'color: white;'}
`;

export const CollectionComponent = ({ event }) => {
  const connector = useWalletConnect();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const navigation = useNavigation();

  const loadUserAddress = async (currentAddress: string) => {
    try {
      const provider = new InfuraProvider(
        "goerli",
        "f3ce9eccdd924806bcdc0aa809375a96"
      );
      const contract = new ethers.Contract(
        event.contractAddress,
        ERC721ABI,
        provider
      );

      const balance = await contract.balanceOf(currentAddress);
      setBalance(ethers.BigNumber.from(balance).toNumber());

      console.log({
        currentAddress,
        balance: ethers.BigNumber.from(balance).toNumber(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserAddress(connector.accounts[0]);
  }, []);

  const onCollectionPress = () => {
    navigation.navigate("Collection", { event, hasNFT });
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
          toBuy={balance === 0}
          onPress={() => onCollectionPress(event, balance > 0)}
        >
          <CollectionActionButtonText toBuy={balance === 0}>
            {balance > 0 ? "Open" : "Buy"}
          </CollectionActionButtonText>
        </CollectionActionButton>
      </CollectionAction>
    </Collection>
  );
};
