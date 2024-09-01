import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Register from './screens/Registration';
import Dashboard from './screens/Dashboard';
import Studyspace from './screens/Studyspace';
import StudyspaceTwo from './screens/StudyspaceTwo';
import WrittenCompExam from './screens/WrittenComprehension/WrittenCompExam';
import AnswerSheet from './screens/AnswerSheet';
import WrittenCompResults from './screens/WrittenComprehension/WrittenCompResults';
import WrittenComp from './screens/WrittenComprehension/WritteNComp';
import WrittenCompAss from './screens/WrittenComprehension/WrittenCompAss';
import Login from './screens/Login';
import Profile from './screens/Profile';
import ForgotPass from './screens/ForgotPass';
import ExamSet from './screens/WrittenExpression/ExamSet';
import WrittenExam from './screens/WrittenExpression/WrittenExam';
import EditProfile from './screens/EditProfile';
import OralExamSet from './screens/ListenigComprhension/OralExamSet';
import WrittenExpResult from './screens/WrittenExpression/WrittenExpResult';
import WrittenCompre from './screens/WrittenComprehension/WrittenCompre';
import {ProgressBarProvider} from './context/ProgressBarContext';
import {AudioPlayerProvider} from './context/AudioPlayerContext';
import {AdminProvider, AdminContext} from './context/AdminContext';
import { UserProvider } from './context/UserContext';
import {useContext} from "react";
import ListCompExam from "./screens/ListenigComprhension/ListCompExam";
import ListCompResults from "./screens/ListenigComprhension/ListCompResults";
import Admin from "./screens/Admin/Admin";
import WrittenComprehensionAdmin from "./screens/Admin/WrittenComprehension/WrittenComprehensionAdmin";
import ListeningComprehensionAdmin from "./screens/Admin/ListeningComprehension/ListeningComprehensionAdmin";
import WrittenExpressionAdmin from "./screens/Admin/WrittenExpression/WrittenExpressionAdmin";
import WrittenExpressionSets from "./screens/Admin/WrittenExpression/components/WrittenExpressionSetsScreen";
import EditWrittenExpression from "./screens/Admin/WrittenExpression/components/EditWrittenExpression";
import WrittenComprehensionSets from "./screens/Admin/WrittenComprehension/components/WrittenComprehensionSetsScreen";
import EditWrittenComprehensionSets
    from "./screens/Admin/WrittenComprehension/components/WrittenComprehensionSetsScreen";
import EditWrittenComprehension from "./screens/Admin/WrittenComprehension/components/EditWrittenComprhensionSets";
import ListeningComprehensionSets
    from "./screens/Admin/ListeningComprehension/components/ListeningComprehensionSetsScreen";
import EditListeningComprehension
    from "./screens/Admin/ListeningComprehension/components/EditListeningComprehensionSets";

let firebaseConfig;

if (Platform.OS === !'web') {
    firebaseConfig = require('./firebaseConfig');
}


const Stack = createStackNavigator();
const screenOptions = {
    headerShown: false,
};

function AppNavigator() {
    const {isAdmin} = useContext(AdminContext);

    return (

        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name='onboard' component={Home}/>
            <Stack.Screen name='register' component={Register}/>
            <Stack.Screen name='dashboard' component={Dashboard}/>
            <Stack.Screen name='studyspace' component={Studyspace}/>
            <Stack.Screen name='studyspacetwo' component={StudyspaceTwo}/>
            <Stack.Screen name='WrittenCompExam' component={WrittenCompExam}/>
            <Stack.Screen name='answer' component={AnswerSheet}/>
            <Stack.Screen name='WrittenCompResults' component={WrittenCompResults}/>
            <Stack.Screen name='written' component={WrittenComp}/>
            <Stack.Screen name='wasses' component={WrittenCompAss}/>
            <Stack.Screen name='login' component={Login}/>
            <Stack.Screen name='profile' component={Profile}/>
            <Stack.Screen name='forgot' component={ForgotPass}/>
            <Stack.Screen name='examset' component={ExamSet}/>
            <Stack.Screen name='writtenExam' component={WrittenExam}/>
            <Stack.Screen name='editProfile' component={EditProfile}/>
            <Stack.Screen name='oralSet' component={OralExamSet}/>
            <Stack.Screen name='writtenExpResult' component={WrittenExpResult}/>
            <Stack.Screen name='WrittenCom' component={WrittenCompre}/>
            <Stack.Screen name='ListCompExam' component={ListCompExam}/>
            <Stack.Screen name='ListCompResults' component={ListCompResults}/>
            {isAdmin && (
                <>
                    <Stack.Screen name='AddQuiz' component={Admin}/>
                    <Stack.Screen name='WrittenComprehensionAdmin' component={WrittenComprehensionAdmin}/>
                    <Stack.Screen name='WrittenComprehensionSets' component={WrittenComprehensionSets}/>
                    <Stack.Screen name='EditWrittenComprehensionSets' component={EditWrittenComprehension}/>
                    <Stack.Screen name='ListeningComprehensionAdmin' component={ListeningComprehensionAdmin}/>
                    <Stack.Screen name='ListeningComprehensionSets' component={ListeningComprehensionSets}/>
                    <Stack.Screen name='EditListeningComprehension' component={EditListeningComprehension}/>
                    <Stack.Screen name='WrittenExpressionAdmin' component={WrittenExpressionAdmin}/>
                    <Stack.Screen name='WrittenExpressionSets' component={WrittenExpressionSets}/>
                    <Stack.Screen name='EditWrittenExpression' component={EditWrittenExpression}/>
                </>
            )}

        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <AdminProvider>
            <UserProvider>
            <AudioPlayerProvider>
                <ProgressBarProvider>
                    <NavigationContainer>
                        <AppNavigator/>
                    </NavigationContainer>
                </ProgressBarProvider>
            </AudioPlayerProvider>
            </UserProvider>
        </AdminProvider>
    );
}
