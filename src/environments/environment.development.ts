export const environment = {
    production : false,
    name : "Dev Env",
   // gatewayUrl : "https://dev-altsys-realize-api.azurewebsites.net/",
   //Updating Product API ULR  --Veena
 //  gatewayUrl : "https://dev-productapi.realize.skysecuretech.com/",
 gatewayUrl:"http://localhost:8002/",
    //gatewayUrl : "http://localhost:8002/",
 //   gatewayUrlForUserProfile : "https://dev-altsys-realize-users-api.azurewebsites.net/",
 gatewayUrlForUserProfile : "http://localhost:2003/",
  //gatewayUrlForOrders : "https://dev-altsys-realize-order.azurewebsites.net/",
  gatewayUrlForOrders : "http://localhost:8080/",

    /* Azure Config */
    signUpSignIn : "B2C_1_sisu",
    editProfile: "B2C_1_ProfileEdit",
    passwordReset:"B2C_1_PasswordReset" ,
    signUpSignInAuthority : "https://altsysrealizeappdev.b2clogin.com/altsysrealizeappdev.onmicrosoft.com/B2C_1_sisu",
    authorityDomain: "altsysrealizeappdev.b2clogin.com",
    clientId: '400805fb-213f-4c6b-a346-8cdea9975a88',

    /* Azure Graph API */
    appId : '25a5e4d5-b46f-42ad-b556-9f1984b0b837'

};

// export const environment = {
//     production : true,
//     name : "Prod Env",
//     gatewayUrl : "https://productapi.realize.skysecuretech.com/",
//     gatewayUrlForUserProfile : "https://usersapi.realizeweb.skysecuretech.com/",
//     gatewayUrlForOrders : "https://orderapi.realize.skysecuretech.com/",


//     /* Azure Config */
//     signUpSignIn : "B2C_1_sisu",
//     editProfile: "B2C_1_ProfileEdit",
//     passwordReset:"B2C_1_PasswordReset" ,
//     signUpSignInAuthority : "https://realizeSkysecuretech.b2clogin.com/realizeSkysecuretech.onmicrosoft.com/B2C_1_sisu",
//     authorityDomain: "realizeSkysecuretech.b2clogin.com",
//     clientId: '102a9603-3a59-4d46-b6d7-5c9e163fdcb4',

//     /* Azure Graph API */
//     appId : 'f5a23ea9-4a7f-44d3-b063-ed635e904e01'

// };
