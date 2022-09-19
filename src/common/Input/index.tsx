import { Control, FieldPath, useController } from 'react-hook-form';

import classNames from 'classnames';
export const Input = <
    TFieldValues extends Record<string, any> = Record<string, any>,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: {
    control?: Control<TFieldValues>;
    name: TName;
    className?: string;
    label: string;
    type: string;
    placeholder?: string;
    errorMessage: string | undefined;
}) => {
    const { field } = useController({
        name: props.name,
        control: props.control,
    });
    return (
        <label className={classNames('relative', props.className)}>
            <div className="mt-6 text-sm">{props.label}</div>
            <div
                className={classNames(
                    'mt-0.5 rounded-md border transition-colors  shadow-sm text-sm w-full sm:w-64 py-2 px-3 ',
                    {
                        'border-gray-300 hover:border-blue-500': !props.errorMessage,
                        'border-pink-600': props.errorMessage,
                    }
                )}
            >
                <input
                    {...field}
                    type={props.type}
                    placeholder={props.placeholder}
                    className="outline-none"
                />
            </div>
            <p className="text-pink-600 text-sm mt-1 absolute">{props.errorMessage}</p>
        </label>
    );
};
