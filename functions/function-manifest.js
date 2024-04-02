const tools = [
  {
    type: 'function',
    function: {
      name: 'markLeadPositive',
      say: 'Thank you for your interest! Marking this as a positive lead.',
      description: 'Marks a lead as positive based on the lead ID.',
      parameters: {
        type: 'object',
        properties: {
          leadId: {
            type: 'string',
            description: 'The unique identifier for the lead to be marked as positive.',
          },
        },
        required: ['leadId'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Indicates whether the operation was successful.'
          },
          message: {
            type: 'string',
            description: 'Provides additional information about the operation.'
          },
        }
      }
    },
  },
  {
    type: 'function',
    function: {
      name: 'markLeadNegative',
      say: 'Noted. I will mark this as a lead to follow up later.',
      description: 'Marks a lead as negative based on the lead ID.',
      parameters: {
        type: 'object',
        properties: {
          leadId: {
            type: 'string',
            description: 'The unique identifier for the lead to be marked as negative.',
          },
        },
        required: ['leadId'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Indicates whether the operation was successful.'
          },
          message: {
            type: 'string',
            description: 'Provides additional information about the operation.'
          },
        }
      }
    },
  }
  // Continue with other function entries if any...
];

module.exports = tools;
