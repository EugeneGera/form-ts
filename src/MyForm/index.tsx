import { useForm, SubmitHandler } from 'react-hook-form';
import { Checkbox } from '../common/Checkbox';
import { Input } from '../common/Input';
import { Radio } from '../common/Radio';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '../common/Modal';
import { useState } from 'react';
import { value } from '../value';

export type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    linkGithub: string;
    isTerms: boolean;
};

const schema = yup
    .object({
        firstName: yup
            .string()
            .required('Обязательное поле')
            .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, 'Только буквы')
            .min(2, 'Минимум 2 символа'),

        lastName: yup
            .string()
            .required('Обязательное поле')
            .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, 'Только буквы')
            .min(2, 'Минимум 2 символа'),

        email: yup.string().required('Обязательное поле').email('Неправильный email адрес'),
        gender: yup.string().required('Выберете пол'),
        linkGithub: yup
            .string()
            .required('Введите ссылку')
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Введите корректную ссылку'
            ),

        isTerms: yup.boolean().required('Необходимо согласие').oneOf([true], 'Необходимо согласие'),
    })
    .required();

export const MyForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        getValues,
        setValue,
        watch,
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            linkGithub: '',
            isTerms: false,
        },
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTerms, setIsOpenTerms] = useState(false);
    const changeIsTerms = () => {
        setValue('isTerms', true);
    };
    const resetForm = () => {
        reset();
        setIsOpen(false);
    };
    return (
        <form
            className="sm:mt-32 sm:ml-64 my-6 mx-4 max-w-2xl relative z-0"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-4xl">Анкета соискателя</h2>
            <h2 className="mt-10 text-2xl">Личные данные</h2>
            <div className="sm:grid sm:grid-cols-2 gap-x-10 gap-y-1 sm:items-start mt-3">
                <Input
                    control={control}
                    label="Имя*"
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    className="peer"
                    errorMessage={errors.firstName?.message}
                />
                <Input
                    control={control}
                    label="Фамилия*"
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    errorMessage={errors.lastName?.message}
                />
                <Input
                    control={control}
                    label="Электронная почта*"
                    type="email"
                    name="email"
                    placeholder="Электронная почта"
                    className="col-span-2"
                    errorMessage={errors.email?.message}
                />
                {/* <Input label="Загрузить резюме" type="file" name="addFile" /> */}
            </div>
            <div className="relative">
                <h2 className="text-2xl  mt-6">Пол*</h2>
                <p className="text-pink-600 text-sm mt-1 absolute">{errors.gender?.message}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-25 mt-6">
                <Radio control={control} value="Мужской" label="Мужской" name="gender" />
                <Radio control={control} value="Женский" label="Женский" name="gender" />
            </div>
            <h2 className="text-2xl mt-12">Github</h2>
            <Input
                control={control}
                label="Вставьте ссылку на Github*"
                type="text"
                name="linkGithub"
                placeholder="Вставьте ссылку на Github"
                errorMessage={errors.linkGithub?.message}
            />
            <div className="mt-12">
                <Checkbox
                    errorMessage={errors.isTerms?.message}
                    checked={watch().isTerms}
                    isOpenTerms={() => setIsOpenTerms(true)}
                    control={control}
                    name="isTerms"
                />
            </div>
            <button
                disabled={!isValid}
                type="submit"
                className="mt-12 border border-gray-300 px-36 py-2 rounded bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white disabled:bg-gray-400 text-sm"
                onClick={() => setIsOpen(true)}
            >
                Отправить
            </button>
            <Modal
                title={`Спасибо ${getValues().firstName}!`}
                buttonText="Понятно"
                isOpen={isOpen}
                onClose={resetForm}
            >
                <p className="mt-2 text-center">Мы скоро с Вами свяжемся</p>
            </Modal>
            <Modal
                title="Политика конфиденциальности"
                check={changeIsTerms}
                buttonText="Я согласен"
                isOpen={isOpenTerms}
                onClose={() => setIsOpenTerms(false)}
            >
                <div className=" sm:h-[600px] h-[500px] mx-auto overflow-auto mt-8">{value}</div>
            </Modal>
        </form>
    );
};
