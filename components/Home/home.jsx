import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import propTypes from 'prop-types'


const Item = (navigation, movie) => {
  return (
    <View style={styles.links}>
      <TouchableOpacity onPress={() => navigation.navigate('Review', {
        id: movie.imdbID
      })}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: movie.Poster }}
        />
      </TouchableOpacity>
      <Text style={{ paddingLeft: 10 }}>{movie.Title}</Text>
    </View>
  );
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { movies, loading, error, page } = useSelector(state => state.movie)
  const [title, setTitle] = useState("");

  const search = () => {
    dispatch({
      type: "LOAD_MOVIES",
      operation: "SEARCH",
      title,
      page: 1
    })
  };

  const loadMore = () => {
    dispatch({
      type: "LOAD_MOVIES",
      operation: "LOAD",
      title,
      page
    })
  };

  return (
    <View style={{ padding: 10}}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Movie title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Button title="submit" onPress={() => search()} />
      </View>
      
      <FlatList
        contentContainerStyle={{}}
        data={movies}
        renderItem={({ item }) => Item(navigation, item)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        onEndReachedThreshold={1}
        onEndReached={() => loadMore()}
      />
      {loading && (
        <Text>Loading...</Text>
      )}
      {error && (
        <Text>Error in retrieving titles</Text>
      )}
    </View>
  );
};

Home.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func.isRequired
  }).isRequired
}

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center"
  },
  input: {
    borderWidth: 3,
    height: 40,
    borderColor: "blue",
    paddingTop: 5,
    width: "70%",
    textAlignVertical: "top",
    borderRadius: 10,
    marginVertical: 40,
    fontSize: 18,
    paddingLeft: 10
  },
  links: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 15
  }
});
