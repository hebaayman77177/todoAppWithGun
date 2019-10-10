var gun = Gun(['http://localhost:8765/gun', 'https://gunjs.herokuapp.com/gun']);
    var user = gun.user();
    logOut();

    $('#up').on('click', function(e){
      user.create($('#signUpAlias').val(), $('#signUpPass').val()).then(function(){
        user.auth($('#signUpAlias').val(), $('#signUpPass').val()).then(function(){
        $("#signUpModal").modal('hide');
        logIn();
        });
      })
    });

    $('#in').on('click', function(e){
       user.auth($('#signInAlias').val(), $('#signInPass').val()).then(function(){ 
        $("#signInModal").modal('hide');
        logIn();
       });
    });
    
    $('ul').on('click','.del-todo',function(){
      let id=$(this).parent().attr('id');
      user.get("said").get(id).put(null);
      $('#'+id).remove();
    });

    $('#said').on('submit', function(e){
      e.preventDefault();
      if(!user.is){ return }
      user.get('said').set($('#say').val());
      $('#say').val("");
    }); 

    $("#signOut").click(function(){
      location.reload();
    });

    gun.on('auth', function(){
      $('#sign').hide();
      user.get('said').map().once(UI);
    });

    function UI(say, id){
      if(say != null){
      var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
      $(li).text(say);
      $(li).append("<span class=del-todo>X</span>");
	}
    };
    function logIn(){
      $("#signIn").hide();
      $("#signUp").hide();
      $("#signOut").show();
      $("main").show()
    }
    function logOut(){
      $("#signIn").show();
      $("#signUp").show();
      $("#signOut").hide();
      $("main").hide()
    }