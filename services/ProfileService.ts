import axiosInstance from '@/app/utils/axiosInstance';

interface Profile {
    id: number;
    name: string;
    image: string;
}

const ProfileService = {
    getProfiles: async (): Promise<Profile[]> => {
        const response = await axiosInstance.get('/profiles/');
        return response.data.map((profile: any) => ({
            id: profile.id,
            name: profile.name,
            image: profile.image_url,
        }));
    },
    createProfile: async (profile: Profile): Promise<Profile> => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user) throw new Error('User not found in localStorage');

        const response = await axiosInstance.post('/profiles/', {
            user: user.id,
            name: profile.name,
            image_url: profile.image,
        });
        return response.data;
    },
};

export default ProfileService;
