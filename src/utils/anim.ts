import { Variants } from "motion/react";

export const fadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	transition: {
		eas: "easeInOut",
		duration: 0.15,
	},
};

export const zoomIn = {
	initial: {
		opacity: 0,
		scale: 0.9,
	},
	animate: {
		opacity: 1,
		scale: 1,
	},
	transition: {
		ease: "easeInOut",
		duratio: 0.15,
	},
};

export const slideIn_variant: Variants = {
	hidden: {
		width: 0,
	},
	show: {
		width: "60%",
		transition: {
			ease: "linear",
			duration: 0.25,
			delayChildren: 0.25,
		},
	},
};

export const slideInChild_variant: Variants = {
	hidden: { y: 0, opacity: 0 },
	show: { y: -10, opacity: 1 },
};

export const slideDown_small: Variants = {
	hidden: {
		height: 0,
		opacity: 0,
	},
	show: {
		height: 60,
		opacity: 1,
		transition: {
			ease: "linear",
			delayChildren: 0.1,
			duration: 0.1,
		},
	},
	exit: {},
};

export const slideDown_big: Variants = {
	hidden: {
		height: 0,
		opacity: 0,
	},
	show: {
		height: 130,
		opacity: 1,
		transition: {
			ease: "linear",
			delayChildren: 0.1,
			duration: 0.1,
		},
	},
	exit: {
		height: 0,
		opacity: 0,
		transition: {
			when: "afterChildren",
			duration: 0.05,
			ease: "linear",
		},
	},
};

export const slideDownChildren: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.1,
			ease: "easeInOut",
		},
	},
};

export const pageIn: Variants = {
	hidden: {
		opacity: 0,
		y: 0,
	},
	show: {
		opacity: 1,
		y: -10,
		transition: {
			ease: "easeIn",
			duration: 0.25,
		},
	},
};
