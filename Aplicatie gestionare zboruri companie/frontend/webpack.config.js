const path = require('path');

module.exports = [
  {
    entry: './src/login.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'login.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
  
  {
    entry: './src/profile.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'profile.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/employee.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'employee.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/customer.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'customer.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/wishlist.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'wishlist.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/shoppingcart.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'shoppingcart.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/history.js',
    output: {
      path: path.join(__dirname, '../backend/src/main/resources/static/app'),
      filename: 'history.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }
];