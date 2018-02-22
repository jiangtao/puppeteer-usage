/**
 * 判定puppeteer返回的 response request主体
 */
module.exports = {
  isDownloadImageByResponse(data, minSize = 5 * 1024) {
    return data.headers['content-length'] > minSize && data.headers['content-type'].startsWith('image/');
  },
  isImageByRequest(data) {
    return data.resourceType === 'image';
  }
};
