import Image from "next/image";
import Navbar from "./componenta/Navbar";
import Hero from "./componenta/Hero";
import TrustBar from "./componenta/TrustBar";
import Menu from "./componenta/Menu";
import Job from "./componenta/Job";
import Contact from "./componenta/Contact";
import Skill from "./componenta/Skill";
import About from "./componenta/About";
import Gallery from "./componenta/Gallery";
import Packages from "./componenta/Packages";
import Footer from "./componenta/Footer";
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
    <Navbar />
    <Hero />
    <TrustBar/>
    <Menu/>
    <Packages/>
    <Gallery/>
    {/* <Job /> */}
    <About/>
    {/* <Skill/> */}
    <Contact />
    <Footer/>
  </main>
  );
}
