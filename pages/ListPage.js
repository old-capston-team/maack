import { Text, View, Button, ScrollView } from 'react-native';
import styles from '../styles/styles';


export default function ListPage({ items, itemWidth = 180, itemGap = 20, rowSize = 4 }) {
  function AddNewItem() {
    return (
      <View style={{
        backgroundColor: 'red',
        width: itemWidth,
        height: itemWidth * 1.5,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>새 악보 추가</Text>
      </View>
    )
  }

  function ListItem({ title, image }) {
    return (
      <View style={{ gap: 10, justifyContent: 'center' }}>
        <View style={{ 
          width: itemWidth, 
          height: itemWidth * 1.5, 
          backgroundColor: 'yellow' 
        }}></View>
        <Text style={{backgroundColor:'blue', textAlign: 'center' }}>{title}</Text>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: 'red', flex: 1, alignSelf: 'stretch' }}>
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: 'blue',  
        marginTop: 30,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <Text style={{ fontSize: 30 }}>내 악보</Text>
        <Button title='삭제'/>
      </View>
      <ScrollView>
        <View style={{ 
          width: (itemWidth * rowSize) + (itemGap * (rowSize - 1)),
          alignSelf: 'center',
          marginHorizontal: 20,
          backgroundColor: 'blue',
          paddingTop: 20,
          marginHorizontal: 'auto',
          backgroundColor: 'green', 
          flexDirection: 'row', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: itemGap,
        }}>
          {items.map(item => <ListItem title={item.title} image={item.image}/>)}
          <AddNewItem/>
        </View>
      </ScrollView>
    </View>
  );
}



