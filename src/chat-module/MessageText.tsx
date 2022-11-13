import style from "styled-components/native";
import { shortenAddress } from "../utils/string";

const StyleView = style.View`
  width: 100%;
  margin-bottom: 16px;
  ${(props) =>
    props.isSender
      ? `
  flex-direction: row;
  justify-content: flex-end;
  `
      : `
  flex-direction: row-reverse;
  justify-content: flex-end;
  `}
  
`;

const Text = style.Text`

`;

const StyleViewWrapperMain = style.View`
    width: 100%;
    flex-direction: column;

`;

const StyleViewWrapper = style.View`
  border-radius: 16px;
  padding: 12px 16px;
  
  ${(props) =>
    props.isSender
      ? "margin-right: 8px; background: #007afe;"
      : "margin-left: 8px; background: #26262b;"}
`;

const StyleMessage = style.Text`
color: white;
font-weight: 600;
max-width: 250px;

`;

const StyleAvatar = style.View`
    border-radius: 120px;
    height: 40px;
    width: 40px;
    background-color: blue;
`;

export const MessageText = ({ isSender, message, address, timestamp }) => {
  const add = isSender ? { marginLeft: "auto" } : {};
  const org = address === "1" ? { color: "#ff564a" } : {};
  return (
    <StyleViewWrapperMain>
      <Text
        style={{
          color: "white",
          marginBottom: 8,
          fontWeight: "bold",
          ...add,
          ...org,
        }}
      >
        {address === "1" ? "Organizer" : shortenAddress(address || "")}
      </Text>
      <StyleView isSender={isSender}>
        <StyleViewWrapper isSender={isSender}>
          <StyleMessage>{message}</StyleMessage>
        </StyleViewWrapper>
        <StyleAvatar></StyleAvatar>
      </StyleView>
    </StyleViewWrapperMain>
  );
};
