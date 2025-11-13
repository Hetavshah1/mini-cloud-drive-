import { useRouter } from "next/router";
import { AiFillCaretDown } from "react-icons/ai";
import { BsArrowLeftCircle } from "react-icons/bs";

function FileHeader({ headerName }: { headerName: string }) {
  const router = useRouter();
  const isNestedFolder = router.route === "/drive/[...Folder]";

  return (
    <div className="flex flex-col space-y-6 p-5 pb-2">
      <div className="flex items-center space-x-3 text-3xl font-semibold text-brand-dark">
        {isNestedFolder && (
          <BsArrowLeftCircle
            className="h-7 w-7 cursor-pointer text-brand-dark hover:text-brand"
            onClick={() => router.back()}
          />
        )}
        <h2>{headerName}</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {["Type", "People", "Modified"].map((label) => (
          <button
            key={label}
            className="flex items-center space-x-2 rounded-lg border border-brand-dark px-4 py-1.5 
            text-sm font-medium text-brand-dark hover:bg-brand-light/20 transition"
          >
            <span>{label}</span>
            <AiFillCaretDown className="h-3 w-3" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default FileHeader;
