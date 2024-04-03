const tools = [
  {
    type: 'function',
    function: {
      name: 'Intreseted',
      // say: 'Thank you for your interest! I will mark this as a lead to follow up later.',
      description: 'Marks a lead as positive based on the lead ID.',
      parameters: {
        type: 'object',
        properties: {
          lead: { 
            type: 'string',
            description: 'positive',
          },
        },
        required: ['lead'],
      },
      returns: {
        type: 'object',
        properties: {
          m: {
            type: 'String',
            description: 'positive'
          }
        }
      }
    },
  },
  {
    type: 'function',
    function: {
      name: 'NotIntreseted',
      // say: 'Noted. I will mark this as a lead to follow up later.',
      description: 'Marks a lead as negative based on the lead ID.',
      parameters: {
        type: 'object',
        properties: {
          lead: {
            type: 'string',
            description: 'negitive',
          },
        },
        required: ['lead'],
      },
      returns: {
        type: 'object',
        properties: {
          m: {
            type: 'String',
            description: 'negetive' 
          }
        }
      }
    },
  }
];

module.exports = tools;
