import { Text, View, ScrollView, StyleSheet } from 'react-native';

export default function ListView({ items, itemWidth = 180, itemGap = 20, rowSize = 4 }) {
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
    <ScrollView>
      <View style={[{ 
        width: (itemWidth * rowSize) + (itemGap * (rowSize - 1)),
        gap: itemGap,
      }, styles.listContainer ]}>
        {items.map((item, index) => 
          <ListItem key={index} title={item.title} image={item.image} />)}
        <AddNewItem/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignSelf: 'center',
    marginHorizontal: 20,
    backgroundColor: 'blue',
    paddingTop: 20,
    backgroundColor: 'green', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  }
})


