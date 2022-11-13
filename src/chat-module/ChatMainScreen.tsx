import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import style from "styled-components/native";
import { StatusBar, Dimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { useRef } from "react";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { MessageText } from "./MessageText";
import { io } from "socket.io-client";
import { useEffect } from "react";
const socket = io("https://xcalp-api.w3bmint.xyz");

const topSpacing = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

const StyleView = style.View`
  flex-direction: column;
  background: #090909;
`;

const StyleWrapper = style.View`
  height: ${(props) => props.heightStyle + "px"};
`;

const StyleScrollView = style.ScrollView`
  background: white;
  padding: 16px;
  height: ${(props) => props.heightStyle + "px"};
  background: #090909;

`;

const StyleTouchableOpacity = style.TouchableOpacity`
  background: blue;
`;

const StyleInputWrapper = style.View`

`;
const StyleInput = style.TextInput`

`;

// const messages = [
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB0",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB2",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB3",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB4",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB5",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB0",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB4",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB5",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB0",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB4",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB5",
//   },
//   {
//     message: "Invalid prop `fontWeight` of value `10px` supplied to `Text`",
//     address: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB0",
//   },
// ];

export const ChatMainScreen = ({ navigation, route }) => {
  const connector = useWalletConnect();
  const [messageHeight, setMessageHeight] = useState(80);
  const [messages, setMessages] = useState([
    {
      message: 'REMINDER!!! \n\nPlease ready your light sticks before the event.',
      sender: '1',
    },
    {
      message: `After the one hour concert, enjoy korean bbq from the Samgyupsal in the home of culinary experts near the road.\n\nBook early, only 50 seats. Reserve by prepayment.`,
      sender: '1',
    },
    {
      message: "LET'S GO BLINKS!!!!",
      sender: '0xEE0c2C6CD8A423dC22e7F0D9abc263c2917b46c5',
    },
    {
      message: "I'm so excited to see the blackpink!!!",
      image: require('../assets/blackpink.jpeg'),
      sender: '0xe8EA6bbCCA4590442d74E4549D1541809e8A4425',
    }
  ]);
  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get("screen").height;
  const [text, setText] = useState("");
  const scrollViewRef = useRef();

  const nonce = Math.random();
  useEffect(() => {
    socket.on("connect", function () {
      console.log("Connected");
    });
    socket.on("receive-message", function (data) {
      setMessages((prevState) => [...prevState, data]);
      // if (data.nonce !== nonce) {
      console.log("receive-message", data);
      // }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const onChangeText = (value: string) => {
    setText(value);
  };

  const onSendMessage = (value: string) => {
    if (value) {
      socket.emit("send-message", {
        sender: connector.accounts[0],
        message: value,
        room: "0x1BAD87f6954caB91ecC44fE78b0E19DB0F5B2AB1",
        nonce: nonce,
      });
      Keyboard.dismiss();
      setText("");
    }
  };
  return (
    <StyleView>
      <StyleWrapper
        heightStyle={height - (tabBarHeight + topSpacing + 90 + 80)}
      >
        <View
          style={{
            width: "100%",
            height: 30,
            justifyContent: "center",
            flexDirection: "row",
            paddingVertical: 6,
            backgroundColor: "#353535",
          }}
        >
          <Text
            style={{
              color: "white",
              marginHorizontal: "auto",
              fontWeight: "bold",
            }}
          >
            {route.name}
          </Text>
        </View>
        <StyleScrollView
          ref={scrollViewRef}
          heightStyle={height - (tabBarHeight + topSpacing + 90 + 80)}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages.map((data, i) => (
            <MessageText
              key={i}
              message={data.message}
              image={data?.image}
              address={data.sender}
              isSender={
                connector?.accounts.length > 0
                  ? data.sender.toLocaleLowerCase() ==
                    connector.accounts[0].toLocaleLowerCase()
                  : false
              }
            />
          ))}
        </StyleScrollView>
      </StyleWrapper>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        keyboardVerticalOffset={tabBarHeight + topSpacing + 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.chat}>
            <View style={styles.inner}>
              <TextInput
                value={text}
                placeholder="Message..."
                placeholderTextColor="#c1c1c1"
                style={styles.textInput}
                onChangeText={onChangeText}
              />
            </View>
            <View style={styles.btnwrapper}>
              <Button
                onPress={() => onSendMessage(text)}
                title="Send"
                style={styles.btn}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </StyleView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#090909",
  },
  inner: {
    backgroundColor: "#090909",
    padding: 12,
    flex: 1,
  },
  textInput: {
    height: 40,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 16,
    color: "white",
    backgroundColor: "gray",
    fontWeight: "bold",
  },
  chat: {
    flexDirection: "row",
    height: 72,
  },
  btnwrapper: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 20,
    height: 20,
    backgroundColor: "#090909",
    marginLeft: 10,
  },
});
