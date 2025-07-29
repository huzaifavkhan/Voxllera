import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import '../index.css';
import '../styles.css';

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxU5VCkVcCl9QL_oatnVaDkCS03bvLnk4pCkJ0NLkBWjNPcvxHk9Xpl4cYGxGRgRIq1/exec';

const Signup = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [clinicName, setClinicName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clinicType, setClinicType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactPerson || !email || !phoneNumber) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(SHEET_URL, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'signup',
          clinicName,
          contactPerson,
          email,
          phoneNumber,
          clinicType,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(result.message || 'Signup failed. Try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="h-20 w-20 mb-6 animate-pulse" />
          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-teal-400 via-blue-500 to-rose-400 animate-slide" />
          </div>

          <style jsx="true">{`
            @keyframes slide {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-slide {
              animation: slide 1.5s infinite linear;
            }
          `}</style>
        </div>
      )}

      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-red-100 text-slate-800 font-sans px-4 py-10 flex justify-center items-center"
      >
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-16 w-16" />
          </div>

          <h2 className="bg-gradient-to-r from-sky-800 via-teal-800 to-rose-800 bg-clip-text text-transparent block text-2xl font-bold text-center mb-2">
            Get Started Today
          </h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            Voxllera – The Smart AI Receptionist for Clinics
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-600">
                Contact Person <span className="text-red-500">*</span>
              </label>

              <div className="mt-1 rounded-xl transition-all">
                <div className="group focus-within:bg-gradient-to-r focus-within:from-sky-300 focus-within:via-teal-300 focus-within:to-rose-300 p-[2px] rounded-xl appearance-none">
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Dr. John Smith"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none appearance-none"
                    required
                  />
                </div>
              </div>
            </div>


            <div>
              <label className="text-sm font-bold text-gray-600">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 rounded-xl transition-all">
                <div className="group focus-within:bg-gradient-to-r focus-within:from-sky-300 focus-within:via-teal-300 focus-within:to-rose-300 p-[2px] rounded-xl appearance-none">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@clinic.com"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none appearance-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 rounded-xl transition-all">
                <div className="group focus-within:bg-gradient-to-r focus-within:from-sky-300 focus-within:via-teal-300 focus-within:to-rose-300 p-[2px] rounded-xl appearance-none">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (800) 555-1234"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none appearance-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Clinic Name</label>
              <div className="mt-1 rounded-xl transition-all">
                <div className="group focus-within:bg-gradient-to-r focus-within:from-sky-300 focus-within:via-teal-300 focus-within:to-rose-300 p-[2px] rounded-xl appearance-none">
                  <input
                    type="text"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="Dr. Smith's Clinic"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-bold text-gray-600">Clinic Type</label>
              <div className="mt-1 rounded-xl transition-all">
                <div className="group focus-within:bg-gradient-to-r focus-within:from-sky-300 focus-within:via-teal-300 focus-within:to-rose-300 p-[2px] rounded-xl appearance-none">
                  <select
                    value={clinicType}
                    onChange={(e) => setClinicType(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm pr-10 focus:outline-none appearance-none"
                  >
                    <option value="">Select clinic type</option>
                    <option value="Dental">Dental</option>
                    <option value="GP">GP</option>
                    <option value="Pediatric">Pediatric</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="pointer-events-none absolute right-3 top-9 text-gray-500">▼</div>
              </div>
            </div>


            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
