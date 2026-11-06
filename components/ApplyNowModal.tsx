'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Import your Supabase client

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyNowModal({ isOpen, onClose }: ApplyNowModalProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    studentName: '',
    mobile: '',
    grade: 'Grade I',
    session: '2027-2028'
  });

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-digit characters and truncate to exactly 10 digits
    const cleanedDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm({ ...form, mobile: cleanedDigits });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate 10-digit mobile number before submission
    if (form.mobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      // Insert directly into Supabase table 'admissions_leads'
      const { error } = await supabase.from('admissions_leads').insert([
        {
          student_name: form.studentName,
          mobile: form.mobile,
          grade: form.grade,
          session: form.session,
          source: 'apply-now-modal',
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase insertion error:', err.message);
      setErrorMsg('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setForm({
      studentName: '',
      mobile: '',
      grade: 'Grade I',
      session: '2027-2028'
    });
    setSubmitted(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-gray-100"
          >
            <button 
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-slate-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0041F5]">ADMISSIONS OFFICE</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Quick Admission Inquiry</h3>
                  <p className="text-xs text-gray-500">Share your details and our team will get in touch with you shortly.</p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Student's Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={form.studentName}
                      onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                      placeholder="e.g. Aarav Sharma" 
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#0041F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Mobile Number (10 Digits)</label>
                    <input 
                      type="tel" 
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={form.mobile}
                      onChange={handleMobileChange}
                      placeholder="e.g. 9876543210" 
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#0041F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Class / Grade for Admission</label>
                    <select 
                      value={form.grade}
                      onChange={(e) => setForm({ ...form, grade: e.target.value })}
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#0041F5]"
                    >
                      <option>Pre-Nursery</option>
                      <option>Nursery</option>
                      <option>LKG / Kindergarten</option>
                      <option>UKG</option>
                      <option>Grade I</option>
                      <option>Grade II</option>
                      <option>Grade III</option>
                      <option>Grade IV</option>
                      <option>Grade V</option>
                      <option>Grade VI</option>
                      <option>Grade VII</option>
                      <option>Grade VIII</option>
                      <option>Grade IX</option>
                      <option>Grade X</option>
                      <option>Grade XI</option>
                      <option>Grade XII</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0041F5] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-[#0041F5]/10 flex items-center justify-center gap-2 mt-2 text-sm disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900">We've Received Your Request!</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Thank you. Our admissions counselor will call <span className="font-bold text-slate-900">{form.studentName}'s</span> parent on <span className="font-bold text-slate-900">+91 {form.mobile}</span> within 24 hours.
                  </p>
                </div>

                <button 
                  onClick={handleResetAndClose}
                  className="bg-[#0041F5] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}