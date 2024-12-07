import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children }) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
