import React from 'react';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "./SearchPage";
import ListScreen from "./MyList";
import PlaceDetails from "./PlaceDetails";

const Tab =  TabNavigator(

    {
        "Home": {screen: SearchScreen},
        "My List": {screen: ListScreen},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                let size;
                if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                    size = 35;
                } else if (routeName === 'My List') {
                    iconName = `ios-paper${focused ? '' : '-outline'}`;
                    size = 30;
                }
                return <Ionicons name={iconName} size={size} color={tintColor}/>;
            },
            title: navigation.state.routeName
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#01579B',
            inactiveTintColor: 'gray',
        },
        animationEnabled: true,
        swipeEnabled: true,
    }
);

const Main = StackNavigator({
    Tab: {screen: Tab},
    PlaceDetails: {screen: PlaceDetails}
});

export default Main;