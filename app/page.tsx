import FoodList from "@/componets/food/FoodList";
import FeaturesSection from "@/componets/layout/HeroSection/FeaturesSection";
import Footer from "@/componets/layout/Footer/Footer";
import HeroSection from "@/componets/layout/HeroSection/HeroSection";
import Navbar from "@/componets/layout/Navbar/Navbar";
import RestaruntList from "@/componets/restaruntList/restaruntList";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FoodList/>
      {/* <RestaruntList /> */}
      
      
      <Footer/>
    </main>
  );
}