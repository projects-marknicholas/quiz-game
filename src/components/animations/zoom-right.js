import React from "react";
import { motion } from "framer-motion";

const ZoomRight = ({ children }) => {
  const zoomRight = {
    hidden: { x: "100%", scale: 0.5, opacity: 0 },
    visible: { x: 0, scale: 1, opacity: 1 },
    exit: { x: "100%", scale: 0.5, opacity: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={zoomRight}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomRight;
