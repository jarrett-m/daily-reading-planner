import * as React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Alert, SafeAreaView, StyleSheet, TextInput, View, Text } from 'react-native';
import { IconButton } from "@react-native-material/core";
import GetDates from "./Getdates";

export default function SearchBar() {
  const [value, setValue] = React.useState("");
  const searchIcon = <Icon name="arrow-right" size={30} />;
  const [bookPages, setBookPages] = React.useState(null);
  const [dataBool, setDataBool] = React.useState(false);
  const [author, setAuthor] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [buttonClicked, setButtonClicked] = React.useState(false);

  const handleChange = (text) => {
    setValue(text);
  }

  const getBookPages = async () => {
    const api = "https://openlibrary.org/isbn/" + value + ".json";
    const response = await fetch(api).catch((error) => {
      alert("Sorry, we couldn't find that ISBN. Please try again.");
      return;
    });
    const data = await response.json().catch((error) => {
      alert("Sorry, we couldn't find that ISBN. Please try again.");
      return;
    });
    if (data.number_of_pages == null) {
      alert("No pages found for this ISBN.");
      return;
    }
    setBookPages(data.number_of_pages);
    const author_api = "https://openlibrary.org" + data.authors[0].key + ".json";
    const author_response = await fetch(author_api);
    const author_data = await author_response.json().catch((error) => {
      console.log(error);
    });
    await setAuthor(author_data.name);
    await setTitle(data.title);
    setDataBool(true);
    setButtonClicked(true);
  }

  if (buttonClicked == false) {
  return (

    <SafeAreaView>
      <View style={styles.container_header}>
              <Text style={styles.header}>What book are you reading?</Text>
      </View>
      <View style={styles.container}>
        <TextInput style={styles.text_input} placeholder="Enter ISBN here..." onChangeText={handleChange} />
        <IconButton icon={searchIcon} style={styles.search} onPress={getBookPages} />
      </View>
    </SafeAreaView>
  );
  } else if (buttonClicked == true && dataBool == true) {
    return (
      <GetDates pages={bookPages} author={author} title={title} />

    );
  }
  else{
    //loading 
    return (
          <Text>
            Loading...
          </Text>
    );
  }
  
}

const styles = StyleSheet.create({
  //circle border
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 20,

  },  
  text_input: {
    flex: 1,
    height: 50,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 20,
    color: 'black',
    borderWidth: 0,
    borderColor: 'white',
    outlineStyle: 'none',
  },
  search: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  container_header: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});