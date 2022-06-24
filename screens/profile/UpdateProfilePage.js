import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../../supabase';

const UpdateProfilePage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [faculty, setFaculty] = useState(null);
    const [age, setAge] = useState('');
    const [dietary, setDietary] = useState('');
    const [interests, setInterests] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    //can only open 1 picker a time
    const [facultyOpen, setFacultyOpen] = useState(false);
    const [interestsOpen, setInterestsOpen] = useState(false);
    const [cuisinesOpen, setCuisinesOpen] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const user = supabase.auth.user()
            if (!inputChecker()) return;

            const updates = {
                id: user.id,
                username: username,
                faculty: faculty,
                age: age,
                dietary: dietary,
                interests: interests,
                cuisines: cuisines,
            }

            let { error } = await supabase
                .from('profiles')
                .upsert(updates, {
                    returning: 'minimal', // Don't return the value after inserting
                })

            if (error) {
                throw error
            }
            navigation.pop()

        } catch (error) {
            alert(error.message)
        }
    };

    const goBack = () => {
        navigation.pop()
    }

    const inputChecker = () => {
        if (username == '') {
            alert("You have yet to input your name!")
            return false;
        } else if (age == '') {
            alert("You have yet to input your age!")
            return false;
        } else if (faculty == null) {
            alert("You have yet to select a faculty!")
            return false;
        }
        return true;
    }

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

    const interestsData = [{
        label: "Anime",
        value: "Anime"
    }, {
        label: "Acting",
        value: "Acting"
    }, {
        label: "Art",
        value: "Art"
    }, {
        label: "Astrology",
        value: "Astrology"
    }, {
        label: "Baking",
        value: "Baking"
    }, {
        label: "BasketBall",
        value: "BasketBall",
    }, {
        label: "Badminton",
        value: "Badminton"
    }, {
        label: "Card games",
        value: "Card games"
    }, {
        label: "Cooking",
        value: "Cooking"
    }, {
        label: "Cosplaying",
        value: "Cosplaying"
    }, {
        label: "Crocheting",
        value: "Crocheting"
    }, {
        label: "Dance",
        value: "Dance"
    }, {
        label: "Diving",
        value: "Diving"
    }, {
        label: "Djing",
        value: "Djing"
    }, {
        label: "Drama",
        value: "Drama"
    }, {
        label: "Drawing",
        value: "Drawing"
    }, {
        label: "Fashion",
        value: "Fashion"
    }, {
        label: "Fishing",
        value: "Fishing"
    }, {
        label: "Gaming",
        value: "Gaming"
    }, {
        label: "Gardening",
        value: "Gardening"
    }, {
        label: "Karaoke",
        value: "Karaoke"
    }, {
        label: "Livestreaming",
        value: "Livestreaming"
    }, {
        label: "Magic",
        value: "Magic"
    }, {
        label: "Manga",
        value: "Manga"
    }, {
        label: "Music",
        value: "Music"
    }, {
        label: "Movie",
        value: "Movie"
    }, {
        label: "Painting",
        value: "Painting"
    }, {
        label: "Reading",
        value: "Reading"
    }, {
        label: "Singing",
        value: "Singing"
    }, {
        label: "Webtoons",
        value: "Webtoons"
    },
    ]

    const cuisinesData = [{
        label: "Chinese",
        value: "Chinese"
    }, {
        label: "Italian",
        value: "Italian"
    }, {
        label: "Japanese",
        value: "Japanese"
    }, {
        label: "Korean",
        value: "Korean"
    }, {
        label: "Western",
        value: "Western"
    },
        //  {
        //     label:"",
        //     value:""
        // },
    ]

    const onFacultyOpen = useCallback(() => {
        setCuisinesOpen(false);
        setInterestsOpen(false);
    }, [])

    const onInterestsOpen = useCallback(() => {
        setCuisinesOpen(false);
        setFacultyOpen(false);
    }, [])

    const onCuisinesOpen = useCallback(() => {
        setFacultyOpen(false);
        setInterestsOpen(false);
    }, [])


    return (
        <View>
            <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
                <Text style={{ flex: 1 / 4 }}> Name </Text>
                <TextInput
                    placeholder={"Insert your name here"}
                    value={username}
                    onChangeText={setUsername}
                    style={{ flex: 1 }}
                />
            </View>
            <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
                <Text style={{ flex: 1 / 4 }}> Age </Text>
                <TextInput
                    placeholder={"Insert your age here"}
                    value={age}
                    onChangeText={setAge}
                    style={{ flex: 1 }}
                    keyboardType='numeric'
                />
            </View>
            <View>
                <Text> Faculty</Text>
                <DropDownPicker
                    open={facultyOpen}
                    setOpen={setFacultyOpen}
                    onOpen={onFacultyOpen}
                    value={faculty}
                    items={facultyData}
                    setValue={setFaculty}
                    style={styles.bottomSeparator}
                />
            </View>

            <View style={{ ...styles.verticalComponent, ...styles.bottomSeparator }}>
                <Text style={{ flex: 1 / 4 }}> Dietary {'\n'} restrictions </Text>
                <TextInput
                    placeholder={"Any allergies / intolerance"}
                    value={dietary}
                    onChangeText={setDietary}
                    style={{ flex: 1 }}
                />
            </View>

            <View>
                <Text> Interests</Text>
                <DropDownPicker
                    open={interestsOpen}
                    setOpen={setInterestsOpen}
                    onOpen={onInterestsOpen}
                    value={interests}
                    items={interestsData}
                    setValue={setInterests}
                    style={styles.bottomSeparator}
                    multiple={true}
                />
            </View>

            <View>
                <Text> Cuisines Preference</Text>
                <DropDownPicker
                    open={cuisinesOpen}
                    setOpen={setCuisinesOpen}
                    onOpen={onCuisinesOpen}
                    value={cuisines}
                    items={cuisinesData}
                    setValue={setCuisines}
                    style={styles.bottomSeparator}
                    multiple={true}
                />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={updateProfile}>
                <Text> Update Profile </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <Text> Return without updating </Text>
            </TouchableOpacity>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {

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
    updateButton: {
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
    returnButton: {
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        marginTop: '10%',
    }
})


export default UpdateProfilePage;