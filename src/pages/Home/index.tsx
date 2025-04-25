import { useInfiniteQuery } from '@tanstack/react-query';
import ContentCard from './components/ContentCard';
import CreateContentForm from './components/CreateContentForm';
import { getPosts } from '../../api/Post/intex';
import { useMemo, useState } from 'react';
import ContentCardSkeleton from './components/ContentCardSkeleton';
import Button from '../../components/Button';
import { SwapVert } from '@mui/icons-material';

const Home = () => {
  const [sortedByAscending, setSortedByAscending] = useState<boolean>(true);

  const {
    data: postsResult,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfiniteQuery({
    queryKey: ['get-posts'],
    queryFn: async ({ pageParam = '' }) => getPosts(pageParam),
    initialPageParam:
      'https://dev.codeleap.co.uk/careers/?limit=10&offset=0&username=',
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined;
    },
  });

  const currentPosts = useMemo(() => {
    if (!postsResult) return [];

    const allPosts: Carrer.Entity[] = postsResult.pages.reduce((acc, page) => {
      return acc.concat(page.results);
    }, []);

    const sortedPosts = allPosts?.sort((left, right) =>
      sortedByAscending
        ? new Date(right.created_datetime).getTime() -
          new Date(left.created_datetime).getTime()
        : new Date(left.created_datetime).getTime() -
          new Date(right.created_datetime).getTime(),
    );

    return sortedPosts;
  }, [postsResult, sortedByAscending]);

  return (
    <div className="flex h-lvh w-full flex-col items-center lg:px-56">
      <div className="flex h-20 w-full items-center bg-[#7695EC] px-4 text-[1.375rem] text-white">
        CodeLeap Network
      </div>

      <div className="flex h-full w-full flex-col gap-4 overflow-y-auto bg-white p-5">
        <CreateContentForm />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg border border-solid px-2 hover:bg-gray-100 active:opacity-60"
            onClick={() => setSortedByAscending((state) => !state)}
          >
            <SwapVert />

            <p>Sorted by {sortedByAscending ? 'Ascending' : 'Descending'}</p>
          </button>
        </div>

        {isLoadingPosts ? (
          <div className="flex flex-col gap-4">
            <ContentCardSkeleton />

            <ContentCardSkeleton />
          </div>
        ) : currentPosts.length === 0 ? (
          <p className="flex justify-center pt-8 text-2xl">
            There are no posts yet!
          </p>
        ) : (
          currentPosts?.map((value) => {
            return <ContentCard key={value.id} data={value} />;
          })
        )}

        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              title="Load more posts"
              onSubmit={fetchNextPage}
              isLoading={isFetchingNextPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
