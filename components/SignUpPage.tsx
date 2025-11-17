import React, { useState, useRef } from 'react';
import Button from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { ShopIcon, TrashIcon, User as UserIcon, CheckCircleIcon, SparklesIcon } from './icons/Icons';
import type { User } from '../types';


const SignUpPage: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<Omit<User, 'id'> & { password: string }>>({
        taxRate: 5,
        businessCategory: 'grocery',
        themePreference: 'vibrant',
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDataChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleDataChange('shopLogo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeLogo = () => {
        handleDataChange('shopLogo', undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { email, password, name, shopName, shopAddress, taxRate, businessCategory, themePreference } = formData;
        if (!email || !password || !name || !shopName || !shopAddress || taxRate === undefined || !businessCategory || !themePreference) {
            setError('Please fill out all required fields.');
            return;
        }
        const result = signup(formData as Omit<User, 'id'> & {password: string});
        if (!result.success) {
            if (result.error === 'This email is already registered. Please log in instead.') {
                setError(t('signup.email_exists_error'));
            } else {
                setError(result.error || 'An unknown error occurred during sign-up.');
            }
             setStep(1); // Go back to the first step on error
        }
    };

    const steps = [
        { num: 1, title: "Account Details" },
        { num: 2, title: "Your Business" },
        { num: 3, title: "Confirmation" }
    ];

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-slate-950">
            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://storage.googleapis.com/aistudio-hosting/images/b6f51c77-0331-4171-88f3-80b3d5b94f6e.png')"}}
                ></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white to-primary-200 text-transparent bg-clip-text">Samagra360</span>
                    </h1>
                    <p className="mt-4 text-lg text-primary-200 max-w-md">
                    Join thousands of smart retailers streamlining their business.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center p-6 sm:py-12 w-full">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-white">
                            Create Your Account
                        </h2>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        {steps.map((s, index) => (
                            <React.Fragment key={s.num}>
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.num ? 'bg-primary-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                        {step > s.num ? <CheckCircleIcon className="w-5 h-5" /> : s.num}
                                    </div>
                                    <p className={`mt-2 text-xs font-medium ${step >= s.num ? 'text-white' : 'text-slate-500'}`}>{s.title}</p>
                                </div>
                                {index < steps.length - 1 && <div className={`flex-1 h-0.5 mt-[-1rem] transition-all duration-300 ${step > s.num ? 'bg-primary-500' : 'bg-slate-700'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        {step === 1 && <Step1 formData={formData} onChange={handleDataChange} />}
                        {step === 2 && <Step2 formData={formData} onChange={handleDataChange} fileInputRef={fileInputRef} onLogoChange={handleLogoChange} onRemoveLogo={removeLogo} />}
                        {step === 3 && <Step3 formData={formData} />}

                        {error && <p className="text-red-400 text-sm text-center bg-red-900/30 p-3 rounded-lg">{error}</p>}
                        
                        <div className="flex justify-between items-center pt-4">
                            {step > 1 ? (
                                <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>
                            ) : <div></div>}
                            
                            {step < 3 ? (
                                <Button type="button" onClick={nextStep}>Next</Button>
                            ) : (
                                <Button type="submit" className="w-full !py-3 !text-base">Create Account</Button>
                            )}
                        </div>

                         <div className="text-center text-sm pt-6">
                            <p className="text-slate-400">
                                {t('signup.has_account')}{' '}
                                <button type="button" onClick={onSwitchToLogin} className="font-medium text-primary-400 hover:text-primary-300 focus:outline-none focus:underline">
                                    {t('signup.login_link')}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


const formInputStyle = "w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition";

// --- Step 1 Component ---
const Step1 = ({ formData, onChange }: { formData: any, onChange: (field: string, value: any) => void }) => (
    <fieldset className="space-y-4 p-4 border border-slate-800 rounded-lg animate-fade-in">
        <legend className="text-sm font-semibold px-2 text-slate-400 flex items-center gap-2"><UserIcon className="w-4 h-4" /> Account Credentials</legend>
        <input type="text" placeholder="Your Name*" value={formData.name || ''} onChange={(e) => onChange('name', e.target.value)} className={formInputStyle} required />
        <input type="email" placeholder="Email Address*" value={formData.email || ''} onChange={(e) => onChange('email', e.target.value)} className={formInputStyle} required />
        <input type="password" placeholder="Password*" value={formData.password || ''} onChange={(e) => onChange('password', e.target.value)} className={formInputStyle} required />
    </fieldset>
);

// --- Step 2 Component ---
const Step2 = ({ formData, onChange, fileInputRef, onLogoChange, onRemoveLogo }: { formData: any, onChange: (field: string, value: any) => void, fileInputRef: any, onLogoChange: any, onRemoveLogo: any }) => (
    <div className="space-y-6 animate-fade-in">
        <fieldset className="space-y-4 p-4 border border-slate-800 rounded-lg">
            <legend className="text-sm font-semibold px-2 text-slate-400 flex items-center gap-2"><ShopIcon className="w-4 h-4"/> Business Details</legend>
            <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border-2 border-dashed border-slate-700 overflow-hidden group transition-all duration-300 hover:border-primary-500">
                    {formData.shopLogo ? <img src={formData.shopLogo} alt="Shop Logo" className="w-full h-full object-cover" /> : <ShopIcon className="w-12 h-12 text-slate-500 transition-colors group-hover:text-primary-500" />}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={onLogoChange} className="hidden" />
                <div>
                    <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()} className="!text-xs !py-1.5 !px-3">{formData.shopLogo ? "Change Logo" : "Upload Logo"}</Button>
                    {formData.shopLogo && <button type="button" onClick={onRemoveLogo} className="ml-2 text-slate-500 hover:text-red-400 transition p-1"><TrashIcon className="w-4 h-4" /></button>}
                </div>
            </div>
            <input type="text" placeholder="Shop Name*" value={formData.shopName || ''} onChange={(e) => onChange('shopName', e.target.value)} className={formInputStyle} required />
            <textarea placeholder="Shop Address*" value={formData.shopAddress || ''} onChange={(e) => onChange('shopAddress', e.target.value)} className={`${formInputStyle} min-h-[60px]`} rows={2} required />
            <select value={formData.businessCategory} onChange={(e) => onChange('businessCategory', e.target.value)} className={formInputStyle} required>
                <option value="grocery">Grocery & Retail</option>
                <option value="pharmacy">Pharmacy / Medical</option>
                <option value="electronics">Electronics</option>
                <option value="hardware">Hardware</option>
                <option value="other">Other</option>
            </select>
        </fieldset>

        <fieldset className="space-y-4 p-4 border border-slate-800 rounded-lg">
             <legend className="text-sm font-semibold px-2 text-slate-400 flex items-center gap-2"><SparklesIcon className="w-4 h-4"/> Personalize</legend>
             <p className="text-sm text-slate-400 text-center">Choose a style for your dashboard.</p>
             <div className="flex gap-4">
                <button type="button" onClick={() => onChange('themePreference', 'vibrant')} className={`flex-1 p-4 rounded-lg border-2 transition-all ${formData.themePreference === 'vibrant' ? 'border-primary-500 bg-primary-900/20' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}>
                    <span className="font-bold text-white">Vibrant</span>
                    <p className="text-xs text-slate-400">A colorful, energetic look.</p>
                </button>
                 <button type="button" onClick={() => onChange('themePreference', 'professional')} className={`flex-1 p-4 rounded-lg border-2 transition-all ${formData.themePreference === 'professional' ? 'border-primary-500 bg-primary-900/20' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}>
                    <span className="font-bold text-white">Professional</span>
                    <p className="text-xs text-slate-400">A clean, modern feel.</p>
                </button>
             </div>
        </fieldset>
    </div>
);


// --- Step 3 Component ---
const Step3 = ({ formData }: { formData: any }) => (
    <div className="space-y-4 text-slate-300 animate-fade-in text-center p-4">
        <CheckCircleIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white">Ready to Go!</h3>
        <p>Review your details below and click "Create Account" to get started.</p>
        <div className="text-left bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-2 text-sm">
            <p><strong>Shop:</strong> {formData.shopName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Category:</strong> <span className="capitalize">{formData.businessCategory}</span></p>
        </div>
    </div>
);

export default SignUpPage;

// Add keyframes for fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);