//Ask user when they are going to start, and when they are going to finish

//Get the start date

import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, SafeAreaView } from 'react-native';
import { IconButton } from "@react-native-material/core";
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function GetDates(props) {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [buttonClicked, setButtonClicked] = React.useState(false);
    const [datesSet, setDatesSet] = React.useState(false);
    const [daysToRead, setDaysToRead] = React.useState(null);
    const [pagesToReadADay, setPagesToReadADay] = React.useState(null);
    const [word, setWord] = React.useState("days");
    const [width, setWidth] = React.useState(null);

    const arrowButton = <Icon name="arrow-right" size={30} />;
    
    
    useEffect(() => {
        if (window.innerWidth < window.innerHeight) {
            setWidth(window.innerWidth * 0.8);
        }
        else {
            setWidth(480);

        }
    }, []);


    const getDates = () => {
        if (startDate == null || endDate == null) {
            alert("Please select a start and end date.");
            setButtonClicked(false);

        }
        else {
            setButtonClicked(true);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysToRead(diffDays);
            const pagesToRead = (props.pages / diffDays);
            setPagesToReadADay(Math.round((pagesToRead + Number.EPSILON) * 100) / 100);
            if (diffDays == 1) {
                setWord("day");
            }
        }
    };

    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'END_DATE') {
            setEndDate(date);
        }
        if (type === 'START_DATE') {
            setStartDate(date);
        }
        if (startDate != null && endDate != null) {
            setDatesSet(true);
        }
    };

    if (buttonClicked == false && datesSet == false) {
        return (
        <SafeAreaView>
            <View style={styles.container_header}>
            <Text style={styles.header}>When do you want to start and finish?</Text>
            </View>
            <View style={styles.cal_container}>
            <CalendarPicker
                allowRangeSelection={true}
                minDate={new Date()}
                selectedDayColor="#F4C2C2"
                onDateChange={onDateChange}
                width={width}
            />
            <IconButton icon={arrowButton} style={styles.search} onPress={getDates} />
            </View>
        </SafeAreaView>
        );
    } 
    else if (pagesToReadADay != null) {
        return (
        <SafeAreaView>
            <View style={styles.container_header}>
                <Text style={styles.result}>To read <span style={{textDecorationLine: 'underline'}}>{props.title}</span> by
                <span style={{fontStyle: 'italic'}}> {props.author}</span> in 
                <span style={{fontWeight: 'bold'}}> {daysToRead}</span> {word}, you need to read 
                <span style={{fontWeight: 'bold'}}> {pagesToReadADay} </span>
                pages a day.</Text>
            </View>
        </SafeAreaView>
        ); 
    }
    else{
        return (
            <SafeAreaView>
                <View style={styles.container_header}>
                <Text style={styles.header}>When do you want to start and finish?</Text>
                </View>
                <View style={styles.cal_container}>
                <CalendarPicker
                    allowRangeSelection={true}
                    minDate={new Date()}
                    selectedDayColor="#F4C2C2"
                    width={500}
                    onDateChange={onDateChange}
                />
                <IconButton icon={arrowButton} style={styles.search} onPress={getDates} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    cal_container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,

      },
    container_header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
    },
    result: {
        fontSize: 20,
        marginBottom: 20,
    },

});
