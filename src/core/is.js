/**
 * 判定puppeteer返回的 response request主体
 */

module.exports = {
  isDownloadImageByResponse(data, minSize = 5 * 1024) {
    const header = data.headers();
    return header['content-length'] > minSize && header['content-type'].startsWith('image/');
  },
  isImageByRequest(data) {
    return data.resourceType === 'image';
  }
};
