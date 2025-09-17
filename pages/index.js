import React from 'react';
import dynamic from 'next/dynamic';
const MainBanner = dynamic(() => import('../components/OnlineTrainingSchool/MainBanner'));
const CoursesArea = dynamic(() => import('../components/OnlineTrainingSchool/CoursesArea'));
const Features = dynamic(() => import('../components/OnlineTrainingSchool/Features'));
const AboutArea = dynamic(() => import('../components/OnlineTrainingSchool/AboutArea'));
const FeedbackSlider = dynamic(() => import('../components/OnlineTrainingSchool/FeedbackSlider'));
const FunFactsTwo = dynamic(() => import('../components/Common/FunFactsTwo'));
const PremiumAccess = dynamic(() => import('../components/OnlineTrainingSchool/PremiumAccess'));
const LatestNewsTwo = dynamic(() => import('../components/Common/LatestNewsTwo'));
const Partner = dynamic(() => import('../components/Common/Partner'));

const Index = () => {
	return (
		<React.Fragment>
            <MainBanner />
            <CoursesArea />
            <Features />
            <AboutArea />
            <FeedbackSlider />
            <FunFactsTwo />
            <PremiumAccess />
            <Partner />
            <LatestNewsTwo />
           
        </React.Fragment>


	);
};
  
export default Index;
