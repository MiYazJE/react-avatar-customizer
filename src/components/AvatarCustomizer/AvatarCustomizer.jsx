import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import Avatar from 'avataaars';
import AvatarOptions from './AvatarOptions';
import options from './options';
import './avatarCustomizer.scss';

const URL_IMG = 'https://avataaars.io/';

const AvatarCustomizer = forwardRef(({ avatar, hideOptions, onChange }, ref) => {
    const [indexes, setIndexes] = useState(avatar || {});
    const [avatarSelectors, setAvatarSelectors] = useState({
        topType: 'LongHairMiaWallace',
        eyeType: 'Happy',
        hairColor: 'BrownDark',
        mouthType: 'Smile',
        skinColor: 'Light',
        clotheType: 'Hoodie',
        clotheColor: 'PastelBlue',
        eyebrowType: 'Default',
        facialHairType: 'Blank',
        accessoriesType: 'Prescription02',
    });

    useEffect(() => {
        if (indexesAreEmpty()) {
            const obj = {};
            Object.keys(avatarSelectors).forEach((key) => (obj[key] = 0));
            setIndexes(obj);
        } else {
            initSelectedIndexes();
        }
    }, []);

    const indexesAreEmpty = () => Object.keys(indexes).length === 0;

    const initSelectedIndexes = () => {
        for (const key of Object.keys(indexes)) {
            const index = indexes[key];
            const selected = options[key][index];
            setAvatarSelectors({ ...avatarSelectors, [key]: selected });
        }
    };

    const handleChangeOption = (selector, plus) => {
        const index = indexes[selector];
        const maxIndex = options[selector].length;
        let newIndex = parseInt((index + plus) % maxIndex);
        if (newIndex < 0) newIndex = maxIndex - 1;
        indexes[selector] = newIndex;
        setIndexes(indexes);
        setAvatarSelectors({ ...avatarSelectors, [selector]: options[selector][newIndex] })
        if (onChange) {
            onChange(indexes);
        }
    };

    const generateRandomly = () => {
        for (const key of Object.keys(selectors)) {
            if (key === 'avatarStyle') continue;
            const maxLength = options[key].length;
            const randomIndex = parseInt(Math.random() * maxLength);
            const randomItem = options[key][randomIndex];
            setAvatarSelectors({ ...avatarSelectors, [key]: randomItem })
            indexes[key] = randomIndex;
        }
    };

    const save = () => {
        const imageUrl = getUrlImage();
        return { imageUrl, indexes };
    };

    useImperativeHandle(ref, () => ({
        save,
        generateRandomly,
    }));

    const getUrlImage = () => {
        let url = URL_IMG + '?';
        Object.keys(avatarSelectors).forEach((key, index) => {
            url += `${key}=${avatarSelectors[key]}`;
            if (index < Object.keys(avatarSelectors).length - 1) url += '&';
        });
        return url;
    };

    return (
        <div className="wrapAvatar">
            <div className="avatar">
                <Avatar
                    style={{ width: '100%', height: '100%' }}
                    avatarStyle="Circle"
                    topType={avatarSelectors['topType']}
                    accessoriesType={avatarSelectors['accessoriesType']}
                    hairColor={avatarSelectors['hairColor']}
                    facialHairType={avatarSelectors['facialHairType']}
                    clotheType={avatarSelectors['clotheType']}
                    clotheColor={avatarSelectors['clotheColor']}
                    eyeType={avatarSelectors['eyeType']}
                    eyebrowType={avatarSelectors['eyebrowType']}
                    mouthType={avatarSelectors['mouthType']}
                    skinColor={avatarSelectors['skinColor']}
                />
            </div>
            {hideOptions ? null : (
                <div className="wrapAvatarCustomizer">
                    <AvatarOptions
                        selectors={avatarSelectors}
                        handleChangeOption={handleChangeOption}
                    />
                </div>
            )}
        </div>
    );
});

export default AvatarCustomizer;