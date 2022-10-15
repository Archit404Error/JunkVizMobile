import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { globalStyles } from './globalStyles';
import Post from './post';

export default () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://deployed-backend.com/posts/post')
      .then(res => res.json())
      .then(json => setPosts(json));
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingLeft: 20, paddingRight: 20, }}>
        <Text style={globalStyles.header}>Trash Detect</Text>
        <Post
          location="test"
          img="https://st.depositphotos.com/1005914/2556/i/450/depositphotos_25567715-stock-photo-garbage-and-seagulls.jpg"
          time="10-14-22 11:20 am"
        />
        {
          posts.map(post => <Post location={post.location} img={post.image} time={post.time} />)
        }
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 60,
  },
});
