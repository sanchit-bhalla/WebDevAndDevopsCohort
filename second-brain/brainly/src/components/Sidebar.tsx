import { useState } from "react";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

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

  return (
    <aside className="p-2 md:p-4">
      {sidebarItems.map((itemObj) => (
        <SidebarItem
          key={itemObj.id}
          {...itemObj}
          isActive={itemObj.id === activeItem}
          onClick={setActiveItem}
        />
      ))}
    </aside>
  );
}

export default Sidebar;
