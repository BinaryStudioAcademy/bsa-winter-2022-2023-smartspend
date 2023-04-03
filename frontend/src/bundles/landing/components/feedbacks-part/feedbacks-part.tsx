import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import classNames from 'classnames';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
    Breakpoint,
    SwiperBreakpointConfig,
} from '~/bundles/landing/enums/enums.js';

import { FeedbackCard } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    feedbacks: {
        name: string;
        src: string;
        feedback: string;
    }[];
};

const bulletActive = styles.bulletActive;
const bulletClass = styles.bulletClass;
const horizontalClass = styles.horizontalClass;

const paginationOptions = {
    bulletClass: bulletClass,
    bulletActiveClass: bulletActive,
    horizontalClass: horizontalClass,
    clickable: true,
};

const breakpoints = {
    [Breakpoint.LG]: {
        slidesPerView: SwiperBreakpointConfig.LG_SLIDES_PER_VIEW,
        spaceBetween: SwiperBreakpointConfig.LG_SPACE_BETWEEN,
    },
    [Breakpoint.MD]: {
        slidesPerView: SwiperBreakpointConfig.MD_SLIDES_PER_VIEW,
        spaceBetween: SwiperBreakpointConfig.MD_SPACE_BETWEEN,
    },
};

const FeedbacksPart: React.FC<Properties> = ({ title, feedbacks }) => {
    return (
        <section id="reviews" className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <h1 className={styles.title}>{title}</h1>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 4000 }}
                    pagination={paginationOptions}
                    watchSlidesProgress={true}
                    slidesPerView={1}
                    breakpoints={breakpoints}
                    className={styles.carouselContainer}
                >
                    {feedbacks.map((feedback, index) => (
                        <SwiperSlide key={index}>
                            <FeedbackCard
                                name={feedback.name}
                                avatar_src={feedback.src}
                                feedback={feedback.feedback}
                                gradient_number={index + 1}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export { FeedbacksPart };
