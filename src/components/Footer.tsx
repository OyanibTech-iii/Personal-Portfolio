import { Footer7 } from "./ui/footer-7";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const logo = {
    url: "#home",
    src: "/logo.png",
    alt: "Pacifico M. Oyanib III Logo",
    title: "Pacifico",
  };

  const sections = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Graphics", href: "#graphics" },
        { name: "Web", href: "#web-apks" },
        { name: "Mobile", href: "#mobile-apps" },
        { name: "Networking", href: "#networking" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Projects",
      links: [
        { name: "Web APKs", href: "#web-apks" },
        { name: "Mobile Apps", href: "#mobile-apps" },
        { name: "Java Apps", href: "#java-desktop" },
        { name: "Python Apps", href: "#python-apps" },
        { name: "Networking", href: "#networking" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "YouTube Tutorials", href: "#youtube-tutorials" },
        { name: "GitHub Analytics", href: "#about" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook className="size-5" />, href: "https://www.facebook.com/thierd.dhee.morshed/", label: "Facebook" },
    { icon: <FaGithub className="size-5" />, href: "https://github.com/oyanibTech-iii", label: "GitHub" },
    { icon: <FaInstagram className="size-5" />, href: "/instagram", label: "Instagram" },
    { icon: <FaLinkedin className="size-5" />, href: "/linkedin", label: "LinkedIn" },
  ];


  return (
    <Footer7
      logo={logo}
      sections={sections}
      description="I'm a junior frontend developer and designer who enjoys making fast, friendly interfaces."
      socialLinks={socialLinks}
      copyright={` © ${new Date().getFullYear()} Pacifico M. Oyanib III. All rights reserved.`}
    />
  );
}
