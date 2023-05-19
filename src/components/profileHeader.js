import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileHeader = ({userInfo, uploadImage, onChangeText,handleSave,setUserInfo}) => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const [isEdit, setEdit] = useState(false);
  const [userDetail,setuserdetail] = useState({})
 
  useEffect(()=>{
  (async()=>{
   try{
    const user = await AsyncStorage.getItem('user')
    setuserdetail(JSON.parse(user))
   }catch(err){
    console.log(err)
   }
  })()
  },[])

  useEffect(()=>{
   setuserdetail(userInfo)
  },[userInfo.pic])



  const handleEdit = () => {
    setUserInfo(userDetail)
    setEdit(true);
  };
  const backHandle = () => {
    setTimeout(()=>{
        setEdit(false);
    },1000)
  };

  const submitHandler = () => {
    handleSave().then((data)=>{
       setuserdetail(data)
    })
    setTimeout(()=>{
        setEdit(false);
    },1000)
  }

  return (
    <View style={[styles.box, {height: height - 500}]}>
      <LinearGradient
        colors={['#F48221', '#B7ADA4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View style={styles.container}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {isEdit && (
              <TouchableOpacity onPress={() => backHandle()}>
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  style={{fontWeight: 'bold', marginHorizontal: 13}}
                />
              </TouchableOpacity>
            )}
            <View>
              <Text
                style={[
                  styles.profileText,
                  {marginHorizontal: isEdit ? 5 : 15},
                ]}>
                Profile Settings
              </Text>
            </View>
            <View style={{marginTop: 2}}>
              <TouchableOpacity onPress={() => handleEdit()}>
                <Icon name="pencil" size={22} />
              </TouchableOpacity>
              {/* <Image source={require('../assets/png/edit.png')} style={{marginHorizontal:10}} />  */}
            </View>
          </View>

          {/* user */}
          <View style={styles.userInfo}>
            <View style={styles.profileBox}>
              <TouchableOpacity
                onPress={() => uploadImage()}
                underlayColor="rgba(0,0,0,0)">
                <Avatar.Image
                  size={100}
                  source={
                    userDetail.pic
                      ? {uri: `data:image/png;base64,${userDetail?.pic}`}
                      : require('../assets/png/pic.png')
                  }
                />
                <View style={styles.camera}>
                  <FontAwesome5 name="camera" color={'#000'} size={17} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center'}}>
              {!isEdit ? (
                <>
                  <Text style={[styles.userDetail, {fontWeight: 'bold'}]}>
                    {userDetail?.name}
                  </Text>
                  <Text style={styles.userDetail}>{userDetail?.mobile}</Text>
                  <Text style={styles.userDetail}>{userDetail?.email}</Text>
                </>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    onChangeText={e => onChangeText(e, 'name')}
                    value={userInfo?.name}
                  />
                   <Text style={{marginLeft: 12}}>{userInfo?.mobile}</Text>
                   <TextInput
                    style={styles.input}
                    onChangeText={e => onChangeText(e, 'email')}
                    value={userInfo?.email}
                  />
                  <View style={{alignItems:"flex-end"}}>
                  <TouchableOpacity style={styles.Savebtn} onPress={()=> submitHandler()}>
                    <Text style={{fontWeight:"bold"}}>Save</Text>
                  </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  box: {},
  container: {
    flex: 1,
    marginVertical: 20,
  },
  profileText: {
    fontSize: 17,
    color: '#fff',
  },
  userInfo: {
    marginBottom: 60,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //    alignItems:"center"
  },
  profileBox: {
    position: 'relative',
  },
  camera: {
    position: 'absolute',
    top: '75%',
    left: '70%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
  },
  userDetail: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 140,
    margin: 12,
    borderBottomWidth: 1,
    // padding: 10,
    borderColor: '#fff',
  },
  Savebtn:{
    backgroundColor : 'rgba(253, 146, 58, 0.64)',
    paddingVertical : 5,
    paddingHorizontal: 25,
    borderRadius:20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  }
});
