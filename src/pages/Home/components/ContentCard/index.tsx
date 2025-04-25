import { EditSquare, DeleteForever } from '@mui/icons-material';
import DeleteAlertModal from './components/DeleteAlertModal';
import { useState } from 'react';
import UpdateFormModal from './components/UpdateFormModal';
import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from '../../../../store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePostEndpoint } from '../../../../api/Post/intex';
import { toast } from 'react-toastify';

type ContentCardProps = {
  data: Carrer.Entity;
};

const ContentCard = ({ data }: ContentCardProps) => {
  const queryClient = useQueryClient();
  const userName = useAppSelector((state) => state.user.name);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const { mutateAsync: onDelete, isPending: isLoadingDelete } = useMutation({
    mutationFn: async () => deletePostEndpoint(data.id!),
    onSuccess: () => {
      setIsOpenDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: ['get-posts'] });
    },
    onError: (error: string) => toast.error(error),
  });

  return (
    <div className="flex flex-col">
      <UpdateFormModal
        isOpen={isOpenUpdateModal}
        defaultValues={{
          id: data.id!,
          title: data.title,
          content: data.content,
        }}
        onClose={() => setIsOpenUpdateModal(false)}
      />

      <DeleteAlertModal
        isOpen={isOpenDeleteModal}
        isLoading={isLoadingDelete}
        onClose={() => setIsOpenDeleteModal(false)}
        onDelete={onDelete}
      />

      <div className="flex w-full justify-between rounded-t-2xl bg-[#7695EC] p-4 text-white">
        <span className="text-[1.375rem] font-bold">{data.title}</span>

        {userName === data.username && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpenDeleteModal(true)}
              className="cursor-pointer rounded-full p-1.5 transition-all hover:bg-[#2f62ee]"
            >
              <DeleteForever />
            </button>

            <button
              type="button"
              onClick={() => setIsOpenUpdateModal(true)}
              className="cursor-pointer rounded-full p-1.5 transition-all hover:bg-[#2f62ee]"
            >
              <EditSquare />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-b-2xl border border-solid border-[#999999] p-4">
        <div className="flex w-full flex-wrap justify-between">
          <span className="text-[1.125rem] font-bold text-[#777777]">
            @{data.username}
          </span>

          <span className="text-[1.125rem] text-[#777777]">
            {formatDistanceToNow(new Date(data.created_datetime), {
              addSuffix: true,
            })}
          </span>
        </div>

        <span className="text-[1.125rem] text-[#000000]">{data.content}</span>
      </div>
    </div>
  );
};

export default ContentCard;
