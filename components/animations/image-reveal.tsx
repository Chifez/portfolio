import { motion } from 'framer-motion';
import { imageReveal } from './variants';

interface ImageProps {
  imagedelay?: number;
  extraclasses?: string;
}

const ImageAnimate: React.FC<ImageProps> = ({
  imagedelay,
  extraclasses,
}: ImageProps) => {
  return (
    <motion.div
      variants={imageReveal}
      animate="animate"
      transition={{
        duration: 1,
        type: 'spring',
        delay: imagedelay ? imagedelay : 0,
        damping: 50,
        stiffness: 300,
      }}
      className={`absolute top-0 left-0 bg-[#111111] h-full w-full z-10 ${extraclasses}`}
    ></motion.div>
  );
};
export default ImageAnimate;
