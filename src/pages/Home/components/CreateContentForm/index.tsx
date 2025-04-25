import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '../../../../store';
import { useCallback } from 'react';
import Button from '../../../../components/Button';
import { createPostEndpoint } from '../../../../api/Post/intex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const schema = z.object({
  title: z.string().min(1, 'The title is mandatory'),
  content: z.string().min(1, 'The content is mandatory'),
});

type ContentFormData = z.infer<typeof schema>;

const CreateContentForm = () => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);

  const { mutateAsync: onCreatePost, isPending: isLoadingCreate } = useMutation(
    {
      mutationFn: async (payload: Carrer.CreatePayload) =>
        createPostEndpoint(payload),
      onSuccess: () => {
        reset({
          title: '',
          content: '',
        });

        queryClient.invalidateQueries({ queryKey: ['get-posts'] });
      },
      onError: (error: string) => toast.error(error),
    },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data: ContentFormData) => {
      onCreatePost({ ...data, username: user.name });
    },
    [user],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border border-solid border-[#999999] p-4"
    >
      <span className="font-bold">What's on your mind?</span>

      <div className="flex flex-col">
        <span>Title</span>

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
        <span>Content</span>

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

      <div className="flex w-full justify-end">
        <Button
          title="Create"
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoadingCreate}
        />
      </div>
    </form>
  );
};

export default CreateContentForm;
