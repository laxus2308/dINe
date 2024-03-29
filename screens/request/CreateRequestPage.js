import React, { useState} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../../supabase';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import moment from 'moment'

const CreateRequestPage = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [datePicked, setDate] = useState('Select a date first');
  const [timePicked, setTime] = useState('Select a time first');
  const [dateTime, setDateTime] = useState('');
  const [pax, setPax] = useState(0);
  const [paxOpen, setPaxOpen] = useState(false);
  const [request_url, setRequestUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleConfirm = (dateTime) => {
    setDateTime(dateTime);
    const dd = String(dateTime.getDate()).padStart(2, '0');
    const mm = String(dateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = dateTime.getFullYear();
    const date2 = dd + '/' + mm + '/' + yyyy;
    setDate(date2);
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    setTime(('0' + dateTime.getHours()).slice(-2)
      + ':' + ('0' + dateTime.getMinutes()).slice(-2));
    setSelectedDate(true)
    hideDateTimePicker();
  };

  const paxData = [{
    label: "2",
    value: 2
  }, {
    label: "3",
    value: 3
  }, {
    label: "4",
    value: 4
  }, {
    label: "5",
    value: 5
  }, {
    label: "6",
    value: 6
  }, {
    label: "7",
    value: 7
  }, {
    label: "8",
    value: 8
  },]

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      
      const user = supabase.auth.user()
      if (title == '') {
        alert("Please insert a title!")
        return;
      }
      if (location == '') {
        alert("Please insert a location!")
        return;
      }
      if (timePicked == 'Select a time') {
        alert("Please select a time!")
        return;
      }
      if (datePicked == 'Select a date') {
        alert("Please select a date!")
        return;
      }
      if (dateTime < moment()) {
        alert("Please select a proper date and time.")
        return;
      }
      if (pax == 0) {
        alert("Please select number of people!")
        return;
      }

      setDisabled(true);
      const updates = {
        requestor_id: user.id,
        location: location,
        time: timePicked,
        date: datePicked,
        pax: pax,
        description: description,
        title: title,
        request_url: request_url,
        datetime: dateTime,
        current_pax: 1,
      }

      let { data, error } = await supabase
        .from('requests')
        .insert([updates])

      const {  error: createRoomError } = await supabase.rpc('create_request_room', {
            request_id: data[0].id
      })
    
      if (error) {
        throw error
      } else if (createRoomError) {
        throw createRoomError
      }

      ToastAndroid.show('Request Created!', ToastAndroid.LONG)
      navigation.pop();

    } catch (error) {
      alert(error.message)
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.base64);
    }
  };


  const uploadImage = async (base64File) => {
    try {
      setUploading(true)
      const user = supabase.auth.user()
      const filePath = `public/${user.id}/${Math.random()}`
      setRequestUrl(filePath)

      const { error: uploadError } = await supabase.storage
        .from('requestpics')
        .upload(filePath, decode(base64File), {
          contentType: 'image/png'
        })

      if (uploadError) {
        throw uploadError
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <Text>Insert an image (optional) </Text>
        <View style={styles.container2}>
          <Image
            style={styles.image}
            source={{ uri: image }}
          />
          <TouchableOpacity
            style={styles.Button}
            onPress={() => pickImage()}>
            <Text> Import from gallery </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
          <Text style={{ flex: 1 / 4 }}> Title </Text>
          <TextInput
            placeholder={"Insert title here"}
            value={title}
            onChangeText={setTitle}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
          <Text style={{ flex: 1 / 4 }}> Location </Text>
          <TextInput
            placeholder={"Insert location here"}
            value={location}
            onChangeText={setLocation}
            style={{ flex: 1 }}
          />
        </View >

        <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
          <View style={styles.leftContainer} >
            <View style={styles.dateContainer}>
              <Text style={{ flex: 3 / 5 }}> Date </Text>
              <Text style={selectedDate ? styles.black : styles.grey}> {datePicked}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={{ flex: 3 / 5 }}> Time </Text>
              <Text style={selectedDate ? styles.black : styles.grey}> {timePicked}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.date} onPress={(showDateTimePicker)}>
            <Text> Select date and time </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDateTimePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDateTimePicker}
            minimumDate={new Date()}
          // minimumTime={moment().format("HH:mm:ss")}
          />
        </View>

        <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
          <Text style={{ flex: 1 / 3 }}> Description </Text>
          <TextInput
            placeholder={"Insert brief description (optional)"}
            value={description}
            onChangeText={setDescription}
            style={{ flex: 1 }}
          />
        </View>
        <View>
          <Text style={{ marginTop: 10, marginLeft: 3 }}>No. of people</Text>
          <DropDownPicker
            open={paxOpen}
            setOpen={setPaxOpen}
            value={pax}
            items={paxData}
            setValue={setPax}
            style={styles.bottomSeparator}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={submitRequest} disabled = {disabled}>
          <Text> Submit </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
  },
  container2: {
    alignItems: 'center'
  },
  verticalComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -1,
    marginTop: 10,
  },
  bottomSeparator: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    zIndex: -1,
  },
  date: {
    width: "40%",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '5%',
    backgroundColor: "#ffff00",
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffff00",
    width: "80%",
    borderRadius: 25,
    height: 50,
    zIndex: -1,
    marginTop: '10%'
  },

  image: {
    marginBottom: 30,
    marginTop: 20,
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  Button: {
    borderRadius: 25,
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#ffff00",
  },
  leftContainer: {
    width: '60%',
    flexDirection: 'column',
  },
  dateContainer: {
    marginBottom: '10%',
    flexDirection: 'row',
    flex: 1 / 3,
  },
  grey: {
    color: 'grey',
  },
  black: {
    color: 'black',
  },
});

export default CreateRequestPage;