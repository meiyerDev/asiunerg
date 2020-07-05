import React, { useState, useEffect, Fragment } from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";
import { useSelector } from "react-redux";

// screens
import HomeTeacher from "../screens/teacher/Home";
import HomeStudent from "../screens/student/Home";
import Onboarding from "../screens/Onboarding";
import ProfileStudent from "../screens/student/Profile";
import ProfileTeacher from "../screens/teacher/Profile";
import FormAbsenceStudent from "../screens/student/FormAbsence";
import FormAbsenceTeacher from "../screens/teacher/FormAbsence";
import AbsencePageStudent from "../screens/student/AbsencePage";
import AbsencePageTeacher from "../screens/teacher/AbsencePage";
import TheirAbsencePageStudent from "../screens/student/TheirAbsencePage";
import MattersTeacher from "../screens/teacher/Matters";
import MatterStudentsList from "../screens/teacher/MatterStudentsLists.js"
import FormClass from "../screens/teacher/FormClass.js"
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import { TabBarIcon } from "../components/TabIcon"

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

function ProfileStack(props) {
  const selectedRole = useSelector(state => state.auth.selectedRole)
  const [role, setRole] = useState(selectedRole)

  useEffect(() => {
    setRole(selectedRole)
  }, [selectedRole])

  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      {role === "Student"
        ? (<Fragment>
          <Stack.Screen
            name="Profile"
            component={ProfileStudent}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  transparent
                  white
                  title="Profile"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#FFFFFF" },
              headerTransparent: true
            }}
          />
        </Fragment>)
        : (<Fragment>
          <Stack.Screen
            name="Profile"
            component={ProfileTeacher}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  transparent
                  white
                  title="Profile"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#FFFFFF" },
              headerTransparent: true
            }}
          />
        </Fragment>)
      }
    </Stack.Navigator>
  );
}

function AbsenceBottomTab({ navigation, route }) {

  const selectedRole = useSelector(state => state.auth.selectedRole)
  const [role, setRole] = useState(selectedRole)

  useEffect(() => {
    setRole(selectedRole)
  }, [selectedRole])

  const getHeaderTitle = (route) => {
    const routeName = route.state?.routes[route.state.index]?.name ?? 'AbsencePage';

    switch (routeName) {
      case 'AbsencePage':
        return 'Mis inasistencias';
      case 'FormAbsence':
        return 'Informar inasistencia';
    }
  }

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator mode="card" initialRouteName="AbsencePage" headerMode="screen">
      {role === 'Student'
        ? (<Fragment>
          <BottomTab.Screen
            name="AbsencePage"
            component={AbsencePageStudent}
            options={{
              title: 'Mis inasistencias',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar-date" />,
            }}
          />
          <BottomTab.Screen
            name="FormAbsence"
            component={FormAbsenceStudent}
            options={{
              title: 'Informar',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bell" />,
            }}
          />
          <BottomTab.Screen
            name="TheirAbsence"
            component={TheirAbsencePageStudent}
            options={{
              title: 'Tus profesores',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search-zoom-in" />,
            }}
          />
        </Fragment>)
        : (<Fragment>
          <BottomTab.Screen
            name="AbsencePage"
            component={AbsencePageTeacher}
            options={{
              title: 'Mis inasistencias',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar-date" />,
            }}
          />
          <BottomTab.Screen
            name="FormAbsence"
            component={FormAbsenceTeacher}
            options={{
              title: 'Informar',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bell" />,
            }}
          />
        </Fragment>)
      }
    </BottomTab.Navigator>
  )
}

function AbsenceStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="AbsenceTab"
        component={AbsenceBottomTab}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Inasistencias"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function TheirAbsenceStack(props) {
  const selectedRole = useSelector(state => state.auth.selectedRole)
  const [role, setRole] = useState(selectedRole)

  useEffect(() => {
    setRole(selectedRole)
  }, [selectedRole])

  return (
    <Stack.Navigator mode="card" initialRouteName="Matters" headerMode="screen">
      {role === 'Student'
        ? <Fragment>
            <Stack.Screen
              name="Matters"
              component={HomeStudent}
              options={{
                header: ({ navigation, scene }) => (
                  <Header
                    title="Tus Clases"
                    navigation={navigation}
                    scene={scene}
                  />
                ),
                cardStyle: { backgroundColor: "#F8F9FE" }
              }}
            />
          </Fragment>
        :<Fragment>
          <Stack.Screen
            name="Matters"
            component={MattersTeacher}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  title="Tus Materias"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#F8F9FE" }
            }}
          />
          <Stack.Screen
            name="MatterStudentList"
            component={MatterStudentsList}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  title="Marca los Asistentes"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#F8F9FE" }
            }}
          />
          <Stack.Screen
            name="FormClass"
            component={FormClass}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  title="Datos de la Clase"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#F8F9FE" }
            }}
          />
        </Fragment>
      }
      
    </Stack.Navigator>
  );
}

function HomeStack(props) {

  const selectedRole = useSelector(state => state.auth.selectedRole)
  const [role, setRole] = useState(selectedRole)

  useEffect(() => {
    setRole(selectedRole)
  }, [selectedRole])

  return (
    <Stack.Navigator mode="card" initialRouteName="Home" headerMode="screen">
      {role === "Student"
        ? <Stack.Screen
            name="Home"
            component={HomeStudent}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  title="Inicio"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#F8F9FE" }
            }}
          />
        : <Stack.Screen
            name="Home"
            component={HomeTeacher}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  title="Inicio"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#F8F9FE" }
            }}
          />
      }
      
    </Stack.Navigator>
  );
}

function AuthStack(props) {
  return (
    <Stack.Navigator mode="card" initialRouteName="Login" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Retroceder',
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  const auth = useSelector(state => state.auth.isAuth)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(auth)
  }, [auth])

  return (
    <Stack.Navigator mode="card" initialRouteName={auth ? "App" : "Auth"} headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      {isAuth
        ? <Stack.Screen name="App" component={AppStack} />
        : <Stack.Screen name="Auth" component={AuthStack} />
      }
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Absence" component={AbsenceStack} />
      <Drawer.Screen name="TheirAbsence" component={TheirAbsenceStack} />
    </Drawer.Navigator>
  );
}

