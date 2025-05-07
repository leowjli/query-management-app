import { Modal, Button, Stack, Text, Badge } from "@mantine/core";
import { Query } from "../types";
import { IconCheck } from "@tabler/icons-react";

interface ViewQueryModalProps {
  opened: boolean;
  onClose: () => void;
  query: Query;
  onResolve: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function ViewQueryModal({ opened, onClose, query, onResolve, onDelete }: ViewQueryModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Query | ${query.title}`}
      size="xl"
      centered
      styles={{
        title: {
          fontWeight: 600,
          width: "100%",
          lineHeight: 1.25
        }
      }}
    >
      <Stack>
        <Text size="sm" fw={500}>Title: {query.title}</Text>
        <Text size="sm" fw={500}>Description: {query.description || "No description provided"}</Text>

        <Badge
          color={query.status === "OPEN" ? "red" : "green"}
          rightSection={query.status === "RESOLVED" && <IconCheck size={14} />}
          styles={{
            root: {
              display: "flex",
              alignItems: "center",
              height: 30,
              padding: "0 12px",
              cursor: "pointer",
            },
            label: {
              lineHeight: 1,
            },
          }}
        >
          {query.status}
        </Badge>

        <div className="flex justify-between">
          <Text size="xs" c="dimmed">
            Created: {new Date(query.createdAt).toLocaleString()}
          </Text>
          <Text size="xs" c="dimmed">
            Last Updated: {getRelativeOrFullDate(query.updatedAt).toLocaleString()}
          </Text>
        </div>

        {query.status === "OPEN" && (
          <Button onClick={onResolve}>
            Resolve Query
          </Button>
        )}
        <Button color="red" onClick={onDelete}>
          Delete Query
        </Button>
      </Stack>
    </Modal>
  );
}

function getRelativeOrFullDate(timestamp: string | number | Date): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay >= 1) {
    // show the full date if updatedAt older than 24h
    return time.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  // this is now a relative time of when the query was updated relative to created
  if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  return `Just now`;
}
