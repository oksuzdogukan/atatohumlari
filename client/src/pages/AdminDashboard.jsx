import React, { useEffect, useState } from "react";
import DashboardAside from "../components/admin/DashboardAside";
import { useLocation } from "react-router-dom";
import AllPosts from "../components/admin/AllPosts";
import AddPost from "../components/admin/AddPost";
import UpdatePost from "../components/admin/UpdatePost";

function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const renderContent = () => {
    switch (tab) {
      case "all-posts":
        return <AllPosts />;
      case "add-post":
        return <AddPost />;
      case "update-post":
        return <UpdatePost />;
      case "":
        return <div>AdminDashboard</div>;
      default:
        return <div>Böyle bir sayfa yok</div>;
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashboardAside />
      </div>
      {renderContent()}
    </div>
  );
}

export default AdminDashboard;
