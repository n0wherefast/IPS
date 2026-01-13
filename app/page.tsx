import Navbar from "./componenta/Navbar";
import Home from "./pages/home/page";
import TrustBar from "./componenta/TrustBar";
import MenuSec from "./pages/MenuSec";
import Contact from "./pages/contact/page";
import About from "./componenta/About";
import Gallery from "./pages/gallery/page";
import Packages from "./pages/package/page";
import Reviews from "./componenta/Reviews";
import TopBar from "./componenta/TopBar";

const getLinkData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/nav_data",{ next: { revalidate: 36 } });
  return await response.json();
};
export default async function HomePage() {

const links = await getLinkData() 
  return (
    <main className="text-gray-700 bg-teal-950 body-font">
    <div id='home'  />
    <TopBar/>
    <Navbar linksProp={links[0]}/>
    <Home/>
     {/* <div className="pt-20" id="menu"/> */}
    <TrustBar/>
    <MenuSec/>
    <div className="pt-3" id="packages"/>
    <Packages/>
    <div className="pt-5" id="gallery"/>
    <Gallery/>
    <div className="pt-5" id="about"/>
    <About/>
    <Reviews/>
    <div className="pt-8" id="contact"/>
    <Contact />
  </main>
  );
}
