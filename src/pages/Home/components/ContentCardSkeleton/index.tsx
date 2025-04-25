import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContentCardSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between rounded-t-2xl bg-[#7695EC] p-4">
        <Skeleton height={18} width={200} />
      </div>

      <div className="flex flex-col gap-2 rounded-b-2xl border border-solid border-[#999999] p-4">
        <div className="flex w-full flex-wrap justify-between">
          <Skeleton height={18} width={100} />

          <Skeleton height={18} width={200} />
        </div>

        <Skeleton height={100} />
      </div>
    </div>
  );
};

export default ContentCardSkeleton;
