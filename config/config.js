angular.module('service.config', [])
  .constant('configuration', {
    env: '@@env',
    planIssue: '@@planIssue'
  });
