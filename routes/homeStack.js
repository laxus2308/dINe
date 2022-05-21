import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginPage from '../screens/LoginPage';
import ForgetPasswordPage from '../screens/ForgetPasswordPage';
import SignUpPage from '../screens/SignUpPage';

const screens = {
    LoginPage: {
        screen: LoginPage
    },
    ForgetPasswordPage: {
        screen: ForgetPasswordPage
    },
    SignUpPage: {
        screen: SignUpPage
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);