import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Image, StyleSheet } from "react-native";

const Title = ({ navigation }) => {
  const dispatch = useDispatch();
  const id = navigation.getParam("id", "none");
  const { loading, error, title } = useSelector(state => state.title);
  const images = {
    rottentomatoes: require('../../assets/rottentomatoes.png'),
    metacritic: require('../../assets/metacritic.png'),
    internetmoviedatabase: require('../../assets/internetmoviedatabase.png')
  }
  let key = 0;
  useEffect(() => {
    dispatch({
      type: "LOAD_TITLE",
      id
    });
  }, [id]);
  return (
    <View style={{ display: "flex" }}>
      {loading && <Text>Loading</Text>}
      {title !== null && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image style={styles.image} source={{ uri: title.Poster }}></Image>
          <Text style={styles.title}>{title.Title}</Text>
          <Text style={{ padding: 10 }}>{title.Plot}</Text>
          <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
            {title.Ratings.map(rating => {
              key += 1;
              let imageUrl = rating.Source.replace(/\s/g, '').toLowerCase();
              return (
                <View key={key} style={styles.review}>
                  <Image style={styles[imageUrl]} source={images[imageUrl]}></Image>
                  <Text>{rating.Value}</Text>
                </View>
              )
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 350,
    width: 350
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10
  },
  review: {
    fontSize: 20,
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  internetmoviedatabase: {
    width: 30,
    height: 20,
    marginRight: 10
  },
  rottentomatoes: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  metacritic: {
    height: 20,
    width: 20,
    marginRight: 10
  }
});

export default Title;
