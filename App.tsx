import React from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import RootNavigation from './src/navigation/root';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <NavigationContainer>
          <GluestackUIProvider>
            <RootNavigation />
          </GluestackUIProvider>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
