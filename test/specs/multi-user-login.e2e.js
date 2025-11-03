// hello i took a little time to explan what i learn doing this and i will leave little pieces of what each part of my code does or new things i learned
//the 'describe' groups everything together 
describe('SauceDemo Login Tests', () => {
 // here are all the usernames to be tested and there 'flag' to see if the login is true or false and in this case only one is false
    const users = [
        {username: 'standard_user', shouldLogin: true},
        {username: 'locked_out_user', shouldLogin: false},
        {username: 'problem_user', shouldLogin: true},
        {username: 'performance_glitch_user', shouldLogin: true},
        {username: 'error_user', shouldLogin: true },
        {username: 'visual_user', shouldLogin: true},
    ]
//the 'foreach' is to run each and every user in the array making it test all users
//the rest below is to test each one, the await is to wait for the url to fully load and well it tells what to do basically 
// first the url browser, then the username and password and finally the action of clicking 
    users.forEach(user => {
        it(`${user.username} login test`, async () => {
            await browser.url('https://www.saucedemo.com/')
            await $('#user-name').setValue(user.username)
            await $('#password').setValue('secret_sauce')
            await $('#login-button').click()
//the if user.shouldlogin gives like an after if the user logged in succesfully
//te const is to find the element in the page and in this case it would be the inverntory list and thats what the 
//expect to be for to make sure its there 
            if (user.shouldLogin) {
                const inventoryPage = await $('.inventory_list')
                await expect (inventoryPage).toBeDisplayed()
                //and the else is like "if that didnt work" only for the locked user it will look for the error box to be displayed 
            } else {
                const errormsg = await $('[data-test="error"]')
                await expect(errormsg).toBeDisplayed()
            }
        })
    })
})