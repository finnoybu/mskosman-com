declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"lessons": {
"computer-science-1.mdx": {
	id: "computer-science-1.mdx";
  slug: "computer-science-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-10.mdx": {
	id: "computer-science-10.mdx";
  slug: "computer-science-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-11.mdx": {
	id: "computer-science-11.mdx";
  slug: "computer-science-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-12.mdx": {
	id: "computer-science-12.mdx";
  slug: "computer-science-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-2.mdx": {
	id: "computer-science-2.mdx";
  slug: "computer-science-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-3.mdx": {
	id: "computer-science-3.mdx";
  slug: "computer-science-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-4.mdx": {
	id: "computer-science-4.mdx";
  slug: "computer-science-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-5.mdx": {
	id: "computer-science-5.mdx";
  slug: "computer-science-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-6.mdx": {
	id: "computer-science-6.mdx";
  slug: "computer-science-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-7.mdx": {
	id: "computer-science-7.mdx";
  slug: "computer-science-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-8.mdx": {
	id: "computer-science-8.mdx";
  slug: "computer-science-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-9.mdx": {
	id: "computer-science-9.mdx";
  slug: "computer-science-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"computer-science-k.mdx": {
	id: "computer-science-k.mdx";
  slug: "computer-science-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-1.mdx": {
	id: "digital-learning-integration-1.mdx";
  slug: "digital-learning-integration-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-10.mdx": {
	id: "digital-learning-integration-10.mdx";
  slug: "digital-learning-integration-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-11.mdx": {
	id: "digital-learning-integration-11.mdx";
  slug: "digital-learning-integration-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-12.mdx": {
	id: "digital-learning-integration-12.mdx";
  slug: "digital-learning-integration-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-2.mdx": {
	id: "digital-learning-integration-2.mdx";
  slug: "digital-learning-integration-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-3.mdx": {
	id: "digital-learning-integration-3.mdx";
  slug: "digital-learning-integration-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-4.mdx": {
	id: "digital-learning-integration-4.mdx";
  slug: "digital-learning-integration-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-5.mdx": {
	id: "digital-learning-integration-5.mdx";
  slug: "digital-learning-integration-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-6.mdx": {
	id: "digital-learning-integration-6.mdx";
  slug: "digital-learning-integration-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-7.mdx": {
	id: "digital-learning-integration-7.mdx";
  slug: "digital-learning-integration-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-8.mdx": {
	id: "digital-learning-integration-8.mdx";
  slug: "digital-learning-integration-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-9.mdx": {
	id: "digital-learning-integration-9.mdx";
  slug: "digital-learning-integration-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"digital-learning-integration-k.mdx": {
	id: "digital-learning-integration-k.mdx";
  slug: "digital-learning-integration-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-1.mdx": {
	id: "driver-education-1.mdx";
  slug: "driver-education-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-10.mdx": {
	id: "driver-education-10.mdx";
  slug: "driver-education-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-11.mdx": {
	id: "driver-education-11.mdx";
  slug: "driver-education-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-12.mdx": {
	id: "driver-education-12.mdx";
  slug: "driver-education-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-2.mdx": {
	id: "driver-education-2.mdx";
  slug: "driver-education-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-3.mdx": {
	id: "driver-education-3.mdx";
  slug: "driver-education-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-4.mdx": {
	id: "driver-education-4.mdx";
  slug: "driver-education-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-5.mdx": {
	id: "driver-education-5.mdx";
  slug: "driver-education-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-6.mdx": {
	id: "driver-education-6.mdx";
  slug: "driver-education-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-7.mdx": {
	id: "driver-education-7.mdx";
  slug: "driver-education-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-8.mdx": {
	id: "driver-education-8.mdx";
  slug: "driver-education-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-9.mdx": {
	id: "driver-education-9.mdx";
  slug: "driver-education-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"driver-education-k.mdx": {
	id: "driver-education-k.mdx";
  slug: "driver-education-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-1.mdx": {
	id: "economics-personal-finance-1.mdx";
  slug: "economics-personal-finance-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-10.mdx": {
	id: "economics-personal-finance-10.mdx";
  slug: "economics-personal-finance-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-11.mdx": {
	id: "economics-personal-finance-11.mdx";
  slug: "economics-personal-finance-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-12.mdx": {
	id: "economics-personal-finance-12.mdx";
  slug: "economics-personal-finance-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-2.mdx": {
	id: "economics-personal-finance-2.mdx";
  slug: "economics-personal-finance-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-3.mdx": {
	id: "economics-personal-finance-3.mdx";
  slug: "economics-personal-finance-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-4.mdx": {
	id: "economics-personal-finance-4.mdx";
  slug: "economics-personal-finance-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-5.mdx": {
	id: "economics-personal-finance-5.mdx";
  slug: "economics-personal-finance-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-6.mdx": {
	id: "economics-personal-finance-6.mdx";
  slug: "economics-personal-finance-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-7.mdx": {
	id: "economics-personal-finance-7.mdx";
  slug: "economics-personal-finance-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-8.mdx": {
	id: "economics-personal-finance-8.mdx";
  slug: "economics-personal-finance-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-9.mdx": {
	id: "economics-personal-finance-9.mdx";
  slug: "economics-personal-finance-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"economics-personal-finance-k.mdx": {
	id: "economics-personal-finance-k.mdx";
  slug: "economics-personal-finance-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-1.mdx": {
	id: "english-1.mdx";
  slug: "english-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-10.mdx": {
	id: "english-10.mdx";
  slug: "english-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-11.mdx": {
	id: "english-11.mdx";
  slug: "english-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-12.mdx": {
	id: "english-12.mdx";
  slug: "english-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-2.mdx": {
	id: "english-2.mdx";
  slug: "english-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-3.mdx": {
	id: "english-3.mdx";
  slug: "english-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-4.mdx": {
	id: "english-4.mdx";
  slug: "english-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-5.mdx": {
	id: "english-5.mdx";
  slug: "english-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-6.mdx": {
	id: "english-6.mdx";
  slug: "english-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-7.mdx": {
	id: "english-7.mdx";
  slug: "english-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-8.mdx": {
	id: "english-8.mdx";
  slug: "english-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-9.mdx": {
	id: "english-9.mdx";
  slug: "english-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"english-k.mdx": {
	id: "english-k.mdx";
  slug: "english-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-1.mdx": {
	id: "family-life-education-1.mdx";
  slug: "family-life-education-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-10.mdx": {
	id: "family-life-education-10.mdx";
  slug: "family-life-education-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-11.mdx": {
	id: "family-life-education-11.mdx";
  slug: "family-life-education-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-12.mdx": {
	id: "family-life-education-12.mdx";
  slug: "family-life-education-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-2.mdx": {
	id: "family-life-education-2.mdx";
  slug: "family-life-education-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-3.mdx": {
	id: "family-life-education-3.mdx";
  slug: "family-life-education-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-4.mdx": {
	id: "family-life-education-4.mdx";
  slug: "family-life-education-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-5.mdx": {
	id: "family-life-education-5.mdx";
  slug: "family-life-education-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-6.mdx": {
	id: "family-life-education-6.mdx";
  slug: "family-life-education-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-7.mdx": {
	id: "family-life-education-7.mdx";
  slug: "family-life-education-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-8.mdx": {
	id: "family-life-education-8.mdx";
  slug: "family-life-education-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-9.mdx": {
	id: "family-life-education-9.mdx";
  slug: "family-life-education-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"family-life-education-k.mdx": {
	id: "family-life-education-k.mdx";
  slug: "family-life-education-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-1.mdx": {
	id: "fine-arts-1.mdx";
  slug: "fine-arts-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-10.mdx": {
	id: "fine-arts-10.mdx";
  slug: "fine-arts-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-11.mdx": {
	id: "fine-arts-11.mdx";
  slug: "fine-arts-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-12.mdx": {
	id: "fine-arts-12.mdx";
  slug: "fine-arts-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-2.mdx": {
	id: "fine-arts-2.mdx";
  slug: "fine-arts-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-3.mdx": {
	id: "fine-arts-3.mdx";
  slug: "fine-arts-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-4.mdx": {
	id: "fine-arts-4.mdx";
  slug: "fine-arts-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-5.mdx": {
	id: "fine-arts-5.mdx";
  slug: "fine-arts-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-6.mdx": {
	id: "fine-arts-6.mdx";
  slug: "fine-arts-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-7.mdx": {
	id: "fine-arts-7.mdx";
  slug: "fine-arts-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-8.mdx": {
	id: "fine-arts-8.mdx";
  slug: "fine-arts-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-9.mdx": {
	id: "fine-arts-9.mdx";
  slug: "fine-arts-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"fine-arts-k.mdx": {
	id: "fine-arts-k.mdx";
  slug: "fine-arts-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-1.mdx": {
	id: "health-education-1.mdx";
  slug: "health-education-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-10.mdx": {
	id: "health-education-10.mdx";
  slug: "health-education-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-11.mdx": {
	id: "health-education-11.mdx";
  slug: "health-education-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-12.mdx": {
	id: "health-education-12.mdx";
  slug: "health-education-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-2.mdx": {
	id: "health-education-2.mdx";
  slug: "health-education-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-3.mdx": {
	id: "health-education-3.mdx";
  slug: "health-education-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-4.mdx": {
	id: "health-education-4.mdx";
  slug: "health-education-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-5.mdx": {
	id: "health-education-5.mdx";
  slug: "health-education-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-6.mdx": {
	id: "health-education-6.mdx";
  slug: "health-education-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-7.mdx": {
	id: "health-education-7.mdx";
  slug: "health-education-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-8.mdx": {
	id: "health-education-8.mdx";
  slug: "health-education-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-9.mdx": {
	id: "health-education-9.mdx";
  slug: "health-education-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"health-education-k.mdx": {
	id: "health-education-k.mdx";
  slug: "health-education-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-1.mdx": {
	id: "history-and-social-science-1.mdx";
  slug: "history-and-social-science-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-10.mdx": {
	id: "history-and-social-science-10.mdx";
  slug: "history-and-social-science-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-11.mdx": {
	id: "history-and-social-science-11.mdx";
  slug: "history-and-social-science-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-12.mdx": {
	id: "history-and-social-science-12.mdx";
  slug: "history-and-social-science-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-2.mdx": {
	id: "history-and-social-science-2.mdx";
  slug: "history-and-social-science-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-3.mdx": {
	id: "history-and-social-science-3.mdx";
  slug: "history-and-social-science-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-4.mdx": {
	id: "history-and-social-science-4.mdx";
  slug: "history-and-social-science-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-5.mdx": {
	id: "history-and-social-science-5.mdx";
  slug: "history-and-social-science-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-6.mdx": {
	id: "history-and-social-science-6.mdx";
  slug: "history-and-social-science-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-7.mdx": {
	id: "history-and-social-science-7.mdx";
  slug: "history-and-social-science-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-8.mdx": {
	id: "history-and-social-science-8.mdx";
  slug: "history-and-social-science-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-9.mdx": {
	id: "history-and-social-science-9.mdx";
  slug: "history-and-social-science-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"history-and-social-science-k.mdx": {
	id: "history-and-social-science-k.mdx";
  slug: "history-and-social-science-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-1.mdx": {
	id: "mathematics-1.mdx";
  slug: "mathematics-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-10.mdx": {
	id: "mathematics-10.mdx";
  slug: "mathematics-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-11.mdx": {
	id: "mathematics-11.mdx";
  slug: "mathematics-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-12.mdx": {
	id: "mathematics-12.mdx";
  slug: "mathematics-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-2.mdx": {
	id: "mathematics-2.mdx";
  slug: "mathematics-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-3.mdx": {
	id: "mathematics-3.mdx";
  slug: "mathematics-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-4.mdx": {
	id: "mathematics-4.mdx";
  slug: "mathematics-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-5.mdx": {
	id: "mathematics-5.mdx";
  slug: "mathematics-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-6.mdx": {
	id: "mathematics-6.mdx";
  slug: "mathematics-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-7.mdx": {
	id: "mathematics-7.mdx";
  slug: "mathematics-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-8.mdx": {
	id: "mathematics-8.mdx";
  slug: "mathematics-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-9.mdx": {
	id: "mathematics-9.mdx";
  slug: "mathematics-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics-k.mdx": {
	id: "mathematics-k.mdx";
  slug: "mathematics-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-1.mdx": {
	id: "physical-education-1.mdx";
  slug: "physical-education-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-10.mdx": {
	id: "physical-education-10.mdx";
  slug: "physical-education-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-11.mdx": {
	id: "physical-education-11.mdx";
  slug: "physical-education-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-12.mdx": {
	id: "physical-education-12.mdx";
  slug: "physical-education-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-2.mdx": {
	id: "physical-education-2.mdx";
  slug: "physical-education-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-3.mdx": {
	id: "physical-education-3.mdx";
  slug: "physical-education-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-4.mdx": {
	id: "physical-education-4.mdx";
  slug: "physical-education-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-5.mdx": {
	id: "physical-education-5.mdx";
  slug: "physical-education-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-6.mdx": {
	id: "physical-education-6.mdx";
  slug: "physical-education-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-7.mdx": {
	id: "physical-education-7.mdx";
  slug: "physical-education-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-8.mdx": {
	id: "physical-education-8.mdx";
  slug: "physical-education-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-9.mdx": {
	id: "physical-education-9.mdx";
  slug: "physical-education-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"physical-education-k.mdx": {
	id: "physical-education-k.mdx";
  slug: "physical-education-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-1.mdx": {
	id: "science-1.mdx";
  slug: "science-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-10.mdx": {
	id: "science-10.mdx";
  slug: "science-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-11.mdx": {
	id: "science-11.mdx";
  slug: "science-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-12.mdx": {
	id: "science-12.mdx";
  slug: "science-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-2.mdx": {
	id: "science-2.mdx";
  slug: "science-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-3.mdx": {
	id: "science-3.mdx";
  slug: "science-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-4.mdx": {
	id: "science-4.mdx";
  slug: "science-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-5.mdx": {
	id: "science-5.mdx";
  slug: "science-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-6.mdx": {
	id: "science-6.mdx";
  slug: "science-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-7.mdx": {
	id: "science-7.mdx";
  slug: "science-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-8.mdx": {
	id: "science-8.mdx";
  slug: "science-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-9.mdx": {
	id: "science-9.mdx";
  slug: "science-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"science-k.mdx": {
	id: "science-k.mdx";
  slug: "science-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-1.mdx": {
	id: "world-language-1.mdx";
  slug: "world-language-1";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-10.mdx": {
	id: "world-language-10.mdx";
  slug: "world-language-10";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-11.mdx": {
	id: "world-language-11.mdx";
  slug: "world-language-11";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-12.mdx": {
	id: "world-language-12.mdx";
  slug: "world-language-12";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-2.mdx": {
	id: "world-language-2.mdx";
  slug: "world-language-2";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-3.mdx": {
	id: "world-language-3.mdx";
  slug: "world-language-3";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-4.mdx": {
	id: "world-language-4.mdx";
  slug: "world-language-4";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-5.mdx": {
	id: "world-language-5.mdx";
  slug: "world-language-5";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-6.mdx": {
	id: "world-language-6.mdx";
  slug: "world-language-6";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-7.mdx": {
	id: "world-language-7.mdx";
  slug: "world-language-7";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-8.mdx": {
	id: "world-language-8.mdx";
  slug: "world-language-8";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-9.mdx": {
	id: "world-language-9.mdx";
  slug: "world-language-9";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"world-language-k.mdx": {
	id: "world-language-k.mdx";
  slug: "world-language-k";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
