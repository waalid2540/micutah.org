import Hero from "@/components/home/Hero";
import RamadanBanner from "@/components/home/RamadanBanner";
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
      <TravelerSection />
      <FacilitiesSection />
      <QuickActions />
      <DonationCTA />
      <LocationMap />
    </>
  );
}
