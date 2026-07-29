'use client';

import React, { useEffect, useState } from 'react';
import { authClient } from '../../../lib/auth-client';
import { Eye, Trash2, Loader2, BookOpen, X, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast'; 
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface Enrollment {
  _id: string;
  resourceId: string;
  resourceTitle: string;
  totalPrice: number;
  institute: string;
  age: number;
  wantsHardcopy: boolean;
  address?: string;
  status: string;
  createdAt: string;
}

export default function SavedEnrollmentsPage() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const user = session?.user;

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<Enrollment | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch user enrollments
  useEffect(() => {
    if (!user) return;

    const fetchEnrollments = async () => {
      try {
        const res = await fetch(`${API_URL}/api/enrollments`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setEnrollments(data);
        }
      } catch (err) {
        console.error('Failed to load enrollments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user, API_URL]);

  // Handle Delete
  const confirmDelete = async () => {
  if (!deleteTargetId) return;

  setDeletingId(deleteTargetId);
  try {
    const res = await fetch(`${API_URL}/api/enrollments/${deleteTargetId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setEnrollments((prev) => prev.filter((item) => item._id !== deleteTargetId));
      if (selectedItem?._id === deleteTargetId) setSelectedItem(null);
      toast.success('Enrollment deleted successfully!');
    } else {
      const errorData = await res.json().catch(() => ({}));
      toast.error(errorData.error || 'Failed to delete enrollment.');
    }
  } catch (err) {
    console.error('Delete error:', err);
    toast.error('Something went wrong. Please try again.');
  } finally {
    setDeletingId(null);
    setDeleteTargetId(null); // Close modal
  }
};

  // Auth Guard Loading
  if (isSessionLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1F4B43]" />
      </div>
    );
  }

  // Auth Guard Unauthorized
  if (!user) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-600" />
        <h2 className="mt-4 text-2xl font-bold text-[#2D2A26]">Access Denied</h2>
        <p className="mt-2 text-sm text-[#6F665B]">You must be signed in to view your saved enrollments.</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-[#1F4B43] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#173B35]"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] px-4 py-8 sm:px-8 mt-20">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#2D2A26]">My Saved Enrollments</h1>
          <p className="text-sm text-[#6F665B]">Manage your enrolled courses and resources</p>
        </div>

        {/* Content State */}
        {loading ? (
          <div className="flex py-20 justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#1F4B43]" />
          </div>
        ) : enrollments.length === 0 ? (
          <div className="rounded-3xl border border-[#EEE8DE] bg-[#F8F4EC]/50 p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-[#6F665B]" />
            <h3 className="mt-4 text-lg font-bold text-[#2D2A26]">No Saved Enrollments</h3>
            <p className="mt-1 text-xs text-[#6F665B]">Explore our resources and enroll today.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-[#EEE8DE] bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8F4EC] text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                  <tr>
                    <th className="p-4">Course / Resource</th>
                    <th className="p-4">Institute</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEE8DE]">
                  {enrollments.map((item) => (
                    <tr key={item._id} className="hover:bg-[#FFFDF9] transition-colors">
                      <td className="p-4 font-bold text-[#2D2A26]">
                        {item.resourceTitle}
                        {item.wantsHardcopy && (
                          <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800">
                            Hardcopy
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-[#6F665B]">{item.institute}</td>
                      <td className="p-4 font-extrabold text-[#1F4B43]">${item.totalPrice}</td>
                      <td className="p-4 text-xs text-[#6F665B]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#EEE8DE] bg-white px-3 py-1.5 text-xs font-semibold text-[#1F4B43] hover:bg-[#F8F4EC]"
                        >
                          <Eye size={14} /> View
                        </button>
                        {/* <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId === item._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          Delete
                        </button> */}

                        <button
  onClick={() => setDeleteTargetId(item._id)}
  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
>
  <Trash2 size={14} /> Delete
</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View (Visible on mobile only) */}
            <div className="grid gap-4 md:hidden">
              {enrollments.map((item) => (
                <div key={item._id} className="rounded-2xl border border-[#EEE8DE] bg-white p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#2D2A26]">{item.resourceTitle}</h3>
                      <p className="text-xs text-[#6F665B]">{item.institute}</p>
                    </div>
                    <span className="font-extrabold text-[#1F4B43]">${item.totalPrice}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EEE8DE]">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-xl border border-[#EEE8DE] bg-[#F8F4EC] py-2 text-xs font-bold text-[#1F4B43]"
                    >
                      <Eye size={14} /> View Details
                    </button>
                    <button
  onClick={() => setDeleteTargetId(item._id)}
  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
>
  <Trash2 size={14} /> Delete
</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* View Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl border border-[#EEE8DE] bg-white p-6 shadow-xl">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F4EC] text-[#6F665B]"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-[#2D2A26]">Enrollment Details</h3>
              
              <div className="mt-4 space-y-3 text-sm text-[#2D2A26]">
                <div className="rounded-2xl bg-[#F8F4EC] p-4 space-y-1">
                  <span className="text-xs font-semibold text-[#6F665B]">Course Title</span>
                  <p className="font-bold text-[#1F4B43]">{selectedItem.resourceTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-[#EEE8DE] p-3">
                    <span className="text-[#6F665B]">School/Institute:</span>
                    <p className="font-bold mt-1">{selectedItem.institute}</p>
                  </div>
                  <div className="rounded-xl border border-[#EEE8DE] p-3">
                    <span className="text-[#6F665B]">Student Age:</span>
                    <p className="font-bold mt-1">{selectedItem.age} years</p>
                  </div>
                  <div className="rounded-xl border border-[#EEE8DE] p-3">
                    <span className="text-[#6F665B]">Total Paid:</span>
                    <p className="font-bold text-[#1F4B43] mt-1">${selectedItem.totalPrice}</p>
                  </div>
                  <div className="rounded-xl border border-[#EEE8DE] p-3">
                    <span className="text-[#6F665B]">Hardcopy Book:</span>
                    <p className="font-bold mt-1">{selectedItem.wantsHardcopy ? 'Yes (Included)' : 'No'}</p>
                  </div>
                </div>

                {selectedItem.wantsHardcopy && selectedItem.address && (
                  <div className="rounded-xl border border-[#EEE8DE] p-3 text-xs">
                    <span className="text-[#6F665B]">Delivery Address:</span>
                    <p className="font-medium mt-1">{selectedItem.address}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-full bg-[#1F4B43] py-2.5 text-xs font-bold text-white hover:bg-[#173B35]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
{deleteTargetId && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
    <div className="relative w-full max-w-sm rounded-3xl border border-[#EEE8DE] bg-white p-6 shadow-2xl text-center space-y-4">
      
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertTriangle size={28} />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#2D2A26]">Delete Enrollment</h3>
        <p className="mt-1 text-xs text-[#6F665B]">
          Are you sure you want to remove this item? This action cannot be undone.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => setDeleteTargetId(null)}
          disabled={Boolean(deletingId)}
          className="flex-1 rounded-full border border-[#EEE8DE] bg-[#F8F4EC] py-2.5 text-xs font-bold text-[#6F665B] hover:bg-[#EEE8DE]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={confirmDelete}
          disabled={Boolean(deletingId)}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {deletingId ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </div>

    </div>
  </div>
)}

      </div>
    </div>
  );
}