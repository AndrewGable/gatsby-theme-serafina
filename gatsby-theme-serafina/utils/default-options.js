module.exports = themeOptions => {
  const galleriesPath = themeOptions.contentPath || `src/galleries`;
  const pagesPath = themeOptions.contentPath || `src/pages`;
  const assetPath = themeOptions.assetPath || `src/assets`;
  const disableContact = false;
  const spacing = themeOptions.spacing || 6;
  const layout = themeOptions.layout || "columns";

  // S3 options
  const enableS3 = themeOptions.enableS3 || false;
  const s3AccessKeyId = themeOptions.s3AccessKeyId || '';
  const s3SecretAccessKey = themeOptions.s3SecretAccessKey || '';
  const s3BucketName = themeOptions.s3BucketName || '';
  const s3Domain = themeOptions.s3Domain || 's3.amazonaws.com';

  return {
    galleriesPath,
    pagesPath,
    assetPath,
    disableContact,
    spacing,
    layout,
    enableS3,
    s3AccessKeyId,
    s3SecretAccessKey,
    s3BucketName,
    s3Domain
  };
};
