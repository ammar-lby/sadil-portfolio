import { styles } from "../styles";
import { motion } from "framer-motion";

const Hero = () => {
  const skills = [
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Figma",
    "After Effects",
    "Premiere Pro",
  ];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div className={`absolute inset-0 top-[-100px] sm:top-[-40px] max-w-7xl mx-auto ${styles.paddingX} z-10 flex items-center`}>
        <div className="flex flex-row items-center gap-4 sm:gap-6 w-full">
          {/* Vertical line indicator - Always on the left */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#663635] shadow-lg shadow-[#663635]/50' />
            <div className='w-1 h-56 sm:h-[550px] brown-gradient' />
          </div>

          {/* Main content - Always on the right */}
          <div className="flex-1 space-y-5 sm:space-y-7 min-w-0 py-8">
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className={`${styles.heroHeadText} text-white leading-tight`}>
                Hi, I'm <span className='text-[#663635]'>Sadil</span>
              </h1>
              <p className={`${styles.heroSubText} text-white-100 max-w-3xl leading-relaxed`}>
                Creative Graphic Designer specializing in visual storytelling, brand identity, and digital experiences for print, digital media, and branding.
              </p>
            </motion.div>

          {/* Skill badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl"
          >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-3 bg-[#663635]/20 backdrop-blur-sm border border-[#663635]/30 rounded-lg text-white text-sm sm:text-base font-medium hover:bg-[#663635]/30 transition-all duration-300 text-center"
                >
                  {skill}
                </motion.div>
              ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8 sm:gap-12 md:gap-16"
          >
            <div className="text-left">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#663635]">5+</h3>
              <p className="text-white-100 text-sm sm:text-base mt-2">Years Experience</p>
            </div>
            <div className="text-left">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#663635]">150+</h3>
              <p className="text-white-100 text-sm sm:text-base mt-2">Projects Completed</p>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col xs:flex-row gap-4"
          >
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-[#663635] text-white font-semibold rounded-lg hover:bg-[#7d4744] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#663635]/50 text-center text-base"
              >
                View My Work
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-transparent border-2 border-[#663635] text-white font-semibold rounded-lg hover:bg-[#663635]/10 transition-all duration-300 text-center text-base"
              >
                Get In Touch
              </motion.a>
          </motion.div>
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 w-full flex justify-center z-10">
        <a href="#about">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-7 h-11 sm:w-8 sm:h-12 rounded-3xl border-2 border-[#663635] flex justify-center items-start p-2 cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#663635]"
            />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
