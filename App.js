import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/LoginPage'
import ListPage from './pages/ListPage'

const items = [
  { title: '악보 1', image: '' },
  { title: '악보 2', image: '' },
  { title: '악보 3', image: '' },
  { title: '악보 4', image: '' },
  { title: '악보 5', image: '' },
  { title: '악보 6', image: '' },
  { title: '악보 7', image: '' },
  { title: '악보 8', image: '' },
  { title: '악보 9', image: '' },
  { title: '악보 10', image: '' },
  { title: '악보 11', image: '' },
  { title: '악보 12', image: '' },
  { title: '악보 13', image: '' },
]
export default function App() {
  return (
    <View style={styles.container}>
      <ListPage items={items} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
