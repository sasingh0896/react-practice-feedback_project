const passport = require('passport')

app.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/fail'
        })
    );
app.get('/api/current_user',(req,res)=>
{
    //res.send(JSON.stringify(req.user));
    res.send(JSON.stringify(req.session));
})

app.get('/api/logout',(req,res)=>
{
    req.logout();
    res.send(JSON.stringify(req.user));
})