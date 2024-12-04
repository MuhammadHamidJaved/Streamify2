// import React, { useEffect, useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { FaPlus } from 'react-icons/fa';
// import axiosInstance from '@/app/utils/axiosInstance';
// import '@/styles/profile.css';

// interface Profile {
//     id: number;
//     name: string;
//     image: string;
// }

// interface Image {
//     id: number;
//     image: string;
// }

// const Images: Image[] = [
//     {
//         id: 1,
//         image: 'https://images.stockcake.com/public/b/8/a/b8aeb7e5-1a18-4f18-b7ef-ea43f546db04_large/vibrant-artistic-profile-stockcake.jpg',
//     },
//     {
//         id: 2,
//         image: 'https://e0.pxfuel.com/wallpapers/403/702/desktop-wallpaper-dark-demon-ultra-red-and-black-demon-thumbnail.jpg',
//     },
//     {
//         id: 3,
//         image: 'https://storage.googleapis.com/pod_public/1300/117919.jpg',
//     },
// ];

// // ProfileItem Component
// const ProfileItem: React.FC<{
//     profile: Profile;
//     onProfileClick: (profile: Profile) => void;
// }> = ({ profile, onProfileClick }) => (
//     <div
//         className="profile-box"
//         onClick={() => onProfileClick(profile)}
//     >
//         <img src={profile.image} alt={profile.name} className="profile-image" />
//         <div className="profile-name">{profile.name}</div>
//     </div>
// );

// // ImageItem Component
// const ImageItem: React.FC<{
//     image: Image;
//     isSelected: boolean;
//     onClick: () => void;
// }> = ({ image, isSelected, onClick }) => (
//     <div
//         className={`image-box ${isSelected ? 'selected' : ''}`}
//         onClick={onClick}
//     >
//         <img src={image.image} alt="Selectable" className="box-image" />
//     </div>
// );

// // ProfileForm Component
// const ProfileForm: React.FC<{ onSubmit: (profile: Profile) => void }> = ({ onSubmit }) => {
//     const [newProfile, setNewProfile] = useState<Profile>({ id: 0, name: '', image: '' });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setNewProfile({ ...newProfile, [name]: value });
//     };

//     const handleImageSelect = (image: string) => {
//         setNewProfile({ ...newProfile, image });
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         onSubmit({ ...newProfile, id: Date.now() });
//         setNewProfile({ id: 0, name: '', image: '' });
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formProfileName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter name"
//                     name="name"
//                     value={newProfile.name}
//                     onChange={handleChange}
//                     required
//                     className="form-control-custom"
//                 />
//             </Form.Group>

//             <div className="image-container">
//                 {Images.map((image) => (
//                     <ImageItem
//                         key={image.id}
//                         image={image}
//                         isSelected={newProfile.image === image.image}
//                         onClick={() => handleImageSelect(image.image)}
//                     />
//                 ))}
//             </div>

//             <Button variant="primary" type="submit" className="btn-custom">
//                 Save Profile
//             </Button>
//         </Form>
//     );
// };

// // ProfileModal Component
// const ProfileModal: React.FC = () => {
//     const [show, setShow] = useState(false);
//     const [profiles, setProfiles] = useState<Profile[]>([]);
//     const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
//     const [confirmShow, setConfirmShow] = useState(false);

//     useEffect(() => {
//         const fetchProfiles = async () => {
//             try {
//                 const response = await axiosInstance.get('http://localhost:8000/profiles/');
//                 setProfiles(
//                     response.data.map((profile: any) => ({
//                         id: profile.id,
//                         name: profile.name,
//                         image: profile.image_url,
//                     }))
//                 );
//             } catch (error) {
//                 console.error('Error fetching profiles:', error);
//             }
//         };

//         fetchProfiles();
//     }, []);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const createProfile = async (newProfile: Profile) => {
//         try {
//             const user = JSON.parse(localStorage.getItem('user') || '{}');
//             if (!user) return;

//             const response = await axiosInstance.post('http://localhost:8000/profiles/', {
//                 user: user.id,
//                 name: newProfile.name,
//                 image_url: newProfile.image,
//             });
//             console.log('Profile created:', response.data);
//         } catch (error) {
//             console.error('Error creating profile:', error);
//         }
//     };

//     const handleCreateProfile = (newProfile: Profile) => {
//         createProfile(newProfile);
//         setProfiles([...profiles, newProfile]);
//         handleClose();
//     };

//     const handleProfileClick = (profile: Profile) => {
//         setSelectedProfile(profile);
//         setConfirmShow(true);
//     };

//     const handleConfirm = () => {
//         if (selectedProfile) {
//             localStorage.setItem('selectedProfileId', selectedProfile.id.toString());
//             console.log(`Profile ID ${selectedProfile.id} saved to localStorage.`);
//             window.location.href = '/pages';
//         }
//         setConfirmShow(false);
//     };

//     const handleCancel = () => {
//         setConfirmShow(false);
//     };

//     return (
//         <>
//             <div className="profile-container">
//                 {profiles.map((profile) => (
//                     <ProfileItem key={profile.id} profile={profile} onProfileClick={handleProfileClick} />
//                 ))}
//                 <div key="add-profile" className="profile-box add-profile" onClick={handleShow}>
//                     <FaPlus size={50} />
//                 </div>
//             </div>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create New Profile</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <ProfileForm onSubmit={handleCreateProfile} />
//                 </Modal.Body>
//             </Modal>

//             <Modal show={confirmShow} onHide={handleCancel}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Selection</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to select this profile?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCancel}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleConfirm}>
//                         Confirm
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default ProfileModal;



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
