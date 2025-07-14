import apiClient from "../api/apiClient";

function PostCard({ title, category, image, createdAt, _id }) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleDeleteBtn = async () => {
    try {
      const res = await apiClient.delete(`/api/delete-post/${_id}`);
      console.log("Post Silindi:", res.data);
      window.location.reload();
    } catch (error) {
      console.log("Post silinirken Hata", error);
    }
  };

  return (
    <div className="bg-white max-w-[300px] shadow rounded-lg overflow-hidden mt-4 flex flex-col justify-between max-h-[450px]">
      <img src={image} className="object-cover h-52 w-full" alt="#" />
      <div className="p-3">
        <div>
          <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
            <a>{title}</a>
          </h3>
        </div>
        <div className="text-sm mt-3">
          <h3>{category}</h3>
          <span className="block text-slate-400 font-semibold text-sm">
            {formattedDate}
          </span>
        </div>
        <div>
          <button
            className="bg-red-400 text-[15px] text-white p-1 rounded-2xl m-3 cursor-pointer hover:bg-red-600"
            onClick={handleDeleteBtn}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
