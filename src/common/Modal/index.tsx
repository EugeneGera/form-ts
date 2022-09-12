import { Fragment, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const Modal = (props: {
    title:string
    check?: VoidFunction;
    isOpen: boolean;
    onClose: VoidFunction;
    children: ReactNode;
    buttonText: string;
}) => {
    if (!props.isOpen) return null;
    const handleClick = () => {
        if (props.check) {
            props.check();
        }
        props.onClose();
    };
    return ReactDOM.createPortal(
        <Fragment>
            <div className="fixed inset-0">
                <div className="relative min-h-full grid place-items-center">
                    <div className="sm:p-10 p-3 bg-white z-10 sm:w-[500px] w-[350px] grid rounded-sm">
                        <h2 className="sm:text-2xl text-xl text-center mt-2">{props.title}</h2>
                        {props.children}
                        <button
                            onClick={handleClick}
                            className="justify-self-center text-sm sm:max-w-sm mt-4 border border-gray-300 sm:px-36 px-28 py-2 rounded bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white"
                        >
                            {props.buttonText}
                        </button>
                    </div>
                    <div
                        className="absolute inset-0 bg-black opacity-50 "
                        onClick={props.onClose}
                    />
                </div>
            </div>
        </Fragment>,
        document.getElementById('root')!
    );
};
