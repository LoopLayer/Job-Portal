import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    identifier: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.password || !input.identifier || !input.role) {
      toast.error("Please fill all required fields");
      return;
    }

    function decodeHTMLEntities(text) {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      
      {
        dispatch(setUser(res.data.data.user));
localStorage.setItem('user', JSON.stringify(res.data.data.user));  // <-- Add this
navigate("/");
toast.success(res.data.message);

      }
    } catch (error) {
      let message = "Something went wrong";

      const html = error?.response?.data;

      // Extract plain message if HTML error page is received
      if (typeof html === "string" && html.includes("<pre>Error:")) {
        const match = html.match(/<pre>Error:\s*(.*?)<br>/);
        if (match && match[1]) {
          message = match[1].trim();
          const finalMessage = decodeHTMLEntities(message);
          toast.error(finalMessage);
        }
      } else {
        finalMessage = error?.response?.data?.finalMessage || finalMessage;
      }

      toast.error(finalMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Username or Email</Label>
            <Input
              type="text"
              placeholder="Enter Username or Email"
              value={input.identifier}
              name="identifier"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Job Seeker"
                  checked={input.role === "Job Seeker"}
                  onChange={changeEventHandler}
                  id="jobSeeker"
                  className="cursor-pointer"
                />
                <Label htmlFor="jobSeeker">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  id="Recruiter"
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="Recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span>
            Don't Have An Account?{" "}
            <Link to="/signup" className="text-blue-600 text-sm">
              Sign Up Now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
