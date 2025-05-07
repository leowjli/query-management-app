import { Table, Badge, ActionIcon, Tooltip, } from "@mantine/core";
import { IconPlus, IconQuestionMark, IconCheck } from "@tabler/icons-react";
import { FormData, Query } from "../types";
import { useState } from "react";
import CreateQueryModal from "./CreateQueryModal";
import ViewQueryModal from "./ViewQueryModal";

interface DataTableProps {
  data: FormData[];
  onQueryCreate: (formDataId: string, title: string, description: string) => Promise<void>;
  onQueryUpdate: (queryId: string, status: "OPEN" | "RESOLVED") => Promise<void>;
  onQueryDelete: (queryId: string) => Promise<void>;
  // theme: MantineTheme;
  // isDark: boolean;
}

export default function DataTable({ data, onQueryCreate, onQueryUpdate, onQueryDelete }: DataTableProps) {
  const [selectedFormData, setSelectedFormData] = useState<FormData | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleCreateQuery = (formData: FormData) => {
    setSelectedFormData(formData);
    setIsCreateModalOpen(true);
  };

  const handleViewQuery = (query: Query) => {
    setSelectedQuery(query);
    setIsViewModalOpen(true);
  };

  const getQueryStatus = (queries: Query[]) => {
    if (queries.length === 0) return null;
    const latestQuery = queries[queries.length - 1];
    return (
      <Tooltip label={latestQuery.description || "No description"}>
        <Badge
          color={latestQuery.status === "OPEN" ? "red" : "green"}
          rightSection={latestQuery.status === "OPEN" ? <IconQuestionMark size={14} /> : <IconCheck size={14} />}
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
          onClick={() => handleViewQuery(latestQuery)}
        >
          {latestQuery.status}
        </Badge>
      </Tooltip>
    );
  };

  return (
    <>
      <Table 
        highlightOnHover
        striped
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ fontSize: 22 }}>Question</Table.Th>
            <Table.Th style={{ fontSize: 22 }}>Answer</Table.Th>
            <Table.Th style={{ fontSize: 22, textAlign: "center" }}>Queries</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.question}</Table.Td>
              <Table.Td>{item.answer}</Table.Td>
              <Table.Td
                style={{
                  verticalAlign: "middle",
                  textAlign: "center",
                }}
              >
                <div 
                  style={{ 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  {item.queries.length === 0 ? (
                    <Tooltip label="Create Query">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleCreateQuery(item)}
                      >
                        <IconPlus size={16} />
                      </ActionIcon>
                    </Tooltip>
                  ) : (
                    getQueryStatus(item.queries)
                  )}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {selectedFormData && (
        <CreateQueryModal
          opened={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          formData={selectedFormData}
          onSubmit={async (description: string) => {
            await onQueryCreate(selectedFormData.id, selectedFormData.question, description);
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {selectedQuery && (
        <ViewQueryModal
          opened={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          query={selectedQuery}
          onResolve={async () => {
            await onQueryUpdate(selectedQuery.id, "RESOLVED");
            setIsViewModalOpen(false);
          }}
          onDelete={async () => {
            await onQueryDelete(selectedQuery.id);
            setIsViewModalOpen(false);
          }}
        />
      )}
    </>
  );
} 