type CreatePostActionProps = {
  number: number;
};

export async function createdPostAction(
  prevState: CreatePostActionProps
): Promise<CreatePostActionProps> {
  console.log({ prevState });

  return {
    number: (prevState.number += 1),
  };
}
