import React, { useRef } from 'react';
import { render } from 'react-dom';
import AvatarCustomizer from '../../src/components/AvatarCustomizer/AvatarCustomizer.jsx';
import './index.scss';

const App = () => {
    const avatarRef = useRef();
    
    const saveAvatar = (avatar) => {
        console.log(avatar);
    }

    const getImage = () => {
        const url = avatarRef.current.getUrlImage();
        console.log(url);
    }

    const randomGenerate = () => {
        avatarRef.current.generateRandomly();
    }

    return (
        <>
            <AvatarCustomizer ref={avatarRef} onChange={saveAvatar} />
            <div className="options">
                <button onClick={getImage}>Get url image</button>
                <button onClick={randomGenerate}>Random Generate</button>
            </div>
        </>
    );
};

render(<App />, document.getElementById('root'));
