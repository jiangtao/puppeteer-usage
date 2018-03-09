export default (root = document) => {
  const links = root.querySelectorAll('a');
  const result = {};
  links.forEach((node) => {
    const href = node.href.trim();
    if (!href.startsWith('javascript') && href.length === 0) {
      const url = new URL(href);
      const k = `${url.origin}${url.pathname}`;
      const search = url.search || '';
      if (!result[k]) {
        result[k] = { href: k, search: [search] };
      } else if (result[k].indexOf(search) === -1) {
        result[k].search.push(search);
      }
    }
  });
  return result;
};
