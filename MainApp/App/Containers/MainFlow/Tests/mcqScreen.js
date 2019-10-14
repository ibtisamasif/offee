import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    BackHandler,
    ToastAndroid,
    ActivityIndicator,
    Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import { height, width, totalSize } from "react-native-dimension";
import colors from "../../../Themes/Colors";
import CountDown from "react-native-countdown-component";
import Modal from "react-native-modal";
import { FlatGrid } from "react-native-super-grid";
import { getQuestions, submitAnswers } from "../../../backend/ApiAxios";
let Height = Dimensions.get("window").height;
_this = null;
class MCQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            IsModalVisibleQuestions: false,
            IsModalVisibleSubmit: false,
            timeProgress: 5,
            language: false,
            quiz: {},
            questions: [
                {
                    id: 1,
                    question_text: "what is your name",
                    question_options: [
                        {
                            id: 1,
                            option_number: 1,
                            option_text: "Ernest Rutherford",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 2,
                            option_number: 2,
                            option_text: "marie Curie",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 3,
                            option_number: 3,
                            option_text: "John Dalton",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 4,
                            option_number: 4,
                            option_text: "Dmitri Mendeleev",
                            correct: true,
                            isClicked: false
                        }
                    ],
                    status: 1,
                    isMark: false
                },
                {
                    id: 2,
                    question_text: "what is your age",
                    question_options: [
                        {
                            id: 1,
                            option_number: 1,
                            option_text: "Ernest Rutherford",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 2,
                            option_number: 2,
                            option_text: "marie Curie",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 3,
                            option_number: 3,
                            option_text: "John Dalton",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 4,
                            option_number: 4,
                            option_text: "Dmitri Mendeleev",
                            correct: true,
                            isClicked: false
                        }
                    ],
                    status: 2,
                    isMark: true
                },
                {
                    id: 3,
                    question_text: "what is your gender",
                    question_options: [
                        {
                            id: 1,
                            option_number: 1,
                            option_text: "Ernest Rutherford",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 2,
                            option_number: 2,
                            option_text: "marie Curie",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 3,
                            option_number: 3,
                            option_text: "John Dalton",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 4,
                            option_number: 4,
                            option_text: "Dmitri Mendeleev",
                            correct: true,
                            isClicked: false
                        }
                    ],
                    status: 3,
                    isMark: false
                },
                {
                    id: 4,
                    question_text: "",
                    question_options: ""
                }
            ],
            index: 0
        };
    }

    componentDidMount() {
        _this = this;
        this.getCurrentItem();
    }

    componentDidMount() {
        _this = this;
        this.getCurrentItem();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackPress
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    async getCurrentItem() {
        this.setState({ loading: true });
        let quiz = this.props.navigation.getParam("item");
        let callback = await getQuestions(quiz.QUIZ_ID);
        this.setState({ loading: false });
        if (callback) {
            this.setState({
                quiz: callback,
                questions: callback.questions
                // loading: false
            });
            console.log("api whole data", callback);
        }
        this.addIdToQuestionsArray();
    }

    addIdToQuestionsArray() {
        for (let i = 0; i < this.state.questions.length; i++) {
            this.state.questions[i].id = i + 1;
            for (
                let j = 0;
                j < this.state.questions[i].question_options.length;
                j++
            ) {
                this.state.questions[i].question_options[j].option_number = j + 1;
            }
        }
        this.setState({
            questions: this.state.questions
        });
    }

    handleBackPress = () => {
        ToastAndroid.show(
            "Please finish your exam before trying to leave the current page",
            ToastAndroid.SHORT
        );
        // alert("Please finish your exam before trying to leave the current page")
        return true;
    };

    clearSelection() {
        for (
            let i = 0;
            i < this.state.questions[this.state.index].question_options.length;
            i++
        ) {
            this.state.questions[this.state.index].question_options[
                i
            ].isClicked = false;
        }
        var quesions = { ...this.state.questions };
        quesions[this.state.index].status = null;
        quesions[this.state.index].selected_option = null;
        this.setState({ quesions });
    }

    chooseOption = async item => {
        for (
            let i = 0;
            i < this.state.questions[this.state.index].question_options.length;
            i++
        ) {
            this.state.questions[this.state.index].question_options[
                i
            ].isClicked = false;
        }
        for (
            let j = 0;
            j < this.state.questions[this.state.index].question_options.length;
            j++
        ) {
            if (
                item.id == this.state.questions[this.state.index].question_options[j].id
            ) {
                this.state.questions[this.state.index].question_options[
                    j
                ].isClicked = true;
                var selected_option = this.state.questions[this.state.index]
                    .question_options[j].id;

                if (!selected_option) {
                    //mark as seen
                    this.state.questions[this.state.index].status = 3;
                } else {
                    //mark as attempted
                    this.state.questions[
                        this.state.index
                    ].question_answer = selected_option;
                    this.state.questions[this.state.index].status = 1;
                }
                this.setState({});
            }
        }
    }

    goToNext = () => {
        //mark as seen before moving if no previous status was set
        if (
            !this.state.questions[this.state.index].status === 1 &&
            !this.state.questions[this.state.index].status === 2 &&
            !this.state.questions[this.state.index].status === 3
        ) {
            this.state.questions[this.state.index].status = 3;
        }
        this.setState({
            index: (this.state.index + 1) % this.state.questions.length
        });
    };

    goToPrevious = () => {
        if (this.state.index > 0) {
            this.setState({
                index: (this.state.index - 1) % this.state.questions.length
            });
        }
    };

    moveToSpecificQuestion = index => {
        //mark as seen before moving if no previous status was set
        if (
            !this.state.questions[this.state.index].status === 1 &&
            !this.state.questions[this.state.index].status === 2 &&
            !this.state.questions[this.state.index].status === 3
        ) {
            this.state.questions[index].status = 3;
        }
        this.setState({
            IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions,
            index: index % this.state.questions.length
        });
    };

    _toggleModalQuestions = () =>
        this.setState({
            IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions
        });
    _toggleModalSubmit = () =>
        this.setState({ IsModalVisibleSubmit: !this.state.IsModalVisibleSubmit });

    verifysubmitTest = () => {
        this._toggleModalSubmit();
    };

    async submitTest() {
        // var arr = new Array(this.state.questions.length);
        // for (i = 0; i < this.state.questions.length; i++) {
        //     var obj = {};
        //     obj.question_id = this.state.question[i].question_id
        //     if (this.state.questions[i].question_answer === null) {
        //         obj.answer_id = "";
        //     } else {
        //         obj.answer_id = this.state.questions[i].question_answer
        //     }
        //     arr[i] = obj;
        // }

        // console.log("answers array: ", arr)

        this._toggleModalSubmit();
        // this._toggleModalQuestions();
        // this.setState({ loading: true });
        let quizActivity = this.props.navigation.getParam("quizActivity");
        let callback = await submitAnswers(
            this.state.quiz.id,
            quizActivity.user_activity,
            this.state.questions
        );
        // this.setState({ loading: false });
        console.log("callback", callback);
        // if (callback) {
        // if (callback.status = "0") {
        ToastAndroid.show('Successfully submitted', ToastAndroid.SHORT);
        this.props.navigation.replace("drawer");
        // }
        // }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <View style={{ height: height }}></View> */}
                {this.state.loading === true ? (
                    <ActivityIndicator
                        style={styles.loading}
                        size={"small"}
                        color={colors.Offeeblue}
                    />
                ) : (
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <View
                                        style={{
                                            flex: 5.5,
                                            justifyContent: "center",
                                            alignItems: "flex-start",
                                            backgroundColor: colors.Offeeblue
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <CountDown
                                                size={totalSize(2)}
                                                until={parseInt(this.state.quiz.quiz_duration, 10)}
                                                onFinish={() => alert("Finished")}
                                                digitStyle={{ backgroundColor: "transparent" }}
                                                digitTxtStyle={{ color: "white" }}
                                                timeLabelStyle={{ color: "red", fontWeight: "bold" }}
                                                separatorStyle={{ color: "white" }}
                                                timeToShow={["H", "M", "S"]}
                                                timeLabels={{ m: null, s: null }}
                                                showSeparator
                                            />
                                            <Text
                                                style={{
                                                    fontSize: totalSize(3),
                                                    color: "white",
                                                    left: 8
                                                }}
                                            >
                                                {this.state.quiz.quiz_name}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.headerIconContainer,
                                            { backgroundColor: colors.Offeeblue }
                                        ]}
                                        onPress={this._toggleModalQuestions}
                                    >
                                        <Icon
                                            name="menufold"
                                            type="antdesign"
                                            color="white"
                                            size={totalSize(3)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.container}>
                                    <View
                                        style={{
                                            width: width(100),
                                            backgroundColor: "white",
                                            alignItems: "center"
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: width(96),
                                                marginTop: totalSize(1),
                                                marginBottom: totalSize(0.5),
                                                borderWidth: 1,
                                                alignItems: "center",
                                                borderRadius: 5
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: totalSize(2.8),
                                                    color: "grey",
                                                    margin: totalSize(0.5)
                                                }}
                                            >
                                                Q.{this.state.questions[this.state.index].id}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                width: width(96),
                                                marginBottom: totalSize(1),
                                                borderWidth: 1,
                                                borderRadius: 5
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.h3,
                                                    {
                                                        fontWeight: "normal",
                                                        fontSize: totalSize(2.8),
                                                        color: "grey",
                                                        margin: totalSize(0.3)
                                                    }
                                                ]}
                                            >
                                                {this.state.questions[this.state.index].question_text}
                                            </Text>
                                        </View>
                                    </View>

                                    {this.state.questions[this.state.index].question_options.map(
                                        (item, key) => {
                                            return (
                                                <View
                                                    style={{
                                                        width: width(100),
                                                        backgroundColor: "white",
                                                        alignItems: "center"
                                                    }}
                                                    key={key}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => this.chooseOption(item)}
                                                        style={{
                                                            width: width(94),
                                                            borderWidth: 1,
                                                            borderRadius: 5,
                                                            marginLeft: totalSize(1),
                                                            marginRight: totalSize(1),
                                                            marginTop: totalSize(2),
                                                            borderColor: item.isClicked ? "grey" : "black",
                                                            backgroundColor: item.isClicked
                                                                ? colors.green
                                                                : "white"
                                                        }}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.h3,
                                                                {
                                                                    fontWeight: "normal",
                                                                    fontSize: totalSize(2.2),
                                                                    color: "black",
                                                                    margin: totalSize(0.7)
                                                                }
                                                            ]}
                                                        >
                                                            {item.option_text}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        }
                                    )}

                                    <TouchableOpacity
                                        style={styles.previousNextButton}
                                        onPress={() => this.verifysubmitTest()}
                                    >
                                        <View
                                            style={{ flexDirection: "row", alignItems: "center" }}
                                        >
                                            <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                submit
                        </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: totalSize(1),
                                            justifyContent: "flex-end"
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={styles.previousNextButton}
                                                onPress={() => this.goToPrevious()}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                        Previous
                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.previousNextButton}
                                                onPress={() => this.goToNext()}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                        Next
                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <Modal
                                    isVisible={this.state.IsModalVisibleQuestions} // Show all quesions
                                    animationIn="slideInRight"
                                    animationOut="slideOutRight"
                                    backdropColor="black"
                                    animationInTiming={500}
                                    animationOutTiming={500}
                                    backdropOpacity={0.5}
                                    width={width(95)}
                                    height={height(100)}
                                    onBackdropPress={this._toggleModalQuestions}
                                    onBackButtonPress={this._toggleModalQuestions}
                                    style={{ alignItems: "flex-end", justifyContent: "center" }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "white",
                                            height: height(100),
                                            width: width(80)
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <View
                                                style={{
                                                    //width: "100%",
                                                    height: totalSize(9),
                                                    paddingLeft: totalSize(1.2),
                                                    paddingTop: totalSize(0.5),
                                                    backgroundColor: colors.Offeeblue,
                                                    alignItems: "flex-start",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <Icon
                                                    name="menuunfold"
                                                    type="antdesign"
                                                    color="white"
                                                    size={totalSize(4)}
                                                    onPress={this._toggleModalQuestions}
                                                />
                                            </View>

                                            <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                                <FlatGrid
                                                    itemDimension={totalSize(5)}
                                                    items={this.state.questions}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                this.moveToSpecificQuestion(item.id - 1)
                                                            }
                                                            style={styles.getCircleStyle(item)}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: totalSize(2.3),
                                                                    textAlign: "center",
                                                                    color: "black"
                                                                }}
                                                            >
                                                                {item.id}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    flex: 0.2,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "transparent"
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.verifysubmitTest()}
                                                    style={{
                                                        height: height(7.5),
                                                        width: width(75),
                                                        borderWidth: 1,
                                                        borderColor: colors.Offeeblue,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 4
                                                    }}
                                                >
                                                    <Text style={[styles.h3]}>SUBMIT</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <Modal
                                    isVisible={this.state.IsModalVisibleSubmit} // sumbit
                                    animationIn="slideInUp"
                                    animationOut="slideOutDown"
                                    backdropColor="black"
                                    animationInTiming={500}
                                    animationOutTiming={500}
                                    backdropOpacity={0.5}
                                >
                                    <View style={styles.MainModalContainer}>
                                        <View style={{ backgroundColor: "#fff" }}>
                                            <View
                                                style={[
                                                    styles.headerSubmitDialog,
                                                    { marginBottom: height(1) }
                                                ]}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h2, { color: "white" }]}>
                                                        Confirm Submit!!
                        </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    width: width(90),
                                                    alignItems: "center",
                                                    borderBottomWidth: 0.6
                                                }}
                                            >
                                                <Text style={[styles.h3, { marginBottom: height(1) }]}>
                                                    Are you sure you want to submit the test ?
                      </Text>
                                            </View>
                                            <View style={{ width: width(90) }}>
                                                <Text
                                                    style={[
                                                        styles.h4,
                                                        {
                                                            marginHorizontal: totalSize(1.6),
                                                            marginTop: totalSize(0.6)
                                                        }
                                                    ]}
                                                >
                                                    Total No of Questions:
                      </Text>
                                                <Text
                                                    style={[
                                                        styles.h4,
                                                        {
                                                            marginHorizontal: totalSize(1.6),
                                                            marginTop: totalSize(0.6)
                                                        }
                                                    ]}
                                                >
                                                    No of questions attempted:
                      </Text>
                                                <Text
                                                    style={[
                                                        styles.h4,
                                                        {
                                                            marginHorizontal: totalSize(1.6),
                                                            marginTop: totalSize(0.6),
                                                            marginBottom: totalSize(2)
                                                        }
                                                    ]}
                                                >
                                                    No of questions skipped:
                      </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-around"
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={styles.customButton}
                                                    onPress={() => this.submitTest()}
                                                >
                                                    <View
                                                        style={{ flexDirection: "row", alignItems: "center" }}
                                                    >
                                                        <Text style={[styles.h3]}>Yes,Submit Test</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.customButton}
                                                    onPress={this._toggleModalSubmit}
                                                >
                                                    <View
                                                        style={{ flexDirection: "row", alignItems: "center" }}
                                                    >
                                                        <Text style={[styles.h3]}>No,Continue Test</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </ScrollView>
                    )}
            </SafeAreaView>
        );
    }
}

