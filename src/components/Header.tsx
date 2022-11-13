// import { SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
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

const StyleTouchableOpacity = style.TouchableOpacity`

`;

const StyleTextHeading = style.Text`
  font-size: 20px;
  font-weight: 700;
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
`;

export const Header = ({ page }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("XCalp");

  useEffect(() => {
    if (page && (page[0] === "@" || page === "Connect")) {
      setTitle("Community Connect");
      console.log(page);
    } else {
      setTitle("XCalp");
    }
  }, [page]);

  return (
    <StyleCard>
      <StyleTouchableOpacity onPress={() => navigation.navigate("Scanner")}>
        <StyleContainer>
          <StyleTextHeading>{title}</StyleTextHeading>
        </StyleContainer>
      </StyleTouchableOpacity>
    </StyleCard>
  );
};
