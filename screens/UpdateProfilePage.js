import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const UpdateProfilePage = () => {
    const { loading, username, faculty, age, dietary, interests, cuisines } = props;
    const { setLoading, setUsername, setAvatarUrl, setFaculty, setAge, setDietary, setInterests, setCuisines } = props;


    return (
        <DropdownFaculty />
    )
}

const DropdownFaculty = () => {
    const facultyData = [{
        value: "Art & Social Sciences"
    }, {
        value: "Business"
    }, {
        value: "Computing"
    }, {
        value: "Continuing and Lifelong Education"
    }, {
        value: "Dentistry"
    }, {
        value: "Design & Engineering"
    }, {
        value: "Duke-NUS"
    }, {
        value: "Law"
    }, {
        value: "Medicine"
    }, {
        value: "Music"
    }, {
        value: "NUS Graduate School"
    }, {
        value: "Public Health"
    }, {
        value: "Public Policy"
    }, {
        value: "Science"
    }, {
        value: "Yale-NUS"
    }]
    return (
        <Dropdown
            data={facultyData}
            label='Faculty'
        />
    )
}

export default UpdateProfilePage;