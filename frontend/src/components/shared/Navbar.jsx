import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const {user}=useSelector(store=>store.auth)
  const dispatch=useDispatch();
  const navigate = useNavigate();
const decodeHTMLEntities = (str) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const logOutHandler = async () => {
  try {
    const res = await axios.post(`http://localhost:8000/api/v1/users/logout`, {}, {
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(setUser(null));
      navigate("/"); 
      toast.success(res.data.message);
    }
  } catch (error) {
  console.error("Logout error:", error);

  let message = "Something went wrong";

  const html = error?.response?.data;

  // Log the raw HTML or object
  console.log("Raw error data:", html);

  // Case 1: HTML error page
  if (typeof html === "string" && html.includes("<pre>Error:")) {
    const match = html.match(/<pre>Error:\s*(.*?)<br>/);
    if (match && match[1]) {
      message = decodeHTMLEntities(match[1].trim());
    }
  }
  // Case 2: JSON error with message/finalMessage
  else if (typeof html === "object") {
    if (html.finalMessage) {
      message = html.finalMessage;
    } else if (html.message) {
      message = html.message;
    }
  }

  toast.error(message);
}
};



  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A8A]">
            Launch<span className="text-[#16A34A]">Hire</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>

          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" className="rounded-full">Log in</Button></Link>
              <Link to="/signup"><Button className="bg-[#6a38c2] hover:bg-[#6230b8] rounded-full">Sign up</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profilePhoto"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profilePhoto"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600 my-2">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logOutHandler} variant="link">Log Out</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
