import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler
} from "react-native";
import { Icon } from "react-native-elements";
import { height, width, totalSize } from "react-native-dimension";
import colors from "../../../Themes/Colors";
import Modal from "react-native-modal";
import { subjectList } from "../../../backend/ApiAxios";
import Storage from "../../../helper/asyncStorage";
import TestInstructions from "./testInstructions";

_this = null;
export default class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisibleLogout: false
    };
  }

  componentDidMount() {
    _this = this;
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this._toggleModalLogout();
    return true;
  };

  _toggleModalLogout = () =>
    this.setState({ isModalVisibleLogout: !this.state.isModalVisibleLogout });

  logOut = () => {
    this._toggleModalLogout();
    this.props.navigation.navigate("Auth");
    Storage.removeItem("user");
    Storage.clear();
  };

  render() {
    return (
      <View style={styles.Maincontainer}>
        <View style={styles.header}>
          <View style={{ flex: 5.5, justifyContent: "center" }}>
            <View>
              <Text
                style={{
                  fontSize: totalSize(2),
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: totalSize(2)
                }}
              >
                Offee
              </Text>
            </View>
          </View>
          <View style={styles.headerIconContainer}>
            <Icon
              name="sign-out"
              color="white"
              type="octicon"
              size={totalSize(3)}
              onPress={() => this._toggleModalLogout()}
            />
          </View>
        </View>
        <View style={styles.container}>
          <TestsList />
        </View>

        <Modal
          isVisible={this.state.isModalVisibleLogout} // Logout User
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor="black"
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.5}
        >
          <View
            style={{
              backgroundColor: "white",
              height: height(20),
              width: width(80),
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: totalSize(1.5) }}>
                Are you sure you want to logout?
              </Text>
              <View
                style={{
                  marginTop: height(2),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5
                }}
              >
                <TouchableOpacity
                  onPress={this._toggleModalLogout}
                  style={{
                    height: height(8),
                    width: width(30),
                    backgroundColor: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5
                  }}
                >
                  <Text style={{ fontSize: totalSize(2), color: "white" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View style={{ width: width(2.5) }}></View>
                <TouchableOpacity
                  onPress={() => this.logOut()}
                  style={{
                    height: height(8),
                    width: width(30),
                    backgroundColor: colors.Offeeblue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5
                  }}
                >
                  <Text style={{ fontSize: totalSize(2), color: "white" }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export class TestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionModalVisible: false,
      tests: [
        {
          id: 1,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "02:30PM 31Aug,2020",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60"
        },
        {
          id: 2,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "09:30AM 22Jun,2019",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60"
        },
        {
          id: 3,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "04:30PM 05Aug,2020",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60"
        },
        {
          id: 4,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "11:30AM 21Aug,2019",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60"
        },
        {
          id: 5,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "12:30PM 17Aug,2020",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60"
        },
        {
          id: 6,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "02:30PM 25Aug,2019",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60"
        }
      ]
    };
  }

  async componentDidMount() {
    let user = await Storage.getItem("user");
    loginData = await subjectList(user.cat, user.name);
    console.log("api data", loginData);
    if (loginData) {
      this.setState({
        tests: loginData
      });
    }
  }

  async EnterToTest(item) {
    console.log("subject object:", item);
    _this.props.navigation.navigate("testInstructions", { oneSubject: item });
  }

  render() {
    return (
      <View style={styles.Maincontainer}>
        <Modal
          visible={this.state.instructionModalVisible}
          transparent
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor="black"
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.5}
        >
          <View style={styles.MainModalContainer}>
            <View style={{ backgroundColor: "#fff" }}>
              <View style={[styles.botton, { marginBottom: height(1) }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.h2, { color: "white" }]}>
                    Begin Test !!
                  </Text>
                </View>
              </View>
              {/* <View style={{ marginVertical: height(2) }}>
              <Text style={styles.h2}> {this.state.data.quiz_name} </Text>
            </View> */}
              <View
                style={{
                  width: width(90),
                  alignItems: "center",
                  borderBottomWidth: 0.6
                }}
              >
                <Text style={[styles.h3, { marginBottom: height(1) }]}>
                  Are you sure you want to begin the test ?
                </Text>
              </View>
              <View
                style={{
                  width: width(90)
                  //alignItems: "center",
                }}
              >
                <Text
                  style={[
                    styles.h4,
                    {
                      marginHorizontal: totalSize(1.2),
                      marginTop: totalSize(1)
                    }
                  ]}
                >
                  You won't be able to un-submit the test once you start.
                </Text>
                <Text
                  style={[
                    styles.h4,
                    {
                      marginHorizontal: totalSize(1.2),
                      //marginBottom: totalSize(1),
                      fontWeight: "bold"
                    }
                  ]}
                >
                  Instructions :
                </Text>
                <View
                  style={{
                    flexWrap: "wrap"
                  }}
                >
                  <Text
                    style={[
                      styles.h4,
                      {
                        marginHorizontal: totalSize(1.2),
                        //marginBottom: totalSize(1),
                        fontWeight: "bold"
                      }
                    ]}
                  >
                    Do not minimize once you begin the test your activities are
                    monitored
                  </Text>
                </View>
                <View
                  style={{
                    flexWrap: "wrap"
                  }}
                >
                  <Text
                    style={[
                      styles.h4,
                      {
                        marginHorizontal: totalSize(1.2),
                        marginBottom: totalSize(1),
                        fontWeight: "bold"
                      }
                    ]}
                  >
                    Do not use calculator in phone
                  </Text>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={styles.customButton}
                  //onPress={() => this.quizActivity()}
                  onPress={() => this.onBegin()} //Or whatever api should be called. now skip instruction screen. enter in test directly.
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.h3]}>Begin Test</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() =>
                    this.setState({
                      instructionModalVisible: !this.state
                        .instructionModalVisible
                    })
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.h3]}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <View tabLabel="IBPS Clerk">
            {
              <View style={{ alignItems: "center" }}>
                <ScrollView>
                  {this.state.tests.map((item, key) => {
                    return (
                      <View
                        key={key}
                        style={{
                          width: width(90),
                          backgroundColor: "white",
                          alignItems: "center",
                          marginVertical: totalSize(1.3),
                          marginHorizontal: totalSize(0.5),
                          flexDirection: "row",
                          justifyContent: "space-between",
                          borderRadius: 5,
                          elevation: 3
                        }}
                      >
                        <View
                          style={{
                            //width: width(50),
                            marginLeft: totalSize(1.5)
                          }}
                        >
                          <Text style={[styles.h2]}>{item.quiz_name}</Text>
                        </View>
                        <View
                          style={{
                            //width: width(30),
                            marginVertical: totalSize(1.5),
                            alignItems: "center"
                          }}
                        >
                          <TouchableOpacity
                            //onPress={() => this.EnterToTest(item)}
                            onPress={() =>
                              this.setState({ instructionModalVisible: true })
                            }
                            style={styles.button}
                          >
                            <View style={styles.btnTxtContainer}>
                              <Text style={styles.btnTxt}>Start</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1
  },
  MainModalContainer: {
    //flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  header: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: colors.Offeeblue
  },
  headerIconContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: colors.silver
  },
  h1: {
    fontSize: totalSize(3),
    color: "black",
    fontWeight: "bold"
  },
  h2: {
    fontSize: totalSize(2.5),
    color: "black",
    fontWeight: "bold"
  },
  h3: {
    fontSize: totalSize(2),
    color: "black"
  },
  h4: {
    fontSize: totalSize(1.5),
    color: "gray"
  },
  btnIconContainer: {
    height: height(15),
    width: width(15),
    justifyContent: "center"
  },
  btnTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: width(30),
    height: height(4),
    marginRight: totalSize(1),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.Offeeblue,
    borderWidth: 1,
    elevation: 1,
    borderRadius: 2.5
  },
  btnTxt: {
    fontSize: totalSize(2),
    color: colors.Offeeblue
  },
  botton: {
    height: height(6),
    width: width(90),
    backgroundColor: colors.Offeeblue,
    borderRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  customButton: {
    height: height(6),
    width: width(44),
    marginBottom: totalSize(0.5),
    borderColor: colors.Offeeblue,
    borderWidth: 1,
    borderRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
