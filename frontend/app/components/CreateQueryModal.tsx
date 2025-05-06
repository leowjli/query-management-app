import { Modal, TextInput, Button, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormData } from '../types';

interface CreateQueryModalProps {
  opened: boolean;
  onClose: () => void;
  formData: FormData;
  onSubmit: (description: string) => Promise<void>;
}

export default function CreateQueryModal({ opened, onClose, formData, onSubmit }: CreateQueryModalProps) {
  const form = useForm({
    initialValues: {
      description: '',
    },
    validate: {
      description: (value) => (value.trim().length === 0 ? 'Description is required' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await onSubmit(values.description);
    form.reset();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Query">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Text size="sm" fw={500}>Question: {formData.question}</Text>
          <Text size="sm" fw={500}>Answer: {formData.answer}</Text>
          
          <TextInput
            label="Description"
            placeholder="Enter query description"
            {...form.getInputProps('description')}
          />

          <Button type="submit" color="blue">
            Create Query
          </Button>
        </Stack>
      </form>
    </Modal>
  );
} 