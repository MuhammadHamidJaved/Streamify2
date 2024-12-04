import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageItem from './ImageItem';
import '@/styles/profile.css';

interface Profile {
    id: number;
    name: string;
    image: string;
}

interface Image {
    id: number;
    image: string;
}

const Images: Image[] = [
    { id: 1, image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/68a139b3-5621-4c27-9296-df2984c9051b/de6k0e9-71c9be2e-0884-456f-addf-8b3dabdfe1e9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY4YTEzOWIzLTU2MjEtNGMyNy05Mjk2LWRmMjk4NGM5MDUxYlwvZGU2azBlOS03MWM5YmUyZS0wODg0LTQ1NmYtYWRkZi04YjNkYWJkZmUxZTkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TB9Y2SHgw1RvVttqB0XATYWdUn90E0qBWyQWWwKN6HY' },
    { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYN9QgpAJhM4bFK7VlJ_XKO3x3XnRQ6APpOwA3aa6yhH_7vaPbxy7pGTWO3Vw5W6t66k&usqp=CAU' },
    { id: 3, image: 'https://storage.googleapis.com/pod_public/1300/117919.jpg' },
];

const ProfileForm: React.FC<{ onSubmit: (profile: Profile) => void }> = ({ onSubmit }) => {
    const [newProfile, setNewProfile] = useState<Profile>({ id: 0, name: '', image: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProfile({ ...newProfile, [name]: value });
    };

    const handleImageSelect = (image: string) => {
        setNewProfile({ ...newProfile, image: image });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        onSubmit({ ...newProfile, id: Date.now() });
        setNewProfile({ id: 0, name: '', image: '' });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProfileName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={newProfile.name}
                    onChange={handleChange}
                    required
                    className="form-control-custom"
                />
            </Form.Group>
            <div className="image-container">
                {Images.map((image) => (
                    <ImageItem
                        key={image.id}
                        image={image}
                        isSelected={newProfile.image === image.image}
                        onClick={() => handleImageSelect(image.image)}
                    />
                ))}
            </div>
            <Button variant="primary" type="submit" className="btn-custom">
                Save Profile
            </Button>
        </Form>
    );
};

export default ProfileForm;
