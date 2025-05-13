'use client';

import { useState } from 'react';
import {
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  url: string;
  title: string;
  className?: string;
}

export default function ShareButton({
  url,
  title,
  className,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        const text = encodeURIComponent(title);
        const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      },
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      },
    },
    {
      name: 'Copy Link',
      icon: LinkIcon,
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          toast({
            title: 'Link copied!',
            description: 'The post URL has been copied to your clipboard.',
          });
        } catch (err) {
          toast({
            title: 'Failed to copy',
            description: 'Please try copying the link manually.',
            variant: 'destructive',
          });
        }
      },
    },
  ];

  // Handle native share if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast({
            title: 'Error sharing',
            description: 'Something went wrong while sharing.',
            variant: 'destructive',
          });
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <motion.button
        onClick={handleNativeShare}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
          'hover:bg-gray-800/50 text-gray-400 hover:text-white',
          isOpen && 'bg-gray-800/50 text-white'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share post"
        aria-expanded={isOpen}
        aria-controls="share-menu"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-medium">Share</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="share-menu"
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex items-center w-full px-4 py-2 text-sm text-gray-400',
                    'hover:bg-gray-800 hover:text-white transition-colors'
                  )}
                  role="menuitem"
                >
                  <option.icon className="w-4 h-4 mr-3" />
                  {option.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
