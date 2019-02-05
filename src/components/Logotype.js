import posed from 'react-pose';

export const Logotype = posed.img({
    pressable: true,
    init: {
        scale: 1,
        rotate: 0
    },
    press: {
        scale: 1.2,
        rotate: 40,
        transition: {
        duration: 300
        }
    }
});
