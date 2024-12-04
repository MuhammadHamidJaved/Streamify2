



import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import ProfileForm from './ProfileForm';
import ProfileItem from './ProfileItem';
import ModalConfirm from '../Shared/ModalConfirm';
import ProfileService from '@/services/ProfileService';
import '@/styles/profile.css';

interface Profile {
    id: number;
    name: string;
    image: string;
}

const ProfileModal: React.FC = () => {
    const [show, setShow] = useState(false);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [confirmShow, setConfirmShow] = useState(false);

    useEffect(() => {
        ProfileService.getProfiles()
            .then(setProfiles)
            .catch((error) => console.error('Error fetching profiles:', error));
    }, []);

    const handleCreateProfile = async (newProfile: Profile) => {
        try {
            const createdProfile = await ProfileService.createProfile(newProfile);
            setProfiles([...profiles, createdProfile]);
            handleClose();
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleProfileClick = (profile: Profile) => {
        setSelectedProfile(profile);
        setConfirmShow(true);
    };

    const handleConfirm = () => {
        if (selectedProfile) {
            localStorage.setItem('selectedProfileId', selectedProfile.id.toString());
            window.location.href = '/pages';
        }
        setConfirmShow(false);
    };

    return (
        <>
            <div className="profile-container">
                {profiles.map((profile) => (
                    <ProfileItem key={profile.id} profile={profile} onProfileClick={handleProfileClick} />
                ))}
                <div className="profile-box add-profile" onClick={handleShow}>
                    <FaPlus size={50} />
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm onSubmit={handleCreateProfile} />
                </Modal.Body>
            </Modal>

            <ModalConfirm
                show={confirmShow}
                onCancel={() => setConfirmShow(false)}
                onConfirm={handleConfirm}
                message="Are you sure you want to select this profile?"
            />
        </>
    );
};

export default ProfileModal;
