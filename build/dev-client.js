require('eventsource-polyfill');

// 页面重载
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
hotClient.subscribe((event) => {
  if (event.action === 'reload') {
    // eslint-disable-next-line no-undef
    window.location.reload();
  }
});
