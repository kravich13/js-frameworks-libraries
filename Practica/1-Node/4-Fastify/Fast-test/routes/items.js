const items = [
  { id: '1', name: 'title1' },
  { id: '2', name: 'title2' },
  { id: '3', name: 'title3' },
]

const addItems = (req, reply) => {
  const data = req.body
  items.push(data)
  reply.send(items)
}

// validation of return datas
// const getItemsOpts = {
//   schema: {
//     response: {
//       200: {
//         type: 'array',
//         items: {
//           type: 'object',
//           properties: {
//             id: { type: 'integer' },
//             name: { type: 'string' },
//           },
//         },
//       },
//     },
//   },
//   handler: addItems,
// }

// validation of incoming datas

const getItemsOpts = {
  schema: {
    tags: ['Post =)'],
    summary: 'Добавить объект и получить все объекты',
    body: {
      200: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'integer', description: "user's id " },
          name: { type: 'string' },
        },
      },
    },
  },
  handler: addItems,
}

export function itemRoutes(fastify, options, done) {
  fastify.get('/items', (req, reply) => {
    reply.send({ test: 'Darova' })
  })

  fastify.get('/items/:id', (req, reply) => {
    const { id } = req.params
    const item = items.find((item) => item.id === id)

    reply.send(item)
  })

  fastify.post('/items', getItemsOpts)

  done()
}
