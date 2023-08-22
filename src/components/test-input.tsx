import { HTMLInputTypeAttribute } from 'react'

type TextInputProps = {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    value: string;
    onChangeText?: (text: string) => void;
};

export const TextInput = ({
                              name,
                              label,
                              type,
                              value = '',
                              onChangeText,
                          }: TextInputProps) => {
    return (
        <div>
            <label htmlFor={name} className='text-sm'>
                {label}
            </label>
            <input
                type={type}
                name={name}
                required
                value={value}
                onChange={(e) => {
                    if (onChangeText) onChangeText(e.target.value)
                }}
                className='mt-1 bg-blue-600/10 rounded-md p-2 w-full'
            />
        </div>
    )
}

TextInput.defaultProps = {
    value: '',
}
