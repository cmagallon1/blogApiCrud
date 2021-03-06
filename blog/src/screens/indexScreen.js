import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/blogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
  const [stateBlogs, setState] = useState({ blogs: [] });

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/find', (res) => {
      setState((prevState) => ({ ...prevState, blogs: res }))
    });
  });

  return (
    <View>
      <FlatList
        data={stateBlogs.blogs}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "honeydew",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 12,
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 12,
  },
  buttonStyle: {
    marginBottom: 10,
  },
});

export default IndexScreen;
