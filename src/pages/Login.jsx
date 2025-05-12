import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const OTP_LENGTH = 4;

const Login = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setAnimating(true);
    setTimeout(() => {
      setStep('otp');
      setAnimating(false);
    }, 400);
  };

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/\D/, '');
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1 && value) {
      otpRefs.current[idx + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1].focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    navigate('/home');
  };

  const handleBack = () => {
    setAnimating(true);
    setTimeout(() => {
      setStep('phone');
      setAnimating(false);
    }, 400);
  };

  return (
    <div className="login-container">
      <div className={`login-box slide-${step}${animating ? ' animating' : ''}`}>  
        {step === 'phone' && (
          <div className="slide-content">
            <h2 className="login-title">Login to Your Account</h2>
            <p className="login-subtitle">Enter your phone number to receive a verification code</p>
            <form onSubmit={handlePhoneSubmit}>
              <div className="form-group phone-group">
                <div className="phone-input-wrapper">
                  <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="country-code-select">
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                    <option value="+44">+44</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="phone-input"
                  />
                </div>
              </div>
              <button type="submit" className="login-button send-otp-button">
                Send OTP
              </button>
            </form>
          </div>
        )}
        {step === 'otp' && (
          <div className="slide-content">
            <h2 className="login-title">Verify Your Number</h2>
            <p className="login-subtitle">We've sent a code to <b>{countryCode}{phone}</b></p>
            <form onSubmit={handleOtpSubmit}>
              <div className="form-group" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1.2rem 0' }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="otp-input-box"
                    value={digit}
                    onChange={e => handleOtpChange(e, idx)}
                    onKeyDown={e => handleOtpKeyDown(e, idx)}
                    ref={el => otpRefs.current[idx] = el}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button type="submit" className="login-button send-otp-button">
                Verify & Login
              </button>
            </form>
            {/* <div className="login-terms" style={{ marginTop: '1.2rem' }}>
              <span>Didn't receive the code?</span><br />
              <a href="#" className="login-link">Resend Code</a>
            </div> */}
            <div className="login-terms" style={{ marginTop: '0.7rem' }}>
              <a href="#" className="login-link" onClick={handleBack}>&larr; Back to phone number</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login; 