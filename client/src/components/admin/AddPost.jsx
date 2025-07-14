import TextField from "@mui/material/TextField";
import apiClient from "../../api/apiClient";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    if (!payload.image || payload.image.trim() === "") {
      delete payload.image;
    }

    try {
      const res = await apiClient.post("/api/create-post", payload);
      console.log("Post olusturuldu", res.data);
      toast.info(`Post Olusturuldu!!!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setFormData({
        title: "",
        content: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("Post olusturulurken hata", error);
    }
  };

  return (
    <div className="m-auto text-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <TextField
            label="Başlık"
            size="small"
            variant="outlined"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{
              width: "400px",
            }}
          />
        </div>
        <div className="mb-5">
          <TextField
            label="İçerik"
            size="small"
            variant="outlined"
            name="content"
            value={formData.content}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        </div>
        <div className="mb-5">
          <TextField
            label="Kapak Fotoğrafı"
            size="small"
            variant="outlined"
            name="image"
            value={formData.image}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        </div>
        <div className="mb-5">
          <TextField
            label="Kategori"
            size="small"
            variant="outlined"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="hover:bg-[#7691ca] rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
