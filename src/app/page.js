import Image from "next/image";
import Hero from "./Components/Single/HomePage/Hero";
import HomeAboutSection from "./Components/Single/HomePage/HomeAboutSection";
import PlanningIndia from "./Components/Single/HomePage/PlanningIndia";
import SettingUpBusiness from "./Components/Single/HomePage/SettingUp";
import ServicesBento from "./Components/Single/HomePage/ServicesBento";
import StatsStrip from "./Components/Single/HomePage/StatsStrip";
import BoldHero from "./Components/Single/HomePage/BoldHero";

export default function Home() {
  return <>
  
<Hero/>
<HomeAboutSection/>
<PlanningIndia/>
<SettingUpBusiness/>
<StatsStrip/>
<ServicesBento/>
<BoldHero/>
  </>
}
