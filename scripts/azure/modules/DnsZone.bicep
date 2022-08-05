param domainName string
param websiteId string

targetScope = 'resourceGroup'

resource dnsZone_resource 'Microsoft.Network/dnszones@2018-05-01' = {
  name: domainName
  location: 'global'
  properties: {
    zoneType: 'Public'
  }
}

resource dnsZone_recordA 'Microsoft.Network/dnszones/A@2018-05-01' = {
  parent: dnsZone_resource
  name: '@'
  properties: {
    TTL: 3600
    targetResource: {
      id: websiteId
    }
  }
}

resource dnsZone_recordNS 'Microsoft.Network/dnszones/NS@2018-05-01' = {
  parent: dnsZone_resource
  name: '@'
  properties: {
    TTL: 172800
    NSRecords: [
      {
        nsdname: 'ns1-05.azure-dns.com.'
      }
      {
        nsdname: 'ns2-05.azure-dns.net.'
      }
      {
        nsdname: 'ns3-05.azure-dns.org.'
      }
      {
        nsdname: 'ns4-05.azure-dns.info.'
      }
    ]
    targetResource: {}
  }
}

resource dnsZone_recordSOA 'Microsoft.Network/dnszones/SOA@2018-05-01' = {
  parent: dnsZone_resource
  name: '@'
  properties: {
    TTL: 3600
    SOARecord: {
      email: 'azuredns-hostmaster.microsoft.com'
      expireTime: 2419200
      host: 'ns1-05.azure-dns.com.'
      minimumTTL: 300
      refreshTime: 3600
      retryTime: 300
      serialNumber: 1
    }
    targetResource: {}
  }
}
