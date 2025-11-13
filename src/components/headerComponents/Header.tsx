"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import Link from "next/link";
import Search from "./Search";
import { FaUserCircle } from "react-icons/fa";
import { MdCloudQueue } from "react-icons/md";

function Header() {
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const { data: session } = useSession();

  if (session === null) {
    signIn();
  }

  return (
    <header className="relative flex h-16 w-full items-center justify-between px-6 bg-white shadow-sm">
      {/* Branding */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light">
            <MdCloudQueue className="h-6 w-6 text-brand-dark" />
          </div>
          <h1 className="hidden tablet:block text-2xl font-semibold text-brand-dark tracking-tight">
            MiniCloudDrive
          </h1>
        </Link>
      </div>

      {/* Search Bar */}
      <Search />

      {/* User Avatar */}
      <div
        onClick={() => {
          session ? setDisplayUserInfo((prev) => !prev) : signIn();
        }}
        className="ml-3 h-10 w-10 cursor-pointer overflow-hidden rounded-full border border-brand-light"
      >
        {session ? (
          <Image
            src={session.user?.image as string}
            className="h-full w-full rounded-full object-cover"
            height={500}
            width={500}
            draggable={false}
            alt="avatar"
          />
        ) : (
          <FaUserCircle className="h-full w-full text-brand-dark" />
        )}
      </div>

      {/* Dropdown */}
      <div className="absolute right-6 top-16 z-50">
        {session && displayUserInfo && (
          <UserInfo setDisplayUserInfo={setDisplayUserInfo} />
        )}
      </div>
    </header>
  );
}

export default Header;
