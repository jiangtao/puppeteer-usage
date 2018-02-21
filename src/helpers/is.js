module.exports = {
  isDownloadImageByResponse(data, minSize = 50 * 1024) {
    return data.headers['content-length'] > minSize && data.headers['content-type'].startsWith('image/')
  },
  isImageByRequest(data) {
    return data.resourceType === 'image'
  }
}
