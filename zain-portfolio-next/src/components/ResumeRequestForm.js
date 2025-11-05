/**
 * ResumeRequestForm.js
 * Purpose: Form component for requesting resume via email
 * Features: Name and email input with validation and submission
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResumeRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus('error');
      setMessage('Please fill out all fields');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/send-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus('success');
        setMessage(data.message || 'Resume sent successfully! Please check your email.');
        setFormData({ name: '', email: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send request. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-gradient-to-br from-light/80 to-light/60 dark:from-dark/80 dark:to-dark/60 backdrop-blur-xl rounded-xl shadow-lg border border-primary/10 dark:border-primaryDark/10 p-6 md:p-8">
        
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          {/* Name Field */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-dark dark:text-light font-medium mb-2 text-base"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border-2 border-dark/10 dark:border-light/10 rounded-lg 
                focus:border-primary dark:focus:border-primaryDark focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primaryDark/20
                text-dark dark:text-light placeholder-dark/40 dark:placeholder-light/40 text-sm
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-dark dark:text-light font-medium mb-2 text-base"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border-2 border-dark/10 dark:border-light/10 rounded-lg 
                focus:border-primary dark:focus:border-primaryDark focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primaryDark/20
                text-dark dark:text-light placeholder-dark/40 dark:placeholder-light/40 text-sm
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Status Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-sm ${
                status === 'success'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
              }`}
            >
              <p className="text-center font-medium">{message}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={status !== 'loading' && status !== 'success' ? { scale: 1.02 } : {}}
              whileTap={status !== 'loading' && status !== 'success' ? { scale: 0.98 } : {}}
              className={`w-32 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg
                ${
                  status === 'loading'
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-500 dark:bg-green-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary hover:opacity-90'
                }
                text-white disabled:opacity-70`}
            >
            {status === 'loading' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sent Successfully!
              </span>
            ) : (
              'Submit'
            )}
            </motion.button>
          </div>
        </motion.form>

      </div>
    </motion.div>
  );
}
