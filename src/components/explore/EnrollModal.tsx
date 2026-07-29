'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { authClient } from '../../../lib/auth-client';
import { X, CheckCircle2, BookOpen, GraduationCap, MapPin, Sparkles, Loader2, LogIn } from 'lucide-react';

export interface ResourceDetail {
    id: string | number;
    title: string;
    price: number;
}

interface EnrollModalProps {
    resource: ResourceDetail;
}

export default function EnrollModal({ resource }: EnrollModalProps) {
    // Better Auth Live Session Hook
    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;

    // Modal & Form States
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        institute: '',
        age: '',
        wantsHardcopy: false,
        address: '',
    });

    // Ensure SSR safety for React Portal
    useEffect(() => { setMounted(true); }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const finalPrice = formData.wantsHardcopy ? resource.price + 15 : resource.price;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);

        const payload = {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            resourceId: resource.id,
            resourceTitle: resource.title,
            totalPrice: finalPrice,
            ...formData,
        };

        try {
            // Replace with your Express server URL or process.env.NEXT_PUBLIC_API_URL
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const res = await fetch(`${API_URL}/api/enrollments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Ensures Better Auth session cookies are sent with the cross-origin request
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                alert('Failed to submit enrollment. Please try again.');
            }
        } catch (error) {
            console.error('Enrollment error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsSuccess(false);
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full rounded-full bg-[#1F4B43] py-4 font-bold text-white transition-all hover:bg-[#173B35]"
            >
                Enroll Now
            </button>

            {/* Full Screen Portal */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black/60 p-4 backdrop-blur-md">
                    <div className="relative my-auto w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-[#EEE8DE] bg-[#FFFDF9] p-6 shadow-2xl sm:p-8">

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F4EC] text-[#6F665B] hover:bg-[#EEE8DE] transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* 1. LOADING STATE FROM BETTER AUTH */}
                        {isSessionLoading ? (
                            <div className="py-12 text-center space-y-3">
                                <Loader2 size={32} className="mx-auto animate-spin text-[#1F4B43]" />
                                <p className="text-sm font-semibold text-[#6F665B]">Fetching account details...</p>
                            </div>
                        ) : !user ? (
                            /* 2. NOT LOGGED IN WARNING */
                            <div className="py-8 text-center space-y-4">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                    <LogIn size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D2A26]">Sign in Required</h3>
                                <p className="text-xs text-[#6F665B] max-w-xs mx-auto">
                                    You must be logged in to enroll in this course.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="rounded-full bg-[#1F4B43] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#173B35]"
                                >
                                    Close & Log In
                                </button>
                            </div>
                        ) : !isSuccess ? (
                            /* 3. ENROLLMENT FORM WITH REAL MONODB DATA */
                            <>
                                <div className="pr-8">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#D8A34D]">
                                        Course Enrollment
                                    </span>
                                    <h2 className="mt-1 text-2xl font-extrabold text-[#2D2A26]">
                                        Confirm Your Order
                                    </h2>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                    {/* LIVE USER DATA FROM MONODB */}
                                    <div className="rounded-2xl border border-[#EEE8DE] bg-[#F8F4EC]/80 p-4 space-y-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F4B43]">
                                            <Sparkles size={14} />
                                            <span>Logged-in Account Details</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <span className="text-[#6F665B]">Student Name:</span>
                                                <p className="font-bold text-[#2D2A26]">{user.name}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#6F665B]">Email:</span>
                                                <p className="font-bold text-[#2D2A26] truncate">{user.email}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#6F665B]">Course:</span>
                                                <p className="font-bold text-[#1F4B43] truncate">{resource.title}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#6F665B]">Total Amount:</span>
                                                <p className="font-extrabold text-[#2D2A26]">
                                                    ${finalPrice}
                                                    {formData.wantsHardcopy && <span className="font-normal text-[10px] text-[#6F665B]"> (+$15 hardcopy)</span>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* USER INPUT FIELDS */}
                                    <div className="space-y-3 pt-1">
                                        {/* Institute */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                                                School / Institute Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative mt-1">
                                                <input
                                                    type="text"
                                                    name="institute"
                                                    required
                                                    value={formData.institute}
                                                    onChange={handleChange}
                                                    placeholder="e.g. University Name"
                                                    className="w-full rounded-xl border border-[#EEE8DE] bg-white py-2.5 pl-10 pr-4 text-sm text-[#2D2A26] outline-none focus:border-[#1F4B43]"
                                                />
                                                <GraduationCap size={18} className="absolute left-3 top-3 text-[#6F665B]" />
                                            </div>
                                        </div>

                                        {/* Age */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                                                Age <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="age"
                                                required
                                                min="10"
                                                max="100"
                                                value={formData.age}
                                                onChange={handleChange}
                                                placeholder="e.g. 21"
                                                className="mt-1 w-full rounded-xl border border-[#EEE8DE] bg-white px-4 py-2.5 text-sm text-[#2D2A26] outline-none focus:border-[#1F4B43]"
                                            />
                                        </div>

                                        {/* Hardcopy Checkbox */}
                                        <div className="rounded-xl border border-[#EEE8DE] bg-white p-3">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="wantsHardcopy"
                                                    checked={formData.wantsHardcopy}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 rounded text-[#1F4B43] focus:ring-[#1F4B43]"
                                                />
                                                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D2A26]">
                                                    <BookOpen size={16} className="text-[#1F4B43]" />
                                                    <span>Do you want a physical hardcopy book?</span>
                                                    <span className="font-bold text-[#1F4B43]">(+$15)</span>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Delivery Address */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                                                Delivery Address{' '}
                                                {formData.wantsHardcopy ? (
                                                    <span className="text-red-500">*</span>
                                                ) : (
                                                    <span className="font-normal text-gray-400">(Optional)</span>
                                                )}
                                            </label>
                                            <div className="relative mt-1">
                                                <textarea
                                                    name="address"
                                                    rows={2}
                                                    required={formData.wantsHardcopy}
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="Enter your address..."
                                                    className="w-full rounded-xl border border-[#EEE8DE] bg-white py-2.5 pl-10 pr-4 text-sm text-[#2D2A26] outline-none focus:border-[#1F4B43] resize-none"
                                                />
                                                <MapPin size={18} className="absolute left-3 top-3 text-[#6F665B]" />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F4B43] py-3.5 font-bold text-white transition-all hover:bg-[#173B35] disabled:opacity-60"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <span>Confirm Enrollment</span>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* 4. SUCCESS SCREEN */
                            <div className="my-8 text-center space-y-4">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                    <CheckCircle2 size={36} />
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#2D2A26]">Enrolled Successfully!</h3>
                                <p className="text-xs text-[#6F665B] max-w-xs mx-auto">
                                    Thank you, <strong>{user.name}</strong>! Your registration for <strong>{resource.title}</strong> has been saved.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-full bg-[#1F4B43] px-8 py-3 text-xs font-bold text-white hover:bg-[#173B35]"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}