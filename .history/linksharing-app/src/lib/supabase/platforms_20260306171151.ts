import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
} from "react-icons/fa"

export const platforms: Record<
  string,
  {
    icon: any
    color: string
  }
> = {
  GitHub: {
    icon: FaGithub,
    color: "bg-black",
  },
  Twitter: {
    icon: FaTwitter,
    color: "bg-sky-500",
  },
  LinkedIn: {
    icon: FaLinkedin,
    color: "bg-blue-600",
  },
  YouTube: {
    icon: FaYoutube,
    color: "bg-red-600",
  },
  Facebook: {
    icon: FaFacebook,
    color: "bg-blue-500",
  },
  Twitch: {
    icon: FaTwitch,
    color: "bg-purple-600",
  },
}