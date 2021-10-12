import LoginIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/FirstPage';

import UserProfile from "views/UserProfile/UserProfile";
import Login from "views/Login/Login";
import Signup from "views/Signup/Signup";
import Logout from "views/Logout/Logout";



const userRoutes = [
    {
      path: "/login",
      name: "Login",
      rtlName: "ملف تعريفي للمستخدم",
      icon: LoginIcon,
      component: Login,
      layout: "/admin"
    },
    {
      path: "/signup",
      name: "Signup",
      rtlName: "ملف تعريفي للمستخدم",
      icon: PersonAddIcon,
      component: Signup,
      layout: "/admin"
    },
    {
      path: "/user",
      name: "User Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "/admin"
    },
    {
      path: "/logout",
      name: "Logout",
      rtlName: "ملف تعريفي للمستخدم",
      icon: LogoutIcon,
      component: Logout,
      layout: "/admin"
    }
  ];
  
  export default userRoutes;
  