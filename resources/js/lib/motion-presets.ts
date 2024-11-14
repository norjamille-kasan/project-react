export const SlideUpIn = {
    initial: {
        opacity: 0,
        y: 30, // Start 30px below the initial position
    },
    animate: {
        opacity: 1,
        y: 0, // Move to the initial position
        transition: {
            duration: 0.3, // Adjust the duration as needed
        },
    },
    exit: {
        opacity: 0,
        y: -30, // Move 30px above the initial position
        transition: {
            duration: 0.2, // Adjust the duration as needed
        },
    },
};
