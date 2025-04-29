import { motion } from 'framer-motion';
import { slideIn, slideOut } from './variants';

const PageReveal = () => {
  return (
    <>
      <motion.div
        variants={slideIn}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`z-5 fixed top-0 left-0 w-full h-screen bg-green-500 origin-bottom`}
      ></motion.div>
      <motion.div
        variants={slideOut}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`z-10 fixed top-0 left-0 w-full h-screen bg-blue-500 origin-top`}
      ></motion.div>
    </>
  );
};
export default PageReveal;
