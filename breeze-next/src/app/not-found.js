'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {Button} from '/src/components/ui/Button'
import { useRouter } from 'next/navigation'
export default function NotFound() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center text-center px-4">
      {/* Logo Jaspe Academy */}
      <Image
        src="/image/logo_jaspe.png" // remplace par le chemin réel de ton logo
        alt="Jaspe Academy"
        width={100}
        height={100}
        className="mb-6"
      />

      {/* Animation Framer Motion */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-blue-700 mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-600 mb-6"
      >
        Oups ! Cette page n’existe pas sur <span className="font-semibold text-blue-800">Jaspe Academy</span>.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >

        <Button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition" onClick={() => router.back()}>
            <FaArrowLeft />
            Retour
        </Button>
      </motion.div>
    </div>
  );
}
