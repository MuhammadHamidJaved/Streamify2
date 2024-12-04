
'use client';
import ProfileModal from '@/components/Profile/ProfileModal';
import React from 'react';
import '@/styles/profile.css';

const ProfilePage: React.FC = () => {
    return (
        <div className='profilePageContainer'>
            <h1 className='profileHeading'>Profile Page</h1>
            <p className='profileSubHeading'>Click the button below to view your profile</p>
            <ProfileModal />
        </div>
    );
};

export default ProfilePage;