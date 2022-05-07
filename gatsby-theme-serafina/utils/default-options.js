module.exports = themeOptions => {
  const galleriesPath = themeOptions.contentPath || `src/galleries`;
  const pagesPath = themeOptions.contentPath || `src/pages`;
  const assetPath = themeOptions.assetPath || `src/assets`;
  const disableContact = false;
  const margin = themeOptions.margin || 6;
  const direction = themeOptions.direction || "column";

  return {
    galleriesPath,
    pagesPath,
    assetPath,
    disableContact,
    margin,
    direction
  };
};
