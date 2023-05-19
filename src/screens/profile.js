import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ProfileHeader from '../components/profileHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouritePlace from '../components/favouritePlace';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modalbox';
import RenderModal from '../components/modalBox';

const user = {
  name: 'John Mathew',
  email: 'joedyson@gmail.com',
  mobile: '+91 98765 43210',
  pic: '',
};

const initialInformation = {
  title: '',
  address: '',
  landMark: '',
};

const Profile = () => {
  const modalRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [addressInfromation, setInformation] = useState([]);
  const [userAddress, setAddress] = useState(initialInformation);
  const [edit,setEdit] = useState(false)
  const[editData,setEditData] = useState(null)
  const [favouriteItem, setFavouriteItem] = useState([
    {
      id: 1,
      title: 'Home',
      icon: require('../assets/png/awesome-home.png'),
    },
    {
      id: 2,
      title: 'Work',
      icon: require('../assets/png/workIcon.png'),
    },
    {
      id: 3,
      title: 'Shop',
      icon: require('../assets/png/cart.png'),
    },
    {
      id: 4,
      title: 'Others',
      icon: '',
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const userInfoString = JSON.stringify(user);
        await AsyncStorage.setItem('user', userInfoString);
        const getData = await AsyncStorage.getItem('user');
        setUserInfo(JSON.parse(getData));
      } catch (err) {
        console.log('Error storing object in AsyncStorage:', error);
      }
    })();
  }, []);

  const setToastmsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const onChangeText = (e, value) => {
    if (value == 'name') {
      setUserInfo(pre => ({
        ...pre,
        name: e,
      }));
    } else {
      setUserInfo(pre => ({
        ...pre,
        email: e,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const userInfoString = JSON.stringify(userInfo);
      await AsyncStorage.setItem('user', userInfoString);
      const getData = await AsyncStorage.getItem('user');
      return JSON.parse(getData);
    } catch (err) {
      console.log('Error storing object in AsyncStorage:', error);
    }
  };

  const closeModel = () => {
    setModalOpen(false);
  };

  const handleChange = (e, value) => {
    if (value === 'address') {
      setAddress(pre => ({
        ...pre,
        address: e,
      }));
    } else {
      setAddress(pre => ({
        ...pre,
        landMark: e,
      }));
    }
  };

  const uploadImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return setToastmsg('cancelled image Selection');
      } else if (response.errorCode == 'permission') {
        return setToastmsg('permission not satisfied');
      } else if (response.errorCode == 'others') {
        return setToastmsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        return Alert.alert('maximum size exceed', 'please choose under 2MB', [
          {text: 'OK'},
        ]);
      } else {
        setUserInfo(pre => ({
          ...pre,
          pic: response.assets[0].base64,
        }));
      }
    });
  };

  const HandleModalOpen = () => {
    setModalOpen(true);
  };

  function submitAddress() {
    if (
      (!userAddress.id && userAddress.address != '') ||
      userAddress.id === 4
    ) {
      closeModel();
      return;
    }
    if (addressInfromation.length > 0) {
      const findId = addressInfromation.find(
        item => item.id === userAddress.id,
      );
      if (findId) {
          if(edit){
            const data = {...userAddress}
            const removeItemById =  addressInfromation.filter(item => item.id !== findId.id);
            setInformation([...removeItemById, data])
           setEdit(false)
           closeModel();
          } else {
            Alert.alert('already submited');
          }
      } else {
        setInformation(pre => [...pre, userAddress]);
        setEdit(false)
        closeModel();
      }
    } else {
      setInformation([userAddress]);
      setEdit(false)
      closeModel();
    }
    return setAddress(initialInformation);
  }

  const handleDlete = () => {
    const removeItemById =  addressInfromation.filter(item => item.id !== userAddress.id);
     setInformation(removeItemById)
     setModalOpen(false)
     setEdit(false)
     setAddress(initialInformation)
  }

  const handleClickAddress = item => {
    return setAddress(pre => ({
      ...pre,
      ...item,
    }));
  };

  const handleEdit = (item) => {
     setAddress(item)
     setEdit(true)
     setModalOpen(true)
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ProfileHeader
        userInfo={userInfo}
        uploadImage={uploadImage}
        onChangeText={onChangeText}
        handleSave={handleSave}
        setUserInfo={setUserInfo}
      />
      <FavouritePlace Data={addressInfromation} handleEdit={handleEdit} />
      <TouchableOpacity
        disabled={addressInfromation.length === 3 ? true : false}
        style={{alignItems: 'center'}}
        onPress={() => HandleModalOpen()}>
        <Text style={[{ color: addressInfromation.length === 3 ? 'gray': '#43469D' } , {marginVertical: 15}]}>
          <FontAwesome5 name="plus" color={addressInfromation.length === 3 ? 'gray':'#2F3293'} />
          Add New Place
        </Text>
      </TouchableOpacity>
      <View>
        <Modal
          style={[styles.modal]}
          position={'center'}
          isOpen={isModalOpen}
          coverScreen={true}
          onClosed={() => {
            closeModel();
          }}
          swipeArea={20}>
          <RenderModal
            Data={favouriteItem}
            userAddress={userAddress}
            close={closeModel}
            edit={edit}
            handleChange={handleChange}
            handleClickAddress={handleClickAddress}
            submitAddress={submitAddress}
            handleDlete={handleDlete}
          />
        </Modal>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  modal: {
    height: 500,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
