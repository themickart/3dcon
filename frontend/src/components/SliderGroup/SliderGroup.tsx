import React, { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import styles from './SliderGroup.module.scss';

export const SliderGroup: React.FC<{ gallery: string[] }> = ({gallery}) => {
	const iconsPath = process.env.PUBLIC_URL + '/icons/';
	const swipeConfidenceThreshold = 10000;
	const [[slide, direction], setSlide] = useState([0, 0]);
	const paginate = (newDirection: number) =>
		setSlide([slide + newDirection, newDirection]);
	const variants: Variants = {
		initial: (direction: number) => {
			return {
				x: direction > 0 ? 1000 : -1000,
				opacity: 0,
			};
		},
		animate: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => {
			return {
				zIndex: 0,
				x: direction < 0 ? 1000 : -1000,
				opacity: 0,
			};
		},
	};
	return (
		<div className={styles.imgs}>
			<div className={styles.imgs__bigSlider}>
				{gallery?.length > 1 ? (
					<>
						<AnimatePresence initial={false} custom={direction}>
							<motion.img
								className={styles.imgs__bigSlider__slide}
								key={slide}
								width={958}
								height={524}
								src={
									process.env.PUBLIC_URL +
									gallery?.[Math.abs(slide % gallery.length)]
								}
								custom={direction}
								transition={{
									x: {
										type: 'spring',
										stiffness: 300,
										damping: 30,
									},
									opacity: {duration: 0.2},
								}}
								{...variants}
								drag={'x'}
								dragConstraints={{left: 0, right: 0}}
								dragElastic={1}
								onDragEnd={(_, {offset, velocity}) => {
									const swipe =
										Math.abs(offset.x) * velocity.x;
									if (swipe < -swipeConfidenceThreshold)
										paginate(1);
									else if (swipe > swipeConfidenceThreshold)
										paginate(-1);
								}}
								alt=""
							/>
						</AnimatePresence>
						<div className={styles.imgs__bigSlider__fullscreen}>
							<img src={iconsPath + 'fullscreen.svg'} alt=""/>
						</div>
						<div
							className={
								styles.imgs__bigSlider__bigArrow +
								' ' +
								styles.imgs__bigSlider__left
							}
							onClick={() => paginate(1)}
						>
							<img src={iconsPath + 'bigLeftArrow.svg'} alt=""/>
						</div>
						<div
							className={
								styles.imgs__bigSlider__bigArrow +
								' ' +
								styles.imgs__bigSlider__right
							}
							onClick={() => paginate(-1)}
						>
							<img src={iconsPath + 'bigRightArrow.svg'} alt=""/>
						</div>
					</>
				) : (
					<div className={styles.imgs__bigSlider__single}>
						<img
							width={967}
							className={styles.imgs__bigSlider__single}
							height={524}
							alt=""
							src={process.env.PUBLIC_URL + gallery?.[0]}
						/>
					</div>
				)}
			</div>
			<div className={styles.imgs__slider}>
				<div
					className={styles.imgs__slider__arrow}
					onClick={() => paginate(1)}
				>
					<img src={iconsPath + 'leftArrow.svg'} alt=""/>
				</div>
				{gallery?.map((src, index) => (
					<img
						className={
							index === Math.abs(slide % gallery.length)
								? styles.imgs__slider__active
								: 'none'
						}
						key={src}
						src={process.env.PUBLIC_URL + src}
						alt=""
						width={247}
						height={139}
						onClick={() => {
							// fix bug
						}}
					/>
				))}
				<div
					className={styles.imgs__slider__arrow}
					onClick={() => paginate(-1)}
				>
					<img src={iconsPath + 'rightArrow.svg'} alt=""/>
				</div>
			</div>
		</div>
	);
};
