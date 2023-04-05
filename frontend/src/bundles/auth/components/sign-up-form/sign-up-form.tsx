import { actions as authActions } from '~/bundles/auth/store';
import {
    BaseModal,
    Button,
    Input,
} from '~/bundles/common/components/components';
import {
    AppDocumentTitles,
    AppRoute,
    ButtonSize,
    ButtonType,
} from '~/bundles/common/enums/enums';
import { InputType } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppDocumentTitle,
    useAppForm,
    useAppSelector,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    useAppDocumentTitle(AppDocumentTitles.SIGN_UP);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const modalOpen = useAppSelector((state) => state.auth.signUpModalOpen);
    const { control, errors, handleSubmit, reset, watch, trigger } =
        useAppForm<UserSignUpRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationSchema,
            mode: 'onBlur',
        });

    const onModalClose = useCallback(
        () => dispatch(authActions.toggleSignUpModalOpen()),
        [dispatch],
    );

    const onModalSubmit = useCallback(() => {
        dispatch(authActions.toggleSignUpModalOpen());
        navigate(AppRoute.SIGN_IN);
    }, [dispatch, navigate]);

    const inputReset = reset;

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            void trigger();
            const email = watch('email');
            const password = watch('password');
            const repeatPassword = watch('repeatPassword');
            if (!email || !password || !repeatPassword) {
                return;
            }
            void handleSubmit(onSubmit)(event_);
            inputReset && reset();
        },
        [handleSubmit, inputReset, onSubmit, reset, trigger, watch],
    );

    return (
        <>
            <BaseModal
                isShown={modalOpen}
                Header={
                    <h1 className={styles.modalTitle}>Account Already Exist</h1>
                }
                Body={
                    <div className={styles.modalDetailsContainer}>
                        <p className={styles.modalDetails}>
                            Account with this email already registered in
                            SmartSpend. Please login using this email
                        </p>
                    </div>
                }
                submitButtonName={'Login'}
                onClose={onModalClose}
                onSubmit={onModalSubmit}
                width={450}
                footerContainerClass={styles.footerContainerClass}
                buttonsSize={ButtonSize.MEDIUM}
            />
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <p className={styles.inputWrapper}>
                    <Input
                        type={InputType.EMAIL}
                        label="E-mail"
                        placeholder="E-mail address"
                        name="email"
                        control={control}
                        errors={errors}
                        inputClassName={styles.inputPages}
                    />
                </p>
                <p className={styles.inputWrapper}>
                    <Input
                        type={InputType.PASSWORD}
                        label="Password"
                        placeholder="Password"
                        name="password"
                        control={control}
                        errors={errors}
                        inputClassName={styles.inputPages}
                        eyeHidden
                    />
                </p>
                <p className={styles.inputWrapper}>
                    <Input
                        type={InputType.PASSWORD}
                        label="Confirm password"
                        placeholder="Confirm password"
                        name="repeatPassword"
                        control={control}
                        errors={errors}
                        inputClassName={styles.inputPages}
                        eyeHidden
                    />
                </p>
                <Button className={styles.formButton} type={ButtonType.SUBMIT}>
                    Sign Up
                </Button>
            </form>
        </>
    );
};

export { SignUpForm };
