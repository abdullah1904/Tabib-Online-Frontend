import Profile from "@/components/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Tabib Online",
};


const ProfilePage = () => {
  return (
    <Profile/>
  )
}

export default ProfilePage