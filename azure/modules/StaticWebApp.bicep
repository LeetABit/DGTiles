@allowed([
  'West US 2'
  'Central US'
  'East US 2'
  'West Europe'
  'East Asia'
])
param region string
param organizationName string
param websiteName string
param websiteDomain string
param branchName string

targetScope = 'resourceGroup'

resource staticWebApp_resource 'Microsoft.Web/staticSites@2021-02-01' = {
  name: websiteName
  location: region
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: 'https://github.com/${organizationName}/${websiteName}'
    branch: branchName
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
  }
}

resource staticWebApp_customDomain 'Microsoft.Web/staticSites/customDomains@2021-02-01' = {
  parent: staticWebApp_resource
  name: websiteDomain
}

output siteId string = staticWebApp_resource.id
