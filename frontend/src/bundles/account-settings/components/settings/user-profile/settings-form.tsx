import { Controller } from 'react-hook-form';
import {
    type UserProfileResponseDto,
    type UserUpdateRequestDto,
} from 'shared/build';

import { Button, Icon, Input } from '~/bundles/common/components/components.js';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
    InputType,
} from '~/bundles/common/enums/enums.js';
import { compareObjects } from '~/bundles/common/helpers/helpers';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as usersActions } from '~/bundles/users/store';
// import { userUpdateRegValidationSchema } from '~/bundles/users/users.js';
import { storage, StorageKey } from '~/framework/storage/storage';
import { notification } from '~/services/services';

import styles from '../styles.module.scss';
import {
    AvatarContainer,
    RenderCurrency,
    RenderDate,
    RenderSex,
    UserDeleteModal,
} from './components/components.js';

type uploadPayload = {
    email: string;
    userProfile: Partial<UserUpdateRequestDto>;
};

type Properties = {
    user: UserProfileResponseDto | undefined;
};

const SettingsForm: React.FC<Properties> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isChange, setIsChange] = useState(false);
    const { control, handleSubmit, errors, watch, trigger } = useAppForm({
        defaultValues: user as UserUpdateRequestDto,
    });
    const [modalOpen, setModalOpen] = useState(false);

    const fieldsWatch = watch();

    const isFieldsChange = useCallback((): boolean => {
        if (
            !fieldsWatch.firstName ||
            !fieldsWatch.lastName ||
            !fieldsWatch.currency
        ) {
            return false;
        }
        return !compareObjects(fieldsWatch, user as UserUpdateRequestDto);
    }, [fieldsWatch, user]);

    const token = storage.getSync(StorageKey.TOKEN);

    const onModalOpen = useCallback(() => {
        setModalOpen(true);
    }, []);

    const handleDeleteAccount = useCallback(() => {
        void dispatch(usersActions.deleteUser(token as string));
        void storage.drop(StorageKey.HAVE_NAME);
        void storage.drop(StorageKey.PWA);
        void storage.drop(StorageKey.TOKEN);
        navigate(AppRoute.SIGN_UP);
    }, [dispatch, navigate, token]);

    const onModalClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    const onSubmit = useCallback(
        async (formData: UserUpdateRequestDto): Promise<void> => {
            const { email, ...remainingData } = formData;

            const uploadData: uploadPayload = {
                email,
                userProfile: { ...remainingData },
            };

            const haveName = storage.getSync(StorageKey.HAVE_NAME);

            if (!haveName) {
                void storage.set(StorageKey.HAVE_NAME, 'true');
                navigate(AppRoute.DASHBOARD);
            }

            await dispatch(usersActions.updateUser(uploadData)).unwrap();
            if (haveName) {
                notification.success('Account settings has been updated');
            }
        },
        [dispatch, navigate],
    );

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            void trigger();
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit, trigger],
    );

    useEffect(() => {
        setIsChange(isFieldsChange());
    }, [isFieldsChange]);

    return (
        <>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <AvatarContainer />
                <Input
                    type={InputType.TEXT}
                    labelClassName={styles.inputLabel}
                    label="First name"
                    placeholder="Enter your name"
                    name="firstName"
                    control={control}
                    errors={errors}
                />
                <Input
                    type={InputType.TEXT}
                    label="Last name"
                    labelClassName={styles.inputLabel}
                    placeholder="Enter your surname"
                    name="lastName"
                    control={control}
                    errors={errors}
                />

                <Controller name="sex" control={control} render={RenderSex} />

                <div className={styles.calendar}>
                    <div className={styles.label}>Date of birth</div>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={RenderDate}
                    />
                    {errors.dateOfBirth && (
                        <span className={styles.calendarError}>
                            {errors.dateOfBirth.message}
                        </span>
                    )}
                </div>

                <Input
                    type={InputType.EMAIL}
                    label="E-mail address"
                    labelClassName={styles.inputLabel}
                    placeholder="Enter your email"
                    name="email"
                    control={control}
                    errors={errors}
                />

                <Controller
                    name="currency"
                    control={control}
                    render={RenderCurrency}
                />
                <div className={styles.buttonsContainer}>
                    <Button
                        variant={ButtonVariant.DELETE}
                        size={ButtonSize.MEDIUM}
                        onClick={onModalOpen}
                        type={ButtonType.BUTTON}
                    >
                        <span className={styles.icon}>
                            <Icon name={FaIcons.TRASH_CAN} />
                        </span>
                        <span>Delete Account</span>
                    </Button>
                    <Button disabled={!isChange}>
                        {user?.firstName && user.lastName
                            ? 'Update My Settings'
                            : 'Get started'}
                    </Button>
                </div>
            </form>
            <UserDeleteModal
                isShown={modalOpen}
                onClose={onModalClose}
                onDelete={handleDeleteAccount}
            />
        </>
    );
};

export { SettingsForm };
