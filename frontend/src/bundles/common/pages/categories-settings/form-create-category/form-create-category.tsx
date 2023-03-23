import { faEnvelope, faGasPump } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~/bundles/common/components/components';
import { Input } from '~/bundles/common/components/input/input';
import { ButtonSize,ButtonVariant } from '~/bundles/common/enums/enums';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useAppForm } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

const DEFAULT_INPUT: { note: string } = {
    note: '',
};

const FormCreateCategory: React.FC = () => {
    const { control, errors } = useAppForm<{ note: string }>({
        defaultValues: DEFAULT_INPUT,
    });
    return (
        <div>
            <div>
                <span>Create a new category</span>
            </div>
            {/* <button></button> //mobile */}
            <div>
                <div className={styles.overlay}></div>
                <div className={styles.nameOne}>
                    <div className={styles.form}>
                        <form name="categoryNewForm" autoComplete="off">
                            <div className={styles.nameTree}>
                                <div className={styles.nameFour}>
                                    <div
                                        className={styles.wrapperIconSettings}
                                    ></div>
                                    <div className={styles.categoryName}>
                                        <Input
                                            control={control}
                                            errors={errors}
                                            label="Name"
                                            name="note"
                                            placeholder="New category name"
                                            type={InputType.TEXT}
                                            className={`${styles.customInput} ${styles.inputLabel} ${styles.label}`}
                                            isDisabled={false}
                                            eyeHidden={false}
                                        />
                                    </div>
                                    <div className={styles.wrapperType}></div>
                                    <div className={styles.wrapperBtn}>
                                        <Button
                                            variant={ButtonVariant.PRIMARY}
                                            size={ButtonSize.MEDIUM}
                                            disabled={true}
                                        >
                                            <span>Create category</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FormCreateCategory };
