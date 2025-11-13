import Head from "next/head";
import GetFiles from "@/components/GetFiles";
import GetFolders from "@/components/GetFolders";
import FileHeader from "@/components/FileHeader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchFiles } from "@/hooks/fetchFiles";
import { DotLoader } from "react-spinners";

export default function Home() {
  const [isFolder, setIsFolder] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  // Fetch the list of files and folders
  const list = fetchFiles("", session?.user.email!);

  useEffect(() => {
    // Determine if there are folders and files in the list
    const hasFolders = list.some((item) => item.isFolder && !item.isTrashed);
    const hasFiles = list.some((item) => !item.isFolder && !item.isTrashed);

    // Update the state based on the results
    setIsFolder(hasFolders);
    setIsFile(hasFiles);

    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  }, [list]);

  return (
    <>
      <Head>
        <title>MiniCloudDrive</title>
        <meta name="description" content="Store your files safely with MiniDrive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <FileHeader headerName={"My Drive"} />
        <div className="h-[75vh] w-full overflow-y-auto p-5">
          {/* If the list is loading, display the loading state */}
          {!isFile && !isFolder && isLoading ? (
            <div className="flex h-full items-center justify-center">
              <DotLoader color="#b8c2d7" size={60} />
            </div>
          ) : (
            <>
              {/* If there are files or folders, display them */}
              {isFile || isFolder ? (
                <>
                  {isFolder && (
                    // If there are folders, display them
                    <div className="mb-5 flex flex-col space-y-4">
                      <h2>Folders</h2>
                      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
                        <GetFolders folderId="" select="" />
                      </div>
                    </div>
                  )}
                  {isFile && (
                    // If there are files, display them
                    <div className="mb-5 flex flex-col space-y-4">
                      <h2>Files</h2>
                      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
                        <GetFiles folderId="" select="" />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // If there are no files or folders, display the empty state
              <div className="flex h-full flex-col items-center justify-center animate-fadeInSlow">

                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-brand-light/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-brand-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7a2 2 0 012-2h3l1.5 2H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                    />
                  </svg>
                </div>

                <p className="mt-6 text-lg text-brand-dark/80 font-medium">
                  Your MiniDrive is empty
                </p>
                <p className="text-sm text-textC mt-1">
                  Upload files or create folders to get started
                </p>
              </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
