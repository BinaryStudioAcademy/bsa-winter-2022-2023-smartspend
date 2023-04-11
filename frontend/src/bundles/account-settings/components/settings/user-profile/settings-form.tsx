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
import { storage, StorageKey } from '~/framework/storage/storage';

import styles from '../styles.module.scss';
import {
    AvatarContainer,
    RenderCurrency,
    RenderDate,
    RenderSex,
    SubmitButton,
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
        mode: 'onBlur',
    });
    const [modalOpen, setModalOpen] = useState(false);

    const fieldsWatch = watch();

    const isFieldsChange = useCallback((): boolean => {
        if (!fieldsWatch.firstName || !fieldsWatch.lastName) {
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
        void storage.drop(StorageKey.TOKEN);
        void storage.drop(StorageKey.PWA);
    }, [dispatch, token]);

    const onModalClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    const onSubmit = useCallback(
        (formData: UserUpdateRequestDto): void => {
            const { email, ...remainingData } = formData;

            const uploadData: uploadPayload = {
                email,
                userProfile: { ...remainingData },
            };

            setTimeout(() => {
                if (!user?.firstName) {
                    navigate(AppRoute.DASHBOARD);
                }
            }, 500);

            void dispatch(usersActions.updateUser(uploadData));
        },
        [dispatch, navigate, user?.firstName],
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

                <SubmitButton isChange={isChange}>
                    {user?.firstName && user.lastName
                        ? 'Update My Settings'
                        : 'Get started'}
                </SubmitButton>
                <div className={styles.dltButton}>
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
