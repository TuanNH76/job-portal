import React, { useState } from "react";
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
  InboxArrowDownIcon,
  // LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import { employerLogout } from "../../features/redux/slices/employer/employerDetailsSlice";
import { clearEmployerToken } from "../../features/redux/slices/employer/employerTokenSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            className="border border-blue-500 p-0.5 w-10"
            src={
              employer?.employerData?.image ??
              "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
            }
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

function EmployerHeader() {
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6 bg-purple-100 shadow-md">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <nav className="flex items-center justify-between bg-foundItBg text-black p-4">
          <div className="flex items-center">
            <Link to={"/employer"}>
              <h1 className="block font-bold text-3xl text-purple-600 hover:underline-offset-4 hover:underline">
                JOB PORTAL
              </h1>
            </Link>
          </div>
        </nav>
        <ProfileMenu />
      </div>
    </Navbar>
  );
}

export default EmployerHeader;
