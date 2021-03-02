import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'typeface-roboto';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 15px;
        line-height: 1.6em;
        font-family: 'Roboto';
        color: #323232;
        height: 100%;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-control {
        width: 100%;
        background-color: rgba(0, 87, 255, 0.135);
        padding: 0.85rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 14px;

        &:active {
            outline: none;
            border: none;
        }

        &:focus {
            outline: 0;
        }
    }

    button {
        border: none;
        border-radius: 6px;
        letter-spacing: 0.54px;
        font-size: 1em;
        padding: 0.55em 1.1em;
        cursor: pointer;

        &:active {
            outline: none;
            border: none;
        }

        &:focus {
            outline: 0;
        }
    }

    .error-message {
        font-size: 12px;
        color: red;
    }
`;

export default GlobalStyle;
