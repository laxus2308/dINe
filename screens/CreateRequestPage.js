import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text, 
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../supabase';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import { useRoute } from '@react-navigation/native';


const CreateRequestPage = ({navigation}) => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [datePicked, setDate] = useState('Select a date');
  const [timePicked, setTime] = useState('Select a time');
  const [pax, setPax] = useState();
  const [paxOpen, setPaxOpen] = useState(false);
  const [request_url, setRequestUrl] = useState(null);
  const [request_id, setRequest_id] = useState('');


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(date);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const date2 = yyyy + '/' + mm + '/' + dd;   
    setDate(date2);
    hideDatePicker();
  };

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const paxData = [{
    label: "1",
    value: 1
  }, {
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
  }, ]

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
        const user = supabase.auth.user()
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
        if (pax == 0) {
          alert("Please select number of people!")
          return;
        } 


        const updates = {
            requestor_id: user.id,
            Location: location,
            Time: timePicked,
            Date: datePicked,
            Pax: pax,
            Description: description,
            Title: title,
            Request_url: request_url,
        }

        let { data, error } = await supabase
            .from('Requests')
            .insert([updates])

        if (error) {
            throw error
        }
        navigation.pop();

    } catch (error) {
        alert(error.message)
    }
  };

  const handleConfirmTime = (time) => {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    hours = hours % 12;  
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    setTime(('0' + time.getHours()).slice(-2)
    + ':' + ('0' + time.getMinutes()).slice(-2));
    hideTimePicker();
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
        <Text style={{ flex: 1}}> Date </Text>
        <TouchableOpacity title="Select a date" style={styles.date} onPress={(showDatePicker)}>
        <Text>{datePicked}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
      />
      </View>
      <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
        <Text style={{ flex: 1}}> Time </Text>
        <TouchableOpacity title="Select a time" style={styles.date} onPress={(showTimePicker)}>
        <Text>{timePicked}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}/>
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
        <Text style={{marginTop: 10, marginLeft: 3}}>No. of people</Text>
          <DropDownPicker
            open={paxOpen}
            setOpen={setPaxOpen}
            value={pax}
            items={paxData}
            setValue={setPax}
            style={styles.bottomSeparator}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,}}
          />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
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
    alignItems:'center'
  },

  verticalComponent: {
    flexDirection: 'row',
    height: 40,
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
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -18,
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
});

export default CreateRequestPage;