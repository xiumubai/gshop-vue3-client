import type { ImageList } from "@/components/Carousel/types";

interface NavItem {
	url: string;
	text: string;
}

type NavList = NavItem[];

export interface FloorItem {
	id: number;
	name: string;
	navList: NavList;
	keywords: string[];
	imgUrl: string;
	carouselList: ImageList;
	recommendList: string[];
	bigImg: string;
}

export type FloorList = FloorItem[];
