import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Braining API',
      version: '1.0.0',
    },
    servers: [
      { url: '/braining' }
    ],
    paths: {
      '/': {
        get: {
          tags: ['version'],
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/version'
                  }
                }
              }
            }
          }
        },
      },
      '/v1/auth/exist-nickname/{nickname}': {
        get: {
          tags: ['auth'],
          parameters: [
            {
              in: 'path',
              name: 'nickname',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    properties: {
                      res: {
                        type: 'boolean'
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
      '/v1/auth/signup': {
        post: {
          tags: ['auth'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user'
                }
              }
            }
          },
          responses: {
            201: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/user'
                  }
                }
              }
            }
          }
        },
      },
      '/v1/auth/signin': {
        put: {
          tags: ['auth'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    username: {
                      type: 'string'
                    },
                    fcm: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/user'
                  }
                }
              }
            }
          }
        },
      },
      '/v1/auth/user': {
        put: {
          tags: ['auth'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user'
                }
              }
            }
          },
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/user'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['auth'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'OK'
            }
          }
        },
      },
      '/v1/game/{code}': {
        post: {
          tags: ['game'],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'code',
              schema: {
                $ref: '#/components/schemas/code'
              },
              required: true
            }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    score: {
                      type: 'number'
                    },
                    elapsed: {
                      type: 'number'
                    },
                    correct: {
                      type: 'number'
                    },
                    incorrect: {
                      type: 'number'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/game'
                  }
                }
              }
            }
          }
        },
      },
      '/v1/records': {
        get: {
          tags: ['record'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/record'
                    }
                  }
                }
              }
            }
          }
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        version: {
          properties: {
            android: {
              properties: {
                major: {
                  type: 'number'
                },
                minor: {
                  type: 'number'
                },
                patch: {
                  type: 'number'
                }
              }
            },
            ios: {
              properties: {
                major: {
                  type: 'number'
                },
                minor: {
                  type: 'number'
                },
                patch: {
                  type: 'number'
                }
              }
            },
            maintenance: {
              type: 'boolean'
            }
          },
          readOnly: true
        },
        game: {
          properties: {
            top: {
              type: 'number'
            }
          }
        },
        code: {
          type: 'number',
          enum: [
            10101, 10201, 10301, 10401, 10501, 20101, 20201, 20301, 20401, 30101, 30201, 30301
          ],
          description: '10100:순서기억하기, 10200:위치찾기, 10300:폭탄피하기, 10400:모양맞추기, 10500:스핀사이클, '
            + '20100:카드정렬, 20200:다른도형찾기, 20300:길찾기, 20400:도형비교하기, '
            + '30100:순서맞추기, 30200:연속연산하기, 30300:빠르게계산하기 '
            + '+ 00001: 쉬움, 00002: 보통, 00003: 어려움'
        },
        record: {
          properties: {
            date: {
              type: 'string',
              format: 'date-time'
            },
            code: {
              $ref: '#/components/schemas/code'
            },
            count: {
              type: 'number'
            },
            elapsed: {
              type: 'number'
            },
            top: {
              type: 'number'
            },
            rate: {
              type: 'number'
            },
            correct: {
              type: 'number'
            },
            incorrect: {
              type: 'number'
            }
          }
        },
        user: {
          properties: {
            username: {
              type: 'string',
              writeOnly: true
            },
            nickname: {
              type: 'string'
            },
            birth: {
              type: 'number'
            },
            gender: {
              type: 'number',
              enum: [1, 2],
              description: '1:남자, 2:여자'
            },
            consecution: {
              type: 'number',
              readOnly: true
            },
            fcm: {
              type: 'string',
              writeOnly: true
            },
            token: {
              type: 'string',
              readOnly: true
            }
          }
        },
      },
    },
  },
  apis: ['./src/route/*.js']
});

export default swaggerSpec;

