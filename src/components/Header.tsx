// import { SafeAreaView } from "react-native"
import { StatusBar } from "react-native";
import style from "styled-components/native";

const topSpacing = StatusBar.currentHeight ? StatusBar.currentHeight + "px" : 0;

const StyleCard = style.View`
  background: #000000;
`;

const StyleContainer = style.SafeAreaView`
  margin-top: ${topSpacing};
  justify-content: center;
  width: 100%;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyleTextHeading = style.Text`
  font-size: 20px;
  font-weight: 700;
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
`;

export const Header = () => {
  return (
    <StyleCard>
      <StyleContainer>
        <StyleTextHeading>XCalp</StyleTextHeading>
      </StyleContainer>
    </StyleCard>
  );
};
