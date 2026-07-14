import React, { useState } from 'react';
import { testimonialsData } from '../data/agencyData';
import { Quote, ChevronLeft, ChevronRight, Star, Heart, CheckCircle2 } from 'lucide-react';

export default function TestimonialsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userQuote, setUserQuote] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);
  const [reviews, setReviews] = useState(testimonialsData);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuote || !userName) return;

    const newReview = {
      id: `review_user_${Date.now()}`,
      quote: userQuote,
      author: userName,
      role: userRole || 'Partner & Business Owner',
      company: userCompany || 'Ethiopia Enterprise',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    setReviews([newReview, ...reviews]);
    setUserQuote('');
    setUserName('');
    setUserRole('');
    setUserCompany('');
    setSubmittedReview(true);
    setCurrentIndex(0);

    setTimeout(() => {
      setSubmittedReview(false);
    }, 5000);
  };

  const current = reviews[currentIndex];

  return (
    <div id="testimonials-view" className="space-y-24 pt-32 pb-20">
      
      {/* HEADER */}
      <section id="testimonials-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-2xl">
        <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Reviews</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-none">
          What Our Partners Say
        </h1>
        <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base">
          Read transparent, verified client feedback from founders, executives, and marketing directors who scaled their businesses alongside Siltawi.
        </p>
      </section>

      {/* CAROUSEL SLIDER */}
      <section id="testimonials-carousel" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl border border-slate-900">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl -z-10"></div>
          
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            <Quote className="w-12 h-12 text-orange-500/20" />

            <p className="text-lg sm:text-xl md:text-2xl italic font-medium leading-relaxed font-sans max-w-3xl">
              "{current.quote}"
            </p>

            <div className="flex items-center gap-4.5 pt-6">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500 shadow-md"
              />
              <div className="text-left">
                <h4 className="font-sans font-bold text-base text-white">{current.author}</h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{current.role}, {current.company}</p>
              </div>
            </div>
          </div>

          {/* Left / Right Nav Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-slate-900 hover:bg-orange-500 text-white rounded-full transition-all border border-slate-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
            <button
              onClick={handleNext}
              className="p-3 bg-slate-900 hover:bg-orange-500 text-white rounded-full transition-all border border-slate-800"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-orange-500' : 'w-2.5 bg-slate-800'
                }`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* FEEDBACK SUBMISSION FRAME */}
      <section id="feedback-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm">
        <div className="text-center space-y-3">
          <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-950">
            Have We Worked Together?
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm">
            Leave your honest feedback below. Once submitted, your feedback will immediately showcase in the slider display above!
          </p>
        </div>

        {submittedReview && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-2.5 text-sm font-semibold animate-bounce-slow">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Thank you! Your testimonial has been loaded and added to the slider showcase.</span>
          </div>
        )}

        <form onSubmit={handleAddReviewSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Testimonial Quote</label>
            <textarea
              required
              rows={4}
              placeholder="What was your experience working with Siltawi Digital?"
              value={userQuote}
              onChange={(e) => setUserQuote(e.target.value)}
              className="w-full px-4.5 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Your Full Name</label>
              <input
                required
                type="text"
                placeholder="Abebe Kebede"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4.5 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Your Position</label>
              <input
                type="text"
                placeholder="Marketing Manager"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-4.5 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Company Name</label>
              <input
                type="text"
                placeholder="Zoma Wellness"
                value={userCompany}
                onChange={(e) => setUserCompany(e.target.value)}
                className="w-full px-4.5 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            <Heart className="w-4.5 h-4.5 text-white" /> Add Testimonial Review
          </button>
        </form>
      </section>

    </div>
  );
}
