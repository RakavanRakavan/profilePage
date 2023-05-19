import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState,useEffect} from 'react';

const FavouritePlace = ({Data,handleEdit}) => {
    const [datas,setData] = useState(null)
    useEffect(()=>{
setData(Data)
    },[Data])
 
  const renderItem = ({item}) => {
    const color = '#000';

    return (
      <View style={{flexDirection:"row",marginVertical:10,justifyContent:"space-between"}}>
       <View style={{flexDirection:"row"}}>
       <View style={{alignItems:"center",justifyContent:"center"}}>
       <Image source={item.icon} style={{width: 20, height: 20}} />
       </View>
        <View style={{marginHorizontal:20}}>
        <Text style={[styles.title, {color: "#43469D"}]}>{item.title}</Text>
        <Text style={[styles.title, {color: color}]}>{item.address}</Text>
        </View>
       </View>
       <View>
        <TouchableOpacity  onPress={()=> handleEdit(item)} style={styles.edit}>
            <Text style={{color:"#43469D"}}>Edit</Text>
        </TouchableOpacity>
       </View>
      </View>
    );
  };
  return (
    <>
    <View style={styles.container}>
      <View>
        <Text style={{color: '#000'}}>Favourite Places</Text>
      </View>
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    <View style={styles.borederContainer}>
        <View style={styles.fullWidthLine} />
      </View>
</>
  );
};

export default FavouritePlace;

const styles = StyleSheet.create({
  container: {
    padding:20
  },
  borederContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  item: {
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

});
