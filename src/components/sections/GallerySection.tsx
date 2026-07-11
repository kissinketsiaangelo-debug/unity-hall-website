'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { KineticText } from '@/components/animations/KineticText';
import { ScrollReveal } from '@/components/animations/ScrollAnimations';

const images = [
  { src: '/images/unity-hall-drone.jpg', caption: 'Drone shot' },
  { src: '/images/unity-hall-entrance.jpg', caption: 'Entrance view' },
  { src: '/images/unity-hall-exterior-wiki.jpg', caption: 'Exterior' },
  { src: '/images/unity-hall-exterior.jpg', caption: 'Exterior facade' },
  { src: '/images/unity-hall-alamy-1.jpg', caption: 'Aerial view' },
  { src: '/images/unity-hall-knust-spring-gallery-1.jpg', caption: 'Spring gallery' },
  { src: '/images/conti-courtyard.jpg', caption: 'Courtyard' },
  { src: '/images/conti-entrance-life.jpg', caption: 'Entrance life' },
  { src: '/images/conti-hall-week-1.jpg', caption: 'Hall week 1' },
  { src: '/images/conti-hall-week-2.jpg', caption: 'Hall week 2' },
  { src: '/images/conti-morale-night.jpg', caption: 'Morale night' },
  { src: '/images/conti-students-proce.jpg', caption: 'Student procession' },
  { src: '/images/vc-lodge-knust.jpg', caption: 'VC Lodge' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="py-24 relative" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14" variant="slide-up">
          <Badge variant="primary" className="mb-4">
            Gallery
          </Badge>
          <KineticText as="h2" id="gallery-heading" variant="headline" className="font-display text-display-xl font-bold mb-4">
            Gallery
          </KineticText>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            A visual journey through Unity Hall — the Twin Towers, student life, traditions, and the Continental spirit.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              variants={itemVariants}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display font-semibold text-white text-sm drop-shadow-md">
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-5 right-5 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {(() => {
              const idx = lightboxIndex as number;
              const image = images[idx];
              if (!image) return null;
              return (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center max-w-5xl w-full px-4"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="max-h-[80vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
                  />
                  <p className="mt-4 text-white/80 text-sm font-medium">
                    {image.caption}
                  </p>
                  <p className="mt-1 text-white/40 text-xs">
                    {idx + 1} / {images.length}
                  </p>
                </motion.div>
              );
            })()}

            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % images.length);
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
