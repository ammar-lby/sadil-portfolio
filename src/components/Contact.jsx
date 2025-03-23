import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// Initialize EmailJS with error handling and auto-retry
const initEmailJS = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
      return true;
    } catch (error) {
      console.warn(`EmailJS initialization attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        console.error('Failed to initialize EmailJS after multiple attempts');
        return false;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

const Notification = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ type: "spring", damping: 20, stiffness: 300 }}
    className={`fixed inset-0 flex items-center justify-center z-[100] p-4`}
  >
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    
    {/* Notification Card */}
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl ${
        type === 'success' 
          ? 'bg-[#663635] text-white' 
          : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          {type === 'success' ? (
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{message}</h3>
        <p className="text-sm opacity-90 mb-6">
          {type === 'success' ? 'Message sent successfully!' : 'Please try again later.'}
        </p>
        
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isEmailJSInitialized, setIsEmailJSInitialized] = useState(false);

  useEffect(() => {
    initEmailJS().then(success => {
      setIsEmailJSInitialized(success);
    });
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEmailJSInitialized) {
      // Try to reinitialize if not initialized
      const success = await initEmailJS();
      if (!success) {
        showNotification("Unable to connect to email service. Please try again later.", "error");
        return;
      }
      setIsEmailJSInitialized(true);
    }

    setLoading(true);

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        reply_to: form.email,
      };

      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });

      showNotification("Thank you. I will get back to you as soon as possible.", "success");
    } catch (error) {
      console.error('EmailJS error:', error);
      
      if (error.status === 401 || error.status === 403) {
        // Token expired or authentication issue
        setIsEmailJSInitialized(false);
        showNotification("Authentication error. Please try again.", "error");
      } else {
        showNotification("Something went wrong. Please try again later.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-200 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Please enter your name."
              className='bg-beige-100 py-4 px-6 placeholder:text-primary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Please enter your email address."
              className='bg-beige-100 py-4 px-6 placeholder:text-primary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className='bg-beige-100 py-4 px-6 placeholder:text-primary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>

          <button
            type='submit'
            className='bg-beige-100 py-3 px-8 rounded-xl outline-none w-fit text-primary font-bold shadow-md shadow-primary'
            disabled={loading || !isEmailJSInitialized}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
