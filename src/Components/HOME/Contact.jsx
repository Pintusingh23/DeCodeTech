import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Subject: '',
    Message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.Name.trim() || !formData.Email.trim() || !formData.Subject.trim() || !formData.Message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(formData.Email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://de-code-tech-backend.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormData({
          Name: '',
          Email: '',
          Subject: '',
          Message: ''
        });
      } else {
        setError(data.message || 'There was an error submitting the form. Please try again.');
      }
    } catch (err) {
      setError('Network error. Unable to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] py-16 px-4 md:px-8 lg:px-16 mt-16 overflow-hidden relative">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-50 rounded-full blur-[140px] pointer-events-none opacity-60"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-widest inline-block px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Contact Us
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Have questions about our programs? We're here to help you navigate your tech journey.
          </p>
        </motion.div>

        {/* Info + Form Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column – Info Cards */}
          <motion.div variants={itemVariants} className="w-full lg:w-5/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-orange-100">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Contact Details</h3>
                  <p className="text-slate-500 text-sm mb-3">Feel free to reach out</p>
                  <a href="mailto:decode82183@gmail.com" className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-4 transition-colors">
                    decode82183@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-blue-100">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Office Address</h3>
                  <p className="text-slate-500 text-sm">
                    Visit us for in-person counseling. <br />
                    (Address goes here)
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-green-100">
                  <FaClock />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Working Hours</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" /> Monday - Friday
                  </p>
                  <p className="text-slate-500 text-sm mt-1 font-semibold">9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column – Contact Form */}
          <motion.div variants={itemVariants} className="w-full lg:w-7/12">
            {submitSuccess ? (
              <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] border border-slate-100 p-10 md:p-14 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="mb-8 w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto shadow-sm">
                  <FaCheckCircle />
                </div>
                <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Message Sent!</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
                  Thank you for reaching out. Your message has been received and we will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">
                  Send us a message
                </h2>
                
                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-slate-700 font-bold text-sm">Full Name</label>
                      <input
                        id="name"
                        name="Name"
                        type="text"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full py-4 px-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-slate-700 font-bold text-sm">Email Address</label>
                      <input
                        id="email"
                        name="Email"
                        type="email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full py-4 px-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-slate-700 font-bold text-sm">Subject</label>
                    <input
                      id="subject"
                      name="Subject"
                      type="text"
                      value={formData.Subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full py-4 px-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-slate-700 font-bold text-sm">Message</label>
                    <textarea
                      id="message"
                      name="Message"
                      value={formData.Message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here..."
                      rows={5}
                      className="w-full py-4 px-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all shadow-sm resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl text-sm font-medium flex items-center gap-2">
                      <span className="text-xl">⚠️</span> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 py-5 mt-2 text-lg font-bold text-white bg-gradient-to-r from-[#FFAB00] to-[#FF6D00] hover:from-[#FF9100] hover:to-[#FF5500] transition-all duration-300 rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(255,145,0,0.25)] hover:shadow-[0_15px_30px_rgba(255,145,0,0.35)] hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin text-2xl leading-none">⚙️</span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;