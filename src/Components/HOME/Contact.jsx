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

  return (
    <div className="min-h-screen w-full bg-[rgba(255,255,255,0.06)] backdrop-blur-xl py-12 px-4 md:px-16 mt-16 ">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#C8C1F0]">Contact Us</h2>
        <p className="text-[#9B8DE3]">Get in touch or visit us</p>
      </div>

      {/* Info + Form Layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column – Info Cards */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="border-2 border-purple-300 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-[rgba(255,255,255,0.06)] p-4 rounded-full text-[#9B8DE3] text-2xl">
                <FaPhoneAlt />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#9B8DE3]">Phone & Email</h3>
            <p className="text-sm text-[#9B8DE3] mb-4">Feel Free to Call</p>
            <div className="text-[#C8C1F0] flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center gap-2"><FaPhoneAlt /> </div>
              <div className="flex items-center gap-2"><FaPhoneAlt /> </div>
              <div className="flex items-center gap-2"><FaEnvelope />pintusingh09283@gmail.com</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-[#C8C1F0]/20 bg-[rgba(255,255,255,0.04)] rounded-2xl shadow-md p-6 text-center hover:shadow-[0_8px_30px_rgba(117,96,199,0.3)] transition">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-[rgba(255,255,255,0.06)] p-4 rounded-full text-[#9B8DE3] text-2xl">
                <FaMapMarkerAlt />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#9B8DE3]">Office Address</h3>
            <p className="text-sm text-[#9B8DE3] mb-4"></p>
            <p className="text-[#9B8DE3] text-sm mb-4 leading-relaxed">
              <br />
              <br />
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-[#C8C1F0]/20 bg-[rgba(255,255,255,0.04)] rounded-2xl shadow-md p-6 text-center hover:shadow-[0_8px_30px_rgba(117,96,199,0.3)] transition md:col-span-2">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-[rgba(255,255,255,0.06)] p-4 rounded-full text-[#9B8DE3] text-2xl">
                <FaClock />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#C8C1F0]"></h3>
            <p className="text-sm text-[#9B8DE3] mb-4"></p>
            <div className="text-sm text-[#F8F7FF] mb-4">
              <p className="flex items-center justify-center gap-2">
                <FaCalendarAlt className="text-[#9B8DE3]" />
              </p>
            </div>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <div className="w-full lg:w-1/2">
          {submitSuccess ? (
            <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-2xl border border-[#C8C1F0]/20 p-6 md:p-10 text-center">
              <div className="mb-6 text-[#9B8DE3] text-6xl flex justify-center">
                <FaCheckCircle />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[#9B8DE3]">Thank You!</h2>
              <p className="text-[#9B8DE3] mb-6">
                Your message has been sent successfully. We'll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 p-6 md:p-10">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-700 to-purple-400 bg-clip-text text-transparent">
                Request a Callback
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[#C8C1F0] font-medium">Full Name</label>
                    <input
                      id="name"
                      name="Name"
                      type="text"
                      value={formData.Name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full py-4 px-4 rounded-lg border border-gray-300 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[#C8C1F0] font-medium">Email Address</label>
                    <input
                      id="email"
                      name="Email"
                      type="email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full py-4 px-4 rounded-lg border border-gray-300 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[#C8C1F0] font-medium">Subject</label>
                  <input
                    id="subject"
                    name="Subject"
                    type="text"
                    value={formData.Subject}
                    onChange={handleChange}
                    required
                    placeholder="Enter message subject"
                    className="w-full py-4 px-4 rounded-lg border border-gray-300 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[#C8C1F0] font-medium">Message</label>
                  <textarea
                    id="message"
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your message"
                    rows={4}
                    className="w-full py-4 px-4 rounded-lg border border-gray-300 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-[rgba(255,255,255,0.06)] text-[#F8F7FF] rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-5 text-lg font-semibold text-white bg-red-700 hover:bg-red-800 transition-all duration-300 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Now <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-sm text-[#9B8DE3] text-center">
                We'll get back to you within 24 hours<br />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;