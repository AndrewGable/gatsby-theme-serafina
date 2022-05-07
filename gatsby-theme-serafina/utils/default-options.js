module.exports = themeOptions => {
  const galleriesPath = themeOptions.contentPath || `src/galleries`;
  const pagesPath = themeOptions.contentPath || `src/pages`;
  const assetPath = themeOptions.assetPath || `src/assets`;
  const disableContact = false;
  const spacing = themeOptions.spacing || 6;
  const layout = themeOptions.layout || "columns";

  return {
    galleriesPath,
    pagesPath,
    assetPath,
    disableContact,
    spacing,
    layout
  };
};
