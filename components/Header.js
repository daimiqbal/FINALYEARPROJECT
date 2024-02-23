import Link from "next/link";
import Image from "next/image";
import TopNav from "./TopNav";

const Header = () => {
    return (
        <header className="main_header">
            <div className="navbar_brand">
            <Link href="/">
                    <Image src="/images/logo.png" alt="my logo image" width={300} height={150}/>
                    
            </Link>
            <TopNav />
            </div>
        </header>
    );
};

export default Header;   