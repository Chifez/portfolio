import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { child, container } from './variants';

interface Props {
  data: string[];

  className: string;
}

const LetterAnimate: React.FC<Props> = ({ data, className }: Props) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-flex items-start overflow-hidden leading-none w-full"
    >
      {data.map((letter: string, index: number) => (
        <motion.span
          key={index}
          variants={child}
          className={cn('inline-flex', className)}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
export default LetterAnimate;
