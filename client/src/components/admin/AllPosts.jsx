import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/get-all-posts");
        setPosts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Postlar Alinirken Hata", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-5xl">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-2xl">{error}</div>;
  return (
    <div
      className={
        posts.length > 0
          ? "grid grid-cols-[repeat(4,1fr))] gap-5 p-10"
          : "flex justify-center"
      }
    >
      {posts.map((post) => {
        return (
          <PostCard
            key={post._id}
            title={post.title}
            category={post.category}
            image={post.image}
            createdAt={post.createdAt}
          />
        );
      })}
    </div>
  );
}

export default AllPosts;
