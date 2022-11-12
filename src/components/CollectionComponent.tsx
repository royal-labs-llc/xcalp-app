import style from "styled-components/native";

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
  const onCollectionPress = () => {
    // 
  }
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
