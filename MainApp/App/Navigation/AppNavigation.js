import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "../Containers/LoginFlow/login";
import Splash from "../Containers/splash";
import TestInstructions from "../Containers/MainFlow/Tests/testInstructions";
import Tests from "../Containers/MainFlow/Tests/tests";
import MCQ from "../Containers/MainFlow/Tests/mcqScreen";
import TestResult from "../Containers/MainFlow/Tests/testResult";
import Notification from "../Containers/MainFlow/Home/notification";
const AuthStack = createStackNavigator({
  login: {
    screen: Login
  }
});

const AppStack = createStackNavigator({
  drawer: {
    screen: Tests,
    navigationOptions: {
      header: null
    }
  },
  testInstructions: {
    screen: TestInstructions,
    navigationOptions: {
      title: "Instructions"
    }
  },
  mcqScreen: {
    screen: MCQ,
    navigationOptions: {
      header: null
    }
  },
  testResult: {
    screen: TestResult
  },
  notification: {
    screen: Notification
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      splash: Splash,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "splash"
    }
  )
);
