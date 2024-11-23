
import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Log from './Log';
import './AdventModal.css';


const AdventModal = ({ open, setOpen, selectedDistance, users }) => {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const currentUser = localStorage.getItem('userId')
    const you = users.find(user => user.userId === currentUser);
    const youWalked = Boolean(you?.date);

    const wordNums = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen", "Twenty", "Twenty-one", "Twenty-two", "Twenty-three", "Twenty-four"
    ]    


    const getUserProfile = (userId, profilePicture, date) => {
        const youClass = userId === currentUser ? "you" : "";
        const profileClasses = [
            "user-profile", 
            youClass,
            youWalked ? "walked" : "do-better"

        ]
        return (
            <div className={profileClasses.join(" ")} key={userId}>
                <div className={`profile-picture ${youClass}`}>
                    <img
                        src={profilePicture}
                        alt={userId}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="user-name">
                    {userId}
                </div>
                {
                    <div className="user-date">
                        {date}
                    </div>
                }
                
            </div>
        )
    }

    const getLogSection = () => {
        if (youWalked) {
            return (
                <div>You’ve already walked eleven kilometers. Slay.</div>
            )
        }

        return (
            <div>
                Log a new entry! Choose the date that you walked this distance from the picker below. 
                <Log distance={selectedDistance}/>
            </div>
        )

    }
    if (!open) return null;

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle className="font-semibold text-gray-900 km-title">
                                    {`${wordNums[selectedDistance]} Kilometer${selectedDistance > 1 ? 's' : ''}`}
                                </DialogTitle>
                                <div className={"advent-model-body " + (youWalked ? "walked" : "do-better")}>
                                    {getLogSection()}
                                    <div className="user-profiles-container">
                                        {
                                            users.sort((a, b) => {
                                                if (a.userId === currentUser) return -1;
                                                if (b.userId === currentUser) return 1;
                                                return a.userId - b.userId;
                                            }).map((user) => (
                                                getUserProfile(user.userId, `/assets/${user.userId}.jpeg`, user.date)
                                            ))
                                        }
                                    </div>
                                </div>
 
                            </div>
                        </div>
                    </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AdventModal;
