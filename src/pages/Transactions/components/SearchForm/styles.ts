import styled from "styled-components";

export const SearchFormContainer = styled.form`
    display: flex;
    gap: 1rem;

    input {
        flex: 1;
        border-radius: 6px;
        border: 0;
        background: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        padding: 1rem;

        &::placeholder {
            color: ${props => props.theme['gray-500']};
        }
    }

    button {
        display: flex;
        align-content: center;
        gap: 0.75rem;

        border: 0;
        padding: 1rem;
        background: transparent;
        border: solid 1px ${props => props.theme['green-300']};
        color: ${props => props.theme['green-300']};
        font-weight: bold;
        border-radius: 6px;

        cursor: pointer;
        transition: .2s;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        &:not(:disabled):hover {
            background: ${props => props.theme['green-500']};
            border-color: ${props => props.theme['green-500']};
            color: ${props => props.theme.white};
        }
    }
`;