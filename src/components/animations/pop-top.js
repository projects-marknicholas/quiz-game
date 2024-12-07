import React from "react";
import { motion } from "framer-motion";

const PopTop = ({ children }) => {
  const popTop = {
    hidden: { y: "-100%", scale: 0.5, opacity: 0 },
    visible: { y: 0, scale: 1, opacity: 1 },
    exit: { y: "-100%", scale: 0.5, opacity: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={popTop}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PopTop;
