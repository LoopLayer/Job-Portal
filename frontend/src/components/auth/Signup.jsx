import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !input.fullName ||
      !input.username ||
      !input.email ||
      !input.password ||
      !input.phoneNumber ||
      !input.role
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("username", input.username);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "https://job-portal-uy0l.onrender.com/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Registered successfully!");
      navigate("/login");
    } catch (error) {
      let message = "Something went wrong";

      const html = error?.response?.data;

      // Extract plain message if HTML error page is received
      if (typeof html === "string" && html.includes("<pre>Error:")) {
        const match = html.match(/<pre>Error:\s*(.*?)<br>/);
        if (match && match[1]) {
          message = match[1].trim();
        }
      } else {
        message = error?.response?.data?.message || message;
      }

      toast.error(message);
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Choose a username"
              value={input.username}
              name="username"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Full Name"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email Address"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter your contact number"
              value={input.phoneNumber}
              name="phoneNumber"
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
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          )}

          <span>
            Already Have An Account?{" "}
            <Link to="/login" className="text-blue-600 text-sm">
              Login Now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
