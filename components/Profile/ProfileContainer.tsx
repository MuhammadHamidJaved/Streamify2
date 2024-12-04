// import React, { useEffect, useState } from 'react';
// import ProfileItem from './ProfileItem';
// import ProfileModal from './ProfileModal';
// import axiosInstance from '@/app/utils/axiosInstance';

// const ProfileContainer: React.FC = () => {
//     const [profiles, setProfiles] = useState<any[]>([]);

//     useEffect(() => {
//         const fetchProfiles = async () => {
//             try {
//                 const response = await axiosInstance.get('/profiles/');
//                 setProfiles(response.data);
//             } catch (error) {
//                 console.error('Error fetching profiles:', error);
//             }
//         };
//         fetchProfiles();
//     }, []);

//     const handleCreateProfile = (profile: any) => {
//         setProfiles([...profiles, profile]);
//     };

//     return (
//         <div className="profile-container">
//             {profiles.map((profile) => (
//                 <ProfileItem key={profile.id} profile={profile} onProfileClick={() => console.log(profile)} />
//             ))}
//             <ProfileModal onCreate={handleCreateProfile} />
//         </div>
//     );
// };

// export default ProfileContainer;
