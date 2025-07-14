import { NavLink } from "react-router-dom";

function DashboardAside() {
  const navigations = [
    {
      label: "All Posts",
      href: "all-posts",
    },
    {
      label: "Add Post",
      href: "add-post",
    },
    {
      label: "Update Post",
      href: "update-post",
    },
  ];
  return (
    <div className="flex flex-col fixed left-0 gap-4 bg-gray-500 text-white p-6 min-h-screen rounded-xl">
      <a className="text-2xl font-bold" href="/dashboard">
        Admin Panel
      </a>

      <div className="flex flex-col gap-4">
        {navigations.map((nav, index) => {
          return (
            <div key={index}>
              <NavLink
                key={nav.label + index}
                to={`/dashboard?tab=${nav.href}`}
                className="flex items-center p-2 hover:bg-[#3498db] duration-150 ease-in rounded-xl"
              >
                {nav.label}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardAside;
