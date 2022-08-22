import { Book, Commute, Home, InfoOutlined, Newspaper } from "@mui/icons-material";

const NavbarItems = [
  {
    title: "home",
    to: "/",
    icon: Home,
    mobileOnly: true,
  },
  {
    title: "subjects",
    to: "/subjects/",
    icon: Book,
  },
  {
    title: "Partners & Community",
    to: "/partners/",
    icon: Commute,
  },
  {
    title: "About Us",
    to: "",
    icon: InfoOutlined,
    children: [
      {
        title: "Team",
        to: "/team/",
      },
      {
        title: "Impact",
        to: "/impact/",
      },
      {
        title: "Testimonials",
        to: "/testimonials/",
      },
      {
        title: "FAQs",
        to: "/faq/",
      },
    ],
  },
  {
    title: "Support us",
    to: "",
    icon: InfoOutlined,
    children: [
      {
        title: "Become a Contributor",
        to: "https://znotesteam.notion.site/Contributors-Board-95575c32448e422ea0136963af967cf2",
        external: true,
      },
      {
        title: "Become an Intern",
        to: "https://znotesteam.notion.site/Internships-Board-e66578d95cba490f9e5140771ebf9493",
        external: true,
      },
      {
        title: "Become a Supporter",
        to: "/supporter/",
      },
      {
        title: "Donate to us",
        to: "/donate/",
      },
    ],
  },
  {
    title: "blog",
    to: "https://blog.znotes.org/",
    external: true,
    icon: Newspaper,
  },
];

export default NavbarItems;
