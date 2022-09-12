import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MyForm } from './MyForm';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <MyForm />
    </React.StrictMode>
);
