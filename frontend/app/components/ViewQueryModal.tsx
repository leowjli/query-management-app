import { Modal, Button, Stack, Text, Badge } from '@mantine/core';
import { Query } from '../types';
import { IconCheck } from '@tabler/icons-react';

interface ViewQueryModalProps {
  opened: boolean;
  onClose: () => void;
  query: Query;
  onResolve: () => Promise<void>;
}

export default function ViewQueryModal({ opened, onClose, query, onResolve }: ViewQueryModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Query Details">
      <Stack>
        <Text size="sm" fw={500}>Title: {query.title}</Text>
        <Text size="sm" fw={500}>Description: {query.description || 'No description provided'}</Text>
        
        <Badge
          color={query.status === 'OPEN' ? 'red' : 'green'}
          leftSection={query.status === 'RESOLVED' && <IconCheck size={14} />}
        >
          {query.status}
        </Badge>

        <Text size="xs" c="dimmed">
          Created: {new Date(query.createdAt).toLocaleString()}
        </Text>
        <Text size="xs" c="dimmed">
          Last Updated: {new Date(query.updatedAt).toLocaleString()}
        </Text>

        {query.status === 'OPEN' && (
          <Button color="green" onClick={onResolve}>
            Resolve Query
          </Button>
        )}
      </Stack>
    </Modal>
  );
} 