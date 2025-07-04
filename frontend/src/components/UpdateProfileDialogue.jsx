import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    bio: user?.profile?.bio ?? "",
    skills: user?.profile?.skills?.join(", ") ?? "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("bio", input.bio);
  formData.append("skills", input.skills);
  if (input.file) {
    formData.append("file", input.file);
  }

  function decodeHTMLEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  try {
    setLocalLoading(true);
    dispatch(setLoading(true));

    const token = user?.token;

    const headers = {
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await axios.patch(
      `http://localhost:8000/api/v1/users/update-account`,
      formData,
      {
        headers,
        withCredentials: true,
      }
    );

    dispatch(setUser(res.data.data.user));
    toast.success(res.data.message);
    setOpen(false);
  } catch (error) {
    let finalMessage = "Something went wrong";
    const html = error?.response?.data;

    if (typeof html === "string" && html.includes("<pre>Error:")) {
      const match = html.match(/<pre>Error:\s*(.*?)<br>/);
      if (match && match[1]) {
        finalMessage = decodeHTMLEntities(match[1].trim());
      }
    } else {
      finalMessage = error?.response?.data?.finalMessage || finalMessage;
    }

    toast.error(finalMessage);
  } finally {
    setLocalLoading(false);
    dispatch(setLoading(false));
  }
};


  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                onChange={changeEventHandler}
                value={input.fullName}
                id="fullName"
                name="fullName"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                onChange={changeEventHandler}
                value={input.email}
                id="email"
                name="email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                type="text"
                onChange={changeEventHandler}
                value={input.phoneNumber}
                id="phoneNumber"
                name="phoneNumber"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.bio}
                id="bio"
                name="bio"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.skills}
                id="skills"
                name="skills"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                onChange={fileChangeHandler}
                type="file"
                accept="application/pdf"
                id="file"
                name="file"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {localLoading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialogue;
