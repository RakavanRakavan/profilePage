import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image
} from 'react-native';
import React, {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ItemValue = ({item,edit, onPress, backgroundColor, textColor,userAddress={}}) => (
  <TouchableOpacity 
//   disabled={item.id !== userAddress?.id  ? true : false }
   onPress={onPress}
    style={[styles.item,
     {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const RenderModal = ({close, Data ,edit=false, handleDlete,submitAddress, userAddress,handleChange,handleClickAddress}) => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor =
    userAddress.id === item.id  || item.id === selectedId  ? '#E68C3F' : 'rgba(112, 112, 112, 0.05)';
    const color = userAddress.id === item.id ||   item.id === selectedId ? 'white' : 'black';

    return (
      <ItemValue
        item={item}
        edit={edit}
        userAddress={userAddress}
        onPress={!edit ? () => {
           setSelectedId(item.id) 
           handleClickAddress(item)
          } : ()=> {}}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.modalBox}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={close}>
          <Fontisto name="close-a" size={10} color={'#000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enter address details</Text>
      </View>

      <View style={{padding: 15}}>
        <View style={styles.paddingTop}>
          <Text style={styles.blackColor}>Save address as*</Text>
          <FlatList
            data={Data}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
          <View style={styles.paddingTop}>
            <Text style={styles.blackColor}>Complete address*</Text>
            <View style={[styles.inputBox, {padding: 25}]}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter text"
                value={userAddress.address}
                onChangeText={e => handleChange(e, 'address')}
              />
            </View>
          </View>
          <View style={styles.paddingTop}>
            <Text style={styles.blackColor}>Nearby landmark</Text>
            <View style={[styles.inputBox, {padding: 5}]}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter text"
                value={userAddress.landMark}
                onChangeText={e => handleChange(e, 'landmark')}
              />
            </View>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5}}>
            <TouchableOpacity
            onPress={()=> submitAddress()}
            style={[styles.handlerBtn,{width: edit ? "45%" : "100%",}]}>
                <Text style={{textAlign:"center"}}>Save Address</Text>
            </TouchableOpacity>
           {edit && 
             <TouchableOpacity  onPress={()=> handleDlete()} style={[styles.handlerBtn,{width:"45%"}]}>
             <Text  style={{textAlign:"center"}}>Delete</Text>
         </TouchableOpacity>
           }
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderModal;

const styles = StyleSheet.create({
    handlerBtn:{
     backgroundColor:"#E68C3F",
     paddingHorizontal:15,
     paddingVertical:10,
     borderRadius:25,
    },  
  paddingTop: {
    paddingVertical: 5,
  },
  modalBox: {
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: "-8%",
    left: '94%',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
  },
  header: {
    backgroundColor: '#F4F7FD',
    padding: 15,
    borderRadius: 8,
  },
  headerTitle: {
    color: '#E68C3F',
  },
  blackColor: {
    color: '#000',
  },
  item: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 9,
  },
  inputBox: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  textInput: {
    fontSize: 16,
    color: '#000',
  },
});
