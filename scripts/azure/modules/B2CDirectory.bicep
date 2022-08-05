@allowed([
  'Global'
  'United States'
  'Europe'
  'Asia Pacific'
  'Australia'
])
param continent string
param organizationName string

targetScope = 'resourceGroup'

resource b2cDirectory_resource 'Microsoft.AzureActiveDirectory/b2cDirectories@2019-01-01-preview' = {
  name: '${organizationName}.onmicrosoft.com'
  location: continent
  sku: {
    name: 'PremiumP1'
    tier: 'A0'
  }
  properties:{
  }
}

