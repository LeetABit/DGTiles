# Recovery options

In case of misconfigured, broken or lost Azure resources here are the steps needed to recreate them:

## Azure Directory

To create a new Azure B2C directory for the organization switch to a target subscription and follow steps described on the following page: https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant
As a different reference you may also use: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant

## Subscription Transfer

Follow instructions described on the following page: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory
This step may take some time, so in case of any visible misconfiguration just wait ~1 hour.
After successful subscription transfer select it in **Default subscription filter** on **Directories + subscriptions** page.
Then go to the new subscription and **Change service admin** on subscription **Properties** page.
The final step is to transfer all resources groups to the new subscription into the new Resource Groups named after the source ones.

## Resources

To recreate resources needed to host the website execute following Azure CLI command in context of the target subscription.

```
az deployment sub create --template-file 'Resources.bicep' --parameters continent='Europe' region='West Europe' location='Germany West Central' organizationName='LeetABit' websiteName='DGTiles' websiteDomain='dgtiles.com'
```

Custom domain verification may be needed to confirm ownership. Please check Static Web App resource configuration after deployment.
