import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { globalStyles } from './globalStyles';
import Post from './post';

export default ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [rerenderImages, setRerenderImages] = useState(0);

  const fetchPosts = () => {
    fetch('https://trash-detect-backend-pratyush1712.vercel.app/all-points')
      .then(res => res.json())
      .then(json => setPosts(json));
  }

  useEffect(() => {
    fetchPosts();
    const cleanup = setInterval(fetchPosts, 1000);
    const rerender = setInterval(() => setRerenderImages(Date.now()), 5000);
    return () => {
      clearInterval(cleanup)
      clearInterval(rerender)
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingLeft: 20, paddingRight: 20, }}>
        <Text style={globalStyles.header}>Detected Litter</Text>
        {
          posts.filter(post => post.status === "litter").map(post => {
            return (
              <Post
                key={rerenderImages + post._id.$oid}
                id={post._id.$oid}
                location={post.location}
                img={post.image}
                time={post.time.$date}
                navigation={navigation}
                status={post.status}
                rerender={rerenderImages}
              />
            );
          }
          )
        }
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
});
