import { Control, FieldPath, useController } from 'react-hook-form';
export const Checkbox = <
    TFieldValues extends Record<string, any> = Record<string, any>,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: {
    checked: boolean;
    isOpenTerms: VoidFunction;
    name: TName;
    control?: Control<TFieldValues>;
    errorMessage: string | undefined;
}) => {
    const { field } = useController({
        name: props.name,
        control: props.control,
    });
    return (
        <label>
            <input {...field} type="checkbox" checked={props.checked} />
            <div className="inline-block ml-2 text-sm">* Я согласен</div>{' '}
            <button onClick={props.isOpenTerms} className="text-blue-600 underline text-sm">
                с политикой конфиденциальности
            </button>
            <p className="text-pink-600 text-sm mt-1 absolute">{props.errorMessage}</p>
        </label>
    );
};
