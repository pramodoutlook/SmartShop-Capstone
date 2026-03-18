targetScope = 'resourceGroup'

@description('Azure region for all resources. Defaults to the current resource group location.')
param location string = resourceGroup().location

@description('Unique name for the App Service Plan.')
param appServicePlanName string

@description('Globally unique name for the App Service Web App.')
param webAppName string

@description('App Service Plan SKU name.')
@allowed([
  'B1'
  'B2'
  'B3'
  'S1'
  'S2'
  'S3'
  'P1v3'
  'P2v3'
  'P3v3'
])
param skuName string = 'B1'

@description('App Service Plan SKU tier.')
@allowed([
  'Basic'
  'Standard'
  'PremiumV3'
])
param skuTier string = 'Basic'

@description('Runtime stack for Linux web app, for example NODE|20-lts or DOTNETCORE|8.0.')
param linuxFxVersion string = 'NODE|20-lts'

@description('Tags to apply to resources.')
param tags object = {}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  sku: {
    name: skuName
    tier: skuTier
    size: skuName
    capacity: 1
  }
  properties: {
    reserved: true
  }
  tags: tags
}

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: linuxFxVersion
      ftpsState: 'Disabled'
      alwaysOn: false
      minTlsVersion: '1.2'
    }
  }
  tags: tags
}

output appServicePlanResourceId string = appServicePlan.id
output webAppResourceId string = webApp.id
output webAppDefaultHostName string = webApp.properties.defaultHostName
