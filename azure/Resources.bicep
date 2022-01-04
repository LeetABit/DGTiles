@allowed([
  'Global'
  'United States'
  'Europe'
  'Asia Pacific'
  'Australia'
])
param continent string = 'Europe'
@allowed([
  'West US 2'
  'Central US'
  'East US 2'
  'West Europe'
  'East Asia'
])
param region string = 'West Europe'
@allowed([
  'West Europe'
  'East US'
  'East US 2'
  'West US'
  'North Central US'
  'Brazil South'
  'North Europe'
  'Central US'
  'East Asia'
  'Japan East'
  'Australia Southeast'
  'Japan West'
  'Korea Central'
  'Southeast Asia'
  'South Central US'
  'Australia East'
  'South India'
  'Central India'
  'West India'
  'Canada Central'
  'Canada East'
  'UK South'
  'UK West'
  'West Central US'
  'West US 2'
  'France Central'
  'South Africa North'
  'UAE North'
  'Australia Central'
  'Germany West Central'
  'Switzerland North'
  'Norway East'
  'Brazil Southeast'
  'West US 3'
  'Sweden Central'
])
param location string = 'Germany West Central'
param organizationName string = 'LeetABit'
param websiteName string = 'DGTiles'
param websiteDomain string = 'dgtiles.com'

targetScope = 'subscription'

resource LeetABit_ResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  location: location
  name: organizationName
}

module B2CDirectory 'modules/B2CDirectory.bicep' = {
  name: 'LeetABit - B2C Directory'
  scope: LeetABit_ResourceGroup
  params: {
    continent: continent
    organizationName: '${toLower(organizationName)}'
  }
}

resource DGTiles_ResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  location: location
  name: websiteName
}

module StaticSite 'modules/StaticWebApp.bicep' = {
  name: 'DGTiles - Static Web App'
  scope: DGTiles_ResourceGroup
  params: {
    region: region
    organizationName: organizationName
    websiteName: websiteName
    websiteDomain: websiteDomain
    branchName: 'main'
  }
}

module DnsZone 'modules/DnsZone.bicep' = {
  name: 'DGTiles - DNS Zone'
  scope: DGTiles_ResourceGroup
  params: {
    domainName: websiteDomain
    websiteId: StaticSite.outputs.siteId
  }
}
