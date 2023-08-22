export const customStyles = {
    control: (styles: any) => ({
        ...styles,
        width: '100%',
        maxWidth: '14rem',
        minWidth: '12rem',
        borderRadius: '5px',
        color: '#000',
        fontSize: '0.8rem',
        lineHeight: '1.75rem',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
    }),
    option: (styles: any) => {
        return {
            ...styles,
            color: '#000',
            fontSize: '0.8rem',
            lineHeight: '1.75rem',
            width: '100%',
            background: '#fff',
        }
    },
    menu: (styles: any) => {
        return {
            ...styles,
            backgroundColor: '#fff',
            maxWidth: '14rem',
            border: '2px solid #000000',
            borderRadius: '5px',
        }
    },

    placeholder: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            color: '#000',
            fontSize: '0.8rem',
            lineHeight: '1.75rem',
        }
    },
}
