import React, { useState } from "react";
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
import fetchMovies from "../../backend/fetchdata";

const Item = movie => {
  return (
    <View style={styles.links}>
      <TouchableOpacity onPress={() => console.log("hello there")}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: movie.Poster }}
        />
      </TouchableOpacity>
      <Text style={{ paddingLeft: 10 }}>{movie.Title}</Text>
    </View>
  );
};

const Home = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const search = async () => {
    const data = await fetchMovies(title, 1);
    setMovies([data.Search]);
    setPage(2);
  };

  const loadMore = async () => {
    const data = await fetchMovies(title, page);
    setMovies([...movies, ...data.Search]);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View>
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
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        onEndReachedThreshold={1}
        onEndReached={() => loadMore()}
      />
    </View>
  );
};

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
