import Image from "next/image";
import Navbar from "./componenta/Navbar";
import Home from "./pages/home/page";
import TrustBar from "./componenta/TrustBar";
import MenuSec from "./pages/MenuSec";
import Contact from "./pages/contact/page";
import About from "./componenta/About";
import Gallery from "./pages/gallery/page";
import Packages from "./pages/package/page";
import Footer from "./componenta/Footer";
import Reviews from "./componenta/Reviews";

const getLinkData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/nav_data",{ next: { revalidate: 36 } });
  return await response.json();
};



export default async function HomePage() {

const links = await getLinkData()
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
    <Navbar linksProp={links[0]}/>
    <Home/>
    <TrustBar/>
    <MenuSec/>
    <Packages/>
    <Gallery/>
    <About/>
    <Reviews/>
    <Contact />
  </main>
  );
}
