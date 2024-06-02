import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
const UserButton = () => {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <div className="w-max">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={(key) => {
            switch (key) {
              case "profile":
                return router.push("/profile");
              case "logout":
               return signOut()
              default:
                return null
            }
          }}
        >
          <DropdownItem key="user" className="h-14 gap-2">
            {/* <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p> */}
            <User
              name={user.name}
              description={user.email}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
            />
          </DropdownItem>
          <DropdownItem key="profile">پروفایل</DropdownItem>
          <DropdownItem key="logout" color="danger">
            خروج
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserButton;
