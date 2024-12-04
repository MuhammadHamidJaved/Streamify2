import React from 'react';
import '@/styles/profile.css';

interface Profile {
    id: number;
    name: string;
    image: string;
}

const ProfileItem: React.FC<{ profile: Profile; onProfileClick: (profile: Profile) => void }> = ({
    profile,
    onProfileClick,
}) => (
    <div className="profile-box" onClick={() => onProfileClick(profile)}>
        <img src={profile.image} alt={profile.name} className="profile-image" />
        <div className="profile-name">{profile.name}</div>
    </div>
);

export default ProfileItem;
