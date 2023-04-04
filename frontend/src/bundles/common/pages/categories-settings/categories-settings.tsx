import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

import { Button } from '../../components/button/button';
import { BaseModal } from '../../components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
} from '../../enums/enums';
import { CategoryList } from './components/category-list/category-list';
import { FormCreateCategory } from './components/form-create-category/form-create-category';
import { FormUi } from './components/form-create-category/form-ui';
import { ManageCategories } from './components/manage-categories/manage-categories';
import { testDB } from './components/mock/test-database';
import styles from './styles.module.scss';

interface Data {
    id: string;
    categoryName: string;
    type: string;
    icon: string;
    colorIcon: string;
}

type GroupedData = Record<string, Data[]>;

const CategoriesSettings: React.FC = () => {
    const [isCreateModalShown, setIsCreateModalShown] = useState(false);

    const handelClickModalCreate = useCallback((): void => {
        setIsCreateModalShown(true);
    }, []);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>): void => {
            if (event.key === 'Enter') {
                handelClickModalCreate();
            }
        },
        [handelClickModalCreate],
    );

    const handleCloseModal = useCallback(() => {
        setIsCreateModalShown(false);
    }, []);

    const sortByType: GroupedData = {};
    for (const data of testDB) {
        if (!(data.type in sortByType)) {
            sortByType[data.type] = [];
        }
        sortByType[data.type].push(data);
    }
    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Create a new category</h1>
                    <div>
                        <FormUi
                            onClick={handelClickModalCreate}
                            handleKeyDown={handleKeyDown}
                        />
                        <div className={styles.mobileBtn}>
                            <Button
                                onClick={handelClickModalCreate}
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                disabled={false}
                                className={styles.btn}
                            >
                                <FontAwesomeIcon
                                    icon={FaIcons.FA_PEN}
                                    width="18px"
                                />
                                <span className={styles.btnName}>
                                    Create category
                                </span>
                            </Button>
                        </div>
                        <ManageCategories />
                        <CategoryList
                            title={'Income Categories'}
                            categories={sortByType.income}
                        />
                        <CategoryList
                            title={'Expense category'}
                            categories={sortByType.expense}
                        />
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isCreateModalShown}
                onClose={handleCloseModal}
                onSubmit={handleCloseModal}
                Header={
                    <h2 className="visually-hidden">
                        {'Create a new category'}
                    </h2>
                }
                Body={<FormCreateCategory onClose={handleCloseModal} />}
                submitButtonName={'Edit category'}
                hasActionButtons={false}
            />
        </div>
    );
};

export { CategoriesSettings };
