import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Layout from './Layout'; // Import the Layout component
import CompanySection from './CompanySection';
import Faq from './Faq';
import StyledCarousel from './StyledCarousel';
import AgentHome from './AgentHome';
import FeaturedProductPage from './FeaturedProductPage';
import TopSelling from './TopSelling';

function HomePage() {
  const carouselRef = useRef(null);
  const companyRef = useRef(null);
  const topsellingRef = useRef(null);
  const agentRef = useRef(null);
  const featuredProductRef = useRef(null);
  const faqRef = useRef(null);

  const isCarouselInView = useInView(carouselRef, { once: true });
  const isCompanyInView = useInView(companyRef, { once: true });
  const isAgentInView = useInView(agentRef, { once: true });
  const isFeaturedProductInView = useInView(featuredProductRef, { once: true });
  const isTopsellingInView = useInView(topsellingRef, { once: true });

  const isFaqInView = useInView(faqRef, { once: true });

  return (

 <Layout>
      <motion.div
        ref={carouselRef}
        initial={{ opacity: 0, y: -50 }}
        animate={isCarouselInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <StyledCarousel />
      </motion.div>

      <motion.div
        ref={companyRef}
        initial={{ opacity: 0, x: -100 }}
        animate={isCompanyInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CompanySection />
      </motion.div>

      <motion.div
        ref={agentRef}
        initial={{ opacity: 0, x: 100 }}
        animate={isAgentInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AgentHome />
      </motion.div>

      <motion.div
        ref={featuredProductRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isFeaturedProductInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <FeaturedProductPage />
      </motion.div>

      <motion.div
        ref={topsellingRef}
        initial={{ opacity: 0, x: -100 }}
        animate={isTopsellingInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TopSelling />
      </motion.div>

      <motion.div
        ref={faqRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Faq />
      </motion.div>
     </Layout>

  );
}

export default HomePage;
