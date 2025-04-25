import Modal from '../../../../../../components/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import Button from '../../../../../../components/Button';
import { updatePostEndpoint } from '../../../../../../api/Post/intex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface UpdateFormModalProps {
  isOpen: boolean;
  defaultValues: { id: number; title: string; content: string };
  onClose: () => void;
}

const schema = z.object({
  title: z.string().min(1, 'The title is mandatory'),
  content: z.string().min(1, 'The content is mandatory'),
});

type ContentFormData = z.infer<typeof schema>;

const UpdateFormModal = ({
  isOpen,
  defaultValues,
  onClose,
}: UpdateFormModalProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContentFormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: onUpdatePost, isPending: isLoadingSubmit } = useMutation(
    {
      mutationFn: async (payload: Carrer.UpdatePayload) =>
        updatePostEndpoint(payload),
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ['get-posts'] });
      },
      onError: (error: string) => toast.error(error),
    },
  );

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, defaultValues]);

  const isSaveDisabled = useMemo(() => {
    return (
      defaultValues.title === watch('title') &&
      defaultValues.content === watch('content')
    );
  }, [defaultValues, watch('title'), watch('content')]);

  const onSubmit = useCallback(
    (data: ContentFormData) => {
      onUpdatePost({
        ...data,
        id: defaultValues.id,
      });
    },
    [defaultValues.id],
  );

  return (
    <Modal isOpen={isOpen}>
      <div className="flex w-dvw flex-col gap-4 p-4 md:max-w-[660px]">
        <span className="text-[1.375rem] font-bold">Edit item</span>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-[#000000]">Title</span>

            <input
              {...register('title')}
              className="h-8 rounded-[0.5rem] border border-solid border-[#777777] px-2"
              placeholder="Hello world"
            />

            {errors.title && (
              <p className="mb-[-18px] text-[0.75rem] text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-[#000000]">Content</span>

            <textarea
              {...register('content')}
              rows={3}
              className="min-h-8 rounded-[0.5rem] border border-solid border-[#777777] px-2"
              placeholder="Content here"
            />

            {errors.content && (
              <p className="mb-[-18px] text-[0.75rem] text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-4">
            <Button title="Cancel" onSubmit={onClose} typeButton="cancel" />

            <Button
              title="Save"
              typeButton="save"
              onSubmit={handleSubmit(onSubmit)}
              isLoading={isLoadingSubmit}
              isDisabled={isSaveDisabled}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateFormModal;
