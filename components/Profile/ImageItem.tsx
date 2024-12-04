import React from 'react';

interface Image {
    id: number;
    image: string;
}

const ImageItem: React.FC<{ image: Image; isSelected: boolean; onClick: () => void }> = ({
    image,
    isSelected,
    onClick,
}) => (
    <div className={`image-box ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <img src={image.image} alt="Selectable" className="box-image" />
    </div>
);

export default ImageItem;
