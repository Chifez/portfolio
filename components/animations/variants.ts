import { Variants } from 'framer-motion';

export const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const child: Variants = {
  hidden: {
    opacity: 0,
    y: '50%',

    transition: {
      type: 'spring',
      damping: 50,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: '0%',

    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 150,
    },
  },
};

export const imageContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 2,
      delayChildren: 2,
    },
  },
};

export const imageReveal: Variants = {
  animate: {
    opacity: [1, 1],
    y: ['0%', '100%'],
  },
};

export const slideIn: Variants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
  },
  exit: {
    scaleY: 0,
  },
};

export const slideOut: Variants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 1,
  },
  exit: {
    scaleY: 0,
  },
};
