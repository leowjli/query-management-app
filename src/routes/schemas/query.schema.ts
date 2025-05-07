export const createQuerySchema = {
    body: {
      type: 'object',
      required: ['title', 'formDataId'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        formDataId: { type: 'string', format: 'uuid' },
      },
    },
  };
  
  export const updateQuerySchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', format: 'uuid' },
      },
    },
    body: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['OPEN', 'RESOLVED'] },
        description: { type: 'string' },
      },
      additionalProperties: false,
    },
  };
  
  export const deleteQuerySchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', format: 'uuid' },
      },
    },
  };
  