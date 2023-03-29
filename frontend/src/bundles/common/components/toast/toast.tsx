import 'react-toastify/dist/ReactToastify.css';

import { type FC } from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './styles.module.scss';

const Toast: FC = () => {
    return (
        <ToastContainer
            className={styles.toastContainer}
            position="bottom-center"
            autoClose={3500}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="colored"
        />
    );
};

export { Toast };
