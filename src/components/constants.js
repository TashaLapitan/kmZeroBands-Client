import styled from 'styled-components';

export const colors = {
    black: "hsl(0, 100%, 0%)",
    white: "hsl(0, 0%, 100%)",
    primary: {
        fuchsia1: "hsl(320, 100%, 19%)",
        fuchsia2: "hsl(322, 93%, 27%)",
        fuchsia3: "hsl(324, 93%, 33%)",
        pink1: "hsl(326, 90%, 39%)",
        pink2: "hsl(328, 85%, 46%)",
        pink3: "hsl(330, 79%, 56%)",
        lightPink: "hsl(334, 86%, 67%)",
        palePink1: "hsl(336, 100%, 77%)",
        palePink2: "hsl(341, 100%, 95%)"
    },
    neutral: {
        darkGrey1: "hsl(210, 24%, 16%)",
        darkGrey2: "hsl(209, 20%, 25%)",
        darkGrey3: "hsl(209, 18%, 30%)",
        grey1: "hsl(209, 14%, 37%)",
        grey2: "hsl(211, 12%, 43%)",
        lightGrey1: "hsl(211, 10%, 53%)",
        lightGrey2: "hsl(211, 13%, 65%)",
        paleGrey1: "hsl(210, 16%, 82%)",
        paleGrey2: "hsl(214, 15%, 91%)",
        paleGrey3: "hsl(216, 33%, 97%)"
    },
    supporting: {
        darkCyan1: "hsl(188, 91%, 23%)",
        darkCyan2: "hsl(186, 91%, 29%)",
        brightCyan1: "hsl(184, 90%, 34%)",
        brightCyan2: "hsl(182, 85%, 39%)",
        brightCyan3: "hsl(180, 77%, 47%)",
        lightCyan1: "hsl(178, 78%, 57%)",
        lightCyan2: "hsl(176, 87%, 67%)",
        paleCyan1: "hsl(174, 96%, 78%)",
        paleCyan2: "hsl(172, 97%, 88%)",
        paleCyan3: "hsl(171, 82%, 94%)"
    }
};

export const Vertical = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;



// export {colors, Vertical, Horizontal};
