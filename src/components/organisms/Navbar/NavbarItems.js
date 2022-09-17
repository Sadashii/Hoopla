import { Home, People } from "@mui/icons-material";

const NavbarItems = [
  {
    title: "home",
    to: "/",
    icon: Home,
    mobileOnly: true,
  },
  {
    title: "Team",
    to: "/team/",
    icon: People,
  },
];

export default NavbarItems;
