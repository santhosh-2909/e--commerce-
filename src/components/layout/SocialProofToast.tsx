import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { socialProofItems } from '../../data/mockData';

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const show = () => {
      setCurrent(c => (c + 1) % socialProofItems.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // Initial delay then recurring
    const initialTimer = setTimeout(show, 5000);
    const interval = setInterval(show, 18000);
    return () => { clearTimeout(initialTimer); clearInterval(interval); };
  }, []);

  const item = socialProofItems[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 left-4 z-40 max-w-xs"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                {item.user} from {item.location}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                just bought <span className="text-primary-600 dark:text-primary-400 font-medium">{item.product}</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
