'use client'

import { Footer } from "@/components/footer/footer";
import Header from "@/components/header/header";
import CommentSection from "@/components/comment-section/commentSection";
import ProfessionalServices from "@/components/professional-services/professionalServices";
import CustomerRoadMap from "@/components/customerRoadMap/customerRoadMapSection";
import Faq from "@/components/FAQ/faq";
import ScrollToTopButton from "@/components/utils/scrollToTopButton";
import 'react-image-crop/dist/ReactCrop.css'
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";


 function HomePage() {

  // const session =await auth()

  return (


    <div>
     <Header />
      <ProfessionalServices />
      <CustomerRoadMap />
      <CommentSection /> 
      <Faq />
      <Footer />
      <ScrollToTopButton/>
      </div>
  );
}

export default HomePage;
