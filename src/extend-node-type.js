'use strict';

const { GraphQLInt, GraphQLJSON, GraphQLString } = require('gatsby/graphql');

const { resolveGatsbyImageData } = require('./gatsby-plugin-image');

exports.setFieldsOnGraphQLNodeType = async ({ type, cache, reporter }, configOptions) => {
  const typePrefix = configOptions.type_prefix || 'Contentstack';
  if (type.name !== `${typePrefix}_assets`) {
    return {};
  }

  // gatsby-plugin-image
  const getGatsbyImageData = async () => {
    const { getGatsbyImageFieldConfig } = await import('gatsby-plugin-image/graphql-utils');

    const fieldConfig = getGatsbyImageFieldConfig(
      async (...args) => resolveGatsbyImageData(...args, { cache, reporter }),
      {
        fit: {
          type: GraphQLString,
        },
        crop: {
          type: GraphQLString,
        },
        trim: {
          type: GraphQLString,
        },
        pad: {
          type: GraphQLString,
        },
        quality: {
          type: GraphQLInt,
          defaultValue: 50,
        },
      }
    );

    fieldConfig.type = GraphQLJSON;

    return fieldConfig;
  };

  const gatsbyImageData = await getGatsbyImageData();
  return { gatsbyImageData };
};