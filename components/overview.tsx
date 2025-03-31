import { motion } from 'framer-motion';
import Image from 'next/image';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-col items-center text-center gap-6 p-6">
        <Image
          src="/logo/klip-logo.png"
          alt="Klip Logo"
          width={120}
          height={120}
          priority
        />
        <p className="leading-relaxed text-lg">
          Welcome to Klip! In here you can summarize information to save time.
        </p>
        <p className="text-muted-foreground">
          You could by providing a Youtube video url to summarize the video!
        </p>
      </div>
    </motion.div>
  );
};
