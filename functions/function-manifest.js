const tools = [
  {
    type: 'function',
    function: {
      name: 'markLeadPositive',
      say: 'Thank you for your interest! I will mark this as a lead to follow up later.',
      description: 'Marks a lead as positive based on the lead ID.',
      parameters: {
        type: 'object',
        properties: {
          lead: { // Changed from "Lead" to "leadId" for consistency
            type: 'string',
            description: 'positive',
          },
        },
        required: ['lead'], // Making it required for consistency with markLeadNegative
      },
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
    },
  }
];

module.exports = tools;
