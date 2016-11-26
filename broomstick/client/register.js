Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var adminVar = $("#admin").attr('checked')?true:false;

        console.log("Form submitted.");

        if(adminVar)
        {
            var options = {
                username: emailVar,
                emails: [{
                    address: emailVar,
                    verified: false,
                }],
                password: passwordVar,
                profile: {
                    admin: adminVar
                },
            };
        }
        else
        {
            var options = {
            username: emailVar,
            emails: [{
                address: emailVar,
                verified: false,
            }],
            password: passwordVar,
            profile: {
                admin: adminVar
            },
        };
        }

        Accounts.createUser(options , function(err){
            if(Meteor.user())
                console.log(Meteor.userId);
            else
                console.log(err);
        });

        Router.go('/');
    }
});