import css from 'styled-jsx/css';

const fonts = css.global`
    //normal
    @font-face {
        src: url('/static/fonts/Roboto-Thin.ttf');
        font-family: 'Roboto';
        font-weight: 100;
    }
    @font-face {
        src: url('/static/fonts/Roboto-Light.ttf');
        font-family: 'Roboto';
        font-weight: 200;
    }
    @font-face {
        src: url('/static/fonts/Roboto-Medium.ttf');
        font-family: 'Roboto';
        font-weight: 300;
    }
    @font-face {
        src: url('/static/fonts/Roboto-Regular.ttf');
        font-family: 'Roboto';
        font-weight: 400;
    }
    @font-face {
        src: url('/static/fonts/Roboto-Black.ttf');
        font-family: 'Roboto';
        font-weight: 500;
    }
    @font-face {
        src: url('/static/fonts/Roboto-Bold.ttf');
        font-family: 'Roboto';
        font-weight: 600;
    }

    //italic
    @font-face {
        src: url('/static/fonts/Roboto-ThinItalic.ttf');
        font-family: 'Roboto';
        font-weight: 100;
        font-style: italic;
    }
    @font-face {
        src: url('/static/fonts/Roboto-LightItalic.ttf');
        font-family: 'Roboto';
        font-weight: 200;
        font-style: italic;
    }
    @font-face {
        src: url('/static/fonts/Roboto-MediumItalic.ttf');
        font-family: 'Roboto';
        font-weight: 300;
        font-style: italic;
    }
    @font-face {
        src: url('/static/fonts/Roboto-Italic.ttf');
        font-family: 'Roboto';
        font-weight: 400;
        font-style: italic;
    }
    @font-face {
        src: url('/static/fonts/Roboto-BlackItalic.ttf');
        font-family: 'Roboto';
        font-weight: 500;
        font-style: italic;
    }
    @font-face {
        src: url('/static/fonts/Roboto-BoldItalic.ttf');
        font-family: 'Roboto';
        font-weight: 600;
        font-style: italic;
    }
`

export default fonts;