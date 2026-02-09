import Hero from "@/components/home/Hero";
import RamadanBanner from "@/components/home/RamadanBanner";
import RamadanBooks from "@/components/home/RamadanBooks";
import TravelerSection from "@/components/home/TravelerSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import QuickActions from "@/components/home/QuickActions";
import DonationCTA from "@/components/home/DonationCTA";
import LocationMap from "@/components/home/LocationMap";

export default function Home() {
  return (
    <>
      <Hero />
      <RamadanBanner />
      <RamadanBooks />
      <TravelerSection />
      <FacilitiesSection />
      <QuickActions />
      <DonationCTA />
      <LocationMap />
    </>
  );
}