export default MCQ;

const styles = StyleSheet.create({
    MainModalContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: "rgba(0,0,0,0.4)"
    },
    header: {
        //flex: 0.1,
        flex: 1,
        flexDirection: "row",
        backgroundColor: "black"
    },
    headerIconContainer: {
        flex: 1.5,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        //flex: 1,
        minHeight: Height * 0.9,
        backgroundColor: colors.silver
        //backgroundColor: "green"
    },
    h1: {
        fontSize: totalSize(3),
        color: "black",
        fontWeight: "bold"
    },
    h2: {
        fontSize: totalSize(2),
        color: "gray",
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
    button: {
        width: width(30),
        height: height(4),
        marginRight: totalSize(1),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.Offeeblue,
        borderWidth: 1,
        borderRadius: 5
    },
    headerSubmitDialog: {
        height: height(6),
        width: width(90),
        backgroundColor: colors.Offeeblue,
        borderRadius: 2,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    previousNextButton: {
        height: height(6),
        width: width(47.5),
        marginBottom: totalSize(0.5),
        borderWidth: 1,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    customButton: {
        height: height(6),
        width: width(43),
        marginBottom: totalSize(0.5),
        borderColor: colors.Offeeblue,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    getCircleStyle(item) {
        return {
            height: totalSize(5),
            width: totalSize(5),
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 100,
            borderColor: "gray",
            backgroundColor: item.status === 1 ? colors.green : colors.transparent
        };
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
});
