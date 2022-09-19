import { Control, FieldPath, useController } from 'react-hook-form';

import classNames from 'classnames';

export const Radio = <
    TFieldValues extends Record<string, any> = Record<string, any>,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: {
    control?: Control<TFieldValues>;
    name: TName;
    label: string;
    className?: string;
    value: string;
}) => {
    const { field } = useController({
        name: props.name,
        control: props.control,
    });
    return (
        <label
            className={classNames(
                'grid grid-flow-col items-center justify-start gap-x-2',
                props.className
            )}
        >
            <input {...field} value={props.value} type="radio" />
            <div>{props.label}</div>
        </label>
    );
};
