import Link from "next/link";
import { useState, useEffect } from "react";

const AgencyNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills p-2">
      <Link legacyBehavior href="/instructor">
        <a className={`nav-link ${current === "/instructor" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link legacyBehavior href="/createnewpackage">
        <a className={`nav-link ${current === "/createnewpackage" && "active"}`}>
          Create New Package
        </a>
      </Link>
    </div>
  );
};

export default AgencyNav;
