const { createClient } = require("@supabase/supabase-js")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { supabaseUrl, supabaseKey, types }
) => {
  const { createNode } = actions

  const supabase = createClient(supabaseUrl, supabaseKey)

  types.forEach(({ type, query }) => {
    query(supabase).then(({ data }) => {
      data.forEach(entry => {
        const id = entry.id ? entry.id : entry[0]
        
        createNode({
          ...entry,
          id: createNodeId(`${type}-${id}`),
          parent: null,
          children: [],
          internal: {
            type,
            content: JSON.stringify(entry),
            contentDigest: createContentDigest(entry),
          },
        })
      })
    })
  })

  return
}
