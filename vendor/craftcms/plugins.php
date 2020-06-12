<?php

$vendorDir = dirname(__DIR__);
$rootDir = dirname(dirname(__DIR__));

return array (
  'superbig/craft3-mobiledetect' => 
  array (
    'class' => 'superbig\\mobiledetect\\MobileDetect',
    'basePath' => $vendorDir . '/superbig/craft3-mobiledetect/src',
    'handle' => 'mobile-detect',
    'aliases' => 
    array (
      '@superbig/mobiledetect' => $vendorDir . '/superbig/craft3-mobiledetect/src',
    ),
    'name' => 'MobileDetect',
    'version' => '1.0.2',
    'schemaVersion' => '1.0.0',
    'description' => 'Use Mobile_Detect for detecting mobile devices (including tablets)',
    'developer' => 'Superbig',
    'developerUrl' => 'https://superbig.co',
    'documentationUrl' => 'https://github.com/sjelfull/craft3-mobiledetect/blob/master/README.md',
    'changelogUrl' => 'https://raw.githubusercontent.com/sjelfull/craft3-mobiledetect/master/CHANGELOG.md',
    'hasCpSettings' => false,
    'hasCpSection' => false,
    'components' => 
    array (
      'mobileDetectService' => 'superbig\\mobiledetect\\services\\MobileDetectService',
    ),
  ),
);
