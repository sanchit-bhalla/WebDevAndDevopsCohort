import { useEffect, useState } from "react";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    id: 1,
    icon: TwitterIcon,
    title: "Tweets",
  },
  {
    id: 2,
    icon: YoutubeIcon,
    title: "Youtube",
  },
];

function Sidebar() {
  const [activeItem, setActiveItem] = useState<number>(0);
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryParam = searchParams.get("q");
  const navigate = useNavigate();

  const handleSidebarItemClick = (id: number, title: string) => {
    navigate(`${pathname}?q=${title?.toLowerCase()}`);
    setActiveItem(id);
  };

  useEffect(() => {
    if (!queryParam && activeItem !== 0) setActiveItem(0);
    if (queryParam === "tweets" && activeItem !== 1) setActiveItem(1);
    if (queryParam === "youtube" && activeItem !== 2) setActiveItem(2);
  }, [queryParam, activeItem]);

  return (
    <aside className="col-span-full sm:col-span-1 p-2 md:p-4">
      <div className="flex sm:flex-col gap-2 w-full overflow-x-auto">
        {sidebarItems.map((itemObj) => (
          <SidebarItem
            key={itemObj.id}
            {...itemObj}
            isActive={itemObj.id === activeItem}
            onClick={handleSidebarItemClick}
          />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
