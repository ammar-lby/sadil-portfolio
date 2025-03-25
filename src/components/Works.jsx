import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { google } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const images = Array.isArray(image) ? image : [image];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNextImage();
    }
    if (isRightSwipe) {
      handlePrevImage();
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if ((isExpanded && isMobileView) || isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded, isMobileView, isFullscreen]);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
          <div 
            className={`relative w-full transition-all duration-300 ease-in-out cursor-pointer ${
              isExpanded && !isMobileView ? 'h-[400px]' : 'h-[230px]'
            }`}
            onClick={toggleExpand}
          >
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
            alt='project_image'
              className='w-full h-full object-contain rounded-2xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Expand indicator */}
            {isMobileView && (
              <div className="absolute bottom-2 left-14 w-8 h-8 rounded-full bg-black/20 text-white/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-lg">⤢</span>
              </div>
            )}

            {/* Desktop controls */}
            {isExpanded && !isMobileView && (
              <>
                <button
                  onClick={toggleExpand}
                  className="absolute top-1 right-14 w-8 h-8 rounded-full bg-black/20 text-white/60 flex items-center justify-center hover:bg-black/50 hover:text-white transition-all transform hover:scale-110 text-xl backdrop-blur-sm z-10"
                >
                  ×
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(!isFullscreen);
                  }}
                  className="absolute top-1 right-24 w-8 h-8 rounded-full bg-black/20 text-white/60 flex items-center justify-center hover:bg-black/50 hover:text-white transition-all transform hover:scale-110 text-xl backdrop-blur-sm z-10"
                >
                  {isFullscreen ? '⤢' : '⤡'}
                </button>
              </>
            )}

            {images.length > 1 && !isMobileView && (
              <div className='absolute inset-0 flex justify-between items-center px-4'>
                <button
                  onClick={handlePrevImage}
                  className='w-10 h-10 left-20 rounded-full bg-black/20 text-white/60 flex items-center justify-center hover:bg-black/50 hover:text-white transition-all transform hover:scale-110 text-2xl backdrop-blur-sm'
                >
                  ❮
                </button>
                <button
                  onClick={handleNextImage}
                  className='w-10 h-10 rounded-full bg-black/20 text-white/60 flex items-center justify-center hover:bg-black/50 hover:text-white transition-all transform hover:scale-110 text-2xl backdrop-blur-sm'
                >
                  ❯
                </button>
              </div>
            )}

            <div className='absolute top-1 right-4'>
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className='green-pink-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer' //brown gradient for google drive logo
            >
              <img
                  src={google}
                alt='source code'
                  className='w-600px h-200px object-contain'
              />
              </div>
            </div>

            {images.length > 1 && !isMobileView && (
              <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2'>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
        </Tilt>
      </motion.div>

      {/* Mobile fullscreen view */}
      <AnimatePresence>
        {isExpanded && isMobileView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleExpand}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="relative w-[85vw] h-[85vw] max-w-[500px] max-h-[500px] flex items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <motion.img
                  key={`fullscreen-${currentImageIndex}`}
                  src={images[currentImageIndex]}
                  alt='project_image'
                  className='w-full h-full object-contain'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {images.length > 1 && (
                  <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between text-white/30 text-4xl pointer-events-none">
                    <span>❮</span>
                    <span>❯</span>
                  </div>
                )}
              </div>

              {/* Close button for mobile view */}
              <div className="fixed bottom-8 left-0 right-0 flex justify-center">
                <button
                  onClick={toggleExpand}
                  className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center active:bg-black/70 transition-all transform active:scale-95 text-4xl shadow-lg border border-white/10"
                >
                  ×
                </button>
              </div>

              {/* Pagination dots for mobile */}
              {images.length > 1 && (
                <div className='fixed bottom-32 left-0 right-0 flex justify-center gap-4'>
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? 'bg-white scale-110 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop fullscreen view */}
      <AnimatePresence>
        {isFullscreen && !isMobileView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-[65%] h-[70%] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  key={`fullscreen-${currentImageIndex}`}
                  src={images[currentImageIndex]}
                  alt='project_image'
                  className='w-auto h-auto max-w-[90%] max-h-[90%] object-contain rounded-xl'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    margin: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-0 right-22 w-8 h-8 rounded-full bg-black/40 text-white/60 flex items-center justify-center hover:bg-black/70 hover:text-white transition-all transform hover:scale-110 text-xl backdrop-blur-sm"
                >
                  ⤢
                </button>

                {images.length > 1 && (
                  <>
                    <div className='absolute inset-x-28 top-1/2 -translate-y-1/2 flex justify-between items-center'>
                      <button
                        onClick={handlePrevImage}
                        className='w-16 h-16 rounded-full bg-black/20 text-white/60 flex items-center justify-center hover:bg-black/50 hover:text-white transition-all transform hover:scale-110 text-3xl backdrop-blur-sm'
                      >
                        ❮
                      </button>
                      <button
                        onClick={handleNextImage}
                        className='w-16 h-16 rounded-full bg-black/20 text-white/60 flex items-center justify-center hover:bg-black/50 hover:text-white transition-all transform hover:scale-110 text-3xl backdrop-blur-sm'
                      >
                        ❯
              </button>
            </div>

                    <div className='absolute bottom-2 left-0 right-0 flex justify-center gap-2'>
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");