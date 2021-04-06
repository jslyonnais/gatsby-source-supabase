# gatsby-source-supabase

<table>
  <tr>
    <td valign="top"><img height="100px" width="100px" src="./assets/gatsby-logo.png"></td>
    <td valign="top"> <img height="100px" width="100px" src="./assets/supabase-logo.png"></td>
  </tr>
</table>

[![NPM](https://img.shields.io/npm/v/gatsby-source-supabase.svg)](https://www.npmjs.com/package/gatsby-source-supabase)

A very simple gatsby source plugin for supabase.

## How to install

```
npm install gatsby-source-supabase
```

## Available options

- `supabaseUrl` - the url of your supabase db
- `supabaseKey` - the public key of your supabase db
- `types` - entities you will be sourcing into your pages

## Examples of usage

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-supabase`,
      options: {
        supabaseUrl: "https://xyzcompany.supabase.co",
        supabaseKey: "public-anon-key",
        types: [
          {
            type: "User",
            query: (client) => client.from("users").select("*"),
          },
          {
            type: "Project",
            query: (client) => client.from("projects").select("*"),
          },
        ],
      },
    },
  ],
};
```

## How to query for data

```
query MyQuery {
  allProject {
    nodes {
      name
      id
    }
  }
  project(name: {eq: "test"}) {
    name
  }

  allUser {
    nodes {
      name
      id
    }
  }
  user(name: {eq: "user 2"}) {
    name
  }
}
```

Will result with:

```
{
  "data": {
    "allProject": {
      "nodes": [
        {
          "name": "test",
          "id": "998d36a7-2f98-5adc-91d7-445f61fd82b1"
        },
        {
          "name": "test 2",
          "id": "048a3581-f8ed-51bf-9fff-a1b385b607da"
        }
      ]
    },
    "project": {
      "name": "test"
    },
    "allUser": {
      "nodes": [
        {
          "name": "user 2",
          "id": "793b7071-0863-54cb-8828-cdfab4a437b3"
        },
        {
          "name": "user",
          "id": "0651eb10-3f38-50c5-b2b3-7ccc5cfa36f5"
        }
      ]
    },
    "user": {
      "name": "user 2"
    }
  }
}
```