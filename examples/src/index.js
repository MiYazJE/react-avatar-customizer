import React from 'react';
import { render } from 'react-dom';
import AvatarCustomizer from '../../src/components/AvatarCustomizer/AvatarCustomizer.jsx';

const App = () => {
    const saveAvatar = (avatar) => {
        console.log(avatar);
    }

    return (
        <>
            <AvatarCustomizer onChange={saveAvatar} />
        </>
    );
};

render(<App />, document.getElementById('root'));
