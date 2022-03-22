interface CategoryItem {
	categoryId: number;
	categoryName: string;
	// 三级分类没有categoryChild，所以可以写成可选属性
	categoryChild?: CategoryList;
}
// 三级分类的类型定义
export type CategoryList = CategoryItem[];
