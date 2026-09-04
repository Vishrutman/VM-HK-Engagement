import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, MessageSquareHeart, MessageCircle, Cloud, Loader2 } from 'lucide-react';
import { collection, addDoc, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { WishMessage, EventDetails } from '../types';
import { INITIAL_WISHES } from '../data/eventData';
import { templeAudio } from '../utils/audioSynth';

interface GuestWishesProps {
  event?: EventDetails;
}

export const GuestWishes: React.FC<GuestWishesProps> = ({ event }) => {
  const groomName = event?.groomName || 'Vishrut';
  const brideName = event?.brideName || 'Hemangi';

  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    try {
      const saved = localStorage.getItem('engagement_guest_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Family & Relatives');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedWish, setLastSubmittedWish] = useState<WishMessage | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    try {
      const wishesQuery = query(
        collection(db, 'wishes'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      const unsubscribe = onSnapshot(
        wishesQuery,
        (snapshot) => {
          setIsLiveConnected(true);
          if (!snapshot.empty) {
            const cloudWishes: WishMessage[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                guestName: data.guestName || 'Well-wisher',
                relation: data.relation || 'Family & Relatives',
                message: data.message || '',
                timestamp: Number(data.timestamp) || Date.now(),
              };
            });

            setWishes(cloudWishes);
            try {
              localStorage.setItem('engagement_guest_wishes', JSON.stringify(cloudWishes));
            } catch {
              // ignore
            }
          }
        },
        (error) => {
          console.warn('Firestore live subscription fallback to local cache:', error);
          setIsLiveConnected(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Error setting up Firestore listener:', err);
      setIsLiveConnected(false);
    }
  }, []);

  const triggerCelebration = () => {
    templeAudio.ringTempleBell(1046.5);
    
    // Golden & marigold confetti petal burst
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E07A5F', '#9E2A2B', '#F5D77F', '#FFF9E6']
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const newWishData = {
      guestName: name.trim(),
      relation,
      message: message.trim() || 'हार्दिक शुभेच्छा व मंगलमय आशीर्वाद! (Warmest wishes and blessings!)',
      timestamp: Date.now(),
    };

    try {
      // Save permanently to Firebase Firestore
      const docRef = await addDoc(collection(db, 'wishes'), newWishData);
      const createdWish: WishMessage = {
        id: docRef.id,
        ...newWishData,
      };
      setLastSubmittedWish(createdWish);
      setWishes((prev) => {
        if (prev.some((w) => w.id === docRef.id)) return prev;
        return [createdWish, ...prev];
      });
    } catch (err) {
      console.warn('Firestore write failed, preserving in local cache:', err);
      const fallbackWish: WishMessage = {
        id: 'local-' + Date.now(),
        ...newWishData,
      };
      setLastSubmittedWish(fallbackWish);
      setWishes((prev) => [fallbackWish, ...prev]);
    } finally {
      setIsSubmitting(false);
      triggerCelebration();
      setName('');
      setMessage('');
    }
  };

  const createWhatsAppShareUrl = (wish: WishMessage) => {
    const text =
      `॥ शुभ साखरपुडा आशीर्वाद • Auspicious Blessings ॥\n\n` +
      `Warmest blessings for ${groomName} & ${brideName} from ${wish.guestName} (${wish.relation}):\n` +
      `"${wish.message}"\n\n` +
      `May Lord Ganesha shower you both with eternal happiness and divine joy!`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const formatWishDate = (timestamp: number) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <section id="ashirvad-wall" className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <div className="text-[#9E2A2B] text-xs tracking-[0.4em] uppercase font-bold mb-2">
          ॥ शुभ आशीर्वाद ॥
        </div>
        <h2 className="font-cormorant font-light uppercase text-2xl sm:text-4xl text-[#1a1a1a] tracking-wide">
          Ashirvad Wall
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto my-3" />
        <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto leading-relaxed">
          Post your heartfelt blessings for {groomName} &amp; {brideName}. Every wish is saved to the live cloud wall for all guests to see and celebrate together!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Send Ashirvad Form */}
        <div className="md:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#D4AF37]/15 shadow-sm">
          <h3 className="font-bold text-xs tracking-widest uppercase text-[#1a1a1a] flex items-center gap-2 mb-4">
            <MessageSquareHeart className="w-4 h-4 text-[#9E2A2B]" />
            <span>Send Your Ashirvad (आशीर्वाद)</span>
          </h3>

          {lastSubmittedWish ? (
            <div className="py-6 text-center space-y-4 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/25 p-5">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-cormorant font-bold text-2xl text-[#1a1a1a]">
                आपल्या आशीर्वादाबद्दल धन्यवाद!
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your blessing is now permanently live on the Ashirvad Wall for all guests to cherish. You can also forward it directly to the couple:
              </p>

              <a
                href={createWhatsAppShareUrl(lastSubmittedWish)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send to Couple via WhatsApp</span>
              </a>

              <button
                onClick={() => setLastSubmittedWish(null)}
                className="text-xs text-[#9E2A2B] hover:underline font-semibold pt-1 cursor-pointer"
              >
                + Write Another Blessing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh &amp; Meenakshi Joshi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#FAF7F2]/50 text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                  Relationship
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  <option value="Family & Relatives">Family &amp; Relatives (नातेवाईक)</option>
                  <option value="Friend">Friend (मित्र-मैत्रीण)</option>
                  <option value="Colleague">Colleague (सहकारी)</option>
                  <option value="Well-wisher / Elder">Well-wisher / Elder (शुभचिंतक / वडीलधारी)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                  Your Blessings &amp; Message
                </label>
                <textarea
                  rows={4}
                  placeholder="May Lord Ganesha bless you both with endless happiness, good health, and mutual love..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#FAF7F2]/50 text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#D4AF37]/15">
                <Cloud className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>Synchronized in real time with Cloud Firestore across all guests and devices.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#5A5A40] hover:bg-[#4a4a30] disabled:opacity-70 text-white text-xs font-bold uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>POSTING TO WALL...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>POST ASHIRVAD • पाठवा आशीर्वाद</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Blessings Wall / Guestbook */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs tracking-widest uppercase text-[#1a1a1a] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#9E2A2B] fill-[#9E2A2B]" />
              <span>Ashirvad Wall ({wishes.length})</span>
            </h3>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                {isLiveConnected ? 'Live Cloud Sync' : 'Connecting...'}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#D4AF37]/15 shadow-sm hover:border-[#D4AF37]/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-cormorant italic font-bold text-lg text-[#1a1a1a]">
                    {item.guestName}
                  </span>
                  <div className="flex items-center gap-2">
                    {formatWishDate(item.timestamp) && (
                      <span className="text-[10px] text-gray-400">
                        {formatWishDate(item.timestamp)}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#E07A5F] bg-[#FAF7F2] border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full">
                      {item.relation}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-serif italic mb-2">
                  "{item.message}"
                </p>
                <div className="flex justify-end">
                  <a
                    href={createWhatsAppShareUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#25D366] hover:text-[#20ba5a] uppercase tracking-wider"
                    title="Send this blessing to the couple on WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3 fill-[#25D366]" />
                    <span>Send to Couple</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
