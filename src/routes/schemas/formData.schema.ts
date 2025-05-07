export const getFormDataSchema = {
    response: {
      200: {
        type: 'object',
        properties: {
          total: { type: 'number' },
          formData: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                question: { type: 'string' },
                answer: { type: 'string' },
                queries: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      title: { type: 'string' },
                      description: { type: ['string', 'null'] },
                      status: { type: 'string', enum: ['OPEN', 'RESOLVED'] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                      formDataId: { type: 'string', format: 'uuid' },
                    },
                    required: ['id', 'title', 'status', 'createdAt', 'updatedAt', 'formDataId'],
                  },
                },
              },
              required: ['id', 'question', 'answer', 'queries'],
            },
          },
        },
        required: ['total', 'formData'],
      },
    },
  };
  