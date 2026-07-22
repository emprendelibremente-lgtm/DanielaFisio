export type ActionState = {
  success: boolean;
  message: string | null;
  debug?: string;
};

export const initialActionState: ActionState = {
  success: false,
  message: null,
};
