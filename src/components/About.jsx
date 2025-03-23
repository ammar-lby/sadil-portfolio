import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faVectorSquare, faBullhorn, faPenFancy } from '@fortawesome/free-solid-svg-icons';

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-[#8C5E5A] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <FontAwesomeIcon 
          icon={
            title === "Graphic Designer" ? faPalette :
            title === "Logo & Visual Designer" ? faVectorSquare :
            title === "Social Media Content/Design" ? faBullhorn :
            faPenFancy
          } 
          className="w-16 h-16 text-white"
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm Sadil Nassar, a passionate graphic designer based in Greater Manchester, UK, currently pursuing a BA in Graphic Design at the University of Salford. With hands-on experience creating compelling visual content for charities, restaurants, and youth organizations, I thrive on bringing ideas to life through design. Proficient in tools like Photoshop, Illustrator, InDesign, and After Effects, I focus on delivering creative solutions that enhance user experiences and drive engagement. My work reflects my attention to detail, cultural sensitivity, and commitment to impactful storytelling. Alongside design, my leadership roles in youth programs have strengthened my teamwork, communication, and problem-solving skills. I'm excited to continue growing and making a positive impact through design.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
