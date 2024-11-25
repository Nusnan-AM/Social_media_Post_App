import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Nav from "./Nav";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Understanding Machine Learning",
      dateTime: "2024-11-25 10:00:00",
      body: "Machine learning is revolutionizing industries by enabling systems to learn and make decisions without explicit programming.",
    },
    {
      id: 2,
      title: "Optimizing Alum Dosage in Water Treatment",
      dateTime: "2024-11-25 10:00:00",
      body: "Machine learning is revolutionizing industries by enabling systems to learn and make decisions without explicit programming.",
    },
    {
      id: 3,
      title: "Machine Learning",
      dateTime: "2024-11-25 10:00:00",
      body: "Machine learning is revolutionizing industries by enabling systems to learn and make decisions without explicit programming.",
    },
    {
      id: 4,
      title: "Top Trends in Full-Stack Development",
      dateTime: "2024-11-25 10:00:00",
      body: "Machine learning is revolutionizing industries by enabling systems to learn and make decisions without explicit programming.",
    },
  ]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const Navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, dateTime: datetime, body: postBody };
    const allPosts = [...posts, newPost]; // Correct way to append a new post
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    Navigate('/')
  };

  const handleDelete = (id) => {
    const PostsList = posts.filter((post) => post.id !== id); // Filter out the post by ID
    setPosts(PostsList);
    Navigate('/')
  };


  return (
    <div className="App">
      <Header title="Say Hello Media" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
