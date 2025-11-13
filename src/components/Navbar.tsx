import Link from "next/link";
import { useRouter } from "next/router";
import { FiFolder, FiStar, FiTrash2 } from "react-icons/fi";

function Navbar() {
  const router = useRouter();
  const isActive = (href: string) => router.pathname === href;

  const linkClasses = (active: boolean) =>
    `tablet:space-x-3 tablet:px-4 tablet:py-2 
    flex items-center justify-center tablet:justify-start rounded-xl 
    transition
    ${active ? "bg-brand-light/40 text-brand-dark" : "hover:bg-darkC2 text-textC"}`;

  return (
    <nav className="space-y-2 pr-5">

      {/* Home / My Drive */}
      <Link href="/drive/my-drive" className={linkClasses(isActive("/drive/my-drive"))}>
        <FiFolder className="h-5 w-5" />
        <span className="tablet:block hidden">My Drive</span>
      </Link>

      {/* Starred */}
      <Link href="/drive/starred" className={linkClasses(isActive("/drive/starred"))}>
        <FiStar className="h-5 w-5" />
        <span className="tablet:block hidden">Starred</span>
      </Link>

      {/* Trash */}
      <Link href="/drive/trash" className={linkClasses(isActive("/drive/trash"))}>
        <FiTrash2 className="h-5 w-5" />
        <span className="tablet:block hidden">Bin</span>
      </Link>
    </nav>
  );
}

export default Navbar;
