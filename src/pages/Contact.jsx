import React from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center items-start pt-32 pb-24 px-6 max-w-7xl mx-auto w-full min-h-[90vh]"
    >
      <div className="space-y-12 w-full">
        {/* Page Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            Contacto
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-950 dark:text-white leading-tight">
            Iniciemos un<br />
            <span className="italic font-serif text-zinc-400 dark:text-zinc-600">diálogo.</span>
          </h1>
        </div>

        {/* Email Address */}
        <div className="border-t border-b border-zinc-100 dark:border-zinc-900 py-12 w-full">
          <a
            href="mailto:sofiavsh66@gmail.com.com"
            className="hover-target inline-block text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-950 dark:text-white border-b border-transparent hover:border-zinc-950 dark:hover:border-white transition-all duration-500 pb-2 break-all"
          >
            sofiavsh66@gmail.com
          </a>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap gap-8 md:gap-16 text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500">
          {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
            <a
              key={social}
              href="#"
              className="hover-target hover:text-zinc-950 dark:hover:text-white transition-colors py-2"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default Contact;
