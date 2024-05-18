import React, { useEffect, useState } from "react";
import { clearEmployerToken } from "../../features/redux/slices/employer/employerTokenSlice";
import { employerLogout } from "../../features/redux/slices/employer/employerDetailsSlice";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/redux/reducers/Reducer";
import { fetchEmployer } from "../../features/redux/slices/employer/employerDetailsSlice";

interface ProfileMenuItem {
  label: string;
  icon: React.ElementType;
}

const profileMenuItems: ProfileMenuItem[] = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const employer = useSelector(
    (state: RootState) => state.employerDetails.employerDetails
  );

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    dispatch(employerLogout());
    dispatch(clearEmployerToken());
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchEmployer());
  }, [dispatch]);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border rounded-full border-blue-500 p-0.5 h-10 "
            src={
              employer?.employerData?.image ??
              "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 text-black transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          const handleMenuItemClick = (label: string) => {
            if (label === "Sign Out") {
              handleLogout();
            } else if (label === "My Profile") {
              navigate("/employer/profile");
            } else if (label === "Inbox") {
              navigate("/employer/messenger");
            } else {
              // Default action or close menu logic
              console.log("Default action or close menu");
            }
          };
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function EmployerHeaderWithNav() {
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6 bg-purple-200">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <ProfileMenu />
      </div>
    </Navbar>
  );
}
