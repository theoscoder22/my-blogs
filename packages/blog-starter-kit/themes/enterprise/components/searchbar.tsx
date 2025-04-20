import { resizeImage } from '@starter-kit/utils/image';
import request from 'graphql-request';
import Link from 'next/link';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import {
	SearchPostsOfPublicationDocument,
	SearchPostsOfPublicationQuery,
	SearchPostsOfPublicationQueryVariables,
} from '../generated/graphql';
import { DEFAULT_COVER } from '../utils/const';
import { useAppContext } from './contexts/appContext';
import { CoverImage } from './cover-image';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const NO_OF_SEARCH_RESULTS = 5;

type Post = SearchPostsOfPublicationQuery['searchPostsOfPublication']['edges'][0]['node'];

export const Search = () => {
	const { publication } = useAppContext();

	const searchInputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState<Post[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const resetInput = () => {
		if (!searchInputRef.current) return;
		searchInputRef.current.value = '';
		setQuery('');
	};

	const escapeSearchOnESC: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Escape') {
			resetInput();
		}
	};

	const updateSearchQuery = () => {
		setQuery(searchInputRef.current?.value || '');
	};

	const search = async (query: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);

		if (!query) {
			setSearchResults([]);
			setIsSearching(false);
			return;
		}

		timerRef.current = setTimeout(async () => {
			setIsSearching(true);

			const data = await request<
				SearchPostsOfPublicationQuery,
				SearchPostsOfPublicationQueryVariables
			>(GQL_ENDPOINT, SearchPostsOfPublicationDocument, {
				first: NO_OF_SEARCH_RESULTS,
				filter: { query, publicationId: publication.id },
			});
			const posts = data.searchPostsOfPublication.edges.map((edge) => edge.node);
			setSearchResults(posts);
			setIsSearching(false);
		}, 500);
	};

	useEffect(() => {
		search(query);
	}, [query]);

	const searchResultsList = searchResults.map((post) => {
		const postURL = `/${post.slug}`;
		return (
			<Link
				key={post.id}
				href={postURL}
				className="flex items-center gap-4 rounded-xl p-4 transition hover:bg-slate-100 dark:hover:bg-neutral-800"
			>
				<div className="w-24 shrink-0 overflow-hidden rounded-lg">
					<CoverImage
						title={post.title}
						src={resizeImage(
							post.coverImage?.url,
							{ w: 300, h: 160, c: 'thumb' },
							DEFAULT_COVER,
						)}
					/>
				</div>
				<div className="flex flex-col">
					<h4 className="text-base font-semibold text-slate-800 dark:text-neutral-100">
						{post.title}
					</h4>
					<p className="text-sm text-slate-600 dark:text-neutral-300">
						{post.brief.length > 100 ? post.brief.slice(0, 100) + '…' : post.brief}
					</p>
				</div>
			</Link>
		);
	});

	const Skeleton = () => (
		<div className="flex animate-pulse flex-row gap-4 rounded-xl bg-slate-50 p-4 dark:bg-neutral-800">
			<div className="h-20 w-32 rounded-lg bg-slate-200 dark:bg-neutral-700" />
			<div className="flex flex-col gap-2">
				<div className="h-4 w-48 rounded bg-slate-200 dark:bg-neutral-700" />
				<div className="h-3 w-64 rounded bg-slate-200 dark:bg-neutral-700" />
				<div className="h-3 w-40 rounded bg-slate-200 dark:bg-neutral-700" />
			</div>
		</div>
	);

	return (
		<div className="relative col-span-1 w-full">
			<input
				type="text"
				ref={searchInputRef}
				onKeyUp={escapeSearchOnESC}
				onChange={updateSearchQuery}
				placeholder="🔍 Search blog posts…"
				className="w-full rounded-full border-2 border-teal-400 bg-white px-5 py-3 text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
			/>

			{query && (
				<div className="absolute left-0 z-10 mt-2 w-full rounded-xl border bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
					{isSearching ? (
						<>
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</>
					) : searchResults.length > 0 ? (
						<>
							<p className="px-2 pb-2 text-sm text-slate-500 dark:text-neutral-400">
								Showing {searchResults.length} result{searchResults.length > 1 ? 's' : ''}
							</p>
							<hr className="mb-2 border-slate-100 dark:border-neutral-800" />
							{searchResultsList}
						</>
					) : (
						<div className="p-4 text-center text-sm text-slate-500 dark:text-neutral-400">
							No results found.
						</div>
					)}
				</div>
			)}
		</div>
	);
};
