import { UseFormReturn, FormProvider as Form } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export default function FormProvider({ children, methods, onSubmit }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
