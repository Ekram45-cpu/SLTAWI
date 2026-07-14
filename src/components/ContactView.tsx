import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Map, Building2 } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Digital Marketing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Selected district on the mock map
  const [selectedDistrict, setSelectedDistrict] = useState('Bole (Main HQ)');

  const districts = [
    { name: 'Bole (Main HQ)', coords: '4th Floor, next to Edna Mall', desc: 'Central strategy, client success, corporate branding, and core leadership.' },
    { name: 'Kazanchis Branch', coords: 'Nani Building, 8th Floor', desc: 'Engineering workspace, interactive web development, database scaling.' },
    { name: 'Piazza Creative Lab', coords: 'Legacy House, near Taytu Hotel', desc: 'Content production, photo studio, Amharic/bilingual scriptwriting, audio design.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div id="contact-view" className="space-y-24 pt-32 pb-20">
      
      {/* HEADER */}
      <section id="contact-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-2xl">
        <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Contact Us</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-none">
          Let’s Scale Together
        </h1>
        <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base">
          Fill out the brief form below, or reach us directly at our Bole Road headquarters in Addis Ababa. Our team responds within two hours.
        </p>
      </section>

      {/* CORE CONTACT WORKFLOW */}
      <section id="contact-core" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Form Column (Col span 7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-2">
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-950">Send a Secure Brief</h3>
            <p className="text-slate-500 text-xs sm:text-sm">We take project parameters and compliance seriously. All data transfers are fully encrypted.</p>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-5 rounded-2xl flex items-start gap-3 text-sm font-semibold animate-bounce-slow">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold">Strategy Audit Booked!</span>
                <span className="block font-normal mt-1 text-xs text-green-700">Thank you. One of our Senior Advisors will reach out to you within two business hours with details for our initial discovery session.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Your Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Abebe Kebede"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Business Email *</label>
                <input
                  required
                  type="email"
                  placeholder="abebe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Phone Coordinate</label>
                <input
                  type="tel"
                  placeholder="+251 911 234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Company Name</label>
                <input
                  type="text"
                  placeholder="Zoma Wellness Ltd."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Target Capability Needed</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-950 bg-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option>Digital Marketing</option>
                <option>Website Development</option>
                <option>Branding & Design</option>
                <option>Content Creation</option>
                <option>SEO Services</option>
                <option>Advanced Digital Menu System</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Message Description *</label>
              <textarea
                required
                rows={5}
                placeholder="Give us a brief overview of your business goals, target demographics, and any immediate roadblocks."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4.5 h-4.5 text-white" /> Request Free Strategic Discovery Call
            </button>
          </form>
        </div>

        {/* Office Details & Interactive Branch Selector (Col span 5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quick Details Card */}
          <div className="bg-slate-950 text-white p-8 rounded-3xl border border-slate-900 space-y-6">
            <h3 className="font-sans font-bold text-lg text-orange-500 uppercase tracking-wider">Direct Channels</h3>
            
            <div className="space-y-4">
              <a href="tel:+251911234567" className="flex items-center gap-4.5 p-3 hover:bg-slate-900 rounded-xl transition-all">
                <div className="p-3 bg-slate-900 text-orange-500 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Voice Support</div>
                  <div className="font-bold text-sm text-white">+251 911 234 567</div>
                </div>
              </a>

              <a href="mailto:info@siltawi.com" className="flex items-center gap-4.5 p-3 hover:bg-slate-900 rounded-xl transition-all">
                <div className="p-3 bg-slate-900 text-orange-500 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Email Intake</div>
                  <div className="font-bold text-sm text-white">business@siltawi.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4.5 p-3">
                <div className="p-3 bg-slate-900 text-orange-500 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Operating Hours</div>
                  <div className="font-bold text-sm text-white">Mon - Fri: 8:30 AM - 5:30 PM (EAT)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Branch Locator */}
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-orange-500" />
              <h3 className="font-sans font-bold text-slate-950 text-lg">Interactive Branch Selector</h3>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm">Select an office location below to view specific branch coordinates and tasks carried out there.</p>

            <div className="flex flex-col gap-3">
              {districts.map((d) => {
                const isSelected = selectedDistrict === d.name;
                return (
                  <button
                    key={d.name}
                    onClick={() => setSelectedDistrict(d.name)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-white text-slate-900 border-orange-500 shadow-md'
                        : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isSelected ? 'text-orange-500' : 'text-slate-500'}`} />
                    <div className="space-y-1">
                      <div className="font-bold text-slate-950">{d.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" /> {d.coords}
                      </div>
                      {isSelected && (
                        <p className="text-xs text-slate-600 font-normal leading-relaxed pt-1 animate-fade-in">
                          {d.desc}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* GOOGLE MAPS IFRAME COMPONENT (ACCURATE LOCATION) */}
      <section id="maps-iframe-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-md aspect-[21/9] min-h-[300px] border border-slate-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548767746452!2d38.78314501140924!3d9.006495189725832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850f24be6185%3A0xe968d90f23030248!2sEdna%20Mall%20%7C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Siltawi Digital Marketing Bole Road HQ Location"
            className="w-full h-full grayscale opacity-85 hover:grayscale-0 transition-all duration-500"
          ></iframe>
          <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md text-white p-4.5 rounded-xl border border-slate-800 flex items-center gap-3 shadow-lg pointer-events-none max-w-[280px]">
            <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <div className="text-xs">
              <span className="block font-bold">Siltawi Digital HQ</span>
              <span className="block text-slate-400 font-semibold uppercase mt-0.5">Bole Road, Addis Ababa, ET</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
