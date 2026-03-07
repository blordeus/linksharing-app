import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
} from "react-icons/fa";
import type { ComponentType } from "react";

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
};