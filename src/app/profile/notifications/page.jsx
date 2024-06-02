import UserProfileCard from "@/components/card/userProfileCard";
import NotificationsForm from "./notificationsForm";
const UserProfileNotifications = () => {
  return (
    <UserProfileCard  title="لیست پیغام ها">
      
        <NotificationsForm />
      
    </UserProfileCard>
  );
};

export default UserProfileNotifications;
