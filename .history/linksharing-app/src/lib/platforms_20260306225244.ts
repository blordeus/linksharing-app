import type { ComponentType } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
  FaGitlab,
  // FaHashnode,
  FaFreeCodeCamp,
  FaStackOverflow,
  FaCodepen,
} from "react-icons/fa";
import { SiFrontendmentor, SiDevdotto, SiCodewars } from "react-icons/si";

export const platforms: Record<
  string,
  {
    icon: ComponentType<{ size: number }>;
    backgroundColor: string;
    textColor: string;
  }
> = {
  GitHub: {
    icon: FaGithub,
    backgroundColor: "#1A1A1A",
    textColor: "#FFFFFF",
  },
  "Frontend Mentor": {
    icon: SiFrontendmentor,
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
  },
  Twitter: {
    icon: FaTwitter,
    backgroundColor: "#43B7E9",
    textColor: "#FFFFFF",
  },
  LinkedIn: {
    icon: FaLinkedin,
    backgroundColor: "#2D68FF",
    textColor: "#FFFFFF",
  },
  YouTube: {
    icon: FaYoutube,
    backgroundColor: "#EE3939",
    textColor: "#FFFFFF",
  },
  Facebook: {
    icon: FaFacebook,
    backgroundColor: "#2442AC",
    textColor: "#FFFFFF",
  },
  Twitch: {
    icon: FaTwitch,
    backgroundColor: "#EE3FC8",
    textColor: "#FFFFFF",
  },
  "Dev.to": {
    icon: SiDevdotto,
    backgroundColor: "#333333",
    textColor: "#FFFFFF",
  },
  Codewars: {
    icon: SiCodewars,
    backgroundColor: "#8A1A50",
    textColor: "#FFFFFF",
  },
  CodePen: {
    icon: FaCodepen,
    backgroundColor: "#302267",
    textColor: "#FFFFFF",
  },
  freeCodeCamp: {
    icon: FaFreeCodeCamp,
    backgroundColor: "#302267",
    textColor: "#FFFFFF",
  },
  GitLab: {
    icon: FaGitlab,
    backgroundColor: "#EB4925",
    textColor: "#FFFFFF",
  },
  Hashnode: {
    icon: FaHashnode,
    backgroundColor: "#0330D1",
    textColor: "#FFFFFF",
  },
  "Stack Overflow": {
    icon: FaStackOverflow,
    backgroundColor: "#EC7100",
    textColor: "#FFFFFF",
  },
};