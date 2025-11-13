"use client";
import React, { useState, ChangeEvent } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import DropDown from "./addBtnComponents/DropDown";
import AddFolder from "./addBtnComponents/AddFolder";
import Navbar from "./Navbar";
import fileUpload from "@/API/FileUpload";
import ProgressIndicator from "./ProgressIndicator";
import { addFolder } from "@/API/Firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function SideMenu() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [progress, setProgress] = useState([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [folderToggle, setFolderToggle] = useState(false);

  const router = useRouter();
  const { Folder } = router.query;

  const { data: session } = useSession();
  const userEmail = session?.user.email;

  // Upload File
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    for (let i = 0; i < files.length; i++) {
      const file = files?.[i];
      if (!file) return;
      setFileName((prev) => [...prev, file.name]);
      fileUpload(file, setProgress, Folder?.[1] || "", userEmail!);
    }
  };

  // Add Folder
  const uploadFolder = () => {
    let payload = {
      folderName: folderName === "" ? "Untitled folder" : folderName,
      isFolder: true,
      isStarred: false,
      isTrashed: false,
      FileList: [],
      folderId: Folder?.[1] || "",
      userEmail,
    };

    addFolder(payload);
    setFolderName("");
  };

  return (
    <section className="relative h-[90vh] w-20 tablet:w-64 bg-white rounded-2xl shadow-md p-4 space-y-5">
      
      {/* NEW Button */}
      <button
        onClick={() => setIsDropDown(true)}
        className="flex items-center space-x-3 w-full bg-brand text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-brand-dark transition"
      >
        <HiOutlinePlusSm className="h-5 w-5" />
        <span className="hidden tablet:block">New</span>
      </button>

      {/* Dropdown */}
      {isDropDown && (
        <DropDown
          setFolderToggle={setFolderToggle}
          uploadFile={uploadFile}
          setIsDropDown={setIsDropDown}
        />
      )}

      {/* Upload Progress */}
      <ProgressIndicator
        progress={progress}
        fileName={fileName}
        setFileName={setFileName}
      />

      {/* Folder Modal */}
      {folderToggle && (
        <AddFolder
          setFolderToggle={setFolderToggle}
          setFolderName={setFolderName}
          uploadFolder={uploadFolder}
        />
      )}

      {/* Navigation */}
      <Navbar />
    </section>
  );
}

export default SideMenu;
