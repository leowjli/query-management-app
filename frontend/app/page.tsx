'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Paper, Text } from '@mantine/core';
import DataTable from './components/DataTable';
import { FormData, FormDataResponse } from './types';

export default function Home() {
  const [data, setData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8080/form-data');
      const result: FormDataResponse = await res.json();
      console.log('Fetched data:', result);
      setData(result.data.formData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateQuery = async (formDataId: string, title: string, description: string) => {
    try {
      const res = await fetch('http://localhost:8080/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          formDataId,
        }),
      });

      if (!res.ok) throw new Error('Failed to create query');

      await fetchData(); // Refresh data after creating query
    } catch (error) {
      console.error('Error creating query:', error);
    }
  };

  const handleUpdateQuery = async (queryId: string, status: 'OPEN' | 'RESOLVED') => {
    try {
      const res = await fetch(`http://localhost:8080/queries/${queryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!res.ok) throw new Error('Failed to update query');

      await fetchData(); // Refresh data after updating query
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">Query Management</Title>
      <Paper shadow="sm" p="md">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <DataTable
            data={data}
            onQueryCreate={handleCreateQuery}
            onQueryUpdate={handleUpdateQuery}
          />
        )}
      </Paper>
    </Container>
  );
} 