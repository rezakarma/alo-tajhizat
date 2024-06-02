import UserProfileCard from "@/components/card/userProfileCard";
import UserProfileOrderSection from "./userProfileOrdersSection";

const UserProfileOrder = () => {
    return ( 
        <UserProfileCard title="لیست سفارش ها">
            <UserProfileOrderSection/>
        </UserProfileCard>
     );
}
 
export default UserProfileOrder;