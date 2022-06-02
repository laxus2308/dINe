import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const UpdateProfilePage = () => {
    const [username, setUsername] = useState('');
    const [faculty, setFaculty] = useState('');
    const [age, setAge] = useState('');
    const [dietary, setDietary] = useState('');
    const [interests, setInterests] = useState('');
    const [cuisines, setCuisines] = useState('');

    //can only open 1 picker a time
    const [facultyOpen, setFacultyOpen] = useState(false);
    const [interestsOpen, setInterestsOpen] = useState(false);
    const [cuisinesOpen, setCuisinesOpen] = useState(false);

    const facultyData = [{
        label: "Art & Social Sciences",
        value: "Art & Social Sciences"
    }, {
        label: "Business",
        value: "Business"
    }, {
        label: "Computing",
        value: "Computing"
    }, {
        label: "Continuing and Lifelong Education",
        value: "Continuing and Lifelong Education"
    }, {
        label: "Dentistry",
        value: "Dentistry"
    }, {
        label: "Design & Engineering",
        value: "Design & Engineering"
    }, {
        label: "Duke-NUS",
        value: "Duke-NUS"
    }, {
        label: "Law",
        value: "Law"
    }, {
        label: "Medicine",
        value: "Medicine"
    }, {
        label: "Music",
        value: "Music"
    }, {
        label: "NUS Graduate School",
        value: "NUS Graduate School"
    }, {
        label: "Public Health",
        value: "Public Health"
    }, {
        label: "Public Policy",
        value: "Public Policy"
    }, {
        label: "Science",
        value: "Science"
    }, {
        label: "Yale-NUS",
        value: "Yale-NUS"
    }]

    return (
        <DropDownPicker
            open={facultyOpen}
            value={faculty}
            items={facultyData}
            setFacultyOpen={setFacultyOpen}
            setValue={setFaculty}
        />
    )

}




export default UpdateProfilePage;