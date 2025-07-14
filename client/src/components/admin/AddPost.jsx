import TextField from "@mui/material/TextField";

function AddPost() {
  return (
    <div className="m-auto text-center">
      <form>
        <div className="mb-5">
          <TextField
            label="Başlık"
            size="small"
            variant="outlined"
            name="title"
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
            sx={{
              width: "100%",
            }}
          />
        </div>
        <div>
          <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
